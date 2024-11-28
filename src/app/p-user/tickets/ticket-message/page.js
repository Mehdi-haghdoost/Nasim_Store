import Layout from '@/components/layouts/UserPanelLayout'
import TicketsMessage from '@/components/templates/p-user/tickets/TicketsMessage'
import React from 'react'
import styles from '@/styles/p-user/ticketMessage.module.css';
const page = () => {
    return (
        <Layout>
            <div className="content-box">
                <div className="container-fluid">
                    <div className="title-panel">
                        <div className="d-flex alig-items-baseline">
                            <div className={`${styles.ticket_status} ms-4`}>
                                <span className="badge bg-secondary rounded-0 font-14 ms-4 text-white">در انتظار پاسخ</span>
                                <span className="text-muted font-16 fw-lighter mb-0">#562356</span>
                            </div>
                            <div className={`${styles.ticket_created_at} ms-4`}>
                                <i className="bi bi-clock ms-2"></i>
                                <span>تاریخ ایجاد 08 آذر 1403 00:45</span>
                            </div>
                            <div className={`${styles.ticket_created_at} ms-4`}>
                                <i className="bi bi-arrow-left ms-2"></i>
                                <span>بروز شده 08 آذر 1403 ساعت 1:00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TicketsMessage />
        </Layout>
    )
}

export default page