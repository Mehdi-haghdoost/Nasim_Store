import React from 'react'
import Link from 'next/link'
import Footer from '@/components/modules/footer/Footer'
import Header from '@/components/modules/header/Header'
import styles from '../styles/404.module.css'

function Page() {
    return (
        <>
            <Header />
            <div className="content">
                <div className="container-fluid">
                    <div className="content-box">
                        <div className="container-fluid">
                            <div className={styles.page_404}>
                                <h2 className="h1 mb-1 text-center">صفحه‌ای که دنبال آن بودید پیدا نشد!</h2>
                                <img src="/images/404-Error.svg" className="img-fluid" height="150" alt="" />
                            </div>
                            <div className="text-center">
                                <Link href={'/'} className="btn border-0 py-3 px-5 fs-6 btn-lg main-color-three-bg rounded-pill">صفحه اصلی</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Page