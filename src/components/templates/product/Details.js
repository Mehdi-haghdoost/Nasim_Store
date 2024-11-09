import React from 'react'
import styles from './details.module.css'

import ProductDetail from './ProductDetail';
import Gallery from '../product/product-images-slider/ImageSlider';

function Details() {
    return (
        <div className="product-meta py-20">
            <div className="container-fluid">
                <div className="content-box">
                    <div className="container-fluid">
                        <div className="row gy-3">
                            <div className="col-lg-4">
                                <div className={styles.pro_gallery}>
                                    <div className={styles.icon_product_box}>
                                        <div className={styles.icon_product_box_item} data-bs-toggle="modal" data-bs-target="#shareModal" data-bs-placement="right" aria-label="اشتراک گذاری" data-bs-original-title="اشتراک گذاری">
                                            <i className="bi bi-share"></i>
                                        </div>
                                        <div className={styles.icon_product_box_item} data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="افزودن به علاقه مندی">
                                            <i className="bi bi-heart"></i>
                                        </div>
                                        <div className={styles.icon_product_box_item} data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="مقایسه محصول">
                                            <i className="bi bi-arrow-left-right"></i>
                                        </div>
                                        <div className={styles.icon_product_box_item} data-bs-toggle="modal" data-bs-target="#chartModal" data-toggle="tooltip" data-bs-placement="right" aria-label="نمودار تغییر قیمت" data-bs-original-title="نمودار تغییر قیمت">
                                            <i className="bi bi-bar-chart"></i>
                                        </div>
                                    </div>
                                    <Gallery />
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <ProductDetail />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Details;
