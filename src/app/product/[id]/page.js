// import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb'
// import Footer from '@/components/modules/footer/Footer'
// import Header from '@/components/modules/header/Header'
// import BestSell from '@/components/templates/index/bestSelling/BestSell'
// import Details from '@/components/templates/product/Details'
// import MultiSeller from '@/components/templates/product/MultiSeller'
// import ProductDesc from '@/components/templates/product/ProductDesc'
// import SimilarProducts from '@/components/templates/product/similar-products/SimilarProducts'
// import React from 'react'

// function page() {
//     return (
//         <>
//             <Header />
//             <BreadCroumb />
//             <Details />
//             <MultiSeller />
//             <ProductDesc />
//             <SimilarProducts />
//             <Footer />
//         </>
//     )
// }

// export default page

'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT, GET_SIMILAR_PRODUCTS } from '@/graphql/entities/products/product.queries';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Footer from '@/components/modules/footer/Footer';
import Header from '@/components/modules/header/Header';
import Details from '@/components/templates/product/Details';
import MultiSeller from '@/components/templates/product/MultiSeller';
import ProductDesc from '@/components/templates/product/ProductDesc';
import SimilarProducts from '@/components/templates/product/similar-products/SimilarProducts';

function ProductPage({ params }) {
    // دریافت اطلاعات محصول با استفاده از GraphQL
    const { loading: productLoading, error: productError, data: productData } = useQuery(GET_PRODUCT, {
        variables: { id: params.id },
        skip: !params.id,
    });
    
    // دریافت محصولات مشابه اگر محصول پیدا شد
    const { loading: similarLoading, error: similarError, data: similarData } = useQuery(GET_SIMILAR_PRODUCTS, {
        variables: { 
            categoryId: productData?.product?.category?._id,
            limit: 5 
        },
        skip: !productData?.product?.category?._id,
    });
    
    // نمایش بارگذاری
    if (productLoading) {
        return (
            <>
                <Header />
                <div className="container py-5 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">در حال بارگذاری اطلاعات محصول...</p>
                </div>
                <Footer />
            </>
        );
    }
    
    // نمایش خطا
    if (productError) {
        return (
            <>
                <Header />
                <div className="container py-5 text-center">
                    <div className="alert alert-danger">
                        <p>خطا در دریافت اطلاعات محصول: {productError.message}</p>
                        <button className="btn btn-outline-danger mt-3" onClick={() => window.location.reload()}>
                            تلاش مجدد
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
    
    // اگر محصول یافت نشد
    if (!productData?.product) {
        return (
            <>
                <Header />
                <div className="container py-5 text-center">
                    <div className="alert alert-warning">
                        <p>محصول مورد نظر یافت نشد.</p>
                        <a href="/products" className="btn btn-primary mt-3">
                            مشاهده سایر محصولات
                        </a>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
    
    // اطلاعات محصول
    const product = productData.product;
    // محصولات مشابه
    const similarProducts = similarData?.similarProducts || [];

    return (
        <>
            <Header />
            <BreadCroumb />
            <Details product={product} />
            <MultiSeller product={product} sellers={product.sellers} />
            <ProductDesc product={product} />
            <SimilarProducts products={similarProducts} />
            <Footer />
        </>
    );
}

export default ProductPage;