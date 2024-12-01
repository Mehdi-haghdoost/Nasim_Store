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
                        <div className="row g-3">
                            <Box icon="bi-bag-check" count="5" title="سفارشات تکمیل شده" />
                            <Box background="bg-danger" icon="bi bi-heart-fill" count="25" title="فیدبک ها" />
                            <Box background="bg-primary" icon="bi bi-send" count="13" title="نظرات" />
                            <Box background="bg-secondary" icon="bi-repeat" count="3" title="مرجوعی" />
                        </div>
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