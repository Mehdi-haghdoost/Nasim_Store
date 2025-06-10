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

import React, { useMemo } from 'react';
import styles from './CartProduct.module.css';
import CartProductItem from './CartProductItem';
import CartFactor from './CartFactor';
import { useCart } from '@/Redux/hooks/useCart';

const CartProduct = () => {

    const { items, loading, error, isReady } = useCart();

    // مموری کردن محاسبات برای جلوگیری از re-render های غیرضروری
    const cartState = useMemo(() => {
        const safeItems = Array.isArray(items) ? items : [];
        return {
            items: safeItems,
            itemsCount: safeItems.length,
            isEmpty: safeItems.length === 0
        };
    }, [items]);

    // Debug log فقط برای تغییرات مهم
    const prevItemsCount = React.useRef(cartState.itemsCount);
    React.useEffect(() => {
        if (prevItemsCount.current !== cartState.itemsCount) {
            console.log('🛍️ CartProduct State Change:', {
                itemsCount: cartState.itemsCount,
                loading,
                error: !!error,
                isReady
            });
            prevItemsCount.current = cartState.itemsCount;
        }
    }, [cartState.itemsCount, loading, error, isReady]);
    
    // Loading state
    if (loading && !isReady) {
        return (
            <div className="container-fluid text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">در حال بارگذاری سبد خرید...</p>
            </div>
        );
    }
    
    // Error state
    if (error) {
        return (
            <div className="container-fluid py-5">
                <div className="alert alert-danger">
                    <h5>خطا در بارگذاری سبد خرید</h5>
                    <p>{error}</p>
                    <button 
                        className="btn btn-outline-danger"
                        onClick={() => window.location.reload()}
                    >
                        تلاش مجدد
                    </button>
                </div>
            </div>
        );
    }
    
    // اگر سبد خرید خالی باشد
    if (cartState.isEmpty) {
        console.log('❌ CartProduct: No items found');
        return (
            <div className="container-fluid py-5">
                <div className="alert alert-info text-center">
                    <h5>سبد خرید خالی است</h5>
                    <p>محصولی در سبد خرید شما یافت نشد</p>
                    <a href="/categories" className="btn btn-primary">
                        شروع خرید
                    </a>
                </div>
            </div>
        );
    }

    console.log('✅ CartProduct: Rendering', cartState.itemsCount, 'items');

    return (
        <div className={styles.cart_product}>
            <div className="row gy-4">
                <div className="col-lg-9">
                    {/* نمایش تعداد آیتم‌ها */}
                    <div className="mb-3">
                        <h5>سبد خرید شما ({cartState.itemsCount} محصول)</h5>
                    </div>
                    
                    {/* نمایش آیتم‌های سبد خرید */}
                    {cartState.items.map((item, index) => {
                        return (
                            <CartProductItem 
                                key={item._id || `item-${index}`} 
                                item={item} 
                            />
                        );
                    })}
                </div>
                <div className="col-lg-3">
                    <CartFactor />
                </div>
            </div>
        </div>
    );
};

export default CartProduct;