import React from 'react'
import styles from './CartProduct.module.css';
import CartProductItem from './CartProductItem';

const CartProduct = () => {
    return (
        <div className={styles.cart_product}>
            <div className="row gy-4">
                <div className="col-lg-9">
                    <CartProductItem  />
                    <CartProductItem />
                </div>
            </div>
        </div>
    )
}

export default CartProduct