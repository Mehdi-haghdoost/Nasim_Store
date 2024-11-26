import React from 'react'
import styles from './address.module.css';
import Link from 'next/link';
import AddressCard from '@/components/modules/p-user/address/AddressCard';

const Address = () => {

    return (
        <main>
            <div className="ui-boxs">
                <div className="ui-box">
                    <div className="ui-box-item ui-box-white">
                        <div className="ui-box-title" style={{ padding: "15px" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="fw-bold">
                                    آدرس ها
                                </h4>
                                <Link href={'/newaddress'} className='btn main-color-one-bg btn-sm waves-effect waves-light d-flex align-items-normal'>
                                    ثبت آدرس جدید
                                    <i className='bi text-white bi-plus-circle me-2'></i>
                                </Link>
                            </div>
                        </div>
                        <div className="ui-box-item-desc">
                            <div className={styles.address}>
                                <div className={styles.address_item}>
                                    <div className={`flex-nowrap ${styles.address_item_status}`}>
                                        <div className={styles.address_item_status_item}>
                                            <p className='fw-bold'>
                                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
                                            </p>
                                        </div>
                                        <div className={styles.address_item_status_item}>
                                            <div className="dropdown">
                                                <a href="" className='' role='button' id='dropdownMenuLink' data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className='bi bi-three-dots-vertical text-dark fs-5'></i>
                                                </a>
                                                <ul className="dropdown-menu flex-column" aria-labelledby="dropdownMenuLink">
                                                    <li>
                                                        <a href="" className="dropdown-item ">
                                                            <i className='bi bi-pencil ms-2'></i>
                                                            ویرایش
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="" className="dropdown-item ">
                                                            <i className='bi bi-trash text-danger ms-2'></i>
                                                            حذف
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`border-0 ${styles.address_item_detail}`}>
                                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                                            <div className="d-flex flex-column">
                                                <div className="text-muted mb-4 d-flex align-items-baseline mb-2">
                                                    <i className="bi bi-pin-map ms-3">
                                                    </i>
                                                    <h6 className="mb-0 font-15 fw-normal">آدرس :</h6>
                                                    <p className="me-2 font-16 mb-0">فردیس کرج</p>
                                                </div>
                                                <div className="text-muted mb-4 d-flex align-items-baseline mb-2">
                                                    <i className="bi bi-envelope ms-3">
                                                    </i>
                                                    <h6 className="mb-0 font-15 fw-normal">شماره تلفن :</h6>
                                                    <p className="me-2 font-16 mb-0">02165556759</p>
                                                </div>
                                                <div className="text-muted mb-4 d-flex align-items-baseline mb-2">
                                                    <i className="bi bi-phone ms-3">
                                                    </i>
                                                    <h6 className="mb-0 font-15 fw-normal">شماره همراه :</h6>
                                                    <p className="me-2 font-16 mb-0">09211367465</p>
                                                </div>
                                                <div className="text-muted mb-4 d-flex align-items-baseline mb-2">
                                                    <i className="bi bi-person ms-3">
                                                    </i>
                                                    <h6 className="mb-0 font-15 fw-normal">نام تحویل گیرنده :</h6>
                                                    <p className="me-2 font-16 mb-0">مهدی حق دوست</p>
                                                </div>
                                            </div>
                                            <img src="/images/map.jpg" alt="map" height="150" width="150" className='img-thumbnail' style={{ pointerEvents: "none" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                <div className={`d-flex alig-items-center ${styles.title}`}>
                    <img src="/images/square.png" alt="" className='main-color-one-color d-inline-block me-1' />
                    <h5 className="font-16 me-3">
                        <span className="main-color-one-color d-inline-block me-1">
                            آدرس های
                        </span>
                        <strong className='me-2 font-16'>ثبت شده</strong>
                    </h5>
                </div>
            </div>
            <div className="content-box">
                <div className="container-fluid">
                    <div className="row">
                        <AddressCard />
                        <AddressCard />
                        <AddressCard title="آدرس پیشفرض" />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Address