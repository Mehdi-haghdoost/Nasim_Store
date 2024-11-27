import Layout from '@/components/layouts/UserPanelLayout'
import NewAddress from '@/components/templates/p-user/newAddress/NewAddress'
import React from 'react'

const page = () => {
    return (
        <Layout>
           <NewAddress />
        </Layout>
    )
}

export default page