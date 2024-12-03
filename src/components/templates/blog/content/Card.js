import React from 'react'
import styles from './Card.module.css';

const Card = () => {
    return (
        <div className={`${styles.swiper_slide}`}>
        <div className={`${styles.blog_item}`}>
            <a href="">
                <div className={`${styles.image}`}>
                    <img src="/images/blog-2.jpg" alt="" className="img-fluid" />
                </div>
                <div className={`${styles.title}`}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className={`${styles.title_item}`}>
                            <i className="bi bi-tag ms-1"></i>
                            <span className="font-12">آموزشی</span>
                        </div>
                        <div className={`${styles.title_item}`}>
                            <i className="bi bi-alarm ms-1"></i>
                            <span className="font-12">1 خرداد 1402</span>
                        </div>
                    </div>
                    <h4 className="font-16 text-overflow-1 h4"> ارز دیجیتال چیست و چگونه استخراج میشود؟
                    </h4>
                </div>
            </a>
        </div>
    </div>
    )
}

export default Card