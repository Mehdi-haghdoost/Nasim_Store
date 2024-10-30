import React from 'react'
import styles from './BreadCroumb.module.css'
function BreadCroumb() {
    return (
        <div className="bread-crumb pt-3">
            <div className="container-fluid">
                <div className="content-box">
                    <div className="container-fluid">
                        <nav aria-label="breadcrumb" className="my-lg-0 my-2">
                            <ol className="breadcrumb mb-0">
                                <li className={styles.breadcrumb_item}><a href="#" className="font-14 text-muted">خانه</a></li>
                                <li className={styles.breadcrumb_item}><a href="#" className="font-14 text-muted">/ فروشگاه</a></li>
                                <li className={styles.breadcrumb_item}><a href="#" className="font-14 text-muted">/ گوشی هوشمند</a></li>
                                <li className={`${styles.breadcrumb_item} active main-color-one-color font-14`} aria-current="page">/ گوشی شیائومی
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BreadCroumb