import React from 'react'
import styles from './EmptyCart.module.css';

const EmptyCart = () => {
    return (
        <div className='content'>
            <div className="container-fluid">
                <div className="content-box">
                    <div className="container-fluid">
                        <div className="text-center">
                            <img src="/images/empty-cart (1).svg" alt="سبد خرید خالی" className="mx-auto d-block" style={{ maxWidth: "400px" }} />
                            <h6 className="font-18 mt-4">سبد خرید شما خالی است</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmptyCart