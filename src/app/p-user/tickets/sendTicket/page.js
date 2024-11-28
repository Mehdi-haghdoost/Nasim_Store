import React from 'react';
import styles from '@/styles/p-user/sendTicket.module.css';
import Layout from '@/components/layouts/UserPanelLayout';
import SendTicket from '@/components/templates/p-user/tickets/SendTicket';

const page = () => {
    return (
        <Layout>
            
            <SendTicket />
        </Layout>
    )
}

export default page