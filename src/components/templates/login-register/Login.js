"use client";
import React, { useEffect, useState } from 'react'
import styles from './Login.module.css';
import { useFormik } from 'formik';
import Link from "next/link";
import Sms from './Sms';
import { showSwal } from '@/utils/helpers';
import loginSchema from '@/utils/login';
import { useAuth } from '@/Redux/hooks/useAuth';
import { useRouter } from 'next/navigation';

function Login({ showRegisterForm }) {

    const { login, loading, error, isAuthenticated, requestLoginOtp, otpSent, otpMessage } = useAuth();
    const router = useRouter();

    const form = useFormik({
        initialValues: { phoneOrEmail: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                console.log('Form Inputs Data =>', values);
                const result = await login(values.phoneOrEmail, values.password);

                if (result.payload && result.payload.user) {
                    showSwal('با موفقیت وارد شدید', 'success', 'اوکی');

                    // ریدایرکت به صفحه اصلی یا داشبورد پس از موفقیت
                    setTimeout(() => {
                        router.push('/')
                    }, 1000);
                } else if (result.error) {
                    showSwal(result.error.message || 'خطا در ورود', 'error', 'تلاش مجدد');
                }

            } catch (error) {
                console.error('Login error:', error);
                showSwal(error.message || 'خطا در ورود', 'error', 'تلاش مجدد');
            } finally {
                setSubmitting(false);
            }
        }
    });

    const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
    const [isOtpRequestPending, setIsOtpRequestPending] = useState(false);

    // بررسی وضعیت احراز هویت
    useEffect(() => {
        if (isAuthenticated) {
            // اگر کاربر قبلاً لاگین شده است، به صفحه اصلی یا داشبورد هدایت شود
            router.push('/');
        }
    }, [isAuthenticated, router]);

    // بررسی خطاها
    useEffect(() => {
        if (error) {
            showSwal(error, 'error', 'تلاش مجدد');
        }
    }, [error]);

    // بررسی وضعیت درخواست OTP
    useEffect(() => {
        // اگر درخواست OTP در حال انجام بود و حالا به پایان رسیده
        if (isOtpRequestPending && !loading) {
            setIsOtpRequestPending(false);
            
            // بررسی وضعیت خطا
            if (!error && otpSent) {
                // اگر خطایی نبود و OTP ارسال شده، به صفحه SMS برویم
                console.log("OTP برای ورود با موفقیت ارسال شد، انتقال به صفحه SMS");
                setIsLoginWithOtp(true);
                
                if (otpMessage) {
                    showSwal(otpMessage, "success", "تایید");
                }
            } else if (error) {
                // اگر خطایی وجود داشت، صفحه را تغییر نمی‌دهیم
                console.error("خطای ارسال OTP برای ورود:", error);
            }
        }
    }, [loading, error, otpSent, otpMessage, isOtpRequestPending]);

    const hideOtpForm = () => setIsLoginWithOtp(false);

    const loginWithPassword = async () => {
        if (!form.values.phoneOrEmail) {
            return showSwal("لطفا شماره تلفن یا ایمیل خود را وارد نمایید ", "warning", "اوکی")
        }

        if (!form.values.password) {
            return showSwal("لطفا پسورد خود را وارد کنید", "warning", "اوکی")
        }

        // اعتبارسنجی فرم
        const errors = await form.validateForm();
        if (Object.keys(errors).length > 0) {
            if (errors.phoneOrEmail) {
                return showSwal(errors.phoneOrEmail, 'error', 'اوکی');
            } else if (errors.password) {
                return showSwal(errors.password, 'error', 'اوکی');
            }
        }

        form.handleSubmit();
    }

    const loginWithOtp = async () => {
        const isValidPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g.test(form.values.phoneOrEmail);
        if (!form.values.phoneOrEmail.trim()) {
            return showSwal("لطفا شماره موبایل خود را وارد نمایید", "error", "تلاش مجدد");
        } else if (!isValidPhone) {
            return showSwal("لطفا شماره موبایل معتبر وارد نمایید", "error", "تلاش مجدد");
        }

        // نمایش پیام در حال بارگذاری
        showSwal("در حال ارسال کد تایید...", "info", "منتظر بمانید");
        
        // تنظیم وضعیت درخواست به حالت در حال انجام
        setIsOtpRequestPending(true);
        
        try {
            console.log("درخواست OTP برای ورود با شماره:", form.values.phoneOrEmail);
            
            // ارسال درخواست OTP به سرور بدون تغییر وضعیت isLoginWithOtp
            await requestLoginOtp(form.values.phoneOrEmail);
            
            // توجه: انتقال به صفحه SMS در useEffect انجام می‌شود
            // پس از بررسی نتیجه درخواست
            
        } catch (error) {
            // در صورت خطا در همین تابع، وضعیت درخواست را به پایان رسیده تغییر می‌دهیم
            setIsOtpRequestPending(false);
            console.error("خطای ارسال OTP برای ورود (catch):", error);
            showSwal(error.message || "خطا در ارسال کد تایید", "error", "تلاش مجدد");
        }
    }

    return (
        <>
            {!isLoginWithOtp ? (
                <>
                    <div className={`${styles.bg_auth}`}>
                        <div className={`${styles.content}`}>
                            <div className="container-fluid h-100">

                                <div className="auth h-100 d-flex align-items-center">
                                    <div className="container-fluid">
                                        <div className="auth-items">
                                            <div className="row justify-content-center">
                                                <div className="col-lg-4">

                                                    <div className={`${styles.auth_form} shadow-xl rounded-3  mt-5 bg-white`}>
                                                        <div className={`${styles.auth_form_title} d-flex align-items-center justify-content-between title-panel mb-4 slider-title-desc-center`}>
                                                            <h2 className={`text-center h4 text-muted title-font`}>ورود</h2>
                                                            <a href="">
                                                                <img src="/images/logo.png" width="150" alt="" />
                                                            </a>
                                                        </div>
                                                        <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }} >

                                                            <div className={`${styles.comment_item} mb-3 step-username`}>
                                                                <input
                                                                    value={form.values.phoneOrEmail}
                                                                    name='phoneOrEmail'
                                                                    onChange={form.handleChange}
                                                                    onBlur={form.handleBlur}
                                                                    type="text"
                                                                    className={`form-control`}
                                                                    id="username"
                                                                />
                                                                <label htmlFor="username" className={`form-label ${styles.label_float}`}>شماره تلفن یا ایمیل خود را وارد
                                                                    کنید
                                                                </label>
                                                            </div>
                                                            <div className={`${styles.comment_item} position-relative step-passwd`} style={{ display: 'block' }}>
                                                                <input
                                                                    value={form.values.password}
                                                                    onChange={form.handleChange}
                                                                    onBlur={form.handleBlur}
                                                                    type="password"
                                                                    className={`form-control`}
                                                                    id="passwd"
                                                                    name='password'
                                                                />
                                                                <label htmlFor="passwd" className={`form-label ${styles.label_float}`}>رمز عبور خود را
                                                                    وارد
                                                                    کنید
                                                                </label>
                                                                <div className={`${styles.inline_btn_text}`}>
                                                                    <a
                                                                        onClick={() => loginWithOtp()}
                                                                        className="btn border-0 main-color-one-bg">ورود با پیامک</a>
                                                                </div>
                                                            </div>

                                                            <div className="form-group">
                                                                <button
                                                                    onClick={loginWithPassword}
                                                                    type="button" 
                                                                    className="main-color-one-bg py-3 btn w-100 rounded-3"
                                                                    disabled={loading}>
                                                                    {loading ? 'در حال پردازش...' : 'ورود'}
                                                                </button>
                                                            </div>
                                                            <span className={`${styles.login_froget_password} text-end`} href="/register">آیا حساب کاربری ندارید ؟ </span>
                                                            <div className="form-group step-two">
                                                                <button
                                                                    onClick={showRegisterForm}
                                                                    type="button" className={` ${styles.register_btn_light} py-3 btn w-100 btnForm rounded-3`}>ثبت نام</button>
                                                            </div>

                                                        </form>
                                                        <Link className={`${styles.redirect_to_home}`} href={"/"}>لغو</Link>
                                                    </div>

                                                    <p className={`${styles.loginTermsDesc} mt-3`}>با ورود و یا ثبت نام در نسیم استور شما
                                                        <a className={`${styles.underlined} main-color-one-color fw-bold`} href="/rules/">شرایط و
                                                            قوانین
                                                        </a> استفاده از سرویس‌های سایت نسیم استور و
                                                        <a className={`${styles.underlined} main-color-one-color fw-bold`} href="/privacy-polices/">قوانین حریم
                                                            خصوصی
                                                        </a> آن را می‌پذیرید.
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Sms
                  hideOtpForm={hideOtpForm}
                  type={"ورود"}
                  phone={form.values.phoneOrEmail}
                />
            )}
        </>
    )
}

export default Login;