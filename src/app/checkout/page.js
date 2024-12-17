import React from 'react'
import styles from '@/styles/Checkout.module.css';
import Header from '@/components/modules/header/Header';
import Footer from '@/components/modules/footer/Footer';
import LineStep from '@/components/templates/checkout/LineStep';
import DiscountModal from '@/components/templates/checkout/DiscountModal';

const Checkout = () => {
  return (
    <>
      <Header />
      <div className='content'>
        <LineStep />
      </div>
      <div className='container-fluid'>
        <DiscountModal />
      </div>

      <Footer />

    </>
  )
}

export default Checkout