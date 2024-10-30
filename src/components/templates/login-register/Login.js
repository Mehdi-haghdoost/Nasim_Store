import React, { useState } from 'react'
import styles from './Login.module.css'
import Link from "next/link";
import Sms from './Sms';
import { showSwal } from '@/utils/helpers';
import { validateEmail, validatePassword, validatePhone } from '@/utils/auth';
function Login({ showRegisterForm }) {

    const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
    const [password, setPassword] = useState('');
    const [phoneOrEmail, setPhoneOrEmail] = useState("");

    const hideOtpForm = () => setIsLoginWithOtp(false);

    const loginWithPassword = async () => {
        if (!phoneOrEmail) {
            return showSwal("لطفا شماره تلفن یا ایمیل خود را وارد کنید", "warning", "اوکی")
        }

        const isValidEmail = validateEmail(phoneOrEmail)
        if (!isValidEmail) {
            return showSwal("ایمیل وارد شده صحیح نیست", "error", "تلاش مجدد");
        }

        if (!password) {
            return showSwal("لطفا پسورد خود را وارد کنید", "warning", "اوکی")
        }

        const isValidPassword = validatePassword(password)
        if (!isValidPassword) {
            return showSwal("پسورد به اندازه کافی قوی نیست", "error", "تلاش مجدد");
        }
    }
    const loginWithOtp = async () => {
        const isValidPhone = validatePhone(phoneOrEmail)
    if (!phoneOrEmail.trim()) {
      return showSwal("لطفا شماره موبایل خود را وارد کنید", "warning", "تلاش مجدد")
    } else if (!isValidPhone) {
      return showSwal("لطفا شماره موبایل معتبر وارد کنید", "warning", "تلاش مجدد")
    }
        setIsLoginWithOtp(true)
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
                                                        <form action="" id="form-auth">

                                                            <div className={`${styles.comment_item} mb-3 step-username`}>
                                                                <input
                                                                    value={phoneOrEmail}
                                                                    onChange={(event) => setPhoneOrEmail(event.target.value)}
                                                                    type="email" className={`form-control`} id="username" />
                                                                <label for="username" className={`form-label ${styles.label_float}`}>شماره تلفن یا ایمیل خود را وارد
                                                                    کنید</label>
                                                            </div>
                                                            <div className={`${styles.comment_item} position-relative step-passwd`} style={{ display: 'block' }}>
                                                                <input
                                                                    value={password}
                                                                    onChange={(event) => setPassword(event.target.value)}
                                                                    type="password" className={`form-control`} id="passwd" />
                                                                <label for="passwd" className={`form-label ${styles.label_float}`}>رمز عبور خود را
                                                                    وارد
                                                                    کنید</label>
                                                                <div className={`${styles.inline_btn_text}`}>
                                                                    <a
                                                                        onClick={() => loginWithOtp()}
                                                                        className="btn border-0 main-color-one-bg">ورود با پیامک</a>
                                                                </div>
                                                            </div>

                                                            <div className="form-group">
                                                                <button
                                                                    onClick={loginWithPassword}
                                                                    type="button" className="main-color-one-bg py-3 btn w-100  rounded-3">ورود</button>
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
                <Sms hideOtpForm={hideOtpForm} type={"ورود"} />
            )}
        </>
    )
}

export default Login