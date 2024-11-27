"use client";
import React, { useState } from 'react'
import Layout from '@/components/layouts/UserPanelLayout'
import styles from '@/styles/p-user/orders.module.css';
import Table from '@/components/templates/p-user/orders/Table';
import Pagination from '@/components/modules/p-user/pagination/Pagination';
import LastOrders from '@/components/templates/p-user/orders/LastOrders';


const Orders = () => {
    const [tab, setTab] = useState("orders")
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