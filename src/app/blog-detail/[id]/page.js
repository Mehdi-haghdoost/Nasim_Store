import React from 'react'
import styles from '@/styles/blog-detail.module.css';
import Header from '@/components/modules/header/Header';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Footer from '@/components/modules/footer/Footer';
import BlogContent from '@/components/templates/blog-detail/BlogContent';

const page = () => {
    return (
        <>
            <Header />
            <BreadCroumb />
            <BlogContent />

            <Footer />
        </>
    )
}

export default page