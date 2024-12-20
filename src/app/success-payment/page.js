import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Footer from '@/components/modules/footer/Footer';
import Header from '@/components/modules/header/Header';
import LineStep from '@/components/templates/success-payment/LineStep';
import PaymentConfirmation from '@/components/templates/success-payment/PaymentConfirmation';
import React from 'react'

const page = () => {
    return (
        <>
            <Header />
            <BreadCroumb />
            <div className="content">
                <LineStep />
            </div>
            <div className="container-fluid">
                <PaymentConfirmation />
            </div>
            <Footer />
        </>
    )
}

export default page;