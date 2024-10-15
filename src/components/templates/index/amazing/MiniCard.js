import React from 'react'
import styles from './MiniCard.module.css'
function MiniCard() {
  return (
    <div className={`${styles.miniCard}`}>
      <div className={`${styles.item}`} >
        <div className="row gy-2">
          <div className="col-4">
            <div className="image">
              <img src="/images/product/laptop-1.jpg" loading="lazy"
                alt="" className="img-fluid" />
            </div>
          </div>
          <div className="col-8">
            <div className={`${styles.title}`} >
              <h6 className="font-14 text-overflow-2">لپ تاپ 14.2 اینچی اپل مدل
                2021 MacBook MKGR3 M1 Pro</h6>
              <p className="mb-0 text-muted font-12 mt-2 text-overflow-2">Apple
                MacBook MKGR3 M1 Pro 2021 14.2 inch laptop</p>
            </div>
            <div className={`${styles.price} d-flex `} >
              <p className="text-end new-price mb-2 price-off fw-bold"><span
                className="main-color-one-color">1,750,000</span> <small
                  className="font-11">تومان</small></p>
              <p className={`text-end ${styles.old_price} price-discount`}>2,750,000 <small
                className="font-11">تومان</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniCard