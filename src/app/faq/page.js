import React from 'react'
import styles from '@/styles/faq.module.css';
import Header from '@/components/modules/header/Header';
import Footer from '@/components/modules/footer/Footer';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Content from '@/components/templates/faq/content/Content';
function page() {
    return (
        <>
            <Header />
            <BreadCroumb />
            <Content />
            <Footer />
        </>
    )
}

export default page