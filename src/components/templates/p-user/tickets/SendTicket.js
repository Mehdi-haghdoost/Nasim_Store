import React from 'react'
import styles from './SendTicket.module.css';
import Link from 'next/link';
import { IoIosSend } from "react-icons/io";


const SendTicket = () => {
    return (
        <main className={styles.container}>
            <div className={styles.ticket_panel}>
                <h5>ارسال تیکت جدید</h5>
                <Link
                    className=' main-color-two-bg btn border-0 d-flex align-items-center rounded-pill ms-3'
                    href={"/p-user/tickets"}>
                    لیست تیکت ها
                </Link>
            </div>

            <div className={styles.content}>
                <div className={styles.group}>
                    <label>دپارتمان را انتخاب کنید:</label>
                    <select>
                        <option >لطفا یک دپارتمان را انتخاب نمایید.</option>


                        <option value="">نام دپارتمان</option>

                    </select>
                </div>
                <div className={styles.group}>
                    <label>نوع تیکت را انتخاب کنید:</label>
                    <select >
                        <option value="">لطفا یک مورد را انتخاب نمایید.</option>


                        <option value="">نام ساب دپارتمان </option>

                    </select>
                </div>
                <div className={styles.group}>
                    <label>عنوان تیکت را وارد کنید:</label>
                    <input value="" placeholder="عنوان..." type="text" />
                </div>
                <div className={styles.group}>
                    <label>سطح اولویت تیکت را انتخاب کنید:</label>
                    <select >
                        <option >لطفا یک مورد را انتخاب نمایید.</option>
                        <option value={1}>کم</option>
                        <option value={2}>متوسط</option>
                        <option value={3}>بالا</option>
                    </select>
                </div>
            </div>
            <div className={styles.group}>
                <label>محتوای تیکت را وارد نمایید:</label>
                <textarea value="" rows={10} ></textarea>
            </div>
            <div className={styles.uploader}>
                <span>حداکثر اندازه: 6 مگابایت</span>
                <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
                <input type="file" />
            </div>

            <button className={styles.btn} >
                <IoIosSend />
                ارسال تیکت
            </button>
        </main>
    )
}

export default SendTicket