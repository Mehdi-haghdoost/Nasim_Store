import React from 'react';
import styles from './LatestBlogPosts.module.css';
import Cart from './Cart';
import Link from 'next/link';

const LatestBlogPosts = ({ posts = [] }) => {
    return (
        <div className={styles.grid_post_blog}>
            <div className="container-fluid">
                <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                    <div className={`${styles.title} d-flex align-items-center`}>
                        <img src="/images/square.png" alt="" className="img-fluid" />
                        <h5 className="font-16 ms-3">
                            <span className="main-color-one-color d-inline-block ms-1">آخرین مطالب
                            </span>
                            وبلاگ</h5>
                    </div>
                    <div className="link">
                        <Link href={'/CategoryBlogs'} className="border-animate fromCenter pb-1 fw-bold">
                            مشاهده همه
                            <i className="bi bi-chevron-double-left main-color-one-color"></i>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row gy-3">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Cart key={post.id} post={post} />
                        ))
                    ) : (
                        // نمایش کارت‌های خالی اگر پستی وجود نداشته باشد
                        Array(8).fill().map((_, index) => (
                            <Cart key={index} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default LatestBlogPosts;