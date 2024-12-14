import React from 'react'
import styles from '@/styles/cart.module.css';
import Header from '@/components/modules/header/Header';
import Footer from '@/components/modules/footer/Footer';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import LineStep from '@/components/templates/cart/LineStep';
import CartProduct from '@/components/templates/cart/CartProduct';

const page = () => {
    return (
        <>
            <Header />
            <BreadCroumb />
            <div className='content'>
                <div className="container-fluid">
                    <LineStep />
                </div>
                <div className="container-fluid">
                    <CartProduct />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page