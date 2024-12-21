import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Footer from '@/components/modules/footer/Footer';
import Header from '@/components/modules/header/Header';
import LineStep from '@/components/templates/fail-payment/LineStep';
import PaymentFailure from '@/components/templates/fail-payment/PaymentFailure';
import React from 'react'

const page = () => {
    return (
        <>
            <Header />
            <BreadCroumb />
            <div className="content">
                <div className="container-fluid">
                    <LineStep />
                    <PaymentFailure />ّ
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page;