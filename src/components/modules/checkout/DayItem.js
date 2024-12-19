import React from 'react'
import styles from './DayItem.module.css';

const DayItem = ({ name, date, onClick, isActive }) => {

    return (
        <div className="col-4" onClick={onClick}>
            <div className={`${styles.send_item} ${isActive ? styles.active : ''}`}>
                <h6 className="font-14 text-center">{name}</h6>
                <p className="font-14 text-center mt-1 mb-0 text-muted"> {date} </p>
            </div>
        </div>
    )
}

export default DayItem