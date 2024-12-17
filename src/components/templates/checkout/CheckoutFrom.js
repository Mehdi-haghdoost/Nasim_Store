import React from 'react'
import styles from './CheckoutFrom.module.css';
import CheckoutSide from './CheckoutSide';

const CheckoutFrom = () => {
    return (
        <div className='row gy-3'>
            <div className="col-lg-8">
                <div className="content-box position-sticky top-0">
                    <div className="container-fluid">
                        <div className={styles.checkout_froms}>
                            <div className={styles.checkout_from_title}>
                                <h5 className="mb-3">جزئیات پرداخت</h5>
                            </div>
                            <div className={styles.checkout_from}>
                                <form action="">
                                    <div className='form-group'>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className='form-group'>
                                                    <label htmlFor="name" className='form-label'>
                                                        نام
                                                        <span className='text-danger me-1'>*</span>
                                                    </label>
                                                    <input type="text" id='name' className='form-control rounded-3' />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className='form-group'>
                                                    <label htmlFor="lname" className='form-label'>
                                                        نام خانوادگی
                                                        <span className='text-danger me-1'>*</span>
                                                    </label>
                                                    <input type="text" id='lname' className='form-control rounded-3' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className='form-group'>
                                                    <label htmlFor="ostan" className='form-label'>
                                                        استان
                                                        <span className='text-danger me-1'>*</span>
                                                    </label>
                                                    <select id="ostan" style={{direction : "rtl"}} className="form-select rounded-3">
                                                        <option >تهران</option>
                                                        <option >یزد</option>
                                                        <option >اصفهان</option>
                                                        <option >لرستان</option>
                                                        <option >کردستان</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className='form-group'>
                                                    <label htmlFor="city" className='form-label'>
                                                        شهر
                                                        <span className='text-danger me-1'>*</span>
                                                    </label>
                                                    <select id="city" className="form-select rounded-3">
                                                        <option >کرج</option>
                                                        <option >خرم آباد</option>
                                                        <option >کرمانشاه</option>
                                                        <option >مهاباد</option>
                                                        <option >بروجرد</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="street" className="form-label">
                                            خیابان
                                            <span className="text-danger me-1">*</span>
                                        </label>
                                        <input type="text" placeholder="پلاک خانه و نام خیابان"
                                            id='street' className='form-control rounded-3'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder='شماره واحد ، بلوک ، پلاک (دلخواه)'
                                            id='street' className='form-control rounded-3'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tel" className='form-label'>
                                            تلفن
                                            <span className="text-danger me-1">*</span>
                                        </label>
                                        <input type="text"
                                            id='tel' className='form-control rounded-3'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email" className='form-label'>
                                            آدرس ایمیل
                                            <span className="text-danger me-1">*</span>
                                        </label>
                                        <input type="text"
                                            id='email' className='form-control rounded-3'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="postal-code" className='form-label'>
                                            کد پستی
                                            <span className="text-danger me-1">*</span>
                                        </label>
                                        <input type="text"
                                            id='postal-code' className='form-control rounded-3'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="descOrder" className='form-label'>
                                            یادداشت های سفارش اختیاری
                                            <span className="text-danger me-1">*</span>
                                        </label>
                                        <textarea rows="5" id="descOrder" className='form-control rounded-3'
                                            placeholder="نکاتی در مورد سفارش به عنوان مثال نکاتی برای تحویل"
                                        ></textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <CheckoutSide />
            </div>
        </div>
    )
}

export default CheckoutFrom