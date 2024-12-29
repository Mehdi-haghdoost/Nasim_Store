import React from 'react'
import styles from './SearchFilters.module.css';
import PriceRangeSlider from './PriceRangeSlider';

const SearchFilters = () => {
    return (
        <div className={`${styles.filter_items} position-sticky top-0`}>
            <div className="container-fluid">
                <div className={styles.filter_item}>
                    <h5 className={styles.filter_item_title}>جستجو</h5>
                    <div className={styles.filter_item_content}>
                        <div className={styles.search_form}>
                            <form action="">
                                <div className={styles.search_field}>
                                    <input type="text" placeholder='جستجوی محصولات ...' className={`form-control ${styles.search_input}`} />
                                    <button className={`btn main-color-one-bg rounded-pill ${styles.search_btn}`} type='submit'>
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={styles.filter_item}>
                    <h5 className={styles.filter_item_title}>دسته بندی ها</h5>
                    <div className={styles.filter_item_content}>
                        <form action="">
                            <div className='d-flex align-items-center justify-content-between flex-wrap mb-3'>
                                <div className='form-check d-flex'>
                                    <input type="checkbox" id='colorCheck11' className='form-check-input ms-2' />
                                    <label htmlFor="colorCheck11" className='form-check-label '>
                                        موبایل
                                        <i className="bi bi-phone ms-1"></i>
                                    </label>
                                </div>
                                <div>
                                    <span className="fw-bold font-14">(27)</span>
                                </div>
                            </div>
                            <div className='d-flex align-items-center justify-content-between flex-wrap mb-3'>
                                <div className='form-check d-flex'>
                                    <input type="checkbox" id='colorCheck55' className='form-check-input ms-2' />
                                    <label htmlFor="colorCheck55" className='form-check-label'>
                                        ایرپاد
                                        <i className="bi bi-earbuds ms-1"></i>
                                    </label>
                                </div>
                                <div>
                                    <span className="fw-bold font-14">(32)</span>
                                </div>
                            </div>
                            <div className='d-flex align-items-center justify-content-between flex-wrap mb-3'>
                                <div className='form-check d-flex'>
                                    <input type="checkbox" id='colorCheck55' className='form-check-input ms-2' />
                                    <label htmlFor="colorCheck55" className='form-check-label'>
                                        تبلت
                                        <i className="bi bi-tablet ms-1"></i>
                                    </label>
                                </div>
                                <div>
                                    <span className="fw-bold font-14">(14)</span>
                                </div>
                            </div>
                            <div className='d-flex align-items-center justify-content-between flex-wrap mb-3'>
                                <div className='form-check d-flex'>
                                    <input type="checkbox" id='colorCheck55' className='form-check-input ms-2' />
                                    <label htmlFor="colorCheck55" className='form-check-label'>
                                        هدست
                                        <i className="bi bi-headset ms-1"></i>
                                    </label>
                                </div>
                                <div>
                                    <span className="fw-bold font-14">(8)</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={styles.filter_item}>
                    <PriceRangeSlider />
                </div>
                <div className={styles.filter_item}>
                    <h5 className={styles.filter_item_title}>رنگ محصول</h5>
                    <div className={styles.filter_item_content}>
                        <div className='product-meta-color-items'>
                            <input type="radio" className='btn-check' name='options' id='option11'
                                autoComplete='off'
                            />
                            <label htmlFor="option11" className='btn'>
                                <span style={{ backgroundColor: "#c00" }}></span>
                                قرمز
                            </label>

                            <input type="radio" className='btn-check' name='options' id='option22'
                                autoComplete='off' defaultChecked
                            />
                            <label htmlFor="option22" className='btn'>
                                <span style={{ backgroundColor: "#111" }}></span>
                                مشکی
                            </label>

                            <input type="radio" className='btn-check' name='options' id='option33'
                                autoComplete='off'
                            />
                            <label htmlFor="option33" className='btn'>
                                <span style={{ backgroundColor: "#00cc5f" }}></span>
                                سبز
                            </label>

                            <input type="radio" className='btn-check' name='options' id='option44'
                                autoComplete='off'
                            />
                            <label htmlFor="option44" className='btn'>
                                <span style={{ backgroundColor: "#1b69f0" }}></span>
                                آبی
                            </label>

                            <input type="radio" className='btn-check' name='options' id='option55'
                                autoComplete='off'
                            />
                            <label htmlFor="option55" className='btn'>
                                <span style={{ backgroundColor: "#891bf0" }}></span>
                                بنفش
                            </label>

                            <input type="radio" className='btn-check' name='options' id='option66'
                                autoComplete='off'
                            />
                            <label htmlFor="option66" className='btn'>
                                <span style={{ backgroundColor: "#f0501b" }}></span>
                                نارنجی
                            </label>
                        </div>
                    </div>
                </div>
                <div className={`${styles.filter_item} text-center`}>
                    <a href="" className={styles.btn_outline_site}>
                        اعمال فیلتر
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SearchFilters