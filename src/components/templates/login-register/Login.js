"use client";
import React, { useState } from 'react'
import styles from './Login.module.css';
import { useFormik } from 'formik';
import Link from "next/link";
import Sms from './Sms';
import { showSwal } from '@/utils/helpers';
import loginSchema from '@/utils/login';

function Login({ showRegisterForm }) {

    const form = useFormik({
        initialValues: { phoneOrEmail: '', password: '' },
        validationSchema: loginSchema,
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                console.log('Form Inputs Data =>', values);
                swal({
                    title: 'با موفقیت وارد شدید',
                    // text : 'با موفقیت وارد شدید',
                    button: 'اوکی',
                    icon: '/images/success.png'
                })
                setSubmitting(false)

            }, 1000);
        }
    })

    const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);

    const hideOtpForm = () => setIsLoginWithOtp(false);

    const loginWithPassword = async () => {
        if (!form.values.phoneOrEmail) {
            return showSwal("لطفا شماره تلفن یا ایمیل خود را وارد نمایید ", "warning", "اوکی")
        }


        if (!form.values.password) {
            return showSwal("لطفا پسورد خود را وارد کنید", "warning", "اوکی")
        }

        const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (!passwordPattern.test(form.values.password)) {
            return showSwal("پسورد به اندازه کافی قوی نیست", "error", "تلاش مجدد");
        }

        if (form.errors.phoneOrEmail || form.errors.password) {
            if (form.errors.phoneOrEmail) {
                return showSwal(form.errors.phoneOrEmail, 'error', 'OK');
            } else if (form.errors.password) {
                return showSwal(form.errors.password, 'error', 'OK');
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
                                                                {/* {form.errors.phoneOrEmail && form.touched.phoneOrEmail && swal('Error', form.errors.phoneOrEmail, 'error')} */}
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

export default Login;