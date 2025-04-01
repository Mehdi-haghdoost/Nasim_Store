"use client";

import React from 'react';
import styles from './CategoryBlogsPosts.module.css';
import CategoryBlogsItem from './CategoryBlogsItem';

const CategoryBlogsPosts = ({ posts = [] }) => {
    return (
        <div className='row gy-3'>
            {posts.length > 0 ? (
                // اگر پست وجود داشته باشد، آنها را نمایش می‌دهیم
                posts.map((post) => (
                    <CategoryBlogsItem key={post.id} post={post} />
                ))
            ) : (
                // اگر پستی وجود نداشته باشد، پست‌های نمونه نمایش داده می‌شوند
                Array(8).fill().map((_, index) => (
                    <CategoryBlogsItem key={index} />
                ))
            )}
        </div>
    );
};

export default CategoryBlogsPosts;