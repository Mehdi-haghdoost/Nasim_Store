"use client";

import React, { useState, useEffect } from 'react';
import styles from '@/styles/CategoryBlogs.module.css';
import CategoryBlogsPosts from '@/components/templates/CategoryBlogs/content/CategoryBlogsPosts';

export default function CategoryBlogsPage({ category, serverPosts = [] }) {
    return (
        <>
            <div className="container-fluid">
                <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                    <div className={`${styles.title} d-flex align-items-center`}>
                        <img src="/images/square.png" alt="" className="img-fluid" />
                        <h5 className="font-16 ms-3">
                            دسته بندی
                            <span className="main-color-one-color d-inline-block ms-1">
                                {category}
                            </span>
                        </h5>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <CategoryBlogsPosts posts={serverPosts} />
            </div>
        </>
    );
}