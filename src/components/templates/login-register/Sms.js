"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import styles from './Sms.module.css';
import ProgressBar from '../index/mainSlider/ProgressBar';
import { useAuth } from '@/Redux/hooks/useAuth';
import { showSwal } from '@/utils/helpers';




function Sms({ hideOtpForm, type, phone }) {

    const [otp, setOtp] = useState(['', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [progress, setProgress] = useState(0);
    const inpuRefs = useRef([]);
    const router = useRouter();

    const {
        confirmOtp,
        loginWithOtp,
        requestOtp,
        requestLoginOtp,
        loading,
        error,
        isAuthenticated,
        otpMessage
    } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            showSwal(`${type} با موفقیت انجام شد`, "success", "تایید");
            // بعد از ثبت نام موفق، کاربر را به صفحه اصلی هدایت می‌کنیم
            setTimeout(() => {
                hideOtpForm();
                router.push('/');
            }, 2000);
        }
    }, [isAuthenticated, hideOtpForm, type, router]);

    useEffect(() => {
        if (error) {
            showSwal(error, 'error', 'تلاش مجدد');
        }
    }, [error]);

    useEffect(() => {
        if (otpMessage) {
            showSwal(otpMessage, 'success', 'تایید');
        }
    }, [otpMessage]);


    const handleResendCode = () => {
        if (type === 'ثبت نام') {
            requestOtp(phone);
        } else {
            requestLoginOtp(phone);
        }

        setIsTimerActive(true);
        setTimer(60);
        setProgress(0);
    }


    useEffect(() => {
        if (progress < 100) {
            setTimeout(() => setProgress(prev => prev += 1.65), 1000)
        }
    }, [progress])

    // تابع برای ارسال کد تایید
    const handleSubmit = () => {
        // تبدیل آرایه رقم‌ها به یک رشته
        const otpCode = otp.join('');

        if (otpCode.length !== 5) {
            return showSwal("لطفا کد تایید 5 رقمی را وارد کنید", "warning", "تلاش مجدد");
        }

        try {
            console.log(`درخواست تایید کد برای شماره: ${phone} با کد: ${otpCode}`);
            if (type === 'ثبت نام') {
                confirmOtp(phone, otpCode);
            } else {
                loginWithOtp(phone, otpCode);
            }
        } catch (err) {
            console.error("خطا در تایید کد:", err);
            showSwal(err.message || "خطا در تایید کد", "error", "تلاش مجدد");
        }
    };

    useEffect(() => {
        if (progress < 100) {
            setTimeout(() => setProgress(prev => prev += 1.65), 1000)
        }
    }, [progress]);

    useEffect(() => {
        let interval = null;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1)
            }, 1000);
        } else if (timer === 0) {
            setIsTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [timer, isTimerActive])


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
                                                <h2 className="text-center h4 text-muted title-font">{type}</h2>
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
                                                        key={index}
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
                                                                newOtp[index - 1] = '';
                                                                setOtp(newOtp);

                                                            }
                                                        }}
                                                        placeholder="_"
                                                        step="1" min="0" max="9" autoComplete="no" pattern="\d*" />
                                                ))}
                                                <input id="otp-value" placeholder="_" type="hidden" name="otp" />
                                            </div>

                                            <div className={styles.progress_parent}>
                                                <div className={styles.progressBar} style={{
                                                    width: `${progress}%`,
                                                }}>
                                                </div>
                                            </div>

                                            {/* Countdown timer */}
                                            {isTimerActive && (
                                                <div className={styles.countDownContainer}>
                                                    <div className={styles.countDownBar}>
                                                        <span>00:</span>
                                                        <span>00:</span>
                                                        <span>{timer}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {!isTimerActive && (
                                                <a
                                                    onClick={handleResendCode}
                                                    className={`${styles.resendCode}`}>ارسال مجدد کد</a>
                                            )}

                                            <div className="form-group mt-4">
                                                <button
                                                    type="button"
                                                    id="submit"
                                                    className={`${styles.btn_login} w-100 btn text-white rounded-3`}
                                                    onClick={handleSubmit}
                                                    disabled={loading}
                                                >
                                                    {loading ? 'در حال پردازش...' : type}
                                                </button>
                                            </div>
                                        </div>
                                        <p
                                            onClick={hideOtpForm}
                                            className={`${styles.redirect_to_home} mt-2`}>لغو</p>
                                        <p className={`${styles.loginTermsDesc} mt-3`}>با ورود و یا ثبت نام در نسیم استور شما <a className="underlined main-color-one-color fw-bold"
                                            href="/rules/">شرایط و
                                            قوانین</a> استفاده از سرویس‌های سایت نسیم استور و <a className="underlined main-color-one-color fw-bold"
                                                href="/privacy-polices/">قوانین حریم
                                                خصوصی</a> آن را می‌پذیرید.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Sms;