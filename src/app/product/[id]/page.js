import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb'
import Footer from '@/components/modules/footer/Footer'
import Header from '@/components/modules/header/Header'
import Details from '@/components/templates/product/Details'
import MultiSeller from '@/components/templates/product/MultiSeller'
import React from 'react'

function page() {
    return (
        <>
            <Header />
            <BreadCroumb />
            <Details />
            <MultiSeller />
            <Footer />
        </>
    )
}

export default page