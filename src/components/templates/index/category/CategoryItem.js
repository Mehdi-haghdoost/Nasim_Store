import React from 'react'
import Link from 'next/link'
import styles from './CategoryItem.module.css';

const CategoryItem = ({ categoryId, title, src, icon }) => {
    return (
        <div className="col-lg-3 col-sm-6 col-12">
            <div className={`${styles.category_item} p-3 rounded-3 bg-white shadow-box`}>
                {/* تبدیل button به Link برای انتقال به صفحه categories */}
                <Link href={`/categories?categoryId=${categoryId}`} className="text-decoration-none">
                    <div className="d-flex align-items-center justify-content-md-flex-start justify-content-between cursor-pointer">
                        <div className={`${styles.image}`}>
                            <img 
                                src={src} 
                                alt={title} 
                                className="img-fluid" 
                                onError={(e) => {
                                    // در صورت خطا در بارگذاری تصویر، تصویر پیش‌فرض نمایش بده
                                    e.target.src = '/images/default-category.png';
                                }}
                            />
                        </div>
                        <div className="text ms-3">
                            <p className="text-center font-14 text-overflow-1 text-dark mb-2">{title}</p>
                            {/* نمایش آیکون Bootstrap اگر وجود داشت */}
                            {icon && (
                                <div className="text-center mb-2">
                                    <i className={`bi bi-${icon} main-color-one-color font-20`}></i>
                                </div>
                            )}
                            <div className="text-center">
                                <span className={`btn text-muted-two btn-sm font-14 px-3 ${styles.light_btn} shadow-sm`}>
                                    <span>مشاهده</span>
                                    <i className="bi bi-chevron-double-left font-16 main-color-one-color ms-2"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default CategoryItem