// 'use client';

// import React, { useEffect, useState } from 'react';
// import styles from '@/styles/cart.module.css';
// import Header from '@/components/modules/header/Header';
// import Footer from '@/components/modules/footer/Footer';
// import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
// import LineStep from '@/components/templates/cart/LineStep';
// import CartProduct from '@/components/templates/cart/CartProduct';
// import EmptyCart from '@/components/templates/cart/EmptyCart';
// import { useCart } from '@/Redux/hooks/useCart';
// import { useDispatch } from 'react-redux';
// import { syncCartFromLocalStorage } from '@/Redux/actions/cartThunks';

// const CartPage = () => {
//   const { items, loading } = useCart();
//   const dispatch = useDispatch();
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     dispatch(syncCartFromLocalStorage());
//   }, [dispatch]);

//   if (!isClient || loading) {
//     return (
//       <>
//         <Header />
//         <BreadCroumb />
//         <div className="content">
//           <div className="container-fluid text-center py-5">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <p className="mt-3">در حال بارگذاری سبد خرید...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const hasItems = items && items.length > 0;

//   return (
//     <>
//       <Header />
//       <BreadCroumb />
//       {hasItems ? (
//         <div className="content">
//           <div className="container-fluid">
//             <LineStep />
//           </div>
//           <div className="container-fluid">
//             <CartProduct />
//           </div>
//         </div>
//       ) : (
//         <EmptyCart />
//       )}
//       <Footer />
//     </>
//   );
// };

// export default CartPage;

'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/styles/cart.module.css';
import Header from '@/components/modules/header/Header';
import Footer from '@/components/modules/footer/Footer';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import LineStep from '@/components/templates/cart/LineStep';
import CartProduct from '@/components/templates/cart/CartProduct';
import EmptyCart from '@/components/templates/cart/EmptyCart';
import { useCart } from '@/Redux/hooks/useCart';
import { useAuth } from '@/Redux/hooks/useAuth';

const CartPage = () => {
  const { 
    items, 
    loading, 
    error, 
    isReady, 
    isHydrated,
    refreshCart,
    clearError,
    totalQuantity,
    itemCount
  } = useCart();
  
  const { isAuthenticated } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Debug log برای CartPage
  useEffect(() => {
    if (isClient) {
      console.log('📄 CartPage Debug:', {
        items: items,
        itemsLength: items?.length || 0,
        totalQuantity: totalQuantity,
        itemCount: itemCount,
        isReady: isReady,
        isHydrated: isHydrated,
        loading: loading,
        error: error,
        isAuthenticated: isAuthenticated
      });
    }
  }, [isClient, items, totalQuantity, itemCount, isReady, isHydrated, loading, error, isAuthenticated]);

  // پاک کردن خطا هنگام بارگذاری صفحه
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [error, clearError]);

  // رفرش سبد خرید در صورت نیاز
  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    refreshCart();
  };

  // Loading state
  if (!isClient || !isReady || (!isHydrated && loading)) {
    return (
      <>
        <Header />
        <BreadCroumb />
        <div className="content">
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

  // Error state
  if (error) {
    return (
      <>
        <Header />
        <BreadCroumb />
        <div className="content">
          <div className="container-fluid py-5">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="card border-0 shadow">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <h5 className="mb-3">خطا در بارگذاری سبد خرید</h5>
                    <p className="text-muted mb-4">{error}</p>
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={handleRefresh}
                        disabled={loading}
                      >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        {loading ? 'در حال بارگذاری...' : 'تلاش مجدد'}
                      </button>
                      <a href="/" className="btn btn-outline-secondary">
                        بازگشت به صفحه اصلی
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // بررسی دقیق‌تر وجود آیتم‌ها
  const hasItems = Array.isArray(items) && items.length > 0;
  
  console.log('🎯 Cart Page Final Check:', {
    hasItems: hasItems,
    itemsArray: items,
    itemsLength: items?.length,
    isArray: Array.isArray(items)
  });

  return (
    <>
      <Header />
      <BreadCroumb />
      {hasItems ? (
        <div className="content">
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