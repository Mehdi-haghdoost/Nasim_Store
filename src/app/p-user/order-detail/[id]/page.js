import Layout from '@/components/layouts/UserPanelLayout';
import OrderDetail from '@/components/templates/p-user/order-detail/OrderDetail';
import React from 'react'

const page = () => {
    return (
        <Layout >
            <main>
                <OrderDetail />
            </main>
        </Layout>
    )
}

export default page;