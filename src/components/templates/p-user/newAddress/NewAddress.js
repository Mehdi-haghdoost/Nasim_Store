import React from 'react'
import styles from './NewAddress.module.css';

const NewAddress = () => {
    return (
        <div className="ui-boxs">
            <div className="ui-box">
                <div className="ui-box-item ui-box-white">
                    <div className="ui-box-item-title p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="fw-bold">
                                ثبت آدرس
                            </h4>
                        </div>
                    </div>
                    <div className="ui-box-item-desc">
                        <form action="">
                            <div className="row g-3">
                                <div className="col-12">
                                    <div className={`${styles.comment_item} mb-3`}>
                                        <input type="text" className='form-control' id='floatingInputStreet' placeholder="نام خانوادگی خود را وارد کنید ..." />
                                        <label htmlFor="floatingInputStreet" className='form-lable label-float fw-bold' >
                                            آدرس خیابان
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={styles.comment_item} htmlFor="floatingInputOstan">
                                        <label className='lable-float fw-bold' >
                                            استان
                                            <span className="text-danger">*</span>
                                        </label>
                                        <select name="" id="floatingInputOstan" className='form-select'>
                                            <option value="">تهران</option>
                                            <option value="">اصفهان</option>
                                            <option value="">خراسان رضوی</option>
                                            <option value="">فارس</option>
                                            <option value="">اذربایجان شرقی</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={styles.comment_item}>
                                        <label htmlFor="floatingInputCity" className='lable-float fw-bold' >
                                            شهر
                                            <span className="text-danger">*</span>
                                        </label>
                                        <select name="" id="floatingInputCity" className='form-select'>
                                            <option value="">اندیشه</option>
                                            <option value="">نطنز</option>
                                            <option value="">مشهد</option>
                                            <option value="">شیراز</option>
                                            <option value="">تبریز</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className={styles.comment_item}>
                                        <textarea name="" id="floatingInputDesc" className='form-control py-3' rows="5" placeholder="اگر سفارش شما توضیح خاصی دارد اینجا وارد کنید"></textarea>
                                        <label htmlFor="floatingInputDesc" className='form-label label-float fw-bold'>
                                            توضیحات سفارش
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button type='submit' className='btn main-color-one-bg my-3 border-0 px-5 py-3 '>
                                        ثبت آدرس
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewAddress