import React from 'react'
import styles from './Category.module.css'
import Link from 'next/link'
import CategoryItem from './CategoryItem'
function Category() {
    return (
        <div className="category py-20">
            <div className="container-fluid">
                <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                    <div className={`${styles.title} d-flex align-items-center`}>
                        <img src="/images/square.png" alt="" className="img-fluid" />
                        <h5 className="font-16">دسته بندی
                            <span
                                className="main-color-one-color d-inline-block "> محصولات
                            </span>
                        </h5>
                    </div>
                    <div className="link">
                        <Link href={"categories"} className="border-animate fromCenter pb-1 fw-bold d-flex align-items-center">
                            مشاهده همه
                            <i className="bi bi-chevron-double-left main-color-one-color"></i>
                        </Link>
                    </div>
                </div>
                <div className={`${styles.category_items}`}>
                    <div className="row gy-3 justify-content-center">
                        <CategoryItem title="تلفن همراه" src="/images/mobile.png" />
                        <CategoryItem title="کالای  دیجیتال" src="/images/digital-product.png" />
                        <CategoryItem title="گجت های گیمینگ" src="/images/speaker-gaming.png" />
                        <CategoryItem title="کنسول بازی" src="/images/console.png" />
                        <CategoryItem title="آنتی ویروس" src="/images/antivirus.png" />
                        <CategoryItem title="لپتاپ" src="/images/laptop.png" />
                        <CategoryItem title="لوازم جانبی" src="/images/janebi.png" />
                        <CategoryItem title="ساعت های هوشمند" src="/images/smartWatch.jpg" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category