"use client";
import React, { useState, useEffect } from 'react';
import styles from './BlogDetail.module.css';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

const BlogDetail = ({ postData }) => {
    const [mdxSource, setMdxSource] = useState(null);
  
    useEffect(() => {
        const loadMDX = async () => {
            if (postData && postData.content) {
                const mdxSource = await serialize(postData.content);
                setMdxSource(mdxSource);
            }
        };
        
        loadMDX();
    }, [postData]);

    // اگر داده‌ای دریافت نشده، محتوای پیش‌فرض نمایش داده می‌شود
    if (!postData) {
        return (
            <div className='content-box'>
                <div className="container-fluid">
                    <div className={styles.blog_detail}>
                        <div className="title-panel mb-2">
                            <h1 className='font-18'>
                                عنوان مطلب وبلاگ
                            </h1>
                        </div>
                        <div className={styles.blog_post_title_items}>
                            <div className={styles.blog_post_title_item}>
                                <img src="/images/user.png" className='rounded-circle' alt="user" />
                                <p className="text-muted">مدیر</p>
                            </div>
                            <div className={styles.blog_post_title_item}>
                                <i className="bi bi-stopwatch"></i>
                                <p className="text-muted">11 آذر 1403</p>
                            </div>
                            <div className={styles.blog_post_title_item}>
                                <i className='bi bi-chat-dots'></i>
                                <p>2</p>
                            </div>
                            <div className={styles.blog_post_title_item}>
                                <i className="bi bi-eye-fill"></i>
                                <p className="text-muted"> 5 دقیقه مطالعه</p>
                            </div>
                        </div>
                        <div className={styles.blog_post_content}>
                            <p>در حال بارگذاری محتوا...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='content-box'>
            <div className="container-fluid">
                <div className={styles.blog_detail}>
                    <div className="title-panel mb-2">
                        <h1 className='font-18'>
                            {postData.title}
                        </h1>
                    </div>
                    <div className={styles.blog_post_title_items}>
                        <div className={styles.blog_post_title_item}>
                            <img src="/images/user.png" className='rounded-circle' alt="user" />
                            <p className="text-muted">مدیر</p>
                        </div>
                        <div className={styles.blog_post_title_item}>
                            <i className="bi bi-stopwatch"></i>
                            <p className="text-muted">{postData.date}</p>
                        </div>
                        <div className={styles.blog_post_title_item}>
                            <i className='bi bi-chat-dots'></i>
                            <p>0</p>
                        </div>
                        <div className={styles.blog_post_title_item}>
                            <i className="bi bi-eye-fill"></i>
                            <p className="text-muted"> 5 دقیقه مطالعه</p>
                        </div>
                    </div>
                    <div className={styles.blog_post_content}>
                        {postData.image && (
                            <figure className={styles.image_center}>
                                <img src={postData.image} className='img-fluid' alt={postData.title} />
                            </figure>
                        )}
                        
                        {mdxSource ? (
                            <MDXRemote {...mdxSource} />
                        ) : (
                            <p>{postData.description}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;