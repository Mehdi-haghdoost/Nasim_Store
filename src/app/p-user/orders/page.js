"use client";
import React, { useState, useEffect } from 'react'
import Layout from '@/components/layouts/UserPanelLayout'
import styles from '@/styles/p-user/orders.module.css';
import Table from '@/components/templates/p-user/orders/Table';
import LastOrders from '@/components/templates/p-user/orders/LastOrders';
import { useOrder } from '@/Redux/hooks/useOrder';
import { useAuth } from '@/Redux/hooks/useAuth';

const Orders = () => {
    const [tab, setTab] = useState("orders");
    const { getUserOrders, loading, error } = useOrder();
    const { user, isAuthenticated } = useAuth();

    // بارگذاری سفارشات هنگام mount شدن کامپوننت
    useEffect(() => {
        if (isAuthenticated && user?._id) {
            getUserOrders();
        }
    }, [isAuthenticated, user?._id, getUserOrders]);

    return (
        <Layout>
            <main>
                <div className="content-box">
                    <div className="container-fluid">
                        <div className={styles.order_desc_tab}>
                            <ul className={`${styles.order_desc_list} nav`}>
                                <li className='nav-item'>
                                    <button
                                        className={tab === "orders" ? "title-panel" : ""}
                                        onClick={() => setTab("orders")}
                                    >
                                        سفارشات
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm ms-2" role="status"></span>
                                        )}
                                    </button>
                                </li>
                                <li className='nav-item'>
                                    <button
                                        className={tab === "lastOrders" ? "title-panel" : ""}
                                        onClick={() => setTab("lastOrders")}
                                    >
                                        آخرین سفارشات
                                    </button>
                                </li>
                            </ul>
                        </div>
                        
                        {/* نمایش خطا در صورت وجود */}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                {error}
                            </div>
                        )}
                        
                        <div className={styles.order_desc_content}>
                            <section>
                                {tab === "orders" && <Table />}
                                {tab === "lastOrders" && <LastOrders />}
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default Orders