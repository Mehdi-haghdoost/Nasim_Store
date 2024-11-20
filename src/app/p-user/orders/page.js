import React from 'react'
import Layout from '@/components/layouts/UserPanelLayout'
import styles from '@/styles/p-user/orders.module.css';
import Table from '@/components/templates/p-user/orders/Table';
import Pagination from '@/components/templates/p-user/orders/Pagination';


const Orders = () => {
    return (
        <Layout>
            <main>
                <div className="content-box">
                    <div className="container-fluid">
                        <div className="title-panel">
                            <h6 className='font-16'>
                                سفارشات
                            </h6>
                        </div>
                        <Table />
                    </div>
                </div>
                <Pagination />
            </main>
        </Layout>
    )
}

export default Orders