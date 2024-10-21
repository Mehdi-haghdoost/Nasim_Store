import React from 'react'
import styles from './Register.module.css'
import Link from "next/link";

function Register() {
  return (
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
                      <form action="" id="form-auth">

                        <div className={`${styles.comment_item} mb-3 step-username`}>
                          <input type="email" className={`form-control`} id="username" />
                          <label for="username" className={`form-label ${styles.label_float}`}>شماره تلفن خود را وارد
                            کنید</label>
                        </div>
                        <div className={`${styles.comment_item} mb-3 step-username`}>
                          <input type="email" className={`form-control`} id="username" />
                          <label for="username" className={`form-label ${styles.label_float}`}> ایمیل خود را وارد
                            کنید</label>
                        </div>
                        <div cclassName={"form-group"}>
                          <button type='button' className="main-color-one-bg py-3 btn w-100 mb-3  rounded-3">ثبت نام با کد تایید</button>
                        </div>


                        <div className="form-group">
                          <button type="button" className="main-color-one-bg py-3 btn w-100  rounded-3">ثبت نام با رمز عبور</button>
                        </div>
                        <Link href={"/"} className={`${styles.back_to_login}`}>برگشت به ورود</Link>
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
  )
}

export default Register