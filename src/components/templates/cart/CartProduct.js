// import React from 'react'
// import styles from './CartProduct.module.css';
// import CartProductItem from './CartProductItem';
// import CartFactor from './CartFactor';

// const CartProduct = () => {
//     return (
//         <div className={styles.cart_product}>
//             <div className="row gy-4">
//                 <div className="col-lg-9">
//                     <CartProductItem  />
//                     <CartProductItem />
//                 </div>
//                 <div className="col-lg-3">
//                     <CartFactor />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CartProduct

'use client';

import React from 'react';
import styles from './CartProduct.module.css';
import CartProductItem from './CartProductItem';
import CartFactor from './CartFactor';
import { useCart } from '@/Redux/hooks/useCart';

const CartProduct = () => {
    // استفاده از هوک useCart برای دریافت اطلاعات سبد خرید
    const { items, loading, error } = useCart();
    
    if (loading) {
        return (
            <div className="container-fluid text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">در حال بارگذاری سبد خرید...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="container-fluid py-5">
                <div className="alert alert-danger">
                    <p>خطا در بارگذاری سبد خرید: {error}</p>
                </div>
            </div>
        );
    }
    
    // اگر سبد خرید خالی باشد
    if (!items || items.length === 0) {
        return null; // EmptyCart در صفحه اصلی نشان داده می‌شود
    }

    return (
        <div className={styles.cart_product}>
            <div className="row gy-4">
                <div className="col-lg-9">
                    {items.map(item => (
                        <CartProductItem key={item._id} item={item} />
                    ))}
                </div>
                <div className="col-lg-3">
                    <CartFactor />
                </div>
            </div>
        </div>
    );
};

export default CartProduct;