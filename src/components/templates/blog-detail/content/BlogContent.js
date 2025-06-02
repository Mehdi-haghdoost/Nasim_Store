import React from 'react';
import styles from './BlogContent.module.css';
import BlogDetail from './BlogDetail';
import SideBlogDetail from './SideBlogDetail';

const BlogContent = ({ postData }) => {
  return (
    <div className='content'>
      <div className="container-fluid">
        <div className="row gy-3">
          <div className="col-lg-9">
            <BlogDetail postData={postData} />
          </div>
          <div className="col-lg-3">
            {/* ارسال ID پست فعلی برای حذف از sidebar */}
            <SideBlogDetail currentPostId={postData.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;