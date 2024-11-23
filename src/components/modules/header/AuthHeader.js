import React from 'react'
import Link from 'next/link';
import styles from './AuthHeader.module.css'
function AuthHeader() {
  return (
    <div className="col-lg-4 order-lg-3 d-lg-block d-none">
    <div className="d-flex align-items-center justify-content-end">
        <div className={`btn-group rounded-pill shadow-sm ${styles.header_btn_group} `}>
            <div>
                <Link href='/login-register' className={`${styles.header_register} btn btn-white border-o rounded-pill`}>
                    <i className='bi bi-person-circle font-20 text-muted me-1'></i>
                    <span>ثبت نام / ورود</span>
                </Link>
            </div>
            {/* <Link href="/login" className={`${styles.header_login} btn btn-white border-o rounded-pill`}>ورود</Link> */}
        </div>
        <div className={`${styles.header_whishlist} shadow-sm`}>
            <Link href='/wishlist'>
                <i className='bi bi-bookmark-check font-20 text-muted'></i>
            </Link>
        </div>
        <div className={`${styles.header_cart} ms-1 shadow-sm rounded-pill`}>
            <Link href='' >
                <i className='bi bi-shop font-20 text-muted me-1'></i>
                <span className={`main-color-one-bg ${styles.header_counter} rounded-pill`}>5</span>
            </Link>
        </div>
    </div>
</div>
  )
}

export default AuthHeader