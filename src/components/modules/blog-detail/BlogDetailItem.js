import React from 'react'
import Link from 'next/link';
import styles from './BlogDetailItem.module.css';

const BlogDetailItem = () => {
    return (
        <li className="nav-item">
            <Link href={'/blog'} className="nav-link">
                <div className={styles.mini_blog_item}>
                    <div className={styles.image}>
                        <img src="/images/blog-6.jpg" className='img-fluid' alt="blog" />
                    </div>
                    <div className={`d-flex align-items-start justify-content-between flex-column flex-wrap ${styles.desc}`}>
                        <h5 className={styles.title}>آخرین پرچمداران گوشی شیائومی</h5>
                        <div className="d-flex align-items-center">
                            <p className="text-muted mb-0">11 آذر ماه 1403</p>
                            <div className="text-start me-2">
                                <i className="bi bi-arrow-left main-color-one-color"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default BlogDetailItem