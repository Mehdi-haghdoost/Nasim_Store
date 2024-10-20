import React from 'react'
import styles from './Login.module.css'
function Login() {
    return (
        <div className={`${styles.bg_auth}`}>
        <div className="content vh-100">
            <div className="container-fluid h-100">

                <div className="auth h-100 d-flex align-items-center">
                    <div className="container-fluid">
                        <div className="auth-items">
                            <div className="row justify-content-center">
                                <div className="col-lg-4">

                                    <div className="auth-form shadow-xl rounded-3  mt-5 bg-white">
                                        <div className="auth-form-title d-flex align-items-center justify-content-between title-panel mb-4 slider-title-desc-center">
                                            <h2 className="text-center h4 text-muted title-font">ورود / ثبت نام</h2>
                                            <a href="">
                                                <img src="assets/image/logo.png" width="150" alt="" />
                                            </a>
                                        </div>
                                        <form action="" id="form-auth">

                                            <div className="comment-item mb-3 step-username">
                                                <input type="email" className="form-control" id="username" />
                                                <label for="username" className="form-label label-float">شماره تلفن یا ایمیل خود را وارد
                                                    کنید</label>
                                            </div>

                                            <div className="comment-item position-relative step-passwd">
                                                <input type="password" className="form-control" id="passwd" />
                                                <label for="passwd" className="form-label label-float">رمز عبور خود را
                                                    وارد
                                                    کنید</label>
                                                <div className="inline-btn-text">
                                                    <a href="sending-code.html" className="btn border-0 main-color-one-bg">ورود با پیامک</a>
                                                </div>
                                            </div>

                                            <div className="form-group step-one">
                                                <button type="button" className="main-color-one-bg py-3 btn w-100  rounded-3">ورود / ثبت نام</button>
                                            </div>
                                            <div className="form-group step-two">
                                                <button type="button" className="main-color-one-bg py-3 btn w-100 btnForm rounded-3">تایید</button>
                                            </div>

                                        </form>

                                    </div>

                                    <p className="loginTermsDesc mt-3">با ورود و یا ثبت نام در سانیار شما <a className="underlined main-color-one-color fw-bold" href="/rules/">شرایط و
                                        قوانین</a> استفاده از سرویس‌های سایت سانیار و <a className="underlined main-color-one-color fw-bold" href="/privacy-polices/">قوانین حریم
                                            خصوصی</a> آن را می‌پذیرید.</p>

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

export default Login