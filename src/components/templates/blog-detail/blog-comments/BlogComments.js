import React from 'react'
import styles from './BlogComments.module.css';
import BlogCommentItem from './BlogCommentItem';

const BlogComments = () => {
    return (
        <div className={styles.blog_comments}>
            <div className="container-fluid">
                <div className="content-box">
                    <div className="container-fluid">
                        <div className={styles.blog_comment}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="title-panel">
                                        <h6 className={`text-end ${styles.tab_title}`}>
                                            <span>1</span>
                                            <span>دیدگاه برای</span>
                                            <span>تلفن همراه شگفت انگیز glx که این روزا غوغا کرده در بازار</span>
                                        </h6>
                                    </div>
                                    <div className={styles.blog_comment_item}>
                                        <BlogCommentItem />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogComments