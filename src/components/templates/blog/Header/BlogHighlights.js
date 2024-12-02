import React from 'react'
import styles from './BlogHighlights.module.css';
import Link from 'next/link';

const BlogHighlights = () => {
    return (
        <div className={styles.side_left_blog}>
            <div className="row gy-3">
                <div className="col-12">
                    <Link href={"/"}>
                        <img src="/images/banner-1.jpg" className='img-fluid shadow-box rounded-4' alt="" />
                    </Link>
                </div>
                <div className="col-md-3">
                    <div className={styles.blog_news_item}>
                        <Link href={'/'}>
                            <img src="/images/blog-1.jpg" className='img-fluid' alt="" />
                            <div className={styles.desc}>
                                <h3 className={styles.title}>انتخاب هارد اکسنترنال مناسب</h3>
                                <div className={styles.date}>
                                    <span className={styles.text_date}>12 آذر 1403</span>
                                    <i className="bi bi-arrow-left"></i>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-6">
                <div className={styles.blog_news_item}>
                        <Link href={'/'}>
                            <img src="/images/blog-2.jpg" className='img-fluid' alt="" />
                            <div className={styles.desc}>
                                <h3 className={styles.title}>بررسی سه پرچمدار شرکت شیائومی</h3>
                                <div className={styles.date}>
                                    <span className={styles.text_date}>12 آذر 1403</span>
                                    <i className="bi bi-arrow-left"></i>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className={styles.blog_news_item}>
                        <Link href={'/'}>
                            <img src="/images/blog-4.jpg" className='img-fluid' alt="" />
                            <div className={styles.desc}>
                                <h3 className={styles.title}>بررسی سه پرچمدار شرکت شیائومی</h3>
                                <div className={styles.date}>
                                    <span className={styles.text_date}>12 آذر 1403</span>
                                    <i className="bi bi-arrow-left"></i>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogHighlights