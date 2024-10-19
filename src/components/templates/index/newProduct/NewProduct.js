import React from 'react'
import styles from './NewProduct.module.css'
import Card from './Card'
function NewProduct() {
    return (

        <div className="products-row py-20">
            <div className="container-fluid">
                <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                    <div className={`${styles.title} d-flex align-items-center`}>
                        <img src="assets/image/square.png" alt="" className="img-fluid" />
                        <h5 className="font-16 ms-3">
                            <span className="main-color-one-color d-inline-block ms-1">
                                محصولات جدید
                            </span>
                            فروشگاه
                        </h5>
                    </div>
                    <div className="link">
                        <a href="" className="border-animate fromCenter pb-1 fw-bold">
                            مشاهده همه
                            <i className="bi bi-chevron-double-left main-color-one-color"></i>
                        </a>
                    </div>
                </div>
                <div className="parent">
                    <div className="row g-3">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProduct