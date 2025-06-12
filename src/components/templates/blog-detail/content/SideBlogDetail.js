import React from 'react'
import styles from './SideBlogDetail.module.css';
import BlogDetailItem from '@/components/modules/blog-detail/BlogDetailItem';
import BlogNewsItem from './BlogNewsItem';
import { getAllPosts } from '@/lib/mdx';

const SideBlogDetail = ({ currentPostId }) => {
    // دریافت تمام پست‌ها
    const allPosts = getAllPosts();
    
    // فیلتر و محدود کردن آخرین پست‌ها (بدون پست فعلی)
    const latestPosts = allPosts
        .filter(post => post.id !== currentPostId)
        .slice(0, 6);

    // انتخاب اولین پست به عنوان داغ‌ترین
    const hottestPost = allPosts.find(post => post.id !== currentPostId);

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
                            <ul className="navbar nav flex-column flex-nowrap align-items-start">
                                {latestPosts.map((post) => (
                                    <BlogDetailItem 
                                        key={post.id}
                                        post={post}
                                    />
                                ))}
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
                        {hottestPost && (
                            <BlogNewsItem post={hottestPost} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBlogDetail