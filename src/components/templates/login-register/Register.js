"use client";
import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import Link from "next/link";
import { showSwal } from "@/utils/helpers";
import { validatePhone } from "@/utils/authFrontend";
import Sms from "./Sms";
import registerSchema from "@/utils/register";
import { useFormik } from "formik";
import { useAuth } from "@/Redux/hooks/useAuth";
import { useRouter } from "next/navigation";

function Register({ showLoginForm }) {
  const { register, loading, error, requestOtp, otpSent, otpMessage, isAuthenticated, clearError } = useAuth();
  const router = useRouter();

  // بررسی احراز هویت کاربر
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const form = useFormik({
    initialValues: { username: "", email: "", password: "" },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await register(
          values.username,
          values.email,
          null,
          values.password
        );

        if (response && response.meta && response.meta.requestStatus === "fulfilled") {
          showSwal("ثبت نام شما با موفقیت انجام شد", "success", "اوکی");
          resetForm();
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else {
          const errorMessage = response && response.payload ? response.payload : "خطا در ثبت نام";
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error("Register error:", error);
        showSwal(error.message || "خطا در ثبت نام", "error", "تلاش مجدد");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const [phone, setPhone] = useState("");
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const [sentPhoneNumber, setSentPhoneNumber] = useState("");
  const [otpRequestSent, setOtpRequestSent] = useState(false); // اضافه کردن state جدید

  // useEffect برای مدیریت انتقال به صفحه SMS
  useEffect(() => {
    console.log('Register OTP Status Check:', { 
      otpSent, 
      loading, 
      sentPhoneNumber, 
      otpRequestSent,
      error 
    });
    
    // شرایط انتقال به SMS:
    // 1. درخواست OTP ارسال شده باشد
    // 2. سرور تایید کرده باشد که OTP ارسال شده
    // 3. در حال لودینگ نباشد
    // 4. خطایی وجود نداشته باشد
    if (otpRequestSent && otpSent && !loading && !error && sentPhoneNumber) {
      console.log('Register: All conditions met - navigating to SMS');
      setIsRegisterWithOtp(true);
      
      if (otpMessage) {
        showSwal(otpMessage, "success", "تایید");
      }
      
      // ریست کردن state
      setOtpRequestSent(false);
    }
  }, [otpSent, loading, sentPhoneNumber, otpRequestSent, error, otpMessage]);

  // useEffect برای نمایش خطاها
  useEffect(() => {
    if (error && otpRequestSent) {
      console.log('Register: Error detected:', error);
      showSwal(error, "error", "تلاش مجدد");
      // ریست کردن state ها در صورت خطا
      setOtpRequestSent(false);
      setSentPhoneNumber("");
    }
  }, [error, otpRequestSent]);

  const hideOtpForm = () => {
    setIsRegisterWithOtp(false);
    setSentPhoneNumber("");
    setOtpRequestSent(false);
    if (clearError) {
      clearError();
    }
  };

  const signUp = async () => {
    if (!form.values.username.trim()) {
      return showSwal("لطفا نام خود را وارد نمایید ", "warning", "اوکی");
    }
    if (form.errors.username) {
      return showSwal(form.errors.username, "error", "اوکی");
    }
    if (!form.values.email) {
      return showSwal("لطفا ایمیل معتبر وارد کنید", "warning", "تلاش مجدد");
    }
    if (form.errors.email) {
      return showSwal(form.errors.email, "error", "اوکی");
    }
    if (!form.values.password) {
      return showSwal("لطفا پسورد خود را وارد کنید", "warning", "اوکی");
    }
    if (form.errors.password) {
      return showSwal(form.errors.password, "error", "اوکی");
    }
    form.handleSubmit();
  };

  const sentOtp = async () => {
    const phoneNumber = phone.trim();
    const isValidPhone = validatePhone(phoneNumber);
    
    if (!phoneNumber) {
      return showSwal(
        "لطفا شماره موبایل خود را وارد کنید",
        "warning",
        "تلاش مجدد"
      );
    } else if (!isValidPhone) {
      return showSwal(
        "لطفا شماره موبایل معتبر وارد کنید",
        "warning",
        "تلاش مجدد"
      );
    }

    // پاک کردن خطاهای قبلی
    if (clearError) {
      clearError();
    }

    console.log('Register: Sending OTP to:', phoneNumber);
    
    showSwal("در حال ارسال کد تایید...", "info", "منتظر بمانید");

    try {
      // تنظیم state ها قبل از ارسال درخواست
      setSentPhoneNumber(phoneNumber);
      setOtpRequestSent(true);
      
      const result = await requestOtp(phoneNumber);
      console.log('Register: OTP Request Result:', result);
      
      // اگر درخواست موفق بود
      if (result.meta && result.meta.requestStatus === "fulfilled") {
        console.log('Register: OTP sent successfully, keeping phone number:', phoneNumber);
        // phoneNumber رو نگه می‌داریم - فقط otpRequestSent رو ریست می‌کنیم
        // setSentPhoneNumber(phoneNumber); // قبلاً تنظیم شده
        // setOtpRequestSent(false); // useEffect خودش این کار رو میکنه
      } else if (result.meta && result.meta.requestStatus === "rejected") {
        // فقط در صورت خطا ریست کن
        setOtpRequestSent(false);
        setSentPhoneNumber("");
        showSwal(result.payload || "خطا در ارسال کد تایید", "error", "تلاش مجدد");
      }
      
    } catch (error) {
      console.error('Register: Error sending OTP:', error);
      setOtpRequestSent(false);
      setSentPhoneNumber("");
      showSwal(error.message || "خطا در ارسال کد تایید", "error", "تلاش مجدد");
    }
  };

  console.log('Register: Current state:', { 
    isRegisterWithOtp, 
    sentPhoneNumber, 
    otpSent, 
    loading, 
    otpRequestSent 
  });

  return (
    <>
      {!isRegisterWithOtp ? (
        <div className={`${styles.bg_auth}`}>
          <div className={`${styles.content}`}>
            <div className="container-fluid h-100">
              <div className="auth h-100 d-flex align-items-center">
                <div className="container-fluid">
                  <div className="auth-items">
                    <div className="row justify-content-center">
                      <div className="col-lg-4">
                        <div
                          className={`${styles.auth_form} shadow-xl rounded-3 mt-5 bg-white`}
                        >
                          <div
                            className={`${styles.auth_form_title} d-flex align-items-center justify-content-between title-panel mb-4 slider-title-desc-center`}
                          >
                            <h2
                              className={`text-center h4 text-muted title-font`}
                            >
                              ثبت نام
                            </h2>
                            <a href="">
                              <img src="/images/logo.png" width="150" alt="" />
                            </a>
                          </div>
                          <form onSubmit={form.handleSubmit}>
                            {!isRegisterWithPass ? (
                              <div
                                className={`${styles.comment_item} mb-3 step-username`}
                              >
                                <input
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  type="text"
                                  className={`form-control`}
                                  id="username"
                                />
                                <label
                                  htmlFor="username"
                                  className={`form-label ${styles.label_float}`}
                                >
                                  شماره تلفن خود را وارد کنید
                                </label>
                              </div>
                            ) : (
                              <div
                                className={`${styles.comment_item} mb-3 step-username`}
                              >
                                <input
                                  value={form.values.username}
                                  onChange={form.handleChange}
                                  onBlur={form.handleBlur}
                                  name="username"
                                  type="text"
                                  className={`form-control`}
                                  id="username"
                                />
                                <label
                                  htmlFor="username"
                                  className={`form-label ${styles.label_float}`}
                                >
                                  نام خود را وارد کنید
                                </label>
                              </div>
                            )}
                            {isRegisterWithPass && (
                              <div
                                className={`${styles.comment_item} mb-3 step-username`}
                              >
                                <input
                                  value={form.values.email}
                                  onChange={form.handleChange}
                                  onBlur={form.handleBlur}
                                  type="email"
                                  name="email"
                                  className={`form-control`}
                                  id="email"
                                />
                                <label
                                  htmlFor="email"
                                  className={`form-label ${styles.label_float}`}
                                >
                                  ایمیل خود را وارد کنید
                                </label>
                              </div>
                            )}
                            {isRegisterWithPass && (
                              <div
                                className={`${styles.comment_item} mb-3 step-username`}
                              >
                                <input
                                  value={form.values.password}
                                  onChange={form.handleChange}
                                  onBlur={form.handleBlur}
                                  name="password"
                                  type="password"
                                  className={`form-control`}
                                  id="password"
                                />
                                <label
                                  htmlFor="password"
                                  className={`form-label ${styles.label_float}`}
                                >
                                  رمز عبور را وارد کنید
                                </label>
                              </div>
                            )}
                            <div className={"form-group"}>
                              <button
                                onClick={() => {
                                  setIsRegisterWithPass(false);
                                  sentOtp();
                                }}
                                type="button"
                                className="main-color-one-bg py-3 btn w-100 mb-3 rounded-3"
                                disabled={loading || otpRequestSent}
                                style={{
                                  cursor: (loading || otpRequestSent) ? 'not-allowed' : 'pointer',
                                  opacity: (loading || otpRequestSent) ? 0.6 : 1
                                }}
                              >
                                {(loading || otpRequestSent)
                                  ? "در حال پردازش..."
                                  : "ثبت نام با کد تایید"}
                              </button>
                            </div>
                            <div className="form-group">
                              <button
                                onClick={() => {
                                  if (isRegisterWithPass) {
                                    signUp();
                                  } else {
                                    setIsRegisterWithPass(true);
                                  }
                                }}
                                type="button"
                                className="main-color-one-bg py-3 btn w-100 rounded-3"
                                disabled={loading}
                                style={{
                                  cursor: loading ? 'not-allowed' : 'pointer',
                                  opacity: loading ? 0.6 : 1
                                }}
                              >
                                {loading
                                  ? "در حال پردازش..."
                                  : isRegisterWithPass
                                  ? "ثبت نام"
                                  : "ثبت نام با رمز عبور"}
                              </button>
                            </div>
                            <p
                              onClick={showLoginForm}
                              className={`${styles.back_to_login}`}
                              style={{ cursor: 'pointer' }}
                            >
                              برگشت به ورود
                            </p>
                          </form>
                          <Link
                            className={`${styles.redirect_to_home}`}
                            href={"/"}
                          >
                            لغو
                          </Link>
                        </div>
                        <p className={`${styles.loginTermsDesc} mt-3`}>
                          با ورود و یا ثبت نام در نسیم استور شما
                          <a
                            className={`${styles.underlined} main-color-one-color fw-bold`}
                            href="/rules/"
                          >
                            شرایط و قوانین
                          </a>{" "}
                          استفاده از سرویس‌های سایت نسیم استور و
                          <a
                            className={`${styles.underlined} main-color-one-color fw-bold`}
                            href="/privacy-polices/"
                          >
                            قوانین حریم خصوصی
                          </a>{" "}
                          آن را می‌پذیرید.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {console.log('Register: Rendering SMS with phone:', sentPhoneNumber)}
          <Sms hideOtpForm={hideOtpForm} type={"ثبت نام"} phone={sentPhoneNumber} />
        </>
      )}
    </>
  );
}

export default Register;