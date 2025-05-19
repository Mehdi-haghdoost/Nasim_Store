// src/app/cart/page.js
'use client';

import React, { useEffect, useState } from 'react';
import styles from '@/styles/cart.module.css';
import Header from '@/components/modules/header/Header';
import Footer from '@/components/modules/footer/Footer';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import LineStep from '@/components/templates/cart/LineStep';
import CartProduct from '@/components/templates/cart/CartProduct';
import EmptyCart from '@/components/templates/cart/EmptyCart';
import { useCart } from '@/Redux/hooks/useCart';
import { useDispatch } from 'react-redux';
import { syncCartFromLocalStorage } from '@/Redux/actions/cartThunks';

const CartPage = () => {
  const { items, loading } = useCart();
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log('Dispatching syncCartFromLocalStorage');
    dispatch(syncCartFromLocalStorage());
  }, [dispatch]);

  if (!isClient || loading) {
    return (
      <>
        <Header />
        <BreadCroumb />
        <div className="content">
          <div className="container-fluid text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">در حال بارگذاری سبد خرید...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const hasItems = items && items.length > 0;

  return (
    <>
      <Header />
      <BreadCroumb />
      {hasItems ? (
        <div className="content">
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
  );
};

export default CartPage;