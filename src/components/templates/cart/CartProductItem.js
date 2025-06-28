// 'use client';

// import React, { useState, useCallback, memo } from 'react';
// import styles from './CartProductItem.module.css';
// import { useCart } from '@/Redux/hooks/useCart';
// import { toast } from 'react-toastify';

// const CartProductItem = memo(({ item }) => {
//   const { updateCartItem, removeFromCart, loading } = useCart();
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [isRemoving, setIsRemoving] = useState(false);
//   const [localQuantity, setLocalQuantity] = useState(item.quantity);

//   if (!item || !item.product) {
//     return null;
//   }

//   // استفاده از useCallback برای جلوگیری از re-render
//   const increaseQuantity = useCallback(async () => {
//     if (item.product.stock > localQuantity && !isUpdating) {
//       const newQuantity = localQuantity + 1;
//       setIsUpdating(true);
//       setLocalQuantity(newQuantity); // بروزرسانی فوری UI
      
//       try {
//         await updateCartItem(item._id, newQuantity);
//       } catch (error) {
//         console.error('خطا در افزایش تعداد:', error);
//         setLocalQuantity(item.quantity); // برگرداندن به مقدار قبلی در صورت خطا
//         toast.error('خطا در افزایش تعداد محصول');
//       } finally {
//         setIsUpdating(false);
//       }
//     }
//   }, [item._id, item.product.stock, localQuantity, isUpdating, updateCartItem, item.quantity]);

//   const decreaseQuantity = useCallback(async () => {
//     if (!isUpdating) {
//       setIsUpdating(true);
      
//       try {
//         if (localQuantity > 1) {
//           const newQuantity = localQuantity - 1;
//           setLocalQuantity(newQuantity); // بروزرسانی فوری UI
//           await updateCartItem(item._id, newQuantity);
//         } else {
//           setIsRemoving(true);
//           await removeFromCart(item._id);
//         }
//       } catch (error) {
//         console.error('خطا در کاهش تعداد:', error);
//         setLocalQuantity(item.quantity); // برگرداندن به مقدار قبلی در صورت خطا
//         toast.error('خطا در تغییر تعداد محصول');
//       } finally {
//         setIsUpdating(false);
//         setIsRemoving(false);
//       }
//     }
//   }, [localQuantity, isUpdating, updateCartItem, removeFromCart, item._id, item.quantity]);

//   const handleRemoveItem = useCallback(async (e) => {
//     e.preventDefault();
//     if (!isRemoving) {
//       setIsRemoving(true);
//       try {
//         await removeFromCart(item._id);
//       } catch (error) {
//         console.error('خطا در حذف محصول:', error);
//         toast.error('خطا در حذف محصول از سبد خرید');
//       } finally {
//         setIsRemoving(false);
//       }
//     }
//   }, [isRemoving, removeFromCart, item._id]);

//   // همگام‌سازی localQuantity با item.quantity وقتی از بیرون تغییر کند
//   React.useEffect(() => {
//     if (!isUpdating && item.quantity !== localQuantity) {
//       setLocalQuantity(item.quantity);
//     }
//   }, [item.quantity, isUpdating, localQuantity]);

//   // محاسبات قیمت - فقط وقتی quantity تغییر کند
//   const finalPrice = React.useMemo(() => {
//     return item.product.hasDiscount
//       ? item.product.discountedPrice * localQuantity
//       : item.product.price * localQuantity;
//   }, [item.product.hasDiscount, item.product.discountedPrice, item.product.price, localQuantity]);

//   const originalPrice = React.useMemo(() => {
//     return item.product.price * localQuantity;
//   }, [item.product.price, localQuantity]);

//   const discountPercentage = React.useMemo(() => {
//     return item.product.hasDiscount
//       ? Math.round(((item.product.price - item.product.discountedPrice) / item.product.price) * 100)
//       : 0;
//   }, [item.product.hasDiscount, item.product.price, item.product.discountedPrice]);

//   const getProductImage = useCallback(() => {
//     if (item.product.image) {
//       if (item.product.image.includes('/images/product/')) {
//         return item.product.image;
//       }
//       return `/images/product/${item.product.image}`;
//     }
//     if (item.product.images && item.product.images.length > 0) {
//       if (item.product.images[0].includes('/images/product/')) {
//         return item.product.images[0];
//       }
//       return `/images/product/${item.product.images[0]}`;
//     }
//     return "/images/product/product-placeholder.jpg";
//   }, [item.product.image, item.product.images]);

//   const getColorCode = useCallback((colorName) => {
//     const colorMap = {
//       'قرمز': '#c00',
//       'مشکی': '#111',
//       'سبز': '#00cc5f',
//       'آبی': '#1b69f0',
//       'نارنجی': '#ff6600',
//       'بنفش': '#6a0dad'
//     };
//     return colorMap[colorName] || '#ccc';
//   }, []);

//   // اگر آیتم در حال حذف است، نمایش loading
//   if (isRemoving) {
//     return (
//       <div className={styles.cart_product_item}>
//         <div className="content-box">
//           <div className="container-fluid">
//             <div className="text-center py-4">
//               <div className="spinner-border spinner-border-sm text-danger" role="status">
//                 <span className="visually-hidden">در حال حذف...</span>
//               </div>
//               <p className="mt-2 text-muted">در حال حذف محصول...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.cart_product_item}>
//       <div className="content-box">
//         <div className="container-fluid">
//           <div className={styles.cart_items}>
//             <div className={styles.item}>
//               <div className="row gy-2">
//                 <div className="col-2 w-100-in-400">
//                   <div className={styles.image}>
//                     <img
//                       src={getProductImage()}
//                       alt={item.product.title || "محصول"}
//                       className='img-fluid'
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "/images/product/product-placeholder.jpg";
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div className="col-10 w-100-in-400">
//                   <div className="d-flex justify-content-between align-items-start">
//                     <div className='d-flex align-items-start flex-column ms-2'>
//                       <div className={`d-flex align-items-center flex-wrap ${styles.title}`}>
//                         <h6 className='font-16'>
//                           {item.product.title}
//                           {item.product.hasDiscount && (
//                             <span className='badge me-2 danger-label rounded-pill'>
//                               {discountPercentage}%
//                             </span>
//                           )}
//                         </h6>
//                       </div>
                      
//                       {/* نمایش اطلاعات اضافی محصول */}
//                       <div className={`d-flex align-items-center flex-wrap mt-3 ${styles.cart_item_feature}`}>
//                         {item.selectedSeller && (
//                           <div className={`d-flex align-items-center ${styles.item}`}>
//                             <div className="icon">
//                               <i className="bi bi-shop"></i>
//                             </div>
//                             <div className="saller-name mx-2">فروشنده:</div>
//                             <div className="saller-name text-muted">{item.selectedSeller.name}</div>
//                           </div>
//                         )}
                        
//                         {item.color && (
//                           <div className={`d-flex align-items-center ${styles.item}`}>
//                             <div className="icon">
//                               <i className="bi bi-palette2"></i>
//                             </div>
//                             <div className="saller-name mx-2">رنگ:</div>
//                             <div className="saller-name text-muted">
//                               <div className={`mt-0 ${styles.product_meta_color_items}`}>
//                                 <label className='btn-light mb-0 px-2 py-1'>
//                                   <span style={{ backgroundColor: getColorCode(item.color) }}></span>
//                                   {item.color}
//                                 </label>
//                               </div>
//                             </div>
//                           </div>
//                         )}

//                         {item.size && (
//                           <div className={`d-flex align-items-center ${styles.item}`}>
//                             <div className="icon">
//                               <i className="bi bi-rulers"></i>
//                             </div>
//                             <div className="saller-name mx-2">سایز:</div>
//                             <div className="saller-name text-muted">{item.size}</div>
//                           </div>
//                         )}

//                         {/* نمایش موجودی */}
//                         <div className={`d-flex align-items-center ${styles.item}`}>
//                           <div className="icon">
//                             <i className="bi bi-box"></i>
//                           </div>
//                           <div className="saller-name mx-2">موجودی:</div>
//                           <div className={`saller-name ${item.product.stock > 5 ? 'text-success' : 'text-warning'}`}>
//                             {item.product.stock} عدد
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className={`${styles.remove} danger-label`}>
//                       <a 
//                         href="#" 
//                         onClick={handleRemoveItem}
//                         title="حذف از سبد خرید"
//                         style={{ opacity: isRemoving ? 0.5 : 1 }}
//                       >
//                         {isRemoving ? (
//                           <div className="spinner-border spinner-border-sm text-danger" role="status">
//                             <span className="visually-hidden">در حال حذف...</span>
//                           </div>
//                         ) : (
//                           <i className="bi bi-trash-fill font-25"></i>
//                         )}
//                       </a>
//                     </div>
//                   </div>
                  
//                   <div className={`${styles.action} d-flex flex-wrap justify-content-sm-end justify-content-center align-items-center mt-3`}>
//                     <div className={`d-flex align-items-center flex-wrap ${styles.cart_item_feature}`}>
//                       {item.product.hasDiscount && (
//                         <div className={`d-flex align-items-center ${styles.item} ms-2`}>
//                           <p className={`mb-0 ${styles.old_price} font-16`}>
//                             {originalPrice.toLocaleString()}
//                           </p>
//                         </div>
//                       )}
//                       <div className={`d-flex align-items-center ${styles.item}`}>
//                         <p className={`${styles.new_price} mb-0 font-16`}>
//                           {finalPrice.toLocaleString()} تومان
//                         </p>
//                       </div>
//                     </div>
                    
//                     <div className={styles.counter}>
//                       <div className="input-group">
//                         <span className="input-group-btn input-group-prepend">
//                           <button
//                             className="btn-counter waves-effect waves-light bootstrap-touchspin-down"
//                             type="button"
//                             onClick={decreaseQuantity}
//                             disabled={loading || isUpdating}
//                             title={localQuantity === 1 ? 'حذف از سبد خرید' : 'کاهش تعداد'}
//                           >
//                             {isUpdating ? (
//                               <div className="spinner-border spinner-border-sm" role="status">
//                                 <span className="visually-hidden">Loading...</span>
//                               </div>
//                             ) : (
//                               '-'
//                             )}
//                           </button>
//                         </span>
//                         <input
//                           name="count"
//                           className="counter form-counter"
//                           value={localQuantity}
//                           readOnly
//                           style={{
//                             textAlign: 'center',
//                             fontWeight: 'bold'
//                           }}
//                         />
//                         <span className="input-group-btn input-group-append">
//                           <button
//                             className="btn-counter waves-effect waves-light bootstrap-touchspin-up"
//                             type="button"
//                             onClick={increaseQuantity}
//                             disabled={loading || isUpdating || item.product.stock <= localQuantity}
//                             title={item.product.stock <= localQuantity ? 'موجودی کافی نیست' : 'افزایش تعداد'}
//                           >
//                             {isUpdating ? (
//                               <div className="spinner-border spinner-border-sm" role="status">
//                                 <span className="visually-hidden">Loading...</span>
//                               </div>
//                             ) : (
//                               '+'
//                             )}
//                           </button>
//                         </span>
//                       </div>
                      
//                       {/* هشدار موجودی کم */}
//                       {item.product.stock <= localQuantity && (
//                         <small className="text-warning d-block text-center mt-1">
//                           موجودی کافی نیست
//                         </small>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// CartProductItem.displayName = 'CartProductItem';

// export default CartProductItem;



'use client';

import React, { useState, useCallback, memo, useEffect } from 'react';
import styles from './CartProductItem.module.css';
import { useCart } from '@/Redux/hooks/useCart';
import { toast } from 'react-toastify';

const CartProductItem = memo(({ item }) => {
  const { updateCartItem, removeFromCart, loading, isHydrated } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!item || !item.product) {
    return null;
  }

  // استفاده از useCallback برای جلوگیری از re-render
  const increaseQuantity = useCallback(async () => {
    if (item.product.stock > localQuantity && !isUpdating && isMounted && isHydrated) {
      const newQuantity = localQuantity + 1;
      setIsUpdating(true);
      setLocalQuantity(newQuantity); // بروزرسانی فوری UI
      
      try {
        await updateCartItem(item._id, newQuantity);
      } catch (error) {
        console.error('خطا در افزایش تعداد:', error);
        setLocalQuantity(item.quantity); // برگرداندن به مقدار قبلی در صورت خطا
        toast.error('خطا در افزایش تعداد محصول');
      } finally {
        setIsUpdating(false);
      }
    }
  }, [item._id, item.product.stock, localQuantity, isUpdating, updateCartItem, item.quantity, isMounted, isHydrated]);

  const decreaseQuantity = useCallback(async () => {
    if (!isUpdating && isMounted && isHydrated) {
      setIsUpdating(true);
      
      try {
        if (localQuantity > 1) {
          const newQuantity = localQuantity - 1;
          setLocalQuantity(newQuantity); // بروزرسانی فوری UI
          await updateCartItem(item._id, newQuantity);
        } else {
          setIsRemoving(true);
          await removeFromCart(item._id);
        }
      } catch (error) {
        console.error('خطا در کاهش تعداد:', error);
        setLocalQuantity(item.quantity); // برگرداندن به مقدار قبلی در صورت خطا
        toast.error('خطا در تغییر تعداد محصول');
      } finally {
        setIsUpdating(false);
        setIsRemoving(false);
      }
    }
  }, [localQuantity, isUpdating, updateCartItem, removeFromCart, item._id, item.quantity, isMounted, isHydrated]);

  const handleRemoveItem = useCallback(async (e) => {
    e.preventDefault();
    if (!isRemoving && isMounted && isHydrated) {
      setIsRemoving(true);
      try {
        await removeFromCart(item._id);
      } catch (error) {
        console.error('خطا در حذف محصول:', error);
        toast.error('خطا در حذف محصول از سبد خرید');
      } finally {
        setIsRemoving(false);
      }
    }
  }, [isRemoving, removeFromCart, item._id, isMounted, isHydrated]);

  // همگام‌سازی localQuantity با item.quantity وقتی از بیرون تغییر کند
  React.useEffect(() => {
    if (!isUpdating && item.quantity !== localQuantity && isMounted && isHydrated) {
      setLocalQuantity(item.quantity);
    }
  }, [item.quantity, isUpdating, localQuantity, isMounted, isHydrated]);

  // محاسبات قیمت - فقط وقتی quantity تغییر کند
  const finalPrice = React.useMemo(() => {
    return item.product.hasDiscount
      ? item.product.discountedPrice * localQuantity
      : item.product.price * localQuantity;
  }, [item.product.hasDiscount, item.product.discountedPrice, item.product.price, localQuantity]);

  const originalPrice = React.useMemo(() => {
    return item.product.price * localQuantity;
  }, [item.product.price, localQuantity]);

  const discountPercentage = React.useMemo(() => {
    return item.product.hasDiscount
      ? Math.round(((item.product.price - item.product.discountedPrice) / item.product.price) * 100)
      : 0;
  }, [item.product.hasDiscount, item.product.price, item.product.discountedPrice]);

  const getProductImage = useCallback(() => {
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
  }, [item.product.image, item.product.images]);

  const getColorCode = useCallback((colorName) => {
    const colorMap = {
      'قرمز': '#c00',
      'مشکی': '#111',
      'سبز': '#00cc5f',
      'آبی': '#1b69f0',
      'نارنجی': '#ff6600',
      'بنفش': '#6a0dad'
    };
    return colorMap[colorName] || '#ccc';
  }, []);

  // اگر هنوز mount نشده یا hydrate نشده، نمایش ساده
  if (!isMounted || !isHydrated) {
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
                        
                        {/* نمایش اطلاعات اضافی محصول */}
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

                          {item.size && (
                            <div className={`d-flex align-items-center ${styles.item}`}>
                              <div className="icon">
                                <i className="bi bi-rulers"></i>
                              </div>
                              <div className="saller-name mx-2">سایز:</div>
                              <div className="saller-name text-muted">{item.size}</div>
                            </div>
                          )}

                          {/* نمایش موجودی */}
                          <div className={`d-flex align-items-center ${styles.item}`}>
                            <div className="icon">
                              <i className="bi bi-box"></i>
                            </div>
                            <div className="saller-name mx-2">موجودی:</div>
                            <div className={`saller-name ${item.product.stock > 5 ? 'text-success' : 'text-warning'}`}>
                              {item.product.stock} عدد
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`${styles.remove} danger-label`}>
                        <div className="spinner-border spinner-border-sm text-muted" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
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
                              disabled
                            >
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </button>
                          </span>
                          <input
                            name="count"
                            className="counter form-counter"
                            value={item.quantity}
                            readOnly
                            style={{
                              textAlign: 'center',
                              fontWeight: 'bold'
                            }}
                          />
                          <span className="input-group-btn input-group-append">
                            <button
                              className="btn-counter waves-effect waves-light bootstrap-touchspin-up"
                              type="button"
                              disabled
                            >
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </button>
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
  }

  // اگر آیتم در حال حذف است، نمایش loading
  if (isRemoving) {
    return (
      <div className={styles.cart_product_item}>
        <div className="content-box">
          <div className="container-fluid">
            <div className="text-center py-4">
              <div className="spinner-border spinner-border-sm text-danger" role="status">
                <span className="visually-hidden">در حال حذف...</span>
              </div>
              <p className="mt-2 text-muted">در حال حذف محصول...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                      
                      {/* نمایش اطلاعات اضافی محصول */}
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

                        {item.size && (
                          <div className={`d-flex align-items-center ${styles.item}`}>
                            <div className="icon">
                              <i className="bi bi-rulers"></i>
                            </div>
                            <div className="saller-name mx-2">سایز:</div>
                            <div className="saller-name text-muted">{item.size}</div>
                          </div>
                        )}

                        {/* نمایش موجودی */}
                        <div className={`d-flex align-items-center ${styles.item}`}>
                          <div className="icon">
                            <i className="bi bi-box"></i>
                          </div>
                          <div className="saller-name mx-2">موجودی:</div>
                          <div className={`saller-name ${item.product.stock > 5 ? 'text-success' : 'text-warning'}`}>
                            {item.product.stock} عدد
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`${styles.remove} danger-label`}>
                      <a 
                        href="#" 
                        onClick={handleRemoveItem}
                        title="حذف از سبد خرید"
                        style={{ opacity: isRemoving ? 0.5 : 1 }}
                      >
                        {isRemoving ? (
                          <div className="spinner-border spinner-border-sm text-danger" role="status">
                            <span className="visually-hidden">در حال حذف...</span>
                          </div>
                        ) : (
                          <i className="bi bi-trash-fill font-25"></i>
                        )}
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
                            disabled={loading || isUpdating}
                            title={localQuantity === 1 ? 'حذف از سبد خرید' : 'کاهش تعداد'}
                          >
                            {isUpdating ? (
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            ) : (
                              '-'
                            )}
                          </button>
                        </span>
                        <input
                          name="count"
                          className="counter form-counter"
                          value={localQuantity}
                          readOnly
                          style={{
                            textAlign: 'center',
                            fontWeight: 'bold'
                          }}
                        />
                        <span className="input-group-btn input-group-append">
                          <button
                            className="btn-counter waves-effect waves-light bootstrap-touchspin-up"
                            type="button"
                            onClick={increaseQuantity}
                            disabled={loading || isUpdating || item.product.stock <= localQuantity}
                            title={item.product.stock <= localQuantity ? 'موجودی کافی نیست' : 'افزایش تعداد'}
                          >
                            {isUpdating ? (
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            ) : (
                              '+'
                            )}
                          </button>
                        </span>
                      </div>
                      
                      {/* هشدار موجودی کم */}
                      {item.product.stock <= localQuantity && (
                        <small className="text-warning d-block text-center mt-1">
                          موجودی کافی نیست
                        </small>
                      )}
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
});

CartProductItem.displayName = 'CartProductItem';

export default CartProductItem;