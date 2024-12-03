import React from 'react'
import styles from './BlogVideoCollection.module.css';
import BlogVideoItem from './BlogVideoItem';



const BlogVideoCollection = () => {
    return (
        <div className={styles.side_left_blog}>
            <div className="row gy-3">
                <BlogVideoItem col="col-md-3" img="images/blog-6.jpg" />
                <BlogVideoItem col="col-md-6" img="images/blog-5.jpg"/>
                <BlogVideoItem col="col-md-3" img="images/blog-8.jpg"/>
                <BlogVideoItem col="col-md-4" img="images/blog-5.jpg"/>
                <BlogVideoItem col="col-md-4" img="images/blog-4.jpg"/>
                <BlogVideoItem col="col-md-4" img="images/blog-3.jpg"/>
            </div>
        </div>
    )
}

export default BlogVideoCollection