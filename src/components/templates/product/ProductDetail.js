'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './productDetail.module.css';
import { useCart } from '@/Redux/hooks/useCart';
import { toast } from 'react-toastify';

function ProductDetail({ product }) {
  const { addToCart, loading, error, clearError } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedColor, setSelectedColor] = useState(() => {
    if (product.colors && product.colors.length > 0) {
      const firstAvailableColor = product.colors.find(color => color.available);
      return firstAvailableColor ? firstAvailableColor.color : null;
    }
    return null;
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const inputRef = useRef(null);

  // رفع مشکل hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // رفع مشکل Safari iOS - Force update input value
  useEffect(() => {
    if (inputRef.current && isHydrated) {
      inputRef.current.value = quantity.toString();
    }
    
    const updateAllCounterInputs = () => {
      const inputs = document.querySelectorAll('input[name="count"]');
      inputs.forEach(input => {
        if (input && input.value !== quantity.toString()) {
          input.value = quantity.toString();
        }
      });
    };

    if (isHydrated && quantity) {
      updateAllCounterInputs();
      setTimeout(updateAllCounterInputs, 100);
    }
  }, [quantity, isHydrated]);

  useEffect(() => {
    if (product && product.sellers && product.sellers.length > 0) {
      // انتخاب اولین فروشنده یا فروشنده پیش‌فرض
      const defaultSeller = product.sellers.find(seller => 
        seller.isSelected || seller.name === "فروشگاه نسیم"
      ) || product.sellers[0];
      
      setSelectedSeller({
        _id: defaultSeller._id || defaultSeller,
        name: defaultSeller.name || "فروشگاه نسیم",
      });
    }
  }, [product]);

  // پاک کردن خطا هنگام تغییر محصول
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [product, clearError]);

  const increaseQuantity = () => {
    if (product && product.stock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    
    // بررسی‌های اولیه
    if (isAdding) {
      return;
    }

    if (!product) {
      toast.error('اطلاعات محصول موجود نیست');
      return;
    }

    if (!selectedSeller || !selectedSeller._id) {
      toast.error('لطفاً فروشنده را انتخاب کنید');
      return;
    }

    if (product.stock < quantity) {
      toast.error('موجودی محصول کافی نیست');
      return;
    }

    setIsAdding(true);
    
    try {
      // پاک کردن خطای قبلی
      clearError();

      const productData = {
        ...product,
        image: product.image
          ? (product.image.startsWith('/') ? product.image : `/images/product/${product.image}`)
          : '/images/product/product-placeholder.jpg',
      };

      // ارسال فقط ID فروشنده (نه کل object)
      const sellerIdToSend = typeof selectedSeller._id === 'string' 
        ? selectedSeller._id 
        : String(selectedSeller._id);

      await addToCart(
        productData, 
        quantity, 
        selectedColor, 
        null, // size
        sellerIdToSend // فقط ID فروشنده
      );

      // هیچ toast اینجا نمایش نمی‌دهیم - فقط در cartThunks

    } catch (error) {
      console.error('Error adding to cart:', error);
      
      // فقط در صورت خطاهای خاص، toast نمایش می‌دهیم
      if (error.message && !error.message.includes('toast')) {
        let errorMessage = 'خطا در افزودن به سبد خرید';
        
        if (error.message.includes('موجودی')) {
          errorMessage = 'موجودی محصول کافی نیست';
        } else if (error.message.includes('لاگین') || error.message.includes('وارد')) {
          errorMessage = 'برای افزودن به سبد خرید باید وارد شوید';
        } else if (error.message.includes('محصول یافت نشد')) {
          errorMessage = 'محصول موردنظر یافت نشد';
        } else if (error.message.includes('فروشنده')) {
          errorMessage = 'فروشنده انتخابی معتبر نیست';
        } else {
          errorMessage = 'خطا در ارتباط با سرور. لطفاً مجدد تلاش کنید';
        }
        
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    } finally {
      setIsAdding(false);
    }
  };

  if (!product) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div>
      <div className={styles.product_meta_title}>
        <div className="row align-items-baseline gy-3">
          <div className="col-lg-8">
            <h5 className="font-16">{product.title}</h5>
            <p className="mb-0 mt-2 text-muted">{product.originalName}</p>
          </div>
          <div className="col-lg-4">
            <a href="" className="text-lg-start d-block">
              <img src={`/images/${product.brandIcon}`} alt="" className="img-fluid" />
            </a>
          </div>
        </div>
      </div>
      
      <div className={styles.product_meta_feature}>
        <div className="row gy-3">
          <div className="col-lg-8">
            <div className={styles.product_meta_feature_items}>
              <h5 className="title font-16 mb-2">ویژگی‌های کالا</h5>
              <ul className="navbar-nav">
                {product.features && product.features.length > 0 ? (
                  product.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="nav item">
                      <span>{feature.key}:</span><strong>{feature.value}</strong>
                    </li>
                  ))
                ) : (
                  <li className="nav item"><span>اطلاعات محصول موجود نیست</span></li>
                )}
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className={styles.product_meta_rating}>
              <div className="d-flex align-items-center justify-content-lg-end">
                <div className={`${styles.count_comment} text-muted`}>
                  {product.comments ? product.comments.length : '0'} دیدگاه
                </div>
                <div className={styles.count_rating}>
                  <span>({product.rating || '0'}) {product.rating || '0'}</span>
                  <i className="bi bi-star-fill"></i>
                </div>
              </div>
            </div>
            <div className={`${styles.product_meta_garanty} justify-content-lg-end justify-content-start`}>
              <i className="bi bi-shield-fill-check"></i>
              <span className="text-muted"> گارانتی اصالت و سلامت فیزیکی کالا</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="product-meta-color">
        <h5 className="font-16">انتخاب رنگ کالا</h5>
        <div className="product-meta-color-items">
          {product.colors && product.colors.length > 0 ? (
            product.colors.map((colorItem, index) => (
              <React.Fragment key={index}>
                <input
                  type="radio"
                  className="btn-check"
                  name="colorOptions"
                  id={`colorOption${index}`}
                  autoComplete="off"
                  checked={selectedColor === colorItem.color}
                  onChange={() => setSelectedColor(colorItem.color)}
                  disabled={!colorItem.available}
                />
                <label className="btn" htmlFor={`colorOption${index}`}>
                  <span style={{ backgroundColor: getColorCode(colorItem.color) }}></span>
                  {colorItem.color}
                </label>
              </React.Fragment>
            ))
          ) : (
            <p>رنگ‌های محصول موجود نیست</p>
          )}
        </div>
      </div>
      
      {selectedSeller && (
        <div className="product-meta-seller mt-3">
          <h5 className="font-16">فروشنده</h5>
          <div className="d-flex align-items-center mt-2">
            <i className="bi bi-shop ms-2"></i>
            <span>{selectedSeller.name}</span>
          </div>
        </div>
      )}
      
      <div className={`${styles.productmeta_count} text-muted`}>
        <span>{product.stock || '0'} عدد در انبار</span>
      </div>
      
      <div className={styles.product_meta_action}>
        <div className="row align-items-center gy-3">
          {product.hasDiscount && (
            <div className="col-lg-3 col-6 w-100-in-400">
              <p className={`mb-0 ${styles.old_price} font-16 text-lg-start text-center`}>
                {product.price ? product.price.toLocaleString() : '0'} تومان
              </p>
            </div>
          )}
          <div className="col-lg-3 col-6 w-100-in-400">
            <h6 className={`font-16 ${styles.new_price} main-color-one-color`}>
              {product.hasDiscount
                ? (product.discountedPrice ? product.discountedPrice.toLocaleString() : '0')
                : (product.price ? product.price.toLocaleString() : '0')} تومان
            </h6>
          </div>
          <div className="col-lg-3 col-6 w-100-in-400">
            <div className="d-flex justify-content-center">
              <button
                onClick={handleAddToCart}
                disabled={loading || isAdding || product.stock <= 0 || !selectedSeller}
                className="btn w-100 border-0 main-color-three-bg"
              >
                <i className="bi bi-basket text-white font-20 ms-1"></i>
                {loading || isAdding ? 'در حال افزودن...' : (product.stock <= 0 ? 'ناموجود' : 'خرید کالا')}
              </button>
            </div>
            
            {/* نمایش خطا فقط در حالت توسعه */}
            {error && process.env.NODE_ENV === 'development' && (
              <div className="text-danger mt-2 text-center small">
                DEBUG: {error}
              </div>
            )}
          </div>
          <div className="col-lg-3 col-6 w-100-in-400">
            <div className="counter">
              <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                <span className="input-group-btn input-group-prepend">
                  <button
                    className="btn-counter waves-effect waves-light bootstrap-touchspin-down"
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1 || loading || isAdding}
                  >-</button>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  name="count"
                  className="counter form-counter"
                  defaultValue={quantity}
                  readOnly
                  style={{
                    textAlign: 'center',
                    fontSize: '16px',
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
                    disabled={product.stock <= quantity || loading || isAdding}
                  >+</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getColorCode(colorName) {
  const colorMap = {
    'قرمز': '#c00',
    'مشکی': '#111',
    'سبز': '#00cc5f',
    'آبی': '#1b69f0',
    'نارنجی': '#ff6600',
    'بنفش': '#6a0dad',
  };
  return colorMap[colorName] || '#ccc';
}

export default ProductDetail;