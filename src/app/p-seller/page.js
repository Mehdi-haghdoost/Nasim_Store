import React from 'react'
import styles from '@/styles/p-seller/index.module.css';
import Layout from '@/components/layouts/SellerPanelLayout'
import PanelHeader from '@/components/templates/p-seller/index/PanelHeader';
import Box from '@/components/templates/p-seller/index/Box';
import SellerTable from '@/components/templates/p-seller/index/SellerTable';

const page = () => {
    return (
        <Layout>
            <main>
                <div className="position-sticky top-0">
                    <PanelHeader />
                    <div className={`${styles.status_panel_seller} my-5`}>
                        <Box />
                        <Box />
                        <Box />
                        <Box />
                    </div>
                    <div className={styles.panel_latest_order}>
                        <SellerTable />
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default page