'use client';

import React, { useEffect, useState } from 'react';
import { useProduct } from '@/Redux/hooks/useProduct';
import { useQuery } from '@apollo/client';
import { GET_SIMILAR_PRODUCTS } from '@/graphql/entities/products/product.queries';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Footer from '@/components/modules/footer/Footer';
import Header from '@/components/modules/header/Header';
import Details from '@/components/templates/product/Details';
import MultiSeller from '@/components/templates/product/MultiSeller';
import ProductDesc from '@/components/templates/product/ProductDesc';
import SimilarProducts from '@/components/templates/product/similar-products/SimilarProducts';

function ProductPage({ params }) {
    const { product, loading, error, getProduct, clearError, resetProduct } = useProduct();
    const [hasFetched, setHasFetched] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        
        if (params.id && !hasFetched && !loading) {
            console.log("Fetching product with ID:", params.id);
            getProduct(params.id)
                .then(() => {
                    setHasFetched(true);
                })
                .catch((err) => {
                    console.error("Error fetching product:", err);
                    setHasFetched(true);
                });
        }
    }, [params.id, getProduct, hasFetched, loading]);

    // دریافت محصولات مشابه
    const categoryId = product?.category?._id;
    const { loading: similarLoading, error: similarError, data: similarData } = useQuery(GET_SIMILAR_PRODUCTS, {
        variables: { 
            categoryId: categoryId,
            limit: 5 
        },
        skip: !categoryId,
    });

    if (!isClient || (loading && !hasFetched)) {
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

    if (error) {
        console.log("Product fetch error:", error);
        return (
            <>
                <Header />
                <div className="container py-5 text-center">
                    <div className="alert alert-danger">
                        <p>خطا در دریافت اطلاعات محصول: {error}</p>
                        <button
                            className="btn btn-outline-danger mt-3"
                            onClick={() => {
                                setHasFetched(false);
                                getProduct(params.id);
                            }}
                        >
                            تلاش مجدد
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!product && hasFetched) {
        console.log("No product data received");
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

    const similarProducts = similarData?.similarProducts || [];

    console.log("Product data:", product);
    console.log("Sellers data:", product?.sellers);

    return (
        <>
            <Header />
            <BreadCroumb />
            <Details product={product} />
            <MultiSeller product={product} sellers={product?.sellers || []} />
            <ProductDesc product={product} />
            <SimilarProducts products={similarProducts} />
            <Footer />
        </>
    );
}

export default ProductPage;