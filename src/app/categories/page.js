'use client'
import React, { useEffect } from 'react'
import styles from '@/styles/categories.module.css';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb'
import Footer from '@/components/modules/footer/Footer'
import Header from '@/components/modules/header/Header'
import Pagination from '@/components/modules/p-user/pagination/Pagination'
import CategoryBrand from '@/components/templates/categories/CategoryBrand'
import CategoryItems from '@/components/templates/categories/CategoryItems'
import CategorySort from '@/components/templates/categories/CategorySort'
import SearchFilters from '@/components/templates/categories/SearchFilters'
import { useProduct } from '@/Redux/hooks/useProduct';
import { useDispatch } from 'react-redux';
import { setCategories } from '@/Redux/slices/filterSlice';

const CategoriesPage = () => {
    const { getProducts } = useProduct();
    const dispatch = useDispatch();

    // بارگذاری اولیه محصولات و تنظیم دسته‌بندی پیش‌فرض (لپتاپ)
    useEffect(() => {
        // بارگذاری محصولات
        getProducts();
        
        // تنظیم دسته‌بندی پیش‌فرض (لپتاپ)
        dispatch(setCategories(["67d81dc038f26307f0415442"]));
    }, [dispatch, getProducts]);

    return (
        <>
            <Header />
            <BreadCroumb />
            <CategoryBrand />
            <div className="content" >
                <div className="container-fluid">
                    {/* filter mobile */}
                    <div className="custom-filter d-lg-none d-block">
                        <button className={`btn border-0 main-color-two-bg shadow-box px-3 rounded-3position-fixed ${styles.btn_filter_float}`}
                            style={{ zIndex: "999", bottom: "80px", position: "fixed !important" }}
                            type='button'
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                        >
                            <i className="bi bi-funnel font-20 fw-bold text-white"></i>
                            <span className="d-block font-14 text-white">فیلتر</span>
                        </button>
                        
                        <div className='offcanvas offcanvas-end' tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                            <div className='offcanvas-header justify-content-between'>
                                <h5 className='offcanvas-title' id="offcanvasRightLabel">
                                    فیلترها
                                </h5>
                                <button type='button' className='btn-close m-0' data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className='offcanvas-body'>
                                <SearchFilters />
                            </div>
                        </div>
                    </div>
                    
                    {/* end filter mobile */}
                    
                    <div className="row gy-3">
                        <div className="col-lg-3 d-lg-block d-none">
                            <SearchFilters />
                        </div>
                        <div className="col-lg-9" style={{ overflowX: "hidden" }}>
                            <CategorySort />
                            <CategoryItems />
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CategoriesPage;