import React from 'react'
import styles from './LatestBlogVideos.module.css';
import LatestVideosSidebar from './LatestVideosSidebar';
import BlogVideoCollection from './BlogVideoCollection';

const LatestBlogVideos = () => {
    return (
        <div className={styles.video_blog}>
            <div className="container-fluid">
                <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                    <div className={`${styles.title} d-flex align-items-center`}>
                        <img src="/images/square.png" alt="" className="img-fluid" />
                        <h5 className="font-16 ms-3">
                            <span className="main-color-one-color d-inline-block ms-1">آخرین ویدیوهای
                            </span>
                            وبلاگ</h5>
                    </div>
                    <div className="link">
                        <a href="" className="border-animate fromCenter pb-1 fw-bold">
                            مشاهده همه
                            <i className="bi bi-chevron-double-left main-color-one-color"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
            <div className="row gy-3">
                <div className="col-lg-3">
                    <LatestVideosSidebar />
                </div>
                <div className="col-lg-9">
                    <BlogVideoCollection />
                </div>
            </div>
            </div>
        </div>
    )
}

export default LatestBlogVideos