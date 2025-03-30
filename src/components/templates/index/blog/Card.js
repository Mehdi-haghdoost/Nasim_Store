
"use client";
import React from 'react';
import styles from './Card.module.css';
import Link from 'next/link';

const Card = ({ post }) => {
    // اگر داده پست وجود نداشته باشد، از داده پیش‌فرض استفاده می‌کنیم
    if (!post) {
        return (
            <div className={`${styles.swiper_slide}`}>
                <div className={`${styles.blog_item}`}>
                    <Link href="">
                        <div className={`${styles.image}`}>
                            <img src="/images/blog-3.jpg" alt="" className="img-fluid" />
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
                            <h4 className="font-16 text-overflow-1 "> ارز دیجیتال چیست و چگونه استخراج میشود؟
                            </h4>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }

    // اگر داده پست وجود داشته باشد، از آن استفاده می‌کنیم
    return (
        <div className={`${styles.swiper_slide}`}>
            <div className={`${styles.blog_item}`}>
                <Link href={`/blog-detail/${post.id}`}>
                    <div className={`${styles.image}`}>
                        <img src={post.image || "/images/blog-3.jpg"} alt={post.title} className="img-fluid" />
                    </div>
                    <div className={`${styles.title}`}>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className={`${styles.title_item}`}>
                                <i className="bi bi-tag ms-1"></i>
                                <span className="font-12">{post.category || "آموزشی"}</span>
                            </div>
                            <div className={`${styles.title_item}`}>
                                <i className="bi bi-alarm ms-1"></i>
                                <span className="font-12">{post.date || "1 خرداد 1402"}</span>
                            </div>
                        </div>
                        <h4 className="font-16 text-overflow-1 ">{post.title || "ارز دیجیتال چیست و چگونه استخراج میشود؟"}
                        </h4>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Card;