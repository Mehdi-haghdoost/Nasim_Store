// import React from 'react'
// import styles from './EmptyCart.module.css';

// const EmptyCart = () => {
//     return (
//         <div className='content'>
//             <div className="container-fluid">
//                 <div className="content-box">
//                     <div className="container-fluid">
//                         <div className="text-center">
//                             <img src="/images/empty-cart (1).svg" alt="سبد خرید خالی" className="mx-auto d-block" style={{ maxWidth: "400px" }} />
//                             <h6 className="font-18 mt-4">سبد خرید شما خالی است</h6>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default EmptyCart

import React from 'react';
import styles from './EmptyCart.module.css';
import { useAuth } from '@/Redux/hooks/useAuth';

const EmptyCart = () => {
    const { isAuthenticated } = useAuth();

    const handleStartShopping = () => {
        window.location.href = '/categories';
    };

    const handleLogin = () => {
        window.location.href = '/login-register';
    };

    return (
        <div className='content'>
            <div className="container-fluid">
                <div className="content-box">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6">
                                <div className="text-center py-5">
                                    <div className="mb-4">
                                        <img 
                                            src="/images/empty-cart (1).svg" 
                                            alt="سبد خرید خالی" 
                                            className="mx-auto d-block" 
                                            style={{ maxWidth: "300px", width: "100%" }} 
                                        />
                                    </div>
                                    
                                    <h4 className="font-18 mt-4 mb-3">سبد خرید شما خالی است</h4>
                                    
                                    <p className="text-muted mb-4">
                                        هنوز محصولی به سبد خرید خود اضافه نکرده‌اید. 
                                        <br />
                                        از طریق دکمه زیر می‌توانید به فروشگاه بروید و خرید کنید.
                                    </p>

                                    {/* دکمه‌های عملیات */}
                                    <div className="d-grid gap-3 mx-auto" style={{ maxWidth: "300px" }}>
                                        <button 
                                            onClick={handleStartShopping}
                                            className="btn btn-primary btn-lg rounded-3"
                                        >
                                            <i className="bi bi-shop me-2"></i>
                                            شروع خرید
                                        </button>

                                        {!isAuthenticated && (
                                            <button 
                                                onClick={handleLogin}
                                                className="btn btn-outline-secondary rounded-3"
                                            >
                                                <i className="bi bi-person me-2"></i>
                                                ورود به حساب کاربری
                                            </button>
                                        )}

                                        <a 
                                            href="/" 
                                            className="btn btn-link text-decoration-none"
                                        >
                                            <i className="bi bi-house me-1"></i>
                                            بازگشت به صفحه اصلی
                                        </a>
                                    </div>

                                    {/* پیشنهادات */}
                                    <div className="mt-5">
                                        <h6 className="mb-3">پیشنهاد ویژه:</h6>
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <div className="card border-0 shadow-sm h-100">
                                                    <div className="card-body text-center p-3">
                                                        <i className="bi bi-lightning text-warning mb-2" style={{ fontSize: '2rem' }}></i>
                                                        <h6 className="card-title small">محصولات پرفروش</h6>
                                                        <a href="/categories?sort=bestselling" className="btn btn-sm btn-outline-primary">
                                                            مشاهده
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card border-0 shadow-sm h-100">
                                                    <div className="card-body text-center p-3">
                                                        <i className="bi bi-percent text-success mb-2" style={{ fontSize: '2rem' }}></i>
                                                        <h6 className="card-title small">تخفیف‌های ویژه</h6>
                                                        <a href="/categories?discount=true" className="btn btn-sm btn-outline-success">
                                                            مشاهده
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card border-0 shadow-sm h-100">
                                                    <div className="card-body text-center p-3">
                                                        <i className="bi bi-star text-info mb-2" style={{ fontSize: '2rem' }}></i>
                                                        <h6 className="card-title small">محصولات جدید</h6>
                                                        <a href="/categories?sort=newest" className="btn btn-sm btn-outline-info">
                                                            مشاهده
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* اطلاعات مفید */}
                                    {!isAuthenticated && (
                                        <div className="alert alert-light border mt-4">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-info-circle text-primary me-2"></i>
                                                <small className="mb-0">
                                                    با ورود به حساب کاربری، سبد خرید شما ذخیره می‌شود و در دفعات بعدی در دسترس خواهد بود.
                                                </small>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyCart;