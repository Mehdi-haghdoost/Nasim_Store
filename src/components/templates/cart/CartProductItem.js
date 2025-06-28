'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './CartProductItem.module.css';
import { useCart } from '@/Redux/hooks/useCart';

const CartProductItem = ({ item }) => {
  const { updateCartItem, removeFromCart, loading, isHydrated } = useCart();
  
  const [isClient, setIsClient] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(item?.quantity || 1);
  const counterRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // همگام‌سازی localQuantity با item.quantity
  useEffect(() => {
    if (item?.quantity !== undefined) {
      setLocalQuantity(item.quantity);
    }
  }, [item?.quantity]);

  // Force update برای input در Safari
  useEffect(() => {
    if (isClient && isHydrated && counterRef.current) {
      const updateCounterInput = () => {
        if (counterRef.current && counterRef.current.value !== localQuantity.toString()) {
          counterRef.current.value = localQuantity.toString();
        }
      };

      updateCounterInput();
      setTimeout(updateCounterInput, 100);
      setTimeout(updateCounterInput, 300);
    }
  }, [localQuantity, isClient, isHydrated]);

  if (!item || !item.product) {
    return null;
  }

  const increaseQuantity = async () => {
    if (item.product.stock > localQuantity) {
      const newQuantity = localQuantity + 1;
      setLocalQuantity(newQuantity);
      
      try {
        await updateCartItem(item._id, newQuantity);
      } catch (error) {
        console.error('خطا در افزایش تعداد:', error);
        setLocalQuantity(item.quantity);
      }
    }
  };

  const decreaseQuantity = async () => {
    try {
      if (localQuantity > 1) {
        const newQuantity = localQuantity - 1;
        setLocalQuantity(newQuantity);
        await updateCartItem(item._id, newQuantity);
      } else {
        await removeFromCart(item._id);
      }
    } catch (error) {
      console.error('خطا در کاهش تعداد:', error);
      setLocalQuantity(item.quantity);
    }
  };

  const handleRemoveItem = async (e) => {
    e.preventDefault();
    try {
      await removeFromCart(item._id);
    } catch (error) {
      console.error('خطا در حذف محصول:', error);
    }
  };

  const finalPrice = item.product.hasDiscount
    ? item.product.discountedPrice * localQuantity
    : item.product.price * localQuantity;

  const originalPrice = item.product.price * localQuantity;

  const discountPercentage = item.product.hasDiscount
    ? Math.round(((item.product.price - item.product.discountedPrice) / item.product.price) * 100)
    : 0;

  const getProductImage = () => {
    if (item.product.image) {
      if (item.product.image.includes('/images/product/')) {
        return item.product.image;
      }
      return `/images/product/${item.product.image}`;
    }
    if (item.product.images && item.product.images.length > 0) {
      if (item.product.images[0].includes('/images/product/')) {
        return item.product.images[0];
      }
      return `/images/product/${item.product.images[0]}`;
    }
    return "/images/product/product-placeholder.jpg";
  };

  const getColorCode = (colorName) => {
    const colorMap = {
      'قرمز': '#c00',
      'مشکی': '#111',
      'سبز': '#00cc5f',
      'آبی': '#1b69f0',
      'نارنجی': '#ff6600',
      'بنفش': '#6a0dad'
    };
    return colorMap[colorName] || '#ccc';
  };

  return (
    <div className={styles.cart_product_item}>
      <div className="content-box">
        <div className="container-fluid">
          <div className={styles.cart_items}>
            <div className={styles.item}>
              <div className="row gy-2">
                <div className="col-2 w-100-in-400">
                  <div className={styles.image}>
                    <img
                      src={getProductImage()}
                      alt={item.product.title || "محصول"}
                      className='img-fluid'
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/product/product-placeholder.jpg";
                      }}
                    />
                  </div>
                </div>
                <div className="col-10 w-100-in-400">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className='d-flex align-items-start flex-column ms-2'>
                      <div className={`d-flex align-items-center flex-wrap ${styles.title}`}>
                        <h6 className='font-16'>
                          {item.product.title}
                          {item.product.hasDiscount && (
                            <span className='badge me-2 danger-label rounded-pill'>
                              {discountPercentage}%
                            </span>
                          )}
                        </h6>
                      </div>
                      <div className={`d-flex align-items-center flex-wrap mt-3 ${styles.cart_item_feature}`}>
                        {item.selectedSeller && (
                          <div className={`d-flex align-items-center ${styles.item}`}>
                            <div className="icon">
                              <i className="bi bi-shop"></i>
                            </div>
                            <div className="saller-name mx-2">فروشنده:</div>
                            <div className="saller-name text-muted">{item.selectedSeller.name}</div>
                          </div>
                        )}
                        {item.color && (
                          <div className={`d-flex align-items-center ${styles.item}`}>
                            <div className="icon">
                              <i className="bi bi-palette2"></i>
                            </div>
                            <div className="saller-name mx-2">رنگ:</div>
                            <div className="saller-name text-muted">
                              <div className={`mt-0 ${styles.product_meta_color_items}`}>
                                <label className='btn-light mb-0 px-2 py-1'>
                                  <span style={{ backgroundColor: getColorCode(item.color) }}></span>
                                  {item.color}
                                </label>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`${styles.remove} danger-label`}>
                      <a href="#" onClick={handleRemoveItem}>
                        <i className="bi bi-trash-fill font-25"></i>
                      </a>
                    </div>
                  </div>
                  <div className={`${styles.action} d-flex flex-wrap justify-content-sm-end justify-content-center align-items-center mt-3`}>
                    <div className={`d-flex align-items-center flex-wrap ${styles.cart_item_feature}`}>
                      {item.product.hasDiscount && (
                        <div className={`d-flex align-items-center ${styles.item} ms-2`}>
                          <p className={`mb-0 ${styles.old_price} font-16`}>
                            {originalPrice.toLocaleString()}
                          </p>
                        </div>
                      )}
                      <div className={`d-flex align-items-center ${styles.item}`}>
                        <p className={`${styles.new_price} mb-0 font-16`}>
                          {finalPrice.toLocaleString()} تومان
                        </p>
                      </div>
                    </div>
                    <div className={styles.counter}>
                      <div className="input-group">
                        <span className="input-group-btn input-group-prepend">
                          <button
                            className="btn-counter waves-effect waves-light bootstrap-touchspin-down"
                            type="button"
                            onClick={decreaseQuantity}
                            disabled={loading}
                          >-</button>
                        </span>
                        <input
                          ref={counterRef}
                          name="count"
                          className="counter form-counter"
                          value={localQuantity}
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
                            onClick={increaseQuantity}
                            disabled={loading || item.product.stock <= localQuantity}
                          >+</button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;