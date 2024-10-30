import React from 'react'
import styles from './Footer.module.css'
function Footer() {
    return (
        <footer className={`${styles.footer}`}>
            <div className="container-fluid">
                <div className={`${styles.footer_socail}`}>
                    <div className="row gy-3">
                        <div className="col-lg-3">
                            <div className={`${styles.contact_item}`}>
                                <div className={`${styles.title}`}>
                                    <i className="bi bi-telephone-fill main-color-one-color"></i>
                                    <h4 className="font-16"><span className="main-color-one-color">شماره های </span>ارتباطی</h4>
                                </div>
                                <div className={`${styles.desc}`}>
                                    <a href="tel:+98933332233" className="text-muted">09211367465</a>
                                    <span className="m1-3">-</span>
                                    <a href="tel:+021666666" className="text-muted">021-666666</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className={`${styles.contact_item}`}>
                                <div className={`${styles.title}`}>
                                    <i className="bi bi-envelope-fill main-color-one-color"></i>
                                    <h4 className="font-16"><span className="main-color-one-color"> ایمیل های </span>ارتباطی</h4>
                                </div>
                                <div className={`${styles.desc}`}>
                                    <a href="mailto:info@gmail.com" className="text-muted">mahdi.leo2014@gmail.com</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className={`${styles.contact_item}`}>
                                <div className={`${styles.title}`}>
                                    <i className="bi bi-geo-alt-fill main-color-one-color"></i>
                                    <h4 className="font-16"><span className="main-color-one-color"> آدرس </span>شرکت</h4>
                                </div>
                                <div className={`${styles.desc}`}>
                                    <span className="text-muted">تهران - خیابان آزادی یه جایی همون حوالی</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className={`${styles.contact_item}`}>
                                <div className={`${styles.title}`}>
                                    <i className="bi bi-chevron-down main-color-one-color"></i>
                                    <h4 className="font-16"><span className="main-color-one-color"> فروشگاه </span>در رسانه ها</h4>
                                </div>
                                <div className={`${styles.desc}`}>
                                    <div className={`${styles.social}`}>
                                        <a href=""><i className="bi bi-instagram"></i></a>
                                        <a href=""><i className="bi bi-whatsapp"></i></a>
                                        <a href=""><i className="bi bi-telegram"></i></a>
                                        <a href=""><i className="bi bi-youtube"></i></a>
                                        <a href=""><i className="bi bi-twitter"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.footer_menu}`}>
                    <div className="row gy-3">
                        <div className="col-lg-3 col-6">
                            <div className={`${styles.footer_menu_title}`}>
                                <h4 className="font-16">لینک مفید</h4>
                                <ul className="navbar-nav">
                                    <li className="nav-item"><a href="#" className="nav-link">خرید آسان</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">خرید شارژ</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">بیت پی</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">موقعیت فروشگاه</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">رابط کاربری</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className={`${styles.footer_menu_title}`}>
                                <h4 className="font-16">دسترسی سریع</h4>
                                <ul className="navbar-nav">
                                    <li className="nav-item"><a href="#" className="nav-link">تماس با ما</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">سوالات متداول</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">انتقادات و پیشنهادات</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">قوانین و مقررات</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">حریم خصوصی</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className={`${styles.footer_menu_title}`}>
                                <h4 className="font-16">نسیم</h4>
                                <ul className="navbar-nav">
                                    <li className="nav-item"><a href="#" className="nav-link">اپلیکیشن</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">ارزهای جهانی</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">مستندات api</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">کسب درآمد</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">حریم خصوصی</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className={`${styles.footer_menu_title}`}>
                                <h4 className="font-16">خدمات ما</h4>
                                <ul className="navbar-nav">
                                    <li className="nav-item"><a href="#" className="nav-link">پنل فروشندگان</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">ضمانت بازگشت وجه</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">ارسال پیشتاز</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">مرجوعی راحت</a></li>
                                    <li className="nav-item"><a href="#" className="nav-link">پشتیبانی 24 ساعته</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.footer_text}`}>
                    <div className="row gy-3">
                        <div className="col-lg-9">
                            <div className={`${styles.footer_menu_text}`}>
                                <img src="/images/logo.png" className="img-fluid" alt="" />
                                <p className="text-justify mb-2">
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
                                    است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط
                                    فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای
                                    زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با
                                    نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو
                                    در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
                                    راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و
                                    جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                                </p>
                                <a href="" className={`main-color-one-color ${styles.footer_more_info}`}><i
                                    className="bi bi-arrow-left main-color-one-color me-1"></i>
                                    <span>
                                        اطلاعات بیشتر
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className={`${styles.footer_namad}`}>
                                <a href="">
                                    <img src="/images/enamad.png" alt="" className="img-thumbnail" />
                                </a>
                                <a href="">
                                    <img src="/images/rezi.png" alt="" className="img-thumbnail" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer