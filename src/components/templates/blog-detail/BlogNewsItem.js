import React from 'react'
import styles from './BlogNewsItem.module.css';
import Link from 'next/link';

const BlogNewsItem = () => {
  return (
   <div className={`mt-4 ${styles.blog_news_item}`}>
        <Link href={"/blog"}>
            <img src="/images/blog-1.jpg" alt="blog" className='img-fluid' />
            <div className={styles.desc}>
                <h3 className={styles.title}>انتخاب هارد اکسترنال مناسب</h3>
                <div className={styles.date}>
                    <span className="text-date">22 آذر 1403</span>
                    <i className="bi bi-arrow-left"></i>
                </div>
            </div>
        </Link>
   </div>
  )
}

export default BlogNewsItem