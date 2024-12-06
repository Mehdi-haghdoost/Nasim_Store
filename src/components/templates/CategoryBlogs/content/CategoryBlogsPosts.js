import React from 'react'
import styles from './CategoryBlogsPosts.module.css';
import CategoryBlogsItem from './CategoryBlogsItem';

const CategoryBlogsPosts = () => {
    return (
        <div className='row gy-3'>
            <CategoryBlogsItem />
            <CategoryBlogsItem />
            <CategoryBlogsItem />
            <CategoryBlogsItem />
            <CategoryBlogsItem />
            <CategoryBlogsItem />
            <CategoryBlogsItem />
            <CategoryBlogsItem />
        </div>


    )
}

export default CategoryBlogsPosts