import React from 'react'
import styles from './OrderDetail.module.css';
import ProductList from './ProductList';

function OrderDetail() {
    return (
        <div className={styles.ui_boxs}>
            <div className={styles.ui_box}>
                <div className={`${styles.ui_box_item} ${styles.ui_box_white}`}>
                    <div className={styles.ui_box_item_title} style={{ padding: '15px' }}>
                        <h4 className="fw-bold">
                            جزئیات سفارش
                        </h4>
                    </div>
                    <div className={`p-0 ${styles.ui_box_item_desc}`}>
                        <div className={styles.orders}>
                            <div className={styles.order_item}>
                                <div className={styles.order_item_detail}>
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <span className="text-mute">کد پیگیری سفارش :</span>
                                            <strong>17745651</strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-mute">تاریخ ثبت سفارش :</span>
                                            <strong> 30 آبان 1403</strong>
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.order_item_detail} style={{ paddingTop: "20px" }}>
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <span className="text-mute">تحویل گیرنده :</span>
                                            <strong>نسیم سودبر</strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-mute">شماره موبایل :</span>
                                            <strong> 09165555555</strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-mute">آدرس :</span>
                                            <strong> کرج فردیس فاز یک انتهای خیابان بنفشه پلاک 0</strong>
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.order_item_detail} style={{ paddingTop: "20px" }}>
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <span className="text-mute">مبلغ :</span>
                                            <strong>25,000,000 تومان</strong>
                                        </li>
                                        <li className="nav-item">
                                            <strong> پرداخت اینترنتی</strong>
                                        </li>
                                        <li className="nav-item w-100">
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-mute">کد تخفیف :</span>
                                            <strong>2,000,000 تومان</strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-mute"> هزینه ارسال  (بر اساس وزن و حجم) :</span>
                                            <strong>2,000 تومان</strong>
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.order_item_detail} style={{ paddingTop: "20px" }}>
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <strong>مرسوله 1 از 1</strong>
                                        </li>
                                        <li className="nav-item">
                                            <strong className='text-danger'> ارسال عادی</strong>
                                        </li>
                                        <li className="nav-item w-100">
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-mute"> زمان تحویل :</span>
                                            <strong>سه شنبه 5 آذر 1403</strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-mute"> هزینه ارسال  :</span>
                                            <strong>2,000 تومان</strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-mute"> مبلغ مرسوله :</span>
                                            <strong>2,000 تومان</strong>
                                        </li>
                                    </ul>
                                    <div className={`py-3 ${styles.order_progress}`}>
                                        <h6 className="fw-bold mb-2 font-14">
                                            تحویل به مشتری
                                            <i className="bi bi-check"></i>
                                        </h6>
                                        <div className='progress' style={{height : "10px"}}>
                                            <div className={styles.progress_bar} style={{width : "100%"}}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.product_list_row} ${styles.product_list_row_lg}`}>
                                    <ProductList />
                                    <ProductList />
                                    <ProductList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default OrderDetail