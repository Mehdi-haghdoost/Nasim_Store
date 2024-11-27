import React from 'react'
import styles from './notifCard.module.css';

const NotifCard = () => {
    return (
        <div className="alert alert-warning" role='alert'>
            <div className={styles.notifi_title}>
                <h6 className="alert-link">تیتر اطلاعیه ها</h6>
                <p className="text-muted">7 آذر 1403</p>
            </div>
            <div className={styles.notifi_desc}>
                <p>
                    دوره آنلاین برنامه نویس بک اند با بیش از 100 ساعت آموزش تخصصی و پروژه محور بدون نیاز به پیشنیاز با مدرک پایان دوره وقتشه که شروع کنی !!
                </p>
            </div>
        </div>
    )
}

export default NotifCard