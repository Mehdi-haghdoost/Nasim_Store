import React from 'react'
import styles from './SideBlogDetail.module.css';
import BlogDetailItem from '@/components/modules/blog-detail/BlogDetailItem';
import BlogNewsItem from './BlogNewsItem';

const SideBlogDetail = () => {
    return (
        <div className={`${styles.side_blog_detail} position-sticky top-0`}>
            <div className={styles.latest_post}>
                <div className="content-box">
                    <div className="container-fluid">
                        <div className="title-panel mb-2">
                            <h6 className={styles.title}>
                                آخرین مطالب وبلاگ
                            </h6>
                        </div>
                        <nav className="navbar">
                            <ul className="navbar nav flex-column flex-nowrap">
                                <BlogDetailItem />
                                <BlogDetailItem />
                                <BlogDetailItem />
                                <BlogDetailItem />
                                <BlogDetailItem />
                                <BlogDetailItem />
                                <BlogDetailItem />
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className={`${styles.suggest_blogPost} mt-3`}>
                <div className='content-box'>
                    <div className="container-fluid">
                        <div className="title-panel mb-2">
                            <h6>داغ ترین مطلب امروز</h6>
                        </div>
                        <BlogNewsItem />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBlogDetail