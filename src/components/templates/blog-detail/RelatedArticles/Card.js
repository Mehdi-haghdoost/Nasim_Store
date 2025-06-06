import React from 'react'
import Link from 'next/link';
import styles from './Card.module.css';

const Card = ({ post }) => {
  // اگر post نداشتیم، کارت پیش‌فرض نمایش بده
  if (!post) {
    return (
      <div className={`${styles.swiper_slide}`}>
        <div className={`${styles.blog_item}`}>
          <Link href="/blog">
            <div className={`${styles.image}`}>
              <img src="/images/blog-2.jpg" alt="پست پیش‌فرض" className="img-fluid" />
            </div>
            <div className={`${styles.title}`}>
              <div className="d-flex align-items-center justify-content-between">
                <div className={`${styles.title_item}`}>
                  <i className="bi bi-tag ms-1"></i>
                  <span className="font-12">آموزشی</span>
                </div>
                <div className={`${styles.title_item}`}>
                  <i className="bi bi-alarm ms-1"></i>
                  <span className="font-12">1 خرداد 1402</span>
                </div>
              </div>
              <h4 className="font-16 text-overflow-1 h4">
                ارز دیجیتال چیست و چگونه استخراج میشود؟
              </h4>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  // اگر post داشتیم، از اطلاعات آن استفاده کن
  return (
    <div className={`${styles.swiper_slide}`}>
      <div className={`${styles.blog_item}`}>
        <Link href={`/blog-detail/${post.id}`}>
          <div className={`${styles.image}`}>
            <img 
              src={post.image || post.featuredImage || "/images/blog-2.jpg"} 
              alt={post.title || "تصویر پست"} 
              className="img-fluid" 
            />
          </div>
          <div className={`${styles.title}`}>
            <div className="d-flex align-items-center justify-content-between">
              <div className={`${styles.title_item}`}>
                <i className="bi bi-tag ms-1"></i>
                <span className="font-12">
                  {post.category || "عمومی"}
                </span>
              </div>
              <div className={`${styles.title_item}`}>
                <i className="bi bi-alarm ms-1"></i>
                <span className="font-12">
                  {post.date || post.createdAt || "تاریخ نامشخص"}
                </span>
              </div>
            </div>
            <h4 className="font-16 text-overflow-1 h4">
              {post.title || "عنوان پست"}
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Card