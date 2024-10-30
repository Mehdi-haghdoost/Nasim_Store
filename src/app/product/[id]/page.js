import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb'
import Footer from '@/components/modules/footer/Footer'
import Header from '@/components/modules/header/Header'
import Details from '@/components/templates/product/Details'
import React from 'react'

function page() {
    return (
        <>
            <Header />
            <BreadCroumb />
            <Details />
            <Footer />
        </>
    )
}

export default page