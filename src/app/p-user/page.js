"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/UserPanelLayout';
import styles from '@/styles/p-user/index.module.css';
import Box from '@/components/templates/p-user/index/Box';
import { useAuth } from '@/Redux/hooks/useAuth';
import { useOrder } from '@/Redux/hooks/useOrder';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';
import Link from 'next/link';

function Page() {
  const { user, logout } = useAuth();
  const { getUserOrders, userOrders, loading } = useOrder();
  const router = useRouter();

  // State برای UI
  const [hasOrder, setHasOrder] = useState(false);
  const [latestOrder, setLatestOrder] = useState(null);
  const [addressesCount, setAddressesCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // تعداد آدرس‌ها
    if (user?.addresses) {
      setAddressesCount(user.addresses.length);
    }

    // دریافت سفارشات اگر کاربر لاگین کرده
    if (user?._id) {
      fetchUserOrders();
    } else {
      // فالبک به localStorage
      loadFromLocalStorage();
    }
  }, [user]);

  // دریافت سفارشات از API
  const fetchUserOrders = async () => {
    try {
      const orders = await getUserOrders(user._id);

      if (orders && orders.length > 0) {
        // مرتب‌سازی بر اساس تاریخ (جدیدترین اول)
        const sortedOrders = orders.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        );

        const latest = sortedOrders[0];
        setLatestOrder(prepareOrderForDisplay(latest));
        setHasOrder(true);
      } else {
        // اگر سفارشی نیست، چک کن localStorage
        loadFromLocalStorage();
      }
    } catch (error) {
      console.error('خطا در دریافت سفارشات:', error);
      loadFromLocalStorage();
    }
  };

  // آماده‌سازی سفارش برای نمایش
  const prepareOrderForDisplay = (order) => {
    const totalItems = order.items?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;
    const firstItem = order.items?.[0];

    return {
      _id: order._id,
      trackingId: order.trackingId,
      orderDate: order.orderDate || order.createdAt,
      status: order.status,
      totalAmount: order.totalAmount,
      itemCount: totalItems,
      productName: firstItem?.name || 'محصول نامشخص',
      productImage: firstItem?.image || '/images/default-product.jpg',
      hasMultipleProducts: (order.items?.length || 0) > 1,
      additionalProductsCount: Math.max(0, (order.items?.length || 0) - 1),
      recipient: order.recipient,
      phoneNumber: order.phoneNumber,
      paymentMethod: order.paymentMethod,
      shippingCost: order.shippingCost
    };
  };

  // بارگذاری از localStorage
  const loadFromLocalStorage = () => {
    try {
      const orderDetails = localStorage.getItem('order_details');
      if (orderDetails) {
        const parsedOrder = JSON.parse(orderDetails);
        const firstProduct = parsedOrder.items?.[0]?.product;
        const totalItems = parsedOrder.items?.reduce((total, item) =>
          total + (item.quantity || 1), 0) || 0;

        const orderForDisplay = {
          _id: 'local-' + Date.now(),
          trackingId: 'در انتظار ثبت',
          orderDate: parsedOrder.timestamp || new Date().toISOString(),
          status: 'PENDING',
          totalAmount: parsedOrder.pricing?.finalPrice || 0,
          itemCount: totalItems,
          productName: firstProduct?.title || firstProduct?.name || 'محصول نامشخص',
          productImage: firstProduct?.image || '/images/default-product.jpg',
          hasMultipleProducts: (parsedOrder.items?.length || 0) > 1,
          additionalProductsCount: Math.max(0, (parsedOrder.items?.length || 0) - 1),
          recipient: `${parsedOrder.customerInfo?.firstName || ''} ${parsedOrder.customerInfo?.lastName || ''}`.trim() || 'نامشخص',
          phoneNumber: parsedOrder.customerInfo?.phone || '',
          paymentMethod: parsedOrder.paymentMethod || 'CashOnDelivery',
          shippingCost: parsedOrder.pricing?.shippingCost || 0
        };

        setLatestOrder(orderForDisplay);
        setHasOrder(true);
      } else {
        setHasOrder(false);
        setLatestOrder(null);
      }
    } catch (error) {
      console.error('خطا در بارگذاری localStorage:', error);
      setHasOrder(false);
      setLatestOrder(null);
    }
  };

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

  // فرمت تاریخ شمسی
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

  // وضعیت سفارش
  const getOrderStatusText = (status) => {
    switch (status) {
      case 'PENDING':
        return { text: 'در انتظار پردازش', class: 'text-warning' };
      case 'SHIPPED':
        return { text: 'ارسال شده', class: 'text-info' };
      case 'DELIVERED':
        return { text: 'تحویل داده شده', class: 'text-success success-label rounded-pill px-3 py-1' };
      case 'CANCELLED':
        return { text: 'لغو شده', class: 'text-danger danger-label rounded-pill px-3 py-1' };
      default:
        return { text: 'در انتظار بررسی', class: 'text-secondary' };
    }
  };

  // متن روش پرداخت
  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'DirectBankPayment':
        return 'پرداخت آنلاین';
      case 'CashOnDelivery':
        return 'پرداخت در محل';
      default:
        return 'نامشخص';
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

        {/* آمار کاربر */}
        <div className={styles.status_panel_user}>
          <div className="row g-3">
            <Box
              href="/p-user/orders"
              title='سفارشات من'
              iconClass="bi-cart"
              badgeCount={hasOrder ? (userOrders?.length || 1) : 0}
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
                  <h6 className="font-16 ms-2">
                    آخرین سفارش
                    {hasOrder && (
                      <span className="badge ms-2 font-12">
                        {userOrders?.length || 1} سفارش
                      </span>
                    )}
                  </h6>
                </div>

                {/* لودینگ */}
                {loading && (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">در حال بارگذاری...</span>
                    </div>
                  </div>
                )}

                {/* نمایش سفارش */}
                {!loading && hasOrder && latestOrder ? (
                  <div className="row g-3 mt-3">
                    <div className="col-12">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body p-3">
                          <div className="row align-items-center">
                            {/* تصویر و نام محصول */}
                            <div className="col-md-3">
                              <div className="d-flex align-items-center">
                                <img
                                  src={`/images/product/${latestOrder.productImage}`}
                                  alt={latestOrder.productName}
                                  className="rounded ms-2"
                                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                  onError={(e) => {
                                    e.target.src = '/images/default-product.jpg';
                                  }}
                                />
                                <div>
                                  <Link href={`/p-user/order-detail/${latestOrder._id}`}>
                                    <h6 className="mb-1 font-14 text-truncate" style={{ maxWidth: '200px' }}>
                                      {latestOrder.productName}
                                      {latestOrder.hasMultipleProducts && (
                                        <small className="text-muted d-block">
                                          و {latestOrder.additionalProductsCount} محصول دیگر
                                        </small>
                                      )}
                                    </h6>
                                  </Link>
                                  <small className="text-muted">
                                    کد پیگیری: {latestOrder.trackingId}
                                  </small>
                                </div>
                              </div>
                            </div>

                            {/* قیمت */}
                            <div className="col-md-2">
                              <span className="fw-bold text-success">
                                {latestOrder.totalAmount?.toLocaleString()} تومان
                              </span>
                              {latestOrder.shippingCost > 0 && (
                                <small className="text-muted d-block">
                                  + {latestOrder.shippingCost?.toLocaleString()} ارسال
                                </small>
                              )}
                            </div>

                            {/* تعداد و روش پرداخت */}
                            <div className="col-md-2">
                              <div className="text-center">
                                <span className="badge bg-light text-dark">
                                  {latestOrder.itemCount} عدد
                                </span>
                                <small className="text-muted d-block mt-1">
                                  {getPaymentMethodText(latestOrder.paymentMethod)}
                                </small>
                              </div>
                            </div>

                            {/* وضعیت و تاریخ */}
                            <div className="col-md-3">
                              <span className={`badge ${getOrderStatusText(latestOrder.status).class}`}>
                                {getOrderStatusText(latestOrder.status).text}
                              </span>
                              <small className="text-muted d-block mt-1">
                                {formatDate(latestOrder.orderDate)}
                              </small>
                            </div>

                            {/* دکمه مشاهده */}
                            <div className="col-md-2 text-end">
                              <Link
                                href={`/p-user/order-detail/${latestOrder._id}`}
                                className='btn main-color-one-bg shadow-md border-muted ms-2 '
                              >
                                مشاهده
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : !loading && (
                  // سفارشی وجود ندارد
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

                {/* لینک مشاهده همه سفارشات */}
                {!loading && hasOrder && (
                  <div className="text-center mt-4">
                    <Link
                      href="/p-user/orders"
                      className="btn main-color-one-bg shadow-md border-muted d-inline-flex justify-content-center"
                    >
                      <span className="ms-2 text-white">مشاهده همه سفارشات</span>
                      <i className="bi bi-arrow-left text-white"></i>
                    </Link>
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