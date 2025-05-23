"use client";

import React, { useState, useEffect } from 'react';
import styles from './LastOrders.module.css';
import OrderCart from './OrderCart';

function LastOrders() {
    const [orders, setOrders] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        
        // بارگذاری آخرین سفارشات از localStorage
        const loadLastOrders = () => {
            try {
                const orderHistory = localStorage.getItem('order_history');
                if (orderHistory) {
                    const parsedOrders = JSON.parse(orderHistory);
                    // فقط 5 سفارش آخر (جدیدترین)
                    const lastOrders = parsedOrders
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 5)
                        .map(order => ({
                            id: order.orderNumber || Math.random().toString(36).substr(2, 9),
                            orderNumber: order.orderNumber,
                            name: order.items?.[0]?.product?.title || order.items?.[0]?.product?.name || 'محصول',
                            totalPrice: order.pricing?.finalPrice || 0,
                            status: order.status || 'completed',
                            createdAt: order.createdAt,
                            orderDate: order.orderDate,
                            items: order.items || [],
                            itemCount: order.items?.reduce((total, item) => total + item.quantity, 0) || 0
                        }));
                    setOrders(lastOrders);
                }
            } catch (error) {
                console.error('Error loading last orders:', error);
            }
        };

        loadLastOrders();
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className={styles.ui_boxs}>
            <div className={styles.ui_box}>
                <div className={`${styles.ui_box_item} ${styles.ui_box_white}`}>
                    <div className={styles.ui_box_item_title} style={{ padding: "15px" }}>
                        <h4>آخرین سفارش ها</h4>
                    </div>
                    <div className={`${styles.ui_box_item_desc} p-0`}>
                        <div className={styles.orders}>
                            {orders.length > 0 ? (
                                orders.map(order => (
                                    <OrderCart 
                                        key={order.id} 
                                        order={JSON.parse(JSON.stringify(order))} 
                                    />
                                ))
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-muted">سفارشی یافت نشد</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LastOrders;