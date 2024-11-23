import React from 'react';
import Layout from '@/components/layouts/UserPanelLayout';
import styles from '@/styles/p-user/index.module.css';
import Box from '@/components/templates/p-user/index/Box';
import OrderCart from '@/components/modules/p-user/index/OrderCart';

function page() {
  return (
    <Layout>
      <main>
        <div className="content-box">
          <div className="container-fluid">
            <div className="row gy-3">
              <div className="col-lg-8">
                <h6 className='font-14 main-color-one-color'>
                  سلام مهدی عزیز
                </h6>
                <h6 className='font-14 my-3'>
                  به فروشگاه نسیم استور خوش آمدید
                </h6>
                <p className='text-muted'>
                  از پیش خوان حساب کاربری خود میتوانید <span className='def-color fw-bold'>آخرین سفارش ها</span> را ببینید به راحتی <span className='def-color fw-bold'> آدرس حمل و نقل و صورت حساب</span> را مدیریت کنید و <span className='def-color fw-bold'>اطلاعات حساب کاربری و رمز عبور</span> خود را تغییر دهید.
                </p>
              </div>
              <div className="col-lg-4">
                <div className={styles.panel_image}>
                  <img src="/images/panel.svg" alt="panel image" className='img-fluid' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.status_panel_user}>
          <div className="row g-3">
            <Box href="/p-user/orders" title='سفارشات من' iconClass="bi-cart" />
            <Box href="/p-user/orders" title='آدرس های من' iconClass="bi-pin-map" />
            <Box href="/p-user/profile" title='حساب کاربری من' iconClass="bi-person" />
            <Box href="/p-user/orders" title='خروج از حساب' iconClass="bi-arrow-right-square" />
          </div>
        </div>
        <div className={`${styles.latest_order} mt-3`}>
          <div className="content-box">
            <div className="container-fluid">
              <div className={styles.site_table}>
                <div className='title title-panel d-flex align-items-baseline'>
                  <i className='bi bi-cart-check font-25'></i>
                  <h6 className="font-16 me-2">
                  آخرین 
                    <span className='main-color-one-color d-inline-block me-2'>سفارشات</span>
                  </h6>
                </div>
                <OrderCart />
                <OrderCart />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default page