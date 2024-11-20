import React from 'react'
import styles from './ProductList.module.css';
import Link from 'next/link';

function ProductList() {
    return (
        <div className={styles.product_row}>
            <Link href={"/product"}>
                <div className={styles.product_row_desc}>
                    <div className={styles.product_row_desc_item}>
                        <div className={styles.product_row_img}>
                            <img src="/images/product/product-image1.jpg" alt="product_img" width="100" />
                        </div>
                        <div className={styles.product_row_title}>
                            <h6>
                                گوشی موبایل سامسونگ مدل Galaxy
                                A50 SM-A505F/DS دو سیم کارت
                                ظرفیت 128گیگابایت
                            </h6>
                            <div className={styles.product_price}>
                                <p>7,500,000  تومان</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            <div className={styles.order_item_comment}>
                <Link href={"/"}>
                    <i className='bi bi-chat-dots ms-2'></i>
                    ثبت دیدگاه
                </Link>
            </div>
        </div>
    )
}

export default ProductList