"use client"
import React, { useState } from 'react'
import styles from './Register.module.css'
import Link from "next/link";
import { showSwal } from '@/utils/helpers';
import { validateEmail, validatePassword, validatePhone } from '@/utils/auth';
import Sms from './Sms';
import registerSchema from '@/utils/register';
import { useFormik } from 'formik';

function Register({ showLoginForm }) {

  const form = useFormik({
    initialValues: { username: '', email: '', password: '' },
    validationSchema: registerSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        swal({
          title: 'اطلاعات شما با موفقیت ثبت شد',
          button: 'اوکی',
          icon: '/images/success.png'
        })
        setSubmitting(false);
      }, 1000);
    }
  })

  const [phone, setPhone] = useState("");

  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false)
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);

  const hideOtpForm = () => setIsRegisterWithOtp(false);


  const signUp = async () => {
    if (!form.values.username.trim()) {
      return showSwal("لطفا نام خود را وارد نمایید ", "warning", "اوکی")
    }
    if (form.errors.username) {
      return showSwal(form.errors.username, "error", "اوکی")
    }


    if (!form.values.email) {
      return showSwal("لطفا ایمیل معتبر وارد کنید", "warning", "تلاش مجدد")
    }
    if (form.errors.email) {
      return showSwal(form.errors.email, "error", "اوکی")
    }


    if (!form.values.password) {
      return showSwal("لطفا پسورد خود را وارد کنید", "warning", "اوکی")
    }
    if (form.errors.password) {
      return showSwal(form.errors.password, "error", "اوکی")
    }

    // اینجا باید پس از اعتبار سنجی فرم رو ارسال کنم
    form.handleSubmit();

  }

  const sentOtp = async () => {

    const isValidPhone = validatePhone(phone)
    if (!phone.trim()) {
      return showSwal("لطفا شماره موبایل خود را وارد کنید", "warning", "تلاش مجدد")
    } else if (!isValidPhone) {
      return showSwal("لطفا شماره موبایل معتبر وارد کنید", "warning", "تلاش مجدد")
    }

  }

  return (
    <>
      {!isRegisterWithOtp ? (
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
                              <h2 className={`text-center h4 text-muted title-font`}>ثبت نام</h2>
                              <a href="">
                                <img src="/images/logo.png" width="150" alt="" />
                              </a>
                            </div>
                            <form onSubmit={form.handleSubmit}>
                              {
                                !isRegisterWithPass ? (
                                  <div className={`${styles.comment_item} mb-3 step-username`}>
                                    <input
                                      value={phone}
                                      onChange={(e) => setPhone(e.target.value)}
                                      type="text" className={`form-control`} id="username" />
                                    <label for="username" className={`form-label ${styles.label_float}`}>شماره تلفن خود را وارد
                                      کنید</label>
                                  </div>
                                ) : (
                                  <div className={`${styles.comment_item} mb-3 step-username`}>
                                    <input
                                      value={form.values.username}
                                      onChange={form.handleChange}
                                      onBlur={form.handleBlur}
                                      name='name'
                                      type="text"
                                      className={`form-control`}
                                      id="name" />
                                    <label htmlFor="name" className={`form-label ${styles.label_float}`}>نام خود را وارد کنید</label>
                                  </div>
                                )
                              }
                              {isRegisterWithPass && (
                                <div className={`${styles.comment_item} mb-3 step-username`}>
                                  <input
                                    value={form.values.email}
                                    onChange={form.handleChange}
                                    onBlur={form.handleBlur}
                                    type="email"
                                    name='email'
                                    className={`form-control`}
                                    id="email" />
                                  <label htmlFor="email" className={`form-label ${styles.label_float}`}> ایمیل خود را وارد
                                    کنید</label>
                                </div>

                              )}
                              {isRegisterWithPass && (
                                <div className={`${styles.comment_item} mb-3 step-username`}>
                                  <input
                                    value={form.values.password}
                                    onChange={form.handleChange}
                                    onBlur={form.handleBlur}
                                    name='password'
                                    type="password"
                                    className={`form-control`}
                                    id="password" />
                                  <label htmlFor="password" className={`form-label ${styles.label_float}`}> رمز عبور را وارد کنید</label>
                                </div>
                              )}
                              <div cclassName={"form-group"}>
                                <button
                                  onClick={() => {
                                    setIsRegisterWithPass(false)
                                    sentOtp()
                                    setIsRegisterWithOtp(true)
                                  }}
                                  type='button' className="main-color-one-bg py-3 btn w-100 mb-3  rounded-3">ثبت نام با کد تایید</button>
                              </div>


                              <div className="form-group">
                                <button
                                  onClick={() => {
                                    if (isRegisterWithPass) {
                                      signUp()
                                    } else {
                                      setIsRegisterWithPass(true)
                                    }
                                  }}
                                  type="button" className="main-color-one-bg py-3 btn w-100  rounded-3">ثبت نام با رمز عبور</button>
                              </div>
                              <p
                                onClick={showLoginForm}
                                className={`${styles.back_to_login}`}>برگشت به ورود</p>
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
        <Sms hideOtpForm={hideOtpForm} type={"ثبت نام"} />
      )}
    </>

  )
}

export default Register