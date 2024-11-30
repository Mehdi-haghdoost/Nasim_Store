import React, { Children } from 'react'
import styles from '@/components/layouts/UserPanelLayout.module.css';
import Header from '../modules/header/Header';
import Footer from '../modules/footer/Footer';
import BreadCroumb from '../modules/breadCroumb/BreadCroumb';
import Sidebar from '../modules/p-user/Sidebar';
function Layout({ children }) {
    return (
        <>
            <Header />
            <BreadCroumb />
            <div className={styles.content}>
                <div className="container-fluid">
                    <div className={styles.dashboard_panel}>
                        <div className='row gy-3'>
                            <div className='col-lg-3 d-lg-block d-none'>
                                <Sidebar />
                            </div>
                            <div className='col-lg-9'>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Layout;