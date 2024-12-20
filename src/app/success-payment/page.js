import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Footer from '@/components/modules/footer/Footer';
import Header from '@/components/modules/header/Header';
import LineStep from '@/components/templates/success-payment/LineStep';
import React from 'react'

const page = () => {
    return (
        <>
            <Header />
            <BreadCroumb />
            <div className="content">
                <LineStep />ّ
            </div>

            <Footer />ّ
        </>
    )
}

export default page;