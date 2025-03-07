"use client";

import React, { useState } from 'react'
import styles from '@/styles/cart.module.css';
import Header from '@/components/modules/header/Header';
import Footer from '@/components/modules/footer/Footer';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import LineStep from '@/components/templates/cart/LineStep';
import CartProduct from '@/components/templates/cart/CartProduct';
import EmptyCart from '@/components/templates/cart/EmptyCart';

const page = () => {

    const [counter, setCounter] = useState(2);

    return (
        <>
            <Header />
            <BreadCroumb />
            {" "}
            {counter > 0 ? (
                <div className='content'>
                    <div className="container-fluid">
                        <LineStep />
                    </div>
                    <div className="container-fluid">
                        <CartProduct />
                    </div>
                </div>
            ) : (
                <EmptyCart />
            )}

            <Footer />
        </>
    )
}

export default page