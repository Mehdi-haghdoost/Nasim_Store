"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCart } from '@/Redux/hooks/useCart';
import styles from './ShoppingCart.module.css';
import Link from 'next/link';

const ShoppingCart = ({ isShowBascket, showBascket }) => {
    const dispatch = useDispatch();
    const { items: cartItems, totalPrice, totalQuantity } = useSelector((state) => state.cart);
    const { updateCartItem, removeFromCart, loading } = useCart();

    // تابع محاسبه قیمت نهایی محصول
    const getFinalPrice = (product) => {
        if (product.hasDiscount && product.discountedPrice) {
            return product.discountedPrice;
        }
        return product.price;
    };

    // تابع فرمت قیمت
    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price);
    };

    // تابع افزایش تعداد محصول
    const increaseQuantity = (item) => {
        if (item.product.stock > item.quantity) {
            updateCartItem(item._id, item.quantity + 1);
        }
    };

    // تابع کاهش تعداد محصول
    const decreaseQuantity = (item) => {
        if (item.quantity > 1) {
            updateCartItem(item._id, item.quantity - 1);
        } else {
            removeFromCart(item._id);
        }
    };

    // تابع حذف محصول
    const handleRemoveItem = (productId) => {
        removeFromCart(productId);
    };

    // تابع دریافت تصویر محصول
    const getProductImage = (product) => {
        if (product.image) return product.image;
        if (product.images && product.images.length > 0) return product.images[0];
        return "/images/product/product-image1.jpg";
    };

    return (
        <div
            className={`offcanvas cart-canvas offcanvas-start ${isShowBascket ? "show" : ""}`}
        >
            <div className={`${styles.header} offcanvas-header`}>
                <h5 className="offcanvas-title">
                    سبد خرید
                    {totalQuantity > 0 && (
                        <span className="badge bg-primary ms-2 font-12">
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
                    {cartItems.length === 0 ? (
                        // حالت خالی بودن سبد خرید
                        <div className="text-center py-5">
                            <i className="bi bi-cart-x font-48 text-muted d-block mb-3"></i>
                            <h6>سبد خرید شما خالی است</h6>
                            <p className="text-muted mb-4">برای شروع خرید به صفحه اصلی بروید</p>
                            <Link
                                href="/"
                                onClick={showBascket}
                                className="btn main-color-one-bg text-white"
                            >
                                شروع خرید
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* نمایش محصولات */}
                            {cartItems.map((item) => (
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
                                                            name="count"
                                                            className="counter form-counter"
                                                            value={item.quantity}
                                                            readOnly
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

                            {/* خلاصه سفارش */}
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

                                    {/* لیست محصولات در فاکتور */}
                                    {cartItems.map((item) => (
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

                                    {/* مجموع کل */}
                                    <div className={`${styles.factor_item} p-3 rounded-3 shadow-sm bg-primary text-white d-flex align-items-center justify-content-between`}>
                                        <p className="mb-0 fw-bold">جمع کل</p>
                                        <p className="mb-0 fw-bold">
                                            {formatPrice(totalPrice)} تومان
                                        </p>
                                    </div>

                                    {/* دکمه‌های عملیات */}
                                    <div className={`${styles.action} mt-3 d-flex align-items-center justify-content-center`}>
                                        <Link
                                            href="/cart"
                                            onClick={showBascket}
                                            className='btn border-0 main-color-two-bg rounded-3'
                                        >
                                            مشاهده سبد خرید
                                        </Link>
                                        <Link
                                            href="/checkout"
                                            onClick={showBascket}
                                            className='btn border-0 main-color-one-bg rounded-3 me-2'
                                        >
                                            تسویه حساب
                                        </Link>
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