import React from 'react'
import styles from './Product.module.css';
import Link from 'next/link';

const Card = () => {
    return (
        <div className='product-list-row'>
            <div className={styles.product_row}>
                <div className={styles.product_row_desc}>
                    <Link href={"/"}>
                        <div className={styles.product_row_desc_item}>
                            <div className={styles.product_row_img}>
                                <img src="/images/product/product-image1.jpg" alt="product" width="100" />
                            </div>
                            <div className={styles.product_row_title}>
                                <h6>
                                    گوشی موبایل سامسونگ مدل Galaxy A50 SM-A505F/DS دو سیم کارت ظرفیت 128گیگابایت
                                </h6>
                                <div className={styles.product_price}>
                                    <p>
                                        7,500,000 تومان
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className={styles.product_row_icon}>
                        <a  className="btn btn-danger btn-sm ms-2" >
                            <i className="bi bi-trash text-white"></i>
                        </a>
                        <a href="" className="btn main-color-one-bg btn-sm">
                            <i className="bi bi-cart-plus text-white"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;