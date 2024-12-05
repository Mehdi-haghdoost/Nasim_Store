import Link from 'next/link'
import React from 'react'
import styles from './BlogItem.module.css';

const BlogItem = () => {
  return (
    <li className="nav-item">
    <Link href={"/blog"} className='nav-link'>
        <div className={styles.video_blog_item}>
            <div className={styles.image}>
                <img src="/images/blog-6.jpg" className='img-fluid' alt="" />
            </div>
            <div className={`d-flex align-items-start flex-wrap flex-column justify-content-between ${styles.desc}`}>
                <h5 className={styles.title}>آخرین پرچمداران گوشی شیائومی</h5>
                <div className="d-flex align-items-center">
                    <p className="text-muted mb-0">13 آذر ماه 1403</p>
                    <div className="text-end me-2">
                        <i className="bi bi-arrow-left main-color-one-color"></i>
                    </div>
                </div>
            </div>
        </div>
    </Link>
</li>
  )
}

export default BlogItem