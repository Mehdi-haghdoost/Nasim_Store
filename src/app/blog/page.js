import React from 'react'
import styles from "@/styles/blog.module.css";
import Header from '@/components/modules/header/Header';
import Footer from '@/components/modules/footer/Footer';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import CategoryBox from '@/components/templates/blog/Header/CategoryBox';
import BlogHighlights from '@/components/templates/blog/Header/BlogHighlights';


const page = () => {
    return (
        <>
            <Header />
            <BreadCroumb />
            <div className="content">
                <div className="container-fluid">
                    <div className="row gy-3">
                        <div className="col-lg-3">
                            <CategoryBox />
                        </div>
                        <div className="col-lg-9">
                            <BlogHighlights />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page;