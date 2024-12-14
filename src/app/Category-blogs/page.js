"use client";

import React from 'react';
import styles from '@/styles/CategoryBlogs.module.css';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb'
import Footer from '@/components/modules/footer/Footer'
import Header from '@/components/modules/header/Header'
import Pagination from '@/components/modules/p-user/pagination/Pagination';
import CategoryBlogsPosts from '@/components/templates/CategoryBlogs/content/CategoryBlogsPosts';
import { useSearchParams } from 'next/navigation';

const page = () => {

    const searchParams = useSearchParams();
    const title = searchParams.get('title')
    

    return (
        <>
            <Header />
            <BreadCroumb />
            <div className='content'>
                <div className='py-20'>
                    <div className="container-fluid">
                        <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                            <div className={`${styles.title} d-flex align-items-center`}>
                                <img src="/images/square.png" alt="" className="img-fluid" />
                                <h5 className="font-16 ms-3">
                                    دسته بندی
                                    <span className="main-color-one-color d-inline-block ms-1">
                                        {title}
                                    </span>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <CategoryBlogsPosts />
                    </div>
                </div>
            </div>
            <Pagination />
            <Footer />
        </>
    )
}

export default page