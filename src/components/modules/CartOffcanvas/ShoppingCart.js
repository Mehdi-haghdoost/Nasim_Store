// "use client";

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useCart } from '@/Redux/hooks/useCart';
// import styles from './ShoppingCart.module.css';
// import Link from 'next/link';

// const ShoppingCart = ({ isShowBascket, showBascket }) => {
//     const dispatch = useDispatch();
//     const { items: cartItems, totalQuantity } = useSelector((state) => state.cart);
//     const { updateCartItem, removeFromCart, loading } = useCart();

//     // محاسبه قیمت نهایی با در نظر گیری تخفیف
//     const getFinalPrice = (product) => {
//         if (product.hasDiscount && product.discountedPrice) {
//             return product.discountedPrice;
//         }
//         return product.price;
//     };

//     // محاسبه کل قیمت با تخفیف
//     const calculateTotalPrice = () => {
//         return cartItems.reduce((total, item) => {
//             return total + (getFinalPrice(item.product) * item.quantity);
//         }, 0);
//     };

//     // محاسبه کل تخفیف
//     const calculateTotalDiscount = () => {
//         return cartItems.reduce((total, item) => {
//             if (item.product.hasDiscount && item.product.discountedPrice) {
//                 const discount = (item.product.price - item.product.discountedPrice) * item.quantity;
//                 return total + discount;
//             }
//             return total;
//         }, 0);
//     };

//     const handleGoToCart = (e) => {
//         e.preventDefault();
//         showBascket();
//         window.location.href = '/cart';
//     };


//     const handleGoToCheckout = (e) => {
//         e.preventDefault();
//         showBascket();
//         window.location.href = '/checkout';
//     };


//     const handleGoToHome = (e) => {
//         e.preventDefault();
//         showBascket();
//         window.location.href = '/';
//     };

//     const totalPrice = calculateTotalPrice();
//     const totalDiscount = calculateTotalDiscount();

//     // تابع فرمت قیمت
//     const formatPrice = (price) => {
//         return new Intl.NumberFormat('fa-IR').format(price);
//     };

//     // تابع افزایش تعداد محصول
//     const increaseQuantity = (item) => {
//         if (item.product.stock > item.quantity) {
//             updateCartItem(item._id, item.quantity + 1);
//         }
//     };

//     // تابع کاهش تعداد محصول
//     const decreaseQuantity = (item) => {
//         if (item.quantity > 1) {
//             updateCartItem(item._id, item.quantity - 1);
//         } else {
//             removeFromCart(item._id);
//         }
//     };

//     // تابع حذف محصول
//     const handleRemoveItem = (productId) => {
//         removeFromCart(productId);
//     };

//     // تابع دریافت تصویر محصول
//     const getProductImage = (product) => {
//         if (product.image) return product.image;
//         if (product.images && product.images.length > 0) return product.images[0];
//         return "/images/product/product-image1.jpg";
//     };

//     return (
//         <div
//             className={`offcanvas cart-canvas offcanvas-start ${isShowBascket ? "show" : ""}`}
//         >
//             <div className={`${styles.header} offcanvas-header`}>
//                 <h5 className="offcanvas-title">
//                     سبد خرید
//                     {totalQuantity > 0 && (
//                         <span className="badge bg-primary ms-2 font-12">
//                             {totalQuantity} محصول
//                         </span>
//                     )}
//                 </h5>
//                 <button
//                     type='button'
//                     onClick={showBascket}
//                     className='btn-close'
//                 ></button>
//             </div>
//             <div className="offcanvas-body">
//                 <div className={styles.cart_canvases}>
//                     {cartItems.length === 0 ? (
//                         <div className="text-center py-5">
//                             <i className="bi bi-cart-x font-48 text-muted d-block mb-3"></i>
//                             <h6>سبد خرید شما خالی است</h6>
//                             <p className="text-muted mb-4">برای شروع خرید به صفحه اصلی بروید</p>
//                             <button
//                                 onClick={handleGoToHome}
//                                 className="btn main-color-one-bg text-white"
//                             >
//                                 شروع خرید
//                             </button>
//                         </div>
//                     ) : (
//                         <>
//                             {cartItems.map((item) => (
//                                 <div key={item._id || item.id} className={styles.item}>
//                                     <div className="row gy-2">
//                                         <div className="col-4">
//                                             <div className={styles.image}>
//                                                 <img
//                                                     src={getProductImage(item.product)}
//                                                     className='img-fluid'
//                                                     alt={item.product.title || item.product.name}
//                                                     onError={(e) => {
//                                                         e.target.src = "/images/product/product-image1.jpg";
//                                                     }}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className="col-8">
//                                             <Link
//                                                 href={`/product/${item.product._id || item.product.id}`}
//                                                 style={{ display: "inline-block" }}
//                                                 onClick={showBascket}
//                                             >
//                                                 <div className={styles.title}>
//                                                     <h6 className="font-14 text-truncate" style={{ maxWidth: '200px' }}>
//                                                         {item.product.title || item.product.name}
//                                                     </h6>
//                                                     {item.color && (
//                                                         <p className="mb-0 text-muted font-12 mt-1">
//                                                             رنگ: {item.color}
//                                                         </p>
//                                                     )}
//                                                     {item.size && (
//                                                         <p className="mb-0 text-muted font-12">
//                                                             سایز: {item.size}
//                                                         </p>
//                                                     )}
//                                                 </div>
//                                                 <div className={styles.price}>
//                                                     {item.product.hasDiscount ? (
//                                                         <>
//                                                             <p className={`text-start mb-1 ${styles.price_off} fw-bold`}>
//                                                                 {formatPrice(getFinalPrice(item.product) * item.quantity)} تومان
//                                                             </p>
//                                                             <p className={`text-start ${styles.discount}`}>
//                                                                 {formatPrice(item.product.price * item.quantity)} تومان
//                                                             </p>
//                                                         </>
//                                                     ) : (
//                                                         <p className={`text-start mb-2 fw-bold`}>
//                                                             {formatPrice(item.product.price * item.quantity)} تومان
//                                                         </p>
//                                                     )}
//                                                 </div>
//                                             </Link>
//                                             <div className={`d-flex justify-content-between align-items-center ${styles.action}`}>
//                                                 <div className={`${styles.remove} bg-light rounded-3`}>
//                                                     <button
//                                                         onClick={() => handleRemoveItem(item._id || item.id)}
//                                                         className="btn btn-sm p-1"
//                                                         title="حذف محصول"
//                                                         disabled={loading}
//                                                     >
//                                                         <i className="bi bi-x font-25 text-danger"></i>
//                                                     </button>
//                                                 </div>
//                                                 <div className={styles.counter}>
//                                                     <div className="input-group">
//                                                         <span className="input-group-btn input-group-prepend">
//                                                             <button
//                                                                 className="btn-counter waves-effect waves-light bootstrap-touchspin-down"
//                                                                 type="button"
//                                                                 onClick={() => decreaseQuantity(item)}
//                                                                 disabled={loading || item.quantity <= 1}
//                                                                 title={item.quantity <= 1 ? "حداقل تعداد" : "کاهش تعداد"}
//                                                             >
//                                                                 -
//                                                             </button>
//                                                         </span>
//                                                         <input
//                                                             name="count"
//                                                             className="counter form-counter"
//                                                             value={item.quantity}
//                                                             readOnly
//                                                         />
//                                                         <span className="input-group-btn input-group-append">
//                                                             <button
//                                                                 className="btn-counter waves-effect waves-light bootstrap-touchspin-up"
//                                                                 type="button"
//                                                                 onClick={() => increaseQuantity(item)}
//                                                                 disabled={loading || (item.product.stock && item.quantity >= item.product.stock)}
//                                                                 title={item.product.stock && item.quantity >= item.product.stock ? "حداکثر موجودی" : "افزایش تعداد"}
//                                                             >
//                                                                 +
//                                                             </button>
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}

//                             <div className={styles.item}>
//                                 <div className={styles.factor}>
//                                     <div className={styles.title}>
//                                         <div className="d-flex align-items-center">
//                                             <img
//                                                 src="/images/product/shopping-bag.png"
//                                                 alt="shopping-png"
//                                                 className='img-fluid'
//                                             />
//                                             <h6 className="font-16">سفارش شما</h6>
//                                         </div>
//                                     </div>
//                                     <div className="d-flex mb-3 align-items-center justify-content-between">
//                                         <p className="fw-bold mb-0">محصول</p>
//                                         <p className="fw-bold mb-0">قیمت</p>
//                                     </div>

//                                     {cartItems.map((item) => (
//                                         <div
//                                             key={`factor-${item._id || item.id}`}
//                                             className={`${styles.factor_item} p-2 mb-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between`}
//                                         >
//                                             <p className="mb-0 text-truncate" style={{ maxWidth: '150px' }}>
//                                                 {item.product.title || item.product.name}
//                                                 <small className="text-muted"> (×{item.quantity})</small>
//                                             </p>
//                                             <p className="mb-0 font-12">
//                                                 {formatPrice(getFinalPrice(item.product) * item.quantity)} تومان
//                                             </p>
//                                         </div>
//                                     ))}

//                                     {totalDiscount > 0 && (
//                                         <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between mb-2`}>
//                                             <p className="mb-0 fw-bold">تخفیف:</p>
//                                             <p className="mb-0 text-success">{formatPrice(totalDiscount)} تومان</p>
//                                         </div>
//                                     )}

//                                     <div className={`${styles.factor_item} p-3 rounded-3 shadow-sm  text-white d-flex align-items-center justify-content-between`}>
//                                         <p className="mb-0 fw-bold">جمع کل</p>
//                                         <p className="mb-0 fw-bold">
//                                             {formatPrice(totalPrice)} تومان
//                                         </p>
//                                     </div>

//                                     <div className={`${styles.action} mt-3 d-flex align-items-center justify-content-center`}>
//                                         <button
//                                             onClick={handleGoToCart}
//                                             className='btn border-0 main-color-two-bg rounded-3'
//                                             disabled={loading}
//                                         >
//                                             مشاهده سبد خرید
//                                         </button>
//                                         <button
//                                             onClick={handleGoToCheckout}
//                                             className='btn border-0 main-color-one-bg rounded-3 me-2'
//                                             disabled={loading}
//                                         >
//                                             تسویه حساب
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ShoppingCart;


"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '@/Redux/hooks/useCart';
import styles from './ShoppingCart.module.css';
import Link from 'next/link';

const ShoppingCart = ({ isShowBascket, showBascket }) => {
    // استفاده از useCart hook
    const { 
        items: cartItems, 
        totalQuantity, 
        updateCartItem, 
        removeFromCart, 
        loading,
        isHydrated 
        // حذف isReady از شرط‌ها
    } = useCart();
    
    const [isClient, setIsClient] = useState(false);
    const counterRefs = useRef({});

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Debug log برای ShoppingCart
    useEffect(() => {
        console.log('🛍️ ShoppingCart Debug (Simplified):', {
            cartItems: cartItems,
            totalQuantity: totalQuantity,
            itemsLength: cartItems?.length || 0,
            isHydrated: isHydrated,
            loading: loading,
            isClient: isClient
        });
    }, [cartItems, totalQuantity, isHydrated, loading, isClient]);

    useEffect(() => {
        if (isClient && isHydrated && cartItems.length > 0) {
            // Force update همه counter inputs
            const updateCounterInputs = () => {
                cartItems.forEach((item) => {
                    const input = counterRefs.current[item._id || item.id];
                    if (input && input.value !== item.quantity.toString()) {
                        input.value = item.quantity.toString();
                    }
                });

                // Manual DOM update برای همه input های counter
                const inputs = document.querySelectorAll('input[name="count"]');
                inputs.forEach((input, index) => {
                    if (cartItems[index] && input.value !== cartItems[index].quantity.toString()) {
                        input.value = cartItems[index].quantity.toString();
                    }
                });
            };

            updateCounterInputs();
            setTimeout(updateCounterInputs, 100);
        }
    }, [cartItems, isClient, isHydrated]);

    // محاسبه قیمت نهایی با در نظر گیری تخفیف
    const getFinalPrice = (product) => {
        if (product.hasDiscount && product.discountedPrice) {
            return product.discountedPrice;
        }
        return product.price;
    };

    // محاسبه کل قیمت با تخفیف
    const calculateTotalPrice = () => {
        if (!Array.isArray(cartItems)) return 0;
        return cartItems.reduce((total, item) => {
            return total + (getFinalPrice(item.product) * item.quantity);
        }, 0);
    };

    // محاسبه کل تخفیف
    const calculateTotalDiscount = () => {
        if (!Array.isArray(cartItems)) return 0;
        return cartItems.reduce((total, item) => {
            if (item.product.hasDiscount && item.product.discountedPrice) {
                const discount = (item.product.price - item.product.discountedPrice) * item.quantity;
                return total + discount;
            }
            return total;
        }, 0);
    };

    const handleGoToCart = (e) => {
        e.preventDefault();
        showBascket();
        window.location.href = '/cart';
    };

    const handleGoToCheckout = (e) => {
        e.preventDefault();
        showBascket();
        window.location.href = '/checkout';
    };

    const handleGoToHome = (e) => {
        e.preventDefault();
        showBascket();
        window.location.href = '/';
    };

    const totalPrice = calculateTotalPrice();
    const totalDiscount = calculateTotalDiscount();

    // تابع فرمت قیمت
    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price);
    };

    // تابع افزایش تعداد محصول
    const increaseQuantity = async (item) => {
        if (item.product.stock > item.quantity) {
            try {
                await updateCartItem(item._id, item.quantity + 1);
            } catch (error) {
                console.error('خطا در افزایش تعداد:', error);
            }
        }
    };

    // تابع کاهش تعداد محصول
    const decreaseQuantity = async (item) => {
        try {
            if (item.quantity > 1) {
                await updateCartItem(item._id, item.quantity - 1);
            } else {
                await removeFromCart(item._id);
            }
        } catch (error) {
            console.error('خطا در کاهش تعداد:', error);
        }
    };

    // تابع حذف محصول
    const handleRemoveItem = async (productId) => {
        try {
            await removeFromCart(productId);
        } catch (error) {
            console.error('خطا در حذف محصول:', error);
        }
    };

    // تابع دریافت تصویر محصول
    const getProductImage = (product) => {
        if (product.image) return product.image;
        if (product.images && product.images.length > 0) return product.images[0];
        return "/images/product/product-image1.jpg";
    };

    // اطمینان از array بودن cartItems
    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

    // شرط نمایش ساده‌تر - فقط بررسی isClient و isHydrated
    const shouldShowContent = isClient && isHydrated;
    const hasItems = shouldShowContent && safeCartItems.length > 0;

    console.log('🎯 ShoppingCart Render Decision:', {
        isClient,
        isHydrated,
        shouldShowContent,
        hasItems,
        itemsLength: safeCartItems.length
    });

    return (
        <div
            className={`offcanvas cart-canvas offcanvas-start ${isShowBascket ? "show" : ""}`}
        >
            <div className={`${styles.header} offcanvas-header`}>
                <h5 className="offcanvas-title">
                   سبد خرید :
                    {shouldShowContent && totalQuantity > 0 && (
                        <span className="badge bg-success text-white me-2 font-12">
                            {totalQuantity} محصول
                        </span>
                    )}
                </h5>
                <button
                    type='button'
                    onClick={showBascket}
                    className='btn-close'
                ></button>
            </div>
            <div className="offcanvas-body">
                <div className={styles.cart_canvases}>
                    {!shouldShowContent ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">در حال بارگذاری...</span>
                            </div>
                            <p className="mt-2 text-muted">در حال بارگذاری سبد خرید...</p>
                        </div>
                    ) : !hasItems ? (
                        <div className="text-center py-5">
                            <i className="bi bi-cart-x font-48 text-muted d-block mb-3"></i>
                            <h6>سبد خرید شما خالی است</h6>
                            <p className="text-muted mb-4">برای شروع خرید به صفحه اصلی بروید</p>
                            <button
                                onClick={handleGoToHome}
                                className="btn main-color-one-bg text-white"
                            >
                                شروع خرید
                            </button>
                        </div>
                    ) : (
                        <>
                            {safeCartItems.map((item) => (
                                <div key={item._id || item.id} className={styles.item}>
                                    <div className="row gy-2">
                                        <div className="col-4">
                                            <div className={styles.image}>
                                                <img
                                                    src={getProductImage(item.product)}
                                                    className='img-fluid'
                                                    alt={item.product.title || item.product.name}
                                                    onError={(e) => {
                                                        e.target.src = "/images/product/product-image1.jpg";
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <Link
                                                href={`/product/${item.product._id || item.product.id}`}
                                                style={{ display: "inline-block" }}
                                                onClick={showBascket}
                                            >
                                                <div className={styles.title}>
                                                    <h6 className="font-14 text-truncate" style={{ maxWidth: '200px' }}>
                                                        {item.product.title || item.product.name}
                                                    </h6>
                                                    {item.color && (
                                                        <p className="mb-0 text-muted font-12 mt-1">
                                                            رنگ: {item.color}
                                                        </p>
                                                    )}
                                                    {item.size && (
                                                        <p className="mb-0 text-muted font-12">
                                                            سایز: {item.size}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className={styles.price}>
                                                    {item.product.hasDiscount ? (
                                                        <>
                                                            <p className={`text-start mb-1 ${styles.price_off} fw-bold`}>
                                                                {formatPrice(getFinalPrice(item.product) * item.quantity)} تومان
                                                            </p>
                                                            <p className={`text-start ${styles.discount}`}>
                                                                {formatPrice(item.product.price * item.quantity)} تومان
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <p className={`text-start mb-2 fw-bold`}>
                                                            {formatPrice(item.product.price * item.quantity)} تومان
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>
                                            <div className={`d-flex justify-content-between align-items-center ${styles.action}`}>
                                                <div className={`${styles.remove} bg-light rounded-3`}>
                                                    <button
                                                        onClick={() => handleRemoveItem(item._id || item.id)}
                                                        className="btn btn-sm p-1"
                                                        title="حذف محصول"
                                                        disabled={loading}
                                                    >
                                                        <i className="bi bi-x font-25 text-danger"></i>
                                                    </button>
                                                </div>
                                                <div className={styles.counter}>
                                                    <div className="input-group">
                                                        <span className="input-group-btn input-group-prepend">
                                                            <button
                                                                className="btn-counter waves-effect waves-light bootstrap-touchspin-down"
                                                                type="button"
                                                                onClick={() => decreaseQuantity(item)}
                                                                disabled={loading || item.quantity <= 1}
                                                                title={item.quantity <= 1 ? "حداقل تعداد" : "کاهش تعداد"}
                                                            >
                                                                -
                                                            </button>
                                                        </span>
                                                        <input
                                                            ref={(el) => counterRefs.current[item._id || item.id] = el}
                                                            name="count"
                                                            className="counter form-counter"
                                                            defaultValue={item.quantity}
                                                            readOnly
                                                            style={{
                                                                textAlign: 'center',
                                                                fontSize: '14px',
                                                                fontWeight: 'bold',
                                                                color: '#000',
                                                                backgroundColor: '#fff'
                                                            }}
                                                        />
                                                        <span className="input-group-btn input-group-append">
                                                            <button
                                                                className="btn-counter waves-effect waves-light bootstrap-touchspin-up"
                                                                type="button"
                                                                onClick={() => increaseQuantity(item)}
                                                                disabled={loading || (item.product.stock && item.quantity >= item.product.stock)}
                                                                title={item.product.stock && item.quantity >= item.product.stock ? "حداکثر موجودی" : "افزایش تعداد"}
                                                            >
                                                                +
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className={styles.item}>
                                <div className={styles.factor}>
                                    <div className={styles.title}>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src="/images/product/shopping-bag.png"
                                                alt="shopping-png"
                                                className='img-fluid'
                                            />
                                            <h6 className="font-16">سفارش شما</h6>
                                        </div>
                                    </div>
                                    <div className="d-flex mb-3 align-items-center justify-content-between">
                                        <p className="fw-bold mb-0">محصول</p>
                                        <p className="fw-bold mb-0">قیمت</p>
                                    </div>

                                    {safeCartItems.map((item) => (
                                        <div
                                            key={`factor-${item._id || item.id}`}
                                            className={`${styles.factor_item} p-2 mb-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between`}
                                        >
                                            <p className="mb-0 text-truncate" style={{ maxWidth: '150px' }}>
                                                {item.product.title || item.product.name}
                                                <small className="text-muted"> (×{item.quantity})</small>
                                            </p>
                                            <p className="mb-0 font-12">
                                                {formatPrice(getFinalPrice(item.product) * item.quantity)} تومان
                                            </p>
                                        </div>
                                    ))}

                                    {totalDiscount > 0 && (
                                        <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between mb-2`}>
                                            <p className="mb-0 fw-bold">تخفیف:</p>
                                            <p className="mb-0 text-success">{formatPrice(totalDiscount)} تومان</p>
                                        </div>
                                    )}

                                    <div className={`${styles.factor_item} p-3 rounded-3 shadow-sm  text-white d-flex align-items-center justify-content-between`}>
                                        <p className="mb-0 fw-bold">جمع کل</p>
                                        <p className="mb-0 fw-bold">
                                            {formatPrice(totalPrice)} تومان
                                        </p>
                                    </div>

                                    <div className={`${styles.action} mt-3 d-flex align-items-center justify-content-center`}>
                                        <button
                                            onClick={handleGoToCart}
                                            className='btn border-0 main-color-two-bg rounded-3'
                                            disabled={loading}
                                        >
                                            مشاهده سبد خرید
                                        </button>
                                        <button
                                            onClick={handleGoToCheckout}
                                            className='btn border-0 main-color-one-bg rounded-3 me-2'
                                            disabled={loading}
                                        >
                                            تسویه حساب
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;