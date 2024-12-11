import React from 'react'
import sstyles from './BlogContent.module.css';
import BlogDetail from './BlogDetail';
import SideBlogDetail from './SideBlogDetail';


const BlogContent = () => {
    return (
        <div className='content'>
            <div className="container-fluid">
                <div className="row gy-3">
                    <div className="col-lg-9">
                        <BlogDetail />
                    </div>
                    <div className="col-lg-3">
                        <SideBlogDetail />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogContent