import React from 'react'
import styles from './LastOrders.module.css';
import OrderCart from './OrderCart';

function LastOrders() {
    return (
        <div className={styles.ui_boxs}>
            <div className={styles.ui_box}>
                <div className={`${styles.ui_box_item} ${styles.ui_box_white}`}>
                    <div className={styles.ui_box_item_title} style={{ padding: "15px" }}>
                        <h4>
                            آخرین سفارش ها
                        </h4>
                    </div>
                    <div className={`${styles.ui_box_item_desc} p-0`}>
                        <div className={styles.orders}>
                            <OrderCart />
                            <OrderCart />
                            <OrderCart />
                            <OrderCart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastOrders