import React from 'react'
import styles from './AmazingCard.module.css'
function AmazingCard() {
  return (
    <div className={`swiper_slide`}>
    <div className={`${styles.slider_item} rounded-3 shadow-box bg-white`}>
        <div className="row">
            <div className="col-lg-4">
                <div className="image">
                    <img src="/images/product/laptop-1.jpg" loading="lazy"
                        className="img-fluid" alt="" />
                </div>
            </div>
            <div className="col-lg-8">
                <div className="timer">
                    <div className='countdown' data-date="2025-01-01" data-time="18:30">
                    </div>
                </div>
                <div className="desc mt-3">
                    <div className={`${styles.title}`}>
                        <div className="d-flex align-items-center flex-wrap">
                            <h3 className="text-overflow-1 font-18 ms-2">لپ تاپ 14.2
                                اینچی اپل مدل 2021 MacBook MKGR3 M1 Pro</h3>
                            <span className={`discount ${styles.danger_label} mt-sm-0 mt-3`}>17%
                                تخفیف</span>
                        </div>
                    </div>
                    <div className={`${styles.short_desc} mt-3`}>
                        <p className="mb-2 text-overflow-3 text-muted">
                            برخی از شرکت‌های فعال در زمینه گوشی‌های هوشمند، تا به
                            امروز توانسته‌اند گوشی‌های هوشمند انعطاف‌پذیر یا همان
                            تاشو را روانه بازار کنند. یکی از این شرکت‌های موفق،
                            هوآوی است که P50 Pocket Premium Edition به عنوان یکی از
                            جدید‌ترین گوشی‌ خاص این شرکت با صفحه‌نمایشی تاشو معرفی
                            شده است. در نمای رو‌به‌رویی این گوشی به صفحه‌نمایش 6.9
                            اینچی تاشو مجهز شده است و حتی در حالت تاشو هم هوآوی
                            صفحه‌نمایش ثانویه با ابعاد 1.04 اینچی را برای این گوشی
                            هوشمند در نظر گرفته است
                        </p>
                    </div>
                </div>
                <div className={`${styles.meta}`}>
                    <ul className="navbar-nav flex-lg-row justify-content-between">
                        <li className="nav-item"><span
                            className="nav-link text-overflow-1 font-14 fw-bold">
                            صفحه نمایش 27 اینج </span></li>
                        <li className="nav-item"><span
                            className="nav-link text-overflow-1 font-14 fw-bold">حافظه
                            داخلی یک ترابایت</span></li>
                        <li className="nav-item"><span
                            className="nav-link text-overflow-1 font-14 fw-bold">مخصوص
                            بازی</span></li>
                        <li className="nav-item"><span
                            className="nav-link text-overflow-1 font-14 fw-bold">پردازنده
                            گرافیکی nvidia</span></li>
                    </ul>
                </div>
                <div
                    className="foot mt-3 d-flex justify-content-between align-items-center flex-wrap">
                    <div className="price d-flex align-items-center">
                        <h6 className="font-25 main-color-one-color">958,000</h6>
                        <h6 className="font-12 ms-1">هزار تومان</h6>
                        <h6 className={`font-13 ${styles.old_price} me-2`}>1,500,000</h6>
                    </div>
                    <div className="link">
                        <a href="" className="btn border-0 rounded-3 main-color-one-bg">
                            <i className="bi bi-basket text-white"></i>
                            <span className="text-white">خرید محصول</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default AmazingCard