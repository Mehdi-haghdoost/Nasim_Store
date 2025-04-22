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
        return (
            <>
                <Header />
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                            <div className="card border-0 shadow">
                                <div className="card-body text-center p-5">
                                    <div className="mb-4">
                                        <i className="bi bi-exclamation-circle text-warning" style={{ fontSize: '3rem' }}></i>
                                    </div>
                                    <h4 className="mb-3">محصول مورد نظر موجود نیست</h4>
                                    <p className="text-muted mb-4">متأسفانه در حال حاضر امکان نمایش این محصول وجود ندارد. لطفاً بعداً تلاش کنید.</p>
                                    <div className="d-grid gap-2">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setHasFetched(false);
                                                getProduct(params.id);
                                            }}
                                        >
                                            <i className="bi bi-arrow-clockwise me-2"></i>
                                            تلاش مجدد
                                        </button>
                                        <a href="/categories" className="btn btn-outline-secondary">
                                            مشاهده سایر محصولات
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            {/* لاگ خطا به صورت مخفی برای توسعه‌دهندگان */}
                            {process.env.NODE_ENV === 'development' && (
                                <div className="alert alert-danger mt-4 small">
                                    <strong>خطای فنی (فقط در محیط توسعه):</strong> {error.toString()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!product && hasFetched) {
        return (
            <>
                <Header />
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                            <div className="card border-0 shadow">
                                <div className="card-body text-center p-5">
                                    <div className="mb-4">
                                        <i className="bi bi-search text-primary" style={{ fontSize: '3rem' }}></i>
                                    </div>
                                    <h4 className="mb-3">محصول مورد نظر یافت نشد</h4>
                                    <p className="text-muted mb-4">محصول مورد نظر شما در سیستم موجود نیست یا ممکن است حذف شده باشد.</p>
                                    <a href="/categories" className="btn btn-primary">
                                        مشاهده محصولات
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const similarProducts = similarData?.similarProducts || [];

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