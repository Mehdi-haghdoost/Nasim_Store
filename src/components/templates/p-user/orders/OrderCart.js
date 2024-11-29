import React from 'react'
import styles from './OrderCart.module.css';
import Link from 'next/link';

function OrderCart({ order }) {
    return (
        <div className={styles.order_item}>
            <a href="">
                <div className={styles.order_item_status}>
                    <div className={styles.order_item_status_item}>
                        <p>
                            <i className='bi bi-bag-check-fill'></i>
                            <span>تحویل شده</span>
                        </p>
                    </div>
                    <div className={styles.order_item_status_item}>
                        <p>
                            <i className='bi bi-arrow-left pointer text-dark'></i>
                        </p>
                    </div>
                </div>
                <div className={styles.order_item_detail}>
                    <ul className="nav">
                        <li className="nav-item text-muted">2  آذر 1403</li>
                        <li className="nav-item">
                            <span className="text-mute">کد سفارش</span>
                            <strong>17745651</strong>
                        </li>
                        <li className="nav-item">
                            <span className="text-mute">مبلغ</span>
                            <strong>{order.totalPrice} تومان</strong>
                        </li>
                    </ul>
                </div>
                <div className={styles.order_item_product_list}>
                    <div className={styles.order_item_product_list_item}>
                        <img src="/images/product/product-image1.jpg" className='img-thumbnail' width="70" height="70" alt="" />
                    </div>
                    <div>
                        <Link
                            className='font-14'
                            href={`/product/${order.id}`}>
                            {order.name}
                        </Link>
                    </div>
                    {/* <div className={styles.order_item_product_list_item}>
                        <img src="/images/product/product-image2.jpg" className='img-thumbnail' width="70" height="70" alt="" />
                    </div>
                    <div className={styles.order_item_product_list_item}>
                        <img src="/images/product/product-image3.jpg" className='img-thumbnail' width="70" height="70" alt="" />
                    </div>
                    <div className={styles.order_item_product_list_item}>
                        <img src="/images/product/product-image4.jpg" className='img-thumbnail' width="70" height="70" alt="" />
                    </div>
                    <div className={styles.order_item_product_list_item}>
                        <img src="/images/product/product-image5.jpg" className='img-thumbnail' width="70" height="70" alt="" />
                    </div>
                    <div className={styles.order_item_product_list_item}>
                        <img src="/images/product/product-image6.jpg" className='img-thumbnail' width="70" height="70" alt="" />
                    </div> */}
                </div>
                <div className={styles.order_item_show}>
                    <p>
                        <i className="bi bi-card-list"></i>
                        <Link href={`/p-user/orders/${order.id}/invoice`}>
                            مشاهده فاکتور
                        </Link>
                    </p>
                </div>
            </a>
        </div>
    )
}

export default OrderCart