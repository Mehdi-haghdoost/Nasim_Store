"use client";

import React from 'react';
import Link from 'next/link';
import styles from './LatestOrder.module.css';

const LatestOrder = ({ 
  loading, 
  hasOrder, 
  latestOrder, 
  userOrders,
  formatDate,
  getOrderStatusText,
  getPaymentMethodText 
}) => {
  return (
    <div className={`${styles.latest_order} mt-3`}>
      <div className="content-box">
        <div className="container-fluid">
          <div className={styles.site_table}>
            {/* Header */}
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

            {/* Loading State */}
            {loading && (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">در حال بارگذاری...</span>
                </div>
              </div>
            )}

            {/* Order Display */}
            {!loading && hasOrder && latestOrder ? (
              <div className="row g-3 mt-3">
                <div className="col-12">
                  <div className={`card border-0 shadow-sm ${styles.order_card}`}>
                    <div className="card-body p-3">
                      {/* Desktop Layout */}
                      <div className={`row align-items-center ${styles.desktop_layout}`}>
                        {/* Product Image & Name */}
                        <div className="col-md-3">
                          <div className="d-flex align-items-center">
                            <img
                              src={`/images/product/${latestOrder.productImage}`}
                              alt={latestOrder.productName}
                              className={`rounded ms-2 ${styles.product_image}`}
                              onError={(e) => {
                                e.target.src = '/images/default-product.jpg';
                              }}
                            />
                            <div>
                              <Link href={`/p-user/order-detail/${latestOrder._id}`}>
                                <h6 className={`mb-1 font-14 ${styles.product_name}`}>
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

                        {/* Price */}
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

                        {/* Quantity & Payment */}
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

                        {/* Status & Date */}
                        <div className="col-md-3">
                          <span className={`badge ${getOrderStatusText(latestOrder.status).class}`}>
                            {getOrderStatusText(latestOrder.status).text}
                          </span>
                          <small className="text-muted d-block mt-1">
                            {formatDate(latestOrder.orderDate)}
                          </small>
                        </div>

                        {/* View Button */}
                        <div className="col-md-2 text-end">
                          <Link
                            href={`/p-user/order-detail/${latestOrder._id}`}
                            className='btn main-color-one-bg shadow-md border-muted ms-2'
                          >
                            مشاهده
                          </Link>
                        </div>
                      </div>

                      {/* Mobile Layout */}
                      <div className={styles.mobile_layout}>
                        {/* Product Info */}
                        <div className={`d-flex align-items-start mb-3 ${styles.mobile_product_info}`}>
                          <img
                            src={`/images/product/${latestOrder.productImage}`}
                            alt={latestOrder.productName}
                            className={`rounded ${styles.mobile_product_image}`}
                            onError={(e) => {
                              e.target.src = '/images/default-product.jpg';
                            }}
                          />
                          <div className="flex-grow-1 ms-3">
                            <h6 className={`mb-1 font-14 ${styles.mobile_product_name}`}>
                              {latestOrder.productName}
                              {latestOrder.hasMultipleProducts && (
                                <small className="text-muted d-block">
                                  و {latestOrder.additionalProductsCount} محصول دیگر
                                </small>
                              )}
                            </h6>
                            <small className="text-muted d-block">
                              کد پیگیری: {latestOrder.trackingId}
                            </small>
                            <span className={`badge mt-1 ${getOrderStatusText(latestOrder.status).class}`}>
                              {getOrderStatusText(latestOrder.status).text}
                            </span>
                          </div>
                        </div>

                        {/* Order Details */}
                        <div className={`row g-2 ${styles.mobile_details}`}>
                          <div className="col-6">
                            <div className="text-center p-2 bg-light rounded">
                              <small className="text-muted d-block">قیمت کل</small>
                              <span className="fw-bold text-success font-12">
                                {latestOrder.totalAmount?.toLocaleString()} تومان
                              </span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="text-center p-2 bg-light rounded">
                              <small className="text-muted d-block">تعداد</small>
                              <span className="fw-bold font-12">
                                {latestOrder.itemCount} عدد
                              </span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="text-center p-2 bg-light rounded">
                              <small className="text-muted d-block">روش پرداخت</small>
                              <span className="font-12">
                                {getPaymentMethodText(latestOrder.paymentMethod)}
                              </span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="text-center p-2 bg-light rounded">
                              <small className="text-muted d-block">تاریخ</small>
                              <span className="font-12">
                                {formatDate(latestOrder.orderDate)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Mobile View Button */}
                        <div className="text-center mt-3">
                          <Link
                            href={`/p-user/order-detail/${latestOrder._id}`}
                            className='btn main-color-one-bg shadow-md border-muted w-100'
                          >
                            مشاهده جزئیات سفارش
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : !loading && (
              // No Orders State
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

            {/* View All Orders Link */}
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
  );
};

export default LatestOrder;