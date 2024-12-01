import React from 'react'
import styles from './Box.module.css';
import Link from 'next/link';

const Box = ({ icon, count, title,background }) => {
    return (

        <div className="col-md-3 col-sm-6">
            <Link href={"/"}>
                <div className={`${styles.panel_seller_item} d-flex align-items-center `}>
                    <div className={`${styles.panel_seller_icon} ${background}`}>
                        <i className={`bi ${icon}`}></i>
                    </div>
                    <div className={`d-flex flex-column ${styles.panel_seller_title}`}>
                        <h6 className="font-14">{title}</h6>
                        <h5 className={`${styles.title_font} h3`}>{count}</h5>
                    </div>
                </div>
            </Link>
        </div>

    )
}

export default Box