"use client";
import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import Link from "next/link";
import Sms from "./Sms";
import { showSwal } from "@/utils/helpers";
import loginSchema from "@/utils/login";
import { useAuth } from "@/Redux/hooks/useAuth";
import { useRouter } from "next/navigation";

function Login({ showRegisterForm }) {
  const { login, loading, error, requestLoginOtp, otpSent, otpMessage, clearError } = useAuth();
  const router = useRouter();

  const form = useFormik({
    initialValues: { phoneOrEmail: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const result = await login(values.phoneOrEmail, values.password);
        if (result.payload && result.payload.user) {
          showSwal("با موفقیت وارد شدید", "success", "اوکی");
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else if (result.error) {
          showSwal(result.error.message || "خطا در ورود", "error", "تلاش مجدد");
        }
      } catch (error) {
        showSwal(error.message || "خطا در ورود", "error", "تلاش مجدد");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [errorShown, setErrorShown] = useState(false);

  // فقط useEffect برای نمایش خطاها
  useEffect(() => {
    if (error && !errorShown) {
      showSwal(error, "error", "تلاش مجدد");
      setErrorShown(true);
    }
  }, [error, errorShown]);

  // Reset error shown flag when error changes
  useEffect(() => {
    if (!error) {
      setErrorShown(false);
    }
  }, [error]);

  const hideOtpForm = () => {
    setIsLoginWithOtp(false);
    if (clearError) {
      clearError();
    }
  };

  // Modified function to clear error before switching forms
  const handleShowRegisterForm = () => {
    // Clear any existing errors
    if (clearError) {
      clearError();
    }
    setErrorShown(false);
    showRegisterForm();
  };

  const loginWithPassword = async () => {
    if (!form.values.phoneOrEmail || !form.values.password) {
      return showSwal(
        "لطفا شماره تلفن یا ایمیل و پسورد خود را وارد کنید",
        "warning",
        "اوکی"
      );
    }

    const errors = await form.validateForm();
    if (Object.keys(errors).length > 0) {
      if (errors.phoneOrEmail) {
        return showSwal(errors.phoneOrEmail, "error", "اوکی");
      } else if (errors.password) {
        return showSwal(errors.password, "error", "اوکی");
      }
    }

    form.handleSubmit();
  };

  const loginWithOtp = async () => {
    const isValidPhone =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g.test(
        form.values.phoneOrEmail
      );
    if (!form.values.phoneOrEmail.trim() || !isValidPhone) {
      return showSwal(
        "لطفا شماره موبایل معتبر وارد نمایید",
        "error",
        "تلاش مجدد"
      );
    }

    // پاک کردن خطاهای قبلی
    if (clearError) {
      clearError();
    }

    console.log('Login: Sending OTP to:', form.values.phoneOrEmail);

    showSwal("در حال ارسال کد تایید...", "info", "منتظر بمانید");

    try {
      const result = await requestLoginOtp(form.values.phoneOrEmail);
      console.log('Login: OTP Request Result:', result);
      
      // اگر درخواست موفق بود، مستقیم انتقال بده
      if (result.meta && result.meta.requestStatus === "fulfilled") {
        console.log('Login: OTP sent successfully, navigating to SMS');
        setIsLoginWithOtp(true);
        
        if (result.payload && result.payload.message) {
          showSwal(result.payload.message, "success", "تایید");
        }
      } else if (result.meta && result.meta.requestStatus === "rejected") {
        showSwal(result.payload || "خطا در ارسال کد تایید", "error", "تلاش مجدد");
      }
      
    } catch (error) {
      console.error('Login: Error sending OTP:', error);
      showSwal(error.message || "خطا در ارسال کد تایید", "error", "تلاش مجدد");
    }
  };

  console.log('Login: Current state:', { 
    isLoginWithOtp, 
    loading,
    phoneOrEmail: form.values.phoneOrEmail
  });

  return (
    <>
      {!isLoginWithOtp ? (
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
                              ورود
                            </h2>
                            <a href="">
                              <img src="/images/logo.png" width="150" alt="" />
                            </a>
                          </div>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              form.handleSubmit();
                            }}
                          >
                            <div
                              className={`${styles.comment_item} mb-3 step-username`}
                            >
                              <input
                                value={form.values.phoneOrEmail}
                                name="phoneOrEmail"
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                type="text"
                                className={`form-control`}
                                id="username"
                              />
                              <label
                                htmlFor="username"
                                className={`form-label ${styles.label_float}`}
                              >
                                شماره تلفن یا ایمیل خود را وارد کنید
                              </label>
                            </div>
                            <div
                              className={`${styles.comment_item} position-relative step-passwd`}
                            >
                              <input
                                value={form.values.password}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                type="password"
                                className={`form-control`}
                                id="passwd"
                                name="password"
                              />
                              <label
                                htmlFor="passwd"
                                className={`form-label ${styles.label_float}`}
                              >
                                رمز عبور خود را وارد کنید
                              </label>
                              <div className={`${styles.inline_btn_text}`}>
                                <a
                                  onClick={() => loginWithOtp()}
                                  className="btn border-0 main-color-one-bg"
                                  style={{
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    opacity: loading ? 0.6 : 1
                                  }}
                                >
                                  {loading ? "در حال ارسال..." : "ورود با پیامک"}
                                </a>
                              </div>
                            </div>
                            <div className="form-group">
                              <button
                                onClick={loginWithPassword}
                                type="button"
                                className="main-color-one-bg py-3 btn w-100 rounded-3"
                                disabled={loading}
                              >
                                {loading ? "در حال پردازش..." : "ورود"}
                              </button>
                            </div>
                            <span
                              className={`${styles.login_froget_password} text-end`}
                              href="/register"
                            >
                              آیا حساب کاربری ندارید؟
                            </span>
                            <div className="form-group step-two">
                              <button
                                onClick={handleShowRegisterForm}
                                type="button"
                                className={`${styles.register_btn_light} py-3 btn w-100 btnForm rounded-3`}
                              >
                                ثبت نام
                              </button>
                            </div>
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
        <Sms
          hideOtpForm={hideOtpForm}
          type={"ورود"}
          phone={form.values.phoneOrEmail}
        />
      )}
    </>
  );
}

export default Login;