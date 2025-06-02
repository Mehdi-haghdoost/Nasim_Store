import React from 'react'
import styles from './BlogNewsItem.module.css';
import Link from 'next/link';

const BlogNewsItem = ({ post }) => {
    // اگر پست موجود نباشد، چیزی نمایش نده
    if (!post) return null;

    return (
        <div className={`mt-4 ${styles.blog_news_item}`}>
            <Link href={`/blog-detail/${post.id}`}>
                <img 
                    src={post.image || "/images/blog-1.jpg"} 
                    alt={post.title || "blog"} 
                    className='img-fluid' 
                />
                <div className={styles.desc}>
                    <h3 className={styles.title}>{post.title}</h3>
                    <div className={styles.date}>
                        <span className="text-date">{post.date}</span>
                        <i className="bi bi-arrow-left"></i>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BlogNewsItem