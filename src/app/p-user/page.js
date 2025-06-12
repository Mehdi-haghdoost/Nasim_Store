// C:\Users\LENOVO\Desktop\Nassim_Store\src\app\p-user\page.js

"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layouts/UserPanelLayout';
import styles from '@/styles/p-user/index.module.css';
import Box from '@/components/templates/p-user/index/Box';
import LatestOrder from '@/components/modules/p-user/LatestOrder/LatestOrder';
import { useAuth } from '@/Redux/hooks/useAuth';
import { useOrder } from '@/Redux/hooks/useOrder';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';

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
        {/* Header Section */}
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

        {/* User Stats */}
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

        {/* Latest Order Component */}
        <LatestOrder
          loading={loading}
          hasOrder={hasOrder}
          latestOrder={latestOrder}
          userOrders={userOrders}
          formatDate={formatDate}
          getOrderStatusText={getOrderStatusText}
          getPaymentMethodText={getPaymentMethodText}
        />
      </main>
    </Layout>
  );
}

export default Page;