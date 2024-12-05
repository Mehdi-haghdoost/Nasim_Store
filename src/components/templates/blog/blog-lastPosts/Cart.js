import React from 'react'
import styles from './Cart.module.css';
import Link from 'next/link';

const Cart = () => {
    return (
        <div className={styles.blog_item}>
            <Link href={'/'}>
                <div className={styles.image}>
                    <img src="/images/blog-1.jpg" alt="blog_item" className='img-fluid' />
                </div>
                <div className={styles.title}>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className={styles.title_item}>
                            <i className="bi bi-tag ms-1"></i>
                            <span className="font-12">آموزشی</span>
                        </div>
                        <div className={styles.title_item}>
                            <i className="bi bi-alarm ms-1"></i>
                            <span className="font-12">15 آذر 1403</span>
                        </div>
                    </div>
                    <h4 className="font-16 text-overflow-1 h4">
                        ارز دیجیتال چیست و چگونه استخراج میشود؟
                    </h4>
                </div>
            </Link>
        </div>


    )
}

export default Cart