// "use client";

// import React, { useState } from 'react'
// import styles from '@/styles/cart.module.css';
// import Header from '@/components/modules/header/Header';
// import Footer from '@/components/modules/footer/Footer';
// import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
// import LineStep from '@/components/templates/cart/LineStep';
// import CartProduct from '@/components/templates/cart/CartProduct';
// import EmptyCart from '@/components/templates/cart/EmptyCart';

// const page = () => {

//     const [counter, setCounter] = useState(2);

//     return (
//         <>
//             <Header />
//             <BreadCroumb />
//             {" "}
//             {counter > 0 ? (
//                 <div className='content'>
//                     <div className="container-fluid">
//                         <LineStep />
//                     </div>
//                     <div className="container-fluid">
//                         <CartProduct />
//                     </div>
//                 </div>
//             ) : (
//                 <EmptyCart />
//             )}

//             <Footer />
//         </>
//     )
// }

// export default page

'use client';

import React from 'react';
import styles from '@/styles/cart.module.css';
import Header from '@/components/modules/header/Header';
import Footer from '@/components/modules/footer/Footer';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import LineStep from '@/components/templates/cart/LineStep';
import CartProduct from '@/components/templates/cart/CartProduct';
import EmptyCart from '@/components/templates/cart/EmptyCart';
import { useCart } from '@/Redux/hooks/useCart';

const CartPage = () => {
    // استفاده از هوک useCart برای دریافت اطلاعات سبد خرید
    const { items, loading } = useCart();
    
    // نمایش لودینگ اگر در حال بارگذاری باشیم
    if (loading) {
        return (
            <>
                <Header />
                <BreadCroumb />
                <div className='content'>
                    <div className="container-fluid text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">در حال بارگذاری سبد خرید...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
    
    // بررسی وضعیت سبد خرید
    const hasItems = items && items.length > 0;

    return (
        <>
            <Header />
            <BreadCroumb />
            {hasItems ? (
                <div className='content'>
                    <div className="container-fluid">
                        <LineStep />
                    </div>
                    <div className="container-fluid">
                        <CartProduct />
                    </div>
                </div>
            ) : (
                <EmptyCart />
            )}
            <Footer />
        </>
    );
};

export default CartPage;