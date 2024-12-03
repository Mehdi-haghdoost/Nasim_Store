import React from 'react'
import styles from './LatestVideosSidebar.module.css';
import Link from 'next/link';
import BlogItem from './BlogItem';


const LatestVideosSidebar = () => {
    return (
        <div className="content-box">
            <div className="container-fluid">
                <div className={styles.side_right_blog}>
                    <div className={styles.navbar_video}>
                        <nav className="navbar">
                            <ul className="navbar-nav">
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                                <BlogItem />
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LatestVideosSidebar