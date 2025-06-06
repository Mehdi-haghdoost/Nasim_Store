// 'use client';

// import React, { Suspense, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchProducts } from '@/Redux/actions/productThunks';
// import dynamic from 'next/dynamic';



// import styles from '@/styles/categories.module.css';
// import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb'
// import Footer from '@/components/modules/footer/Footer'
// import Header from '@/components/modules/header/Header'
// import Pagination from '@/components/modules/p-user/pagination/Pagination'
// import CategoryBrand from '@/components/templates/categories/CategoryBrand'
// import CategoryItems from '@/components/templates/categories/CategoryItems'
// import CategorySort from '@/components/templates/categories/CategorySort'
// import SearchFilters from '@/components/templates/categories/SearchFilters'

// const CategoriesContent = () => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(fetchProducts());
//     }, [dispatch]);

//     return (
//         <>
//             <BreadCroumb />
//             <CategoryBrand />
//             <div className="content">
//                 <div className="container-fluid">
//                     {/* filter mobile */}
//                     <div className="custom-filter d-lg-none d-block">
//                         <button className={`btn btn-filter-float border-0 main-color-two-bg shadow-box px-3 rounded-3position-fixed ${styles.btn_filter_float}`}
//                             style={{ zIndex: "999", bottom: "80px", position: "fixed !important" }}
//                             type='button'
//                             data-bs-toggle="offcanvas"
//                             data-bs-target="#offcanvasRight"
//                             aria-controls="offcanvasRight"
//                         >
//                             <i className="bi bi-funnel font-20 fw-bold text-white"></i>
//                             <span className="d-block font-14 text-white">فیلتر</span>
//                         </button>

//                         <div className='offcanvas offcanvas-end' tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
//                             <div className='offcanvas-header justify-content-between'>
//                                 <h5 className='offcanvas-title' id="offcanvasRightLabel">
//                                     فیلترها
//                                 </h5>
//                                 <button type='button' className='btn-close m-0' data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                             </div>
//                             <div className='offcanvas-body'>
//                                 <SearchFilters />
//                             </div>
//                         </div>
//                     </div>

//                     {/* end filter mobile */}

//                     <div className="row gy-3">
//                         <div className="col-lg-3 d-lg-block d-none">
//                             <SearchFilters />
//                         </div>
//                         <div className="col-lg-9" style={{ overflowX: "hidden" }}>
//                             <CategorySort />
//                             <CategoryItems />
//                             <Pagination />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// const LoadingCategories = () => (
//     <div className="d-flex justify-content-center align-items-center p-5">
//         <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">در حال بارگذاری...</span>
//         </div>
//     </div>
// );

// const Page = () => {
//     return (
//         <>
//             <Header />
//             <Suspense fallback={<LoadingCategories />}>
//                 <CategoriesContent />
//             </Suspense>
//             <Footer />
//         </>
//     );
// };

// export default Page;

'use client';

import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '@/Redux/actions/productThunks';
import dynamic from 'next/dynamic';

import styles from '@/styles/categories.module.css';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb'
import Footer from '@/components/modules/footer/Footer'
import Pagination from '@/components/modules/p-user/pagination/Pagination'
import CategoryBrand from '@/components/templates/categories/CategoryBrand'
import CategoryItems from '@/components/templates/categories/CategoryItems'
import CategorySort from '@/components/templates/categories/CategorySort'
import SearchFilters from '@/components/templates/categories/SearchFilters'

// Header رو dynamic import کن بدون SSR
const Header = dynamic(() => import('@/components/modules/header/Header'), {
    ssr: false,
    loading: () => (
        <header style={{ minHeight: '100px', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
            <nav className="container-fluid">
                <div className="row align-items-center" style={{ padding: '15px 0' }}>
                    <div className="col-lg-1 col-6">
                        <a href="/">
                            <img src="/images/logo.png" alt="logo" style={{ height: '40px' }} />
                        </a>
                    </div>
                    <div className="col-lg-7 d-lg-block d-none">
                        <div style={{ textAlign: 'center', color: '#666' }}>در حال بارگذاری...</div>
                    </div>
                    <div className="col-lg-4 col-6">
                        <div className="d-flex align-items-center justify-content-end">
                            <span style={{ padding: '8px 16px', marginRight: '10px' }}>ورود</span>
                            <span style={{ padding: '8px' }}>سبد (0)</span>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
});

const CategoriesContent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <>
            <BreadCroumb />
            <CategoryBrand />
            <div className="content">
                <div className="container-fluid">
                    {/* filter mobile */}
                    <div className="custom-filter d-lg-none d-block">
                        <button className={`btn btn-filter-float border-0 main-color-two-bg shadow-box px-3 rounded-3position-fixed ${styles.btn_filter_float}`}
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
        </>
    );
};

const LoadingCategories = () => (
    <div className="d-flex justify-content-center align-items-center p-5">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">در حال بارگذاری...</span>
        </div>
    </div>
);

const Page = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<LoadingCategories />}>
                <CategoriesContent />
            </Suspense>
            <Footer />
        </>
    );
};

export default Page;