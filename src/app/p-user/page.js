// "use client";

// import React, { useState, useEffect } from 'react';
// import Layout from '@/components/layouts/UserPanelLayout';
// import styles from '@/styles/p-user/index.module.css';
// import Box from '@/components/templates/p-user/index/Box';
// import OrderCart from '@/components/modules/p-user/index/OrderCart';
// import { useAuth } from '@/Redux/hooks/useAuth';
// import { useRouter } from 'next/navigation';
// import swal from 'sweetalert';
// import Link from 'next/link';

// function Page() {
//   const { user, logout } = useAuth();
//   const router = useRouter();

//   // State برای سفارشات
//   const [orders, setOrders] = useState([]);
//   const [ordersCount, setOrdersCount] = useState(0);
//   const [addressesCount, setAddressesCount] = useState(0);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);

//     // بارگذاری داده‌ها از localStorage
//     const loadUserData = () => {
//       try {
//         // بارگذاری سفارشات
//         const orderHistory = localStorage.getItem('order_history');
//         if (orderHistory) {
//           const parsedOrders = JSON.parse(orderHistory);

//           // مرتب‌سازی بر اساس تاریخ (جدیدترین اول) و گرفتن 3 تای آخر
//           const sortedOrders = parsedOrders
//             .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//             .slice(0, 3)
//             .map(order => {
//               // آماده‌سازی داده برای OrderCart
//               const firstProduct = order.items?.[0]?.product;
//               const totalItems = order.items?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;

//               return {
//                 id: order.orderNumber || `order_${Date.now()}`,
//                 orderNumber: order.orderNumber,
//                 name: firstProduct?.title || firstProduct?.name || 'محصول نامشخص',
//                 totalPrice: order.pricing?.finalPrice || 0,
//                 status: order.status || 'completed',
//                 createdAt: order.createdAt,
//                 orderDate: order.orderDate,
//                 items: order.items || [],
//                 itemCount: totalItems,
//                 // اطلاعات اضافی برای نمایش
//                 shippingMethod: order.shippingMethod?.name || 'ارسال عادی',
//                 paymentMethod: order.paymentMethod === 'DirectBankPayment' ? 'پرداخت آنلاین' : 'پرداخت در محل'
//               };
//             });

//           setOrders(sortedOrders);
//           setOrdersCount(parsedOrders.length);
//         }

//         // بارگذاری آدرس‌ها (اگر در localStorage ذخیره میشن)
//         const savedAddresses = localStorage.getItem('user_addresses');
//         if (savedAddresses) {
//           const parsedAddresses = JSON.parse(savedAddresses);
//           setAddressesCount(parsedAddresses.length);
//         }

//         // یا از user object (اگر آدرس‌ها در Redux هست)
//         if (user?.addresses) {
//           setAddressesCount(user.addresses.length);
//         }

//       } catch (error) {
//         console.error('Error loading user data:', error);
//       }
//     };

//     loadUserData();
//   }, [user]);

//   const handleLogout = () => {
//     swal({
//       title: "آیا از خروج اطمینان دارید؟",
//       icon: "warning",
//       buttons: ["نه", "آره"]
//     }).then((result) => {
//       if (result) {
//         logout().then(() => {
//           router.push("/");
//         });
//       }
//     });
//   };

//   // تابع فرمت تاریخ
//   const formatDate = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('fa-IR', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       });
//     } catch (error) {
//       return 'نامشخص';
//     }
//   };

//   // تابع تعیین وضعیت سفارش
//   const getOrderStatusText = (status) => {
//     switch (status) {
//       case 'completed':
//         return { text: 'تکمیل شده', class: 'text-success' };
//       case 'processing':
//         return { text: 'در حال پردازش', class: 'text-warning' };
//       case 'shipped':
//         return { text: 'ارسال شده', class: 'text-info' };
//       case 'delivered':
//         return { text: 'تحویل داده شده', class: 'text-success' };
//       case 'cancelled':
//         return { text: 'لغو شده', class: 'text-danger' };
//       default:
//         return { text: 'در انتظار بررسی', class: 'text-secondary' };
//     }
//   };

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <Layout>
//       <main>
//         <div className="content-box">
//           <div className="container-fluid">
//             <div className="row gy-3">
//               <div className="col-lg-8">
//                 <h6 className='font-14 main-color-one-color'>
//                   سلام {user?.username || user?.firstName || 'کاربر'} عزیز
//                 </h6>
//                 <h6 className='font-14 my-3'>
//                   به فروشگاه نسیم استور خوش آمدید
//                 </h6>
//                 <p className='text-muted'>
//                   از پیش خوان حساب کاربری خود میتوانید <span className='def-color fw-bold'>آخرین سفارش ها</span> را ببینید به راحتی <span className='def-color fw-bold'> آدرس حمل و نقل و صورت حساب</span> را مدیریت کنید و <span className='def-color fw-bold'>اطلاعات حساب کاربری و رمز عبور</span> خود را تغییر دهید.
//                 </p>
//               </div>
//               <div className="col-lg-4">
//                 <div className={styles.panel_image}>
//                   <img src="/images/panel.svg" alt="panel image" className='img-fluid' />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Box های آمار */}
//         <div className={styles.status_panel_user}>
//           <div className="row g-3">
//             <Box
//               href="/p-user/orders"
//               title='سفارشات من'
//               iconClass="bi-cart"
//               badgeCount={ordersCount}
//             />
//             <Box
//               href="/p-user/address"
//               title='آدرس های من'
//               iconClass="bi-pin-map"
//               badgeCount={addressesCount > 0 ? addressesCount : undefined}
//             />
//             <Box
//               href="/p-user/profile"
//               title='حساب کاربری من'
//               iconClass="bi-person"
//             />
//             <Box
//               title='خروج از حساب'
//               iconClass="bi-arrow-right-square"
//               onClick={handleLogout}
//             />
//           </div>
//         </div>

//         {/* آخرین سفارشات */}
//         <div className={`${styles.latest_order} mt-3`}>
//           <div className="content-box">
//             <div className="container-fluid">
//               <div className={styles.site_table}>
//                 <div className='title title-panel d-flex align-items-baseline'>
//                   <i className='bi bi-cart-check font-25'></i>
//                   <h6 className="font-16 me-2">
//                     آخرین
//                     <span className=' d-inline-block me-2'>سفارشات : </span>
//                     {ordersCount > 0 && (
//                       <span className="badge ms-2 font-12">
//                         {ordersCount} سفارش
//                       </span>
//                     )}
//                   </h6>
//                 </div>

//                 {orders.length > 0 ? (
//                   <div className="row g-3 mt-3">
//                     {orders.map((order, index) => (
//                       <div key={order.id} className="col-12">
//                         <div className="card border-0 shadow-sm">
//                           <div className="card-body p-3">
//                             <div className="row align-items-center">
//                               <div className="col-md-3">
//                                 <Link href={`/p-user/order-detail/${order.id}`}>
//                                   <h6 className="mb-1 font-14 text-truncate" style={{ maxWidth: '250px' }}>
//                                     {order.name}
//                                   </h6>
//                                 </Link>
//                                 <small className="text-muted">
//                                   کد سفارش: {order.orderNumber}
//                                 </small>
//                               </div>
//                               <div className="col-md-2">
//                                 <span className="fw-bold">
//                                   {order.totalPrice?.toLocaleString()} تومان
//                                 </span>
//                               </div>
//                               <div className="col-md-2">
//                                 <small className="text-muted">
//                                   {order.itemCount} عدد
//                                 </small>
//                               </div>
//                               <div className="col-md-3">
//                                 <span className={`badge ${getOrderStatusText(order.status).class}`}>
//                                   {getOrderStatusText(order.status).text}
//                                 </span>
//                                 <br />
//                                 <small className="text-muted">
//                                   {formatDate(order.createdAt)}
//                                 </small>
//                               </div>
//                               <div className="col-md-2 text-end">
//                                 <Link
//                                   href={`/p-user/order-detail/${order.id}`}
//                                   className="card border-0 shadow-sm d-inline-block text-decoration-none"
//                                   style={{ padding: '8px 10px' }}
//                                 >
//                                   مشاهده
//                                 </Link>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-5">
//                     <div className="alert alert-info">
//                       <i className="bi bi-cart-x font-24 text-muted d-block mb-2"></i>
//                       <h6>هنوز سفارشی ثبت نکرده‌اید</h6>
//                       <p className="mb-3">برای شروع خرید به صفحه اصلی بروید</p>
//                       <a href="/" className="btn btn-primary btn-sm">
//                         شروع خرید
//                       </a>
//                     </div>
//                   </div>
//                 )}

//                 {/* لینک مشاهده همه */}
//                 {orders.length > 0 && (
//                   <div className="text-center mt-4">
//                     <a
//                       href="/p-user/orders"
//                       className="card border-0 shadow-sm fw-bold text-decoration-none d-inline-block  "
//                       style={{ padding: '12px 20px' }}
//                     >
//                       مشاهده همه سفارشات
//                       <i
//                         className="bi bi-arrow-left me-2"
//                         style={{ verticalAlign: 'middle' }}
//                       >
//                       </i>
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </Layout>
//   );
// }

// export default Page;

"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/UserPanelLayout';
import styles from '@/styles/p-user/index.module.css';
import Box from '@/components/templates/p-user/index/Box';
import { useAuth } from '@/Redux/hooks/useAuth';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';
import Link from 'next/link';

function Page() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // State برای سفارشات
  const [hasOrder, setHasOrder] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [addressesCount, setAddressesCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // بارگذاری داده‌ها از localStorage
    const loadUserData = () => {
      try {
        // بارگذاری سفارش از order_details
        const orderDetails = localStorage.getItem('order_details');
        if (orderDetails) {
          const parsedOrder = JSON.parse(orderDetails);
          
          // آماده‌سازی داده برای نمایش
          const firstProduct = parsedOrder.items?.[0]?.product;
          const totalItems = parsedOrder.items?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;
          
          const orderForDisplay = {
            id: Math.random().toString(36).substr(2, 9),
            orderNumber: Math.random().toString(36).substr(2, 9),
            name: firstProduct?.title || firstProduct?.name || 'محصول نامشخص',
            totalPrice: parsedOrder.pricing?.finalPrice || 0,
            status: 'completed',
            createdAt: new Date(parsedOrder.timestamp).toISOString(),
            items: parsedOrder.items || [],
            itemCount: totalItems,
            shippingMethod: parsedOrder.shippingMethod?.name || 'ارسال عادی',
            paymentMethod: parsedOrder.paymentMethod === 'DirectBankPayment' ? 'پرداخت آنلاین' : 'پرداخت در محل'
          };

          setOrderData(orderForDisplay);
          setHasOrder(true);
        }

        // بارگذاری آدرس‌ها از user object
        if (user?.addresses) {
          setAddressesCount(user.addresses.length);
        }

      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, [user]);

  const handleLogout = () => {
    swal({
      title: "آیا از خروج اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"]
    }).then((result) => {
      if (result) {
        logout().then(() => {
          router.push("/");
        });
      }
    });
  };

  // تابع فرمت تاریخ
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'نامشخص';
    }
  };

  // تابع تعیین وضعیت سفارش
  const getOrderStatusText = (status) => {
    switch (status) {
      case 'completed':
        return { text: 'تکمیل شده', class: 'text-success' };
      case 'processing':
        return { text: 'در حال پردازش', class: 'text-warning' };
      case 'shipped':
        return { text: 'ارسال شده', class: 'text-info' };
      case 'delivered':
        return { text: 'تحویل داده شده', class: 'text-success' };
      case 'cancelled':
        return { text: 'لغو شده', class: 'text-danger' };
      default:
        return { text: 'در انتظار بررسی', class: 'text-secondary' };
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Layout>
      <main>
        <div className="content-box">
          <div className="container-fluid">
            <div className="row gy-3">
              <div className="col-lg-8">
                <h6 className='font-14 main-color-one-color'>
                  سلام {user?.username || user?.firstName || 'کاربر'} عزیز
                </h6>
                <h6 className='font-14 my-3'>
                  به فروشگاه نسیم استور خوش آمدید
                </h6>
                <p className='text-muted'>
                  از پیش خوان حساب کاربری خود میتوانید <span className='def-color fw-bold'>آخرین سفارش ها</span> را ببینید به راحتی <span className='def-color fw-bold'> آدرس حمل و نقل و صورت حساب</span> را مدیریت کنید و <span className='def-color fw-bold'>اطلاعات حساب کاربری و رمز عبور</span> خود را تغییر دهید.
                </p>
              </div>
              <div className="col-lg-4">
                <div className={styles.panel_image}>
                  <img src="/images/panel.svg" alt="panel image" className='img-fluid' />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Box های آمار */}
        <div className={styles.status_panel_user}>
          <div className="row g-3">
            <Box
              href="/p-user/orders"
              title='سفارشات من'
              iconClass="bi-cart"
              badgeCount={hasOrder ? 1 : 0}
            />
            <Box
              href="/p-user/address"
              title='آدرس های من'
              iconClass="bi-pin-map"
              badgeCount={addressesCount > 0 ? addressesCount : undefined}
            />
            <Box
              href="/p-user/profile"
              title='حساب کاربری من'
              iconClass="bi-person"
            />
            <Box
              title='خروج از حساب'
              iconClass="bi-arrow-right-square"
              onClick={handleLogout}
            />
          </div>
        </div>

        {/* آخرین سفارش */}
        <div className={`${styles.latest_order} mt-3`}>
          <div className="content-box">
            <div className="container-fluid">
              <div className={styles.site_table}>
                <div className='title title-panel d-flex align-items-baseline'>
                  <i className='bi bi-cart-check font-25'></i>
                  <h6 className="font-16 me-2">
                    آخرین سفارش
                    {hasOrder && (
                      <span className="badge ms-2 font-12">
                        1 سفارش
                      </span>
                    )}
                  </h6>
                </div>

                {hasOrder && orderData ? (
                  <div className="row g-3 mt-3">
                    <div className="col-12">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body p-3">
                          <div className="row align-items-center">
                            <div className="col-md-3">
                              <Link href={`/p-user/order-detail/${orderData.id}`}>
                                <h6 className="mb-1 font-14 text-truncate" style={{ maxWidth: '250px' }}>
                                  {orderData.name}
                                </h6>
                              </Link>
                              <small className="text-muted">
                                کد سفارش: {orderData.orderNumber}
                              </small>
                            </div>
                            <div className="col-md-2">
                              <span className="fw-bold">
                                {orderData.totalPrice?.toLocaleString()} تومان
                              </span>
                            </div>
                            <div className="col-md-2">
                              <small className="text-muted">
                                {orderData.itemCount} عدد
                              </small>
                            </div>
                            <div className="col-md-3">
                              <span className={`badge ${getOrderStatusText(orderData.status).class}`}>
                                {getOrderStatusText(orderData.status).text}
                              </span>
                              <br />
                              <small className="text-muted">
                                {formatDate(orderData.createdAt)}
                              </small>
                            </div>
                            <div className="col-md-2 text-end">
                              <Link
                                href={`/p-user/order-detail/${orderData.id}`}
                                className="card border-0 shadow-sm d-inline-block text-decoration-none"
                                style={{ padding: '8px 10px' }}
                              >
                                مشاهده
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <div className="alert alert-info">
                      <i className="bi bi-cart-x font-24 text-muted d-block mb-2"></i>
                      <h6>هنوز سفارشی ثبت نکرده‌اید</h6>
                      <p className="mb-3">برای شروع خرید به صفحه اصلی بروید</p>
                      <a href="/" className="btn btn-primary btn-sm">
                        شروع خرید
                      </a>
                    </div>
                  </div>
                )}

                {/* لینک مشاهده جزئیات */}
                {hasOrder && (
                  <div className="text-center mt-4">
                    <a
                      href="/p-user/orders"
                      className="card border-0 shadow-sm fw-bold text-decoration-none d-inline-block"
                      style={{ padding: '12px 20px' }}
                    >
                      مشاهده جزئیات سفارش
                      <i
                        className="bi bi-arrow-left me-2"
                        style={{ verticalAlign: 'middle' }}
                      >
                      </i>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Page;