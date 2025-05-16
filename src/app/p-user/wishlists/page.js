// import React from 'react'
// import styles from '@/styles/p-user/wishlists.module.css';
// import Layout from '@/components/layouts/UserPanelLayout';
// import Card from '@/components/modules/p-user/wishlists/Product'
// import Pagination from '@/components/modules/p-user/pagination/Pagination';

// const page = () => {
//     return (
//         <Layout>
//             <div className="ui-boxs">
//                 <div className="ui-box">
//                     <div className="ui-box-item ui-box-white">
//                         <div className="ui-box-item-title">
//                             <div className="d-flex justify-content-between align-items-center">
//                                 <h4 className="fw-bold">
//                                     علاقه مندی ها
//                                 </h4>
//                             </div>
//                         </div>
//                         <div className="ui-box-item-desc">
//                             <section>
//                                 <Card />
//                                 <Card />
//                                 <Card />
//                             </section>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Pagination />
//         </Layout>
//     )
// }

// export default page;

'use client';
import React, { useEffect } from 'react';
import styles from '@/styles/p-user/wishlists.module.css';
import Layout from '@/components/layouts/UserPanelLayout';
import Card from '@/components/modules/p-user/wishlists/Product';
import Pagination from '@/components/modules/p-user/pagination/Pagination';
import { useWishlist } from '@/Redux/hooks/useWishlist';

const page = () => {
    const { wishlistItems, loading, error, getWishlist } = useWishlist();

    useEffect(() => {
        getWishlist();
    }, [getWishlist]);

    return (
        <Layout>
            <div className="ui-boxs">
                <div className="ui-box">
                    <div className="ui-box-item ui-box-white">
                        <div className="ui-box-item-title">
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="fw-bold">
                                    علاقه مندی ها
                                </h4>
                            </div>
                        </div>
                        <div className="ui-box-item-desc">
                            <section>
                                {loading ? (
                                    <div className="text-center py-4">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-2">در حال بارگذاری لیست علاقه‌مندی‌ها...</p>
                                    </div>
                                ) : error ? (
                                    <div className="alert alert-danger">
                                        خطا در بارگذاری لیست علاقه‌مندی‌ها: {error}
                                    </div>
                                ) : wishlistItems.length === 0 ? (
                                    <div className="text-center py-4">
                                        <i className="bi bi-heart fs-1 text-muted"></i>
                                        <p className="mt-3">لیست علاقه‌مندی‌های شما خالی است.</p>
                                        <a href="/categories" className="btn btn-primary mt-2">
                                            مشاهده محصولات
                                        </a>
                                    </div>
                                ) : (
                                    wishlistItems.map(product => (
                                        <Card key={product._id} product={product} />
                                    ))
                                )}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            {wishlistItems.length > 0 && <Pagination />}
        </Layout>
    );
};

export default page;