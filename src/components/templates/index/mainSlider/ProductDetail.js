import React from 'react'
import styles from './ProductDetail.module.css'
function ProductDetail() {
    return (
        <>
            <div className={`${styles.product_title}`}>
                <div className={`${styles.title}`}>
                    <p className="text-overflow-1">ساعت هوشمند شیائومی</p>
                    <span className="text-muted text-overflow-1">Mibro Lite XPAW004
                        Smartwatch</span>
                </div>
                <div className={`${styles.rating}`}>
                    <div className={`${styles.number}`}><span className="text-muted font-12">(15+) 4.8</span></div>
                    <div className={`${styles.icon}`}><i className="bi bi-star-fill"></i></div>
                </div>
            </div>
            <div className={`${styles.product_action}`}>
                <div className={`${styles.price}`}>
                    <p className={`${styles.new_price}`}>3,175,000 تومان</p>
                    <p className={`${styles.old_price}`}>6,500,000 تومان</p>
                </div>
                <div className="link">
                    <a href="" className="btn border-0 rounded-3 main-color-one-bg">
                        <i className="bi bi-basket text-white"></i>
                        <span className="text-white">خرید محصول</span>
                    </a>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;