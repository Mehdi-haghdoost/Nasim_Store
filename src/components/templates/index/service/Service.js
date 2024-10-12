import React from 'react'
import styles from './Service.module.css'
function Service() {
    return (
        <div className={`${styles.service}`}>
        <div className="container-fluid">
            <div className="row gy-3 justify-content-between align-items-center">
                <div className="col-lg-3">
                    <div className={`${styles.service_title}`}>
                        <h6 className="font-25 text-white mb-3">
                            بیش از 5000 محصول
                        </h6>
                        <p className="mb-0 text-white font-13">برترین برندهای اصلی و خارجی</p>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div
                        className={`row gy-2 gx-2 ${styles.service_logo} justify-content-md-end justify-content-center align-items-center`}>
                        <div className="col-md-2 col-4 item">
                            <a href="">
                                <img src="/images/brand1-1.png" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="col-md-2 col-4 item">
                            <a href="">
                                <img src="/images/brand1-2.png" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="col-md-2 col-4 item">
                            <a href="">
                                <img src="/images/brand1-3.png" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="col-md-2 col-4 item">
                            <a href="">
                                <img src="/images/brand1-4.png" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="col-md-2 col-4 item">
                            <a href="">
                                <img src="/images/brand1-5.png" alt="" className="img-fluid" />
                            </a>
                        </div>
                        <div className="col-md-2 col-4 item">
                            <a href="">
                                <img src="/images/brand1-6.png" alt="" className="img-fluid" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Service