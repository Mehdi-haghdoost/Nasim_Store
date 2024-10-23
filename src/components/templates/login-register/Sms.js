"use client"
import React, { useRef, useState } from 'react'
import styles from './Sms.module.css'
function Sms() {

    const [otp, setOtp] = useState(['', '', '', '','','']);
    const inpuRefs = useRef([]);

    return (
        <div className={styles.bg_auth}>
            <div className={styles.content}>
                <div className="container-fluid h-100">

                    <div className="auth h-100 d-flex align-items-center">
                        <div className="container-fluid">
                            <div className="auth-items">
                                <div className="row justify-content-center">
                                    <div className="col-lg-4">

                                        <div className={`${styles.auth_form} shadow-xl rounded-3  mt-5 bg-white`}>
                                            <div className={`${styles.auth_form_title} title-panel d-flex justify-content-between align-items-center mb-4 slider-title-desc-center`}>
                                                <h2 className="text-center h4 text-muted title-font">ورود / ثبت نام</h2>
                                                <a href="">
                                                    <img src="/images/logo.png" width="150" alt="" />
                                                </a>
                                            </div>

                                            <div className="alert text-center alert-success">
                                                یک کد برای شما پیامک شد لطفا آن را وارد کنید
                                            </div>

                                            <div className={styles.otp_input}>
                                                {otp.map((digit, index) => (
                                                    <input
                                                        key={{ index }}
                                                        type='text'
                                                        maxLength="1"
                                                        ref={(el) => (inpuRefs.current[index] = el)}
                                                        value={digit}
                                                        onChange={(e) => {
                                                            const newOtp = [...otp];
                                                            newOtp[index] = e.target.value;
                                                            setOtp(newOtp);

                                                            if (e.target.value.length === 1 && index < otp.length - 1) {
                                                                inpuRefs.current[index + 1].focus();
                                                            }
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                                                                inpuRefs.current[index - 1].focus();
                                                                const newOtp = [...otp];
                                                                newOtp[index - 1]  = '';
                                                                setOtp(newOtp);

                                                            }
                                                        }}
                                                        placeholder="_"
                                                        step="1" min="0" max="9" autocomplete="no" pattern="\d*" />
                                                ))}
                                                {/* <input placeholder="_" type="number" step="1" min="0" max="9" autocomplete="no" pattern="\d*" />
                                                <input placeholder="_" type="number" step="1" min="0" max="9" autocomplete="no" pattern="\d*" />
                                                <input placeholder="_" type="number" step="1" min="0" max="9" autocomplete="no" pattern="\d*" />
                                                <input placeholder="_" type="number" step="1" min="0" max="9" autocomplete="no" pattern="\d*" />
                                                <input placeholder="_" type="number" step="1" min="0" max="9" autocomplete="no" pattern="\d*" /> */}
                                                <input id="otp-value" placeholder="_" type="hidden" name="otp" />
                                            </div>

                                            {/* Countdown timer */}
                                            <div className="countDownContainer">
                                                <div className="countdown-bar" id="countdownB">
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                            </div>


                                            <div className="form-group mt-4">
                                                <button type="submit" id="submit" className={`${styles.btn_login} w-100 btn text-white rounded-3`}>وورد به
                                                    سایت
                                                </button>
                                            </div>
                                        </div>

                                        <p className={`${styles.loginTermsDesc} mt-3`}>با ورود و یا ثبت نام در سانیار شما <a className="underlined main-color-one-color fw-bold"
                                            href="/rules/">شرایط و
                                            قوانین</a> استفاده از سرویس‌های سایت سانیار و <a className="underlined main-color-one-color fw-bold"
                                                href="/privacy-polices/">قوانین حریم
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

export default Sms