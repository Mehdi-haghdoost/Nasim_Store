import React from 'react'
import styles from './PanelHeader.module.css';

const PanelHeader = () => {
    return (
        <div className={styles.panel_header}>
            <div className="content-box">
                <div className="container-fluid">
                    <div className="row gy-5 alig-items-center">
                        <div className="col-md-6 col-8">
                            <div className="d-flex align-items-center">
                                <h6>نسیم عزیز به پنل کاربری خوش آمدید</h6>
                            </div>
                        </div>
                        <div className="col-md-3 col-4">
                            <div className={`${styles.panel_alert} d-flex justify-content-end`}>
                                <i className="bi bi-bell pointer"></i>
                                <span className='rounded-circle'>0</span>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className={styles.panel_profile}>
                                <img src="/images/user.png" alt="user" className='img-fluid rounded-circle ms-3 shadow-md' />
                                <div className="d-grid gap-2">
                                    <h6 className="font-14 main-color-one-color">
                                        حساب کاربری من
                                    </h6>
                                    <div className="d-flex align-items-center">
                                        <h6 className="font-14">
                                            نسیم سودبر
                                            <a href="#" className='ms-2'>
                                                <i className="bi bi-pencil-square"></i>
                                            </a>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PanelHeader