import React from 'react'
import styles from './Feature.module.css'
function Feature() {
  return (
    <div className={`${styles.feature}`}>
    <div className="container-fluid">
        <div className="row justify-content-center g-2 row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-5">
            <div className="col">
                <div className={`${styles.feature_item} d-flex align-items-center p-3 rounded-3 bg-white shadow-box`}>
                    <div className={`${styles.image}`}>
                        <img src="images/history.png" alt="" className="img-fluid" />
                    </div>
                    <div className="desc ms-3">
                        <h6 className=" mb-2">ضمانت بازگشت وجه</h6>
                        <p className="text-muted font-13  mb-0">در صورت عدم رضایت</p>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className={`${styles.feature_item} d-flex align-items-center p-3 rounded-3 bg-white shadow-box`}>
                    <div className={`${styles.image}`}>
                        <img src="images/credit-card.png" alt="" className="img-fluid" />
                    </div>
                    <div className="desc ms-3">
                        <h6 className="  mb-2">تضمین قیمت</h6>
                        <p className="text-muted font-13  mb-0">کمترین قیمت بازار</p>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className={`${styles.feature_item} d-flex align-items-center p-3 rounded-3 bg-white shadow-box`}>
                    <div className={`${styles.image}`}>
                        <img src="images/fast.png" alt="" className="img-fluid" />
                    </div>
                    <div className="desc ms-3">
                        <h6 className="  mb-2">ارسال سریع</h6>
                        <p className="text-muted font-13  mb-0">امن و مطمئن</p>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className={`${styles.feature_item} d-flex align-items-center p-3 rounded-3 bg-white shadow-box`}>
                    <div className={`${styles.image}`}>
                        <img src="images/headphone.png" alt="" className="img-fluid" />
                    </div>
                    <div className="desc ms-3">
                        <h6 className="  mb-2">پشتیبانی عالی</h6>
                        <p className="text-muted font-13  mb-0">24 ساعته شبانه روز</p>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className={`${styles.feature_item} d-flex align-items-center p-3 rounded-3 bg-white shadow-box`}>
                    <div className={`${styles.image}`}>
                        <img src="images/badge.png" alt="" className="img-fluid" />
                    </div>
                    <div className="desc ms-3">
                        <h6 className="  mb-2">اصالت کالا</h6>
                        <p className="text-muted font-13  mb-0">تضمین اصالت کالا</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Feature