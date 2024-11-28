import React from 'react'
import styles from '@/styles/p-user/tickets.module.css';
import Layout from '@/components/layouts/UserPanelLayout';
import Link from 'next/link';
import Tickets from '@/components/templates/p-user/tickets/Tickets';

const page = () => {
    return (
        <Layout>
            <div className={styles.ticket_panel}>
                <h5>لیست تیکت ها</h5>
                <Link
                className=' main-color-two-bg btn border-0 d-flex align-items-center rounded-pill ms-3'
                href={"/p-user/tickets"}>
                    ارسال تیکت جدید
                </Link>
            </div>
            <Tickets />
        </Layout>
    )
}

export default page;