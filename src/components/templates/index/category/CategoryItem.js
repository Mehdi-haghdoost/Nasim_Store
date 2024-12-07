import React from 'react'
import styles from './CategoryItem.module.css';

const CategoryItem = ({ title, src }) => {
    return (
        <div className="col-lg-3 col-sm-6 col-12">

            <div className={`${styles.category_item} p-3 rounded-3 bg-white shadow-box`}>
                <button>
                    <div
                        className="d-flex align-items-center justify-content-md-flex-start justify-content-between">
                        <div className={`${styles.image}`}>
                            <img src={src} alt="" className="img-fluid" />
                        </div>
                        <div className="text ms-3">
                            <p className="text-center font-14 text-overflow-1">{title}</p>
                            <a href=""
                                className={`btn text-muted-two btn-sm font-14 px-3 ${styles.light_btn} shadow-sm`}><span>مشاهده</span>
                                <i
                                    className="bi bi-chevron-double-left font-16 main-color-one-color ms-2"></i></a>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default CategoryItem