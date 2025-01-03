import React from 'react'
import styles from '@/styles/contactUs.module.css';
import Header from '@/components/modules/header/Header';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Footer from '@/components/modules/footer/Footer';
function page() {
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
                                            <img src="/images/contact-page-eleman-3.png" alt="contactUs"
                                                className='img-fluid'
                                            />
                                        </a>
                                    </div>
                                    <div className="mb-3">
                                        <a href="https://t.me/Mehdi_madridista">
                                            <img src="/images/contact-page-eleman-1.png" alt="contactUs"
                                                className='img-fluid'
                                            />
                                        </a>
                                    </div>
                                    <div className="mb-3">
                                        <a href="https://wa.me/09211367465">
                                            <img src="/images/contact-page-eleman-2.png" alt="contactUs"
                                                className='img-fluid'
                                            />
                                        </a>
                                    </div>

                                </div>
                                <div className="col-lg-6">
                                    <img src="/images/contact_us.svg" className='img-fluid' alt="contact_us" />
                                </div>

                                {/* form */}
                                <div className="comment-form">
                                    <div className="title-panel mb-3">
                                        <h6 className="font-18">نظر خود را با ما در میان بگذارید</h6>
                                    </div>
                                    <form action="">
                                        <div className="form-group mb-2">
                                            <label for="commentbody" className="form-label my-3">دیدگاه شما <span
                                                className="text-danger ms-1">*</span></label>
                                            <textarea id="commentbody" rows="7" className="form-control"
                                                placeholder="دیدگاه شما" required></textarea>
                                        </div>
                                        <div className="form-group mb-2">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-inline w-100">
                                                        <label for="commentName" className="form-label my-3">نام شما
                                                            <span className="text-danger ms-1">*</span></label>
                                                        <input type="text" id="commentName" className="form-control"
                                                            placeholder="نام شما" required />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-inline w-100 mb-2">
                                                        <label for="commentEmail" className="form-label my-3">ایمیل
                                                            شما<span className="text-danger ms-1">*</span></label>
                                                        <input type="email" id="commentEmail" className="form-control text-end"
                                                            placeholder="ایمیل شما" required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-check mb-2">
                                            <input type="checkbox" name="" id="commentCheckBox" className={`${styles.form_check_input} form-check-input`}
                                                required />
                                            <label for="commentCheckBox" className={`${styles.form_check_label} text-muted`}>
                                                ذخیره
                                                نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
                                                می‌نویسم.
                                            </label>
                                        </div>
                                        <input type="submit" value="ثبت"
                                            className="btn main-color-three-bg px-5  rounded-3 mt-3" style={{ padding: "10px 100px !important" }} />
                                    </form>
                                </div>
                                {/* end form */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page