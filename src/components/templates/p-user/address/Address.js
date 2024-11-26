import React from 'react'
import styles from './address.module.css';
import Link from 'next/link';

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
                                <Link href={'/newaddress'} className='btn main-color-one-bg btn-sm waves-effect waves-light'>
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
                                            <p>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Address