import React from 'react';
import styles from './CategoryBlogsItem.module.css';
import Link from 'next/link';

const CategoryBlogsItem = ({ post }) => {
    // اگر پست وجود نداشته باشد، داده‌های پیش‌فرض نمایش داده می‌شوند
    if (!post) {
        return (
            <div className="col-md-3">
                <div className={styles.blog_item}>
                    <Link href={`/blog-detail/${post?.id}`}>
                        <div className={styles.image}>
                            <img src="/images/blog-1.jpg" className='img-fluid' alt="blogimage" />
                        </div>
                        <div className={styles.title}>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className={styles.title_item}>
                                    <i className="bi bi-tag ms-1"></i>
                                    <span className='font-12'>آموزشی</span>
                                </div>
                                <div className={styles.title_item}>
                                    <i className="bi bi-alarm ms-1"></i>
                                    <span className='font-12'>16 آذر 1403</span>
                                </div>
                            </div>
                            <h4 className="font-16 text-overflow-1 h4">
                                ارز دیجیتال چیست و چگونه استخراج میشود؟
                            </h4>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }

    // اگر پست وجود داشته باشد، داده‌های آن نمایش داده می‌شوند
    return (
        <div className="col-md-3">
            <div className={styles.blog_item}>
                <Link href={`/blog-detail/${post.id}`}>
                    <div className={styles.image}>
                        <img 
                            src={post.image || "/images/blog-1.jpg"} 
                            className='img-fluid' 
                            alt={post.title || "blogimage"} 
                        />
                    </div>
                    <div className={styles.title}>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className={styles.title_item}>
                                <i className="bi bi-tag ms-1"></i>
                                <span className='font-12'>{post.category || "آموزشی"}</span>
                            </div>
                            <div className={styles.title_item}>
                                <i className="bi bi-alarm ms-1"></i>
                                <span className='font-12'>{post.date || "16 آذر 1403"}</span>
                            </div>
                        </div>
                        <h4 className="font-16 text-overflow-1 h4">
                            {post.title || "ارز دیجیتال چیست و چگونه استخراج میشود؟"}
                        </h4>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default CategoryBlogsItem;