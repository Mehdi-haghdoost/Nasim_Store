import React from 'react'
import styles from './MultiSeller.module.css'
function MultiSeller() {
    return (
        <div className={styles.muuli_seller}>
            <div className='container-fluid'>
                <div className='content-box'>
                    <div className='container-fluid'>
                        <div className={styles.title_panel}>
                            <h6 className='font-16'>
                                سایر فروشندگان موجود
                            </h6>
                        </div>
                        <div className={`p-0 ${styles.responsive_table}`}>
                            <table className={`table ${styles.main_table} rounded-0`}>
                                <tbody className='text-center'>
                                    <tr>
                                        <td>
                                            <div className='d-flex alig-items-start'>
                                                <i className='bi bi-shop'></i>
                                            </div>
                                            <div className='text-start me-2'>
                                                <h6 className='text-muted-2 font-14'> نسیم استور
                                                    <span className={`${styles.success_label} rounded-pill me-1`}>
                                                        منتخب
                                                    </span>
                                                </h6>
                                                <div className='d-flex align-items-center mt-2'>
                                                    <p className='font-12'>
                                                        <span className='text-success me-1'>89.6%</span>
                                                        <span className='text-muted'>رضایت از کالا</span>
                                                    </p>
                                                    <p className='pe-1 me-1 border-start font-12'>
                                                        <span className='text-muted'>عملکرد</span>
                                                        <span className='text-success'>عالی</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                                class="bi bi-box-seam me-1" viewBox="0 0 16 16">
                                                <path
                                                    d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z">
                                                </path>
                                            </svg>
                                            <p className='d-inline mb-0 font-14'>ارسالی نسیم استور</p>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                                class="bi bi-shield-check me-1" viewBox="0 0 16 16">
                                                <path
                                                    d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z">
                                                </path>
                                                <path
                                                    d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z">
                                                </path>
                                            </svg>
                                            <p className='fw-bold text-muted-2 mb-0 d-inline font-16'>389,500 </p>
                                            <span className='text-muted font-12'>تومان</span>
                                        </td>
                                        <td className='font-14'>
                                            <a href=""
                                                className='btn py-2 border-0 main-color-one-bg waves-effect waves-light'
                                            >
                                                <i className='bi bi-basket text-white font-16 ms-1'></i>
                                                افزودن به سبد خرید
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='d-flex alig-items-start'>
                                                <i className='bi bi-shop'></i>
                                            </div>
                                            <div className='text-start me-2'>
                                                <h6 className='text-muted-2 font-14'> نسیم استور
                                                    <span className={`${styles.success_label} rounded-pill me-1`}>
                                                        منتخب
                                                    </span>
                                                </h6>
                                                <div className='d-flex align-items-center mt-2'>
                                                    <p className='font-12'>
                                                        <span className='text-success me-1'>89.6%</span>
                                                        <span className='text-muted'>رضایت از کالا</span>
                                                    </p>
                                                    <p className='pe-1 me-1 border-start font-12'>
                                                        <span className='text-muted'>عملکرد</span>
                                                        <span className='text-success'>عالی</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                                class="bi bi-box-seam me-1" viewBox="0 0 16 16">
                                                <path
                                                    d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z">
                                                </path>
                                            </svg>
                                            <p className='d-inline mb-0 font-14'>ارسالی نسیم استور</p>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                                class="bi bi-shield-check me-1" viewBox="0 0 16 16">
                                                <path
                                                    d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z">
                                                </path>
                                                <path
                                                    d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z">
                                                </path>
                                            </svg>
                                            <p className='fw-bold text-muted-2 mb-0 d-inline font-16'>389,500 </p>
                                            <span className='text-muted font-12'>تومان</span>
                                        </td>
                                        <td className='font-14'>
                                            <a href=""
                                                className='btn py-2 border-0 main-color-one-bg waves-effect waves-light'
                                            >
                                                <i className='bi bi-basket text-white font-16 ms-1'></i>
                                                افزودن به سبد خرید
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='d-flex alig-items-start'>
                                                <i className='bi bi-shop'></i>
                                            </div>
                                            <div className='text-start me-2'>
                                                <h6 className='text-muted-2 font-14'> نسیم استور
                                                    <span className={`${styles.success_label} rounded-pill me-1`}>
                                                        منتخب
                                                    </span>
                                                </h6>
                                                <div className='d-flex align-items-center mt-2'>
                                                    <p className='font-12'>
                                                        <span className='text-success me-1'>89.6%</span>
                                                        <span className='text-muted'>رضایت از کالا</span>
                                                    </p>
                                                    <p className='pe-1 me-1 border-start font-12'>
                                                        <span className='text-muted'>عملکرد</span>
                                                        <span className='text-success'>عالی</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                                class="bi bi-box-seam me-1" viewBox="0 0 16 16">
                                                <path
                                                    d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z">
                                                </path>
                                            </svg>
                                            <p className='d-inline mb-0 font-14'>ارسالی نسیم استور</p>
                                        </td>
                                        <td>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                                class="bi bi-shield-check me-1" viewBox="0 0 16 16">
                                                <path
                                                    d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z">
                                                </path>
                                                <path
                                                    d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z">
                                                </path>
                                            </svg>
                                            <p className='fw-bold text-muted-2 mb-0 d-inline font-16'>389,500 </p>
                                            <span className='text-muted font-12'>تومان</span>
                                        </td>
                                        <td className='font-14'>
                                            <a href=""
                                                className='btn py-2 border-0 main-color-one-bg waves-effect waves-light'
                                            >
                                                <i className='bi bi-basket text-white font-16 ms-1'></i>
                                                افزودن به سبد خرید
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MultiSeller