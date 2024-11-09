import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb'
import Footer from '@/components/modules/footer/Footer'
import Header from '@/components/modules/header/Header'
import BestSell from '@/components/templates/index/bestSelling/BestSell'
import Details from '@/components/templates/product/Details'
import MultiSeller from '@/components/templates/product/MultiSeller'
import ProductDesc from '@/components/templates/product/ProductDesc'
import SimilarProducts from '@/components/templates/product/similar-products/SimilarProducts'
import React from 'react'

function page() {
    return (
        <>
            <Header />
            <BreadCroumb />
            <Details />
            <MultiSeller />
            <ProductDesc />
            <SimilarProducts />
            <br /> <br />
            <Footer />
        </>
    )
}

export default page