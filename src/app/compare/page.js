import React from 'react'
import styles from '@/styles/compare.module.css';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Footer from '@/components/modules/footer/Footer';
import Header from '@/components/modules/header/Header';
import Link from 'next/link';



const page = () => {
    return (
        <>
            <Header />
            <BreadCroumb />
            <div className="content">
                <div className="container-fluid">
                    <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                        <div className={`d-flex align-items-center ${styles.title}`}>
                            <img src="/images/square.png" alt="square" className="img-fluid" />
                            <h5 className="font-16 me-3">
                                مقایسه
                                <span className='main-color-one-color d-inline-block me-1'>
                                    محصول
                                </span>
                            </h5>
                        </div>
                    </div>
                    <div className="content-box">
                        <div className="container-fluid">
                            <div className={styles.compare}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="table-responsive">
                                            <table className={`table table-bordered fixed ${styles.compare_table}`}>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <div className={styles.compare_add}>
                                                                <div className={styles.compare_add_product}>
                                                                    <div className={styles.cap_icon}>
                                                                        <i className="bi bi-box-arrow-down"></i>
                                                                    </div>
                                                                    <div className={styles.cap_title}>
                                                                        <p className="text-muted">برای افزودن محصول کلیک کنید</p>
                                                                    </div>
                                                                    <div className={styles.cap_btn}>
                                                                        <button className="btn border-0 main-color-one-bg">افزودن کالا به مقایسه</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </th>
                                                        <th>
                                                            <div className={`${styles.product_box} ${styles.compare_product_box}`}>
                                                                <div className={styles.product_timer}>
                                                                    <div className={styles.timer_label}>
                                                                        <span>تخفیف 40%</span>
                                                                    </div>
                                                                    <div className={styles.product_header_btn}>
                                                                        <a href="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="مقایسه">
                                                                            <i className="bi bi-shuffle"></i>
                                                                        </a>
                                                                        <a href="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="مقایسه">
                                                                            <i className="bi bi-heart"></i>
                                                                        </a>
                                                                        <a href="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="مقایسه">
                                                                            <i className="bi bi-eye"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <Link href={'/product/53535353'}>
                                                                    <div className={styles.product_image}>
                                                                        <img src="/images/product/watch2.jpg" alt="" className="img-fluid" />
                                                                    </div>
                                                                </Link>
                                                                <div className={styles.product_title}>
                                                                    <div className={styles.title}>
                                                                        <p className="text-overflow-1">ساعت هوشمند شیائومی</p>
                                                                        <span className='text-muted text-overflow-1'>Mibro Lite XPAW004 Smartwatch</span>
                                                                    </div>
                                                                    <div className={styles.rating}>
                                                                        <div className={styles.number}>
                                                                            <span className='text-muted font-12'>(15+) 4.8</span>
                                                                        </div>
                                                                        <div className={styles.icon}>
                                                                            <i className="bi bi-star-fill"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={styles.compare_box}>
                                                                <div className={styles.compare_delete}>
                                                                    <a type='button' >
                                                                        <i className='bi bi-x-circle-fill'></i>
                                                                    </a>
                                                                </div>
                                                            </div>

                                                        </th>
                                                        <th>
                                                            <div className={`${styles.product_box} ${styles.compare_product_box}`}>
                                                                <div className={styles.product_timer}>
                                                                    <div className={styles.timer_label}>
                                                                        <span>تخفیف 40%</span>
                                                                    </div>
                                                                    <div className={styles.product_header_btn}>
                                                                        <a href="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="مقایسه">
                                                                            <i className="bi bi-shuffle"></i>
                                                                        </a>
                                                                        <a href="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="مقایسه">
                                                                            <i className="bi bi-heart"></i>
                                                                        </a>
                                                                        <a href="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="مقایسه">
                                                                            <i className="bi bi-eye"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <Link href={'/product/53535353'}>
                                                                    <div className={styles.product_image}>
                                                                        <img src="/images/product/watch2.jpg" alt="" className="img-fluid" />
                                                                    </div>
                                                                </Link>
                                                                <div className={styles.product_title}>
                                                                    <div className={styles.title}>
                                                                        <p className="text-overflow-1">ساعت هوشمند شیائومی</p>
                                                                        <span className='text-muted text-overflow-1'>Mibro Lite XPAW004 Smartwatch</span>
                                                                    </div>
                                                                    <div className={styles.rating}>
                                                                        <div className={styles.number}>
                                                                            <span className='text-muted font-12'>(15+) 4.8</span>
                                                                        </div>
                                                                        <div className={styles.icon}>
                                                                            <i className="bi bi-star-fill"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={styles.compare_box}>
                                                                <div className={styles.compare_delete}>
                                                                    <a type='button' >
                                                                        <i className='bi bi-x-circle-fill'></i>
                                                                    </a>
                                                                </div>
                                                            </div>

                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td colSpan="5" className={styles.td_head}>
                                                            <i className="bi bi-chevron-double-left"></i>
                                                            <span>قیمت</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="5" className={styles.td_head}>
                                                            <i className="bi bi-chevron-double-left"></i>
                                                            <span>پردازنده</span>
                                                        </td>
                                                    </tr>
                                                    <tr >
                                                        <td className='text-end pe-5'>
                                                            مدل پردازنده گرافیکی
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            GeForce GTX 950M GDDR5
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            GeForce GTX 950M GDDR5
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="5" className={styles.td_head}>
                                                            <i className="bi bi-chevron-double-left"></i>
                                                            <span>صفحه نمایش</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-end pe-5'>
                                                            ابعاد
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            129.5×99.1×137.2 ميلي متر
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            129.5×99.1×137.2 ميلي متر
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-end pe-5'>
                                                            نوع صفحه نمایش
                                                        </td><td className='text-end pe-5'>
                                                            Lcd
                                                        </td><td className='text-end pe-5'>
                                                            Oled
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-end pe-5'>
                                                            رزولوشن
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            1334 × 750 | Retina
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            1334 × 750 | Retina
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="5" className={styles.td_head}>
                                                            <i className="bi bi-chevron-double-left"></i>
                                                            <span>ارتباطات</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-end pe-5'>
                                                            شبکه هاي ارتباطي
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            2G، 3G، 4G
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            2G، 3G، 4G
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-end pe-5'>
                                                            تعداد سیم کارت
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            تک سيم کارت
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            تک سيم کارت
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="5" className={styles.td_head}>
                                                            <i className="bi bi-chevron-double-left"></i>
                                                            <span>پردازنده</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-end pe-5'>
                                                            مدل پردازنده گرافیکی
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            GeForce GTX 950M GDDR5
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            GeForce GTX 950M GDDR5
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className={styles.td_head}>
                                                            <i className="bi bi-chevron-double-left"></i>
                                                            <span>سیستم عامل</span>
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            بدون سیستم عامل
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            بدون سیستم عامل
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className={styles.td_head}>
                                                            <i className="bi bi-chevron-double-left"></i>
                                                            <span>حافظه Cache</span>
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            4 مگابایت
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            12 مگابایت
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className={styles.td_head}>
                                                            <i className="bi bi-chevron-double-left"></i>
                                                            <span> ظرفیت حافظه RAM</span>
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            4 گیگ
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            12 گیگ
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className={styles.td_head}>
                                                            <i className="bi bi-chevron-double-left"></i>
                                                            <span> قابلیت‌های دستگاه</span>
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            صفحه نمایش مات وبکم
                                                        </td>
                                                        <td className='text-end pe-5'>
                                                            صفحه نمایش مات حسگر اثر انگشت کیبورد با نور پس زمینه وبکم
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page;