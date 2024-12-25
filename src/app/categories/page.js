import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb'
import Footer from '@/components/modules/footer/Footer'
import Header from '@/components/modules/header/Header'
import CategoryBrand from '@/components/templates/categories/CategoryBrand'
import React from 'react'

const page = () => {
    return (
        <>
            <Header />
            <BreadCroumb />
            <CategoryBrand />

            <Footer />
        </>
    )
}

export default page