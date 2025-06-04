'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '@/styles/contactUs.module.css';
import Header from '@/components/modules/header/Header';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Footer from '@/components/modules/footer/Footer';
import { useContact } from '@/Redux/hooks/useContact';
import { showSwal } from '@/utils/helpers';
import { toast } from 'react-toastify';

function ContactUsPage() {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const { submitContactMessage, loading, success, error, successMessage, clearStatus } = useContact();
    
    const [formData, setFormData] = useState({
        message: '',
        name: '',
        email: '',
        saveInfo: false
    });

    // پر کردن فرم با اطلاعات کاربر در صورت لاگین بودن
    useEffect(() => {
        if (isAuthenticated && user) {
            setFormData(prev => ({
                ...prev,
                name: user.username || '',
                email: user.email || ''
            }));
        }
    }, [isAuthenticated, user]);

    // مدیریت نتیجه ارسال پیام
    useEffect(() => {
        if (success) {
            toast.success(successMessage || 'پیام شما با موفقیت ارسال شد', {
                position: "bottom-right",
                autoClose: 3000
            });
            // پاک کردن فرم بعد از ارسال موفق
            setFormData(prev => ({
                ...prev,
                message: '',
                saveInfo: false
            }));
            clearStatus();
        }
        
        if (error) {
            toast.error(`خطا در ارسال پیام: ${error}`, {
                position: "bottom-right",
                autoClose: 5000
            });
            clearStatus();
        }
    }, [success, error, successMessage, clearStatus]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // بررسی لاگین بودن کاربر
        if (!isAuthenticated) {
            showSwal(
                'برای ارسال پیام ابتدا وارد حساب کاربری خود شوید',
                'warning',
                {
                    text: 'ورود به حساب کاربری',
                    closeModal: true,
                }
            ).then(() => {
                window.location.href = '/login-register';
            });
            return;
        }

        // اعتبارسنجی فرم
        if (!formData.message.trim()) {
            toast.warning('لطفاً متن پیام را وارد کنید');
            return;
        }

        if (formData.message.trim().length < 10) {
            toast.warning('پیام باید حداقل 10 کاراکتر باشد');
            return;
        }

        if (!formData.name.trim()) {
            toast.warning('لطفاً نام خود را وارد کنید');
            return;
        }

        if (formData.name.trim().length < 2) {
            toast.warning('نام باید حداقل 2 کاراکتر باشد');
            return;
        }

        if (!formData.email.trim()) {
            toast.warning('لطفاً ایمیل خود را وارد کنید');
            return;
        }

        // اعتبارسنجی ایمیل
        const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
        if (!emailRegex.test(formData.email)) {
            toast.warning('لطفاً ایمیل معتبر وارد کنید');
            return;
        }

        try {
            await submitContactMessage({
                name: formData.name,
                email: formData.email,
                message: formData.message,
                saveInfo: formData.saveInfo
            }).unwrap();

        } catch (error) {
            console.error('خطا در ارسال پیام:', error);
        }
    };

    return (
        <>
            <Header />
            <BreadCroumb />
            <div className="content">
                <div className="container-fluid">
                    <div className="content-box">
                        <div className="container-fluid">
                            <div className="mb-5 title-panel">
                                <h2>تماس با ما</h2>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <a href="tel:09211367465">
                                            <img 
                                                src="/images/contact-page-eleman-3.png" 
                                                alt="تماس تلفنی"
                                                className='img-fluid'
                                            />
                                        </a>
                                    </div>
                                    <div className="mb-3">
                                        <a href="https://t.me/Mehdi_madridista" target="_blank" rel="noopener noreferrer">
                                            <img 
                                                src="/images/contact-page-eleman-1.png" 
                                                alt="تلگرام"
                                                className='img-fluid'
                                            />
                                        </a>
                                    </div>
                                    <div className="mb-3">
                                        <a href="https://wa.me/09211367465" target="_blank" rel="noopener noreferrer">
                                            <img 
                                                src="/images/contact-page-eleman-2.png" 
                                                alt="واتساپ"
                                                className='img-fluid'
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <img src="/images/contact_us.svg" className='img-fluid' alt="تماس با ما" />
                                </div>

                                {/* Contact Form */}
                                <div className="comment-form w-100">
                                    <div className="title-panel mb-3">
                                        <h6 className="font-18">نظر خود را با ما در میان بگذارید</h6>
                                        {!isAuthenticated && (
                                            <p className="text-warning mt-2">
                                                <i className="bi bi-info-circle me-1"></i>
                                                برای ارسال پیام، ابتدا وارد حساب کاربری خود شوید
                                            </p>
                                        )}
                                        {isAuthenticated && (
                                            <p className="text-success mt-2">
                                                <i className="bi bi-check-circle me-1"></i>
                                                شما وارد حساب کاربری خود شده‌اید
                                            </p>
                                        )}
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group mb-2">
                                            <label htmlFor="message" className="form-label my-3">
                                                پیام شما <span className="text-danger ms-1">*</span>
                                            </label>
                                            <textarea 
                                                id="message" 
                                                name="message"
                                                rows="7" 
                                                className="form-control"
                                                placeholder="پیام خود را اینجا بنویسید... (حداقل 10 کاراکتر)"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                required 
                                                minLength={10}
                                            />
                                            <small className="text-muted">
                                                {formData.message.length}/10 کاراکتر حداقل
                                            </small>
                                        </div>
                                        <div className="form-group mb-2">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-inline w-100">
                                                        <label htmlFor="name" className="form-label my-3">
                                                            نام شما <span className="text-danger ms-1">*</span>
                                                        </label>
                                                        <input 
                                                            type="text" 
                                                            id="name" 
                                                            name="name"
                                                            className="form-control"
                                                            placeholder="نام شما" 
                                                            value={formData.name}
                                                            onChange={handleInputChange}
                                                            readOnly={isAuthenticated}
                                                            required 
                                                            minLength={2}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-inline w-100 mb-2">
                                                        <label htmlFor="email" className="form-label my-3">
                                                            ایمیل شما<span className="text-danger ms-1">*</span>
                                                        </label>
                                                        <input 
                                                            type="email" 
                                                            id="email" 
                                                            name="email"
                                                            className="form-control text-end"
                                                            placeholder="ایمیل شما" 
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                            readOnly={isAuthenticated}
                                                            required 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-check mb-2">
                                            <input 
                                                type="checkbox" 
                                                name="saveInfo" 
                                                id="saveInfo" 
                                                className={`${styles.form_check_input} form-check-input`}
                                                checked={formData.saveInfo}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="saveInfo" className={`${styles.form_check_label} text-muted`}>
                                                ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره پیامی می‌نویسم.
                                            </label>
                                        </div>
                                        <button 
                                            type="submit"
                                            disabled={loading || !isAuthenticated}
                                            className={`btn px-5 rounded-3 mt-3 ${isAuthenticated ? 'main-color-three-bg' : 'btn-secondary'}`}
                                            style={{ padding: "10px 100px !important" }}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    در حال ارسال...
                                                </>
                                            ) : !isAuthenticated ? (
                                                'ابتدا وارد شوید'
                                            ) : (
                                                'ثبت پیام'
                                            )}
                                        </button>
                                        
                                        {!isAuthenticated && (
                                            <div className="mt-3">
                                                <button 
                                                    type="button"
                                                    onClick={() => window.location.href = '/login-register'}
                                                    className="btn main-color-one-bg text-white px-4 rounded-3"
                                                >
                                                    <i className="bi-person-circle ms-2"></i>
                                                    ورود به حساب کاربری
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                </div>
                                {/* End Contact Form */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ContactUsPage;