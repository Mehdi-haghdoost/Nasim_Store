import React from 'react'
import styles from './Card.module.css'
function Card() {
  return (
    <div className="col-lg-3 col-sm-6">
    <div className={`${styles.item} bg-white p-2 shadow-box rounded-3`}>
        <div className="row gy-2 align-items-center">
            <div className="col-4">
                <div className="image">
                    <img src="images/product/laptop-1.jpg" alt="" className="img-fluid" />
                </div>
            </div>
            <div className="col-8">
                <div className="d-flex align-items-center">
                    <div className="number ms-2">
                        <h4 className="font-22 main-color-one-color">1</h4>
                    </div>
                    <a href="">
                        <div className={`${styles.title}`}>
                            <h6 className="font-14 text-overflow-2">لپ تاپ 14.2
                                اینچی اپل مدل 2021 MacBook MKGR3 M1 Pro</h6>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Card