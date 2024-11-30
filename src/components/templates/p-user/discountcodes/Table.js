import React from 'react'
import styles from './Table.module.css';

const Table = () => {

    const discounts = [
        {
            id: 1,
            code: "SUMMER2024",
            percent: 20,
            deadline: "1403-6-10",
        },
        {
            id: 2,
            code: "WELCOME10",
            percent: 10,
            deadline: "1403-4-10",
        },
        {
            id: 3,
            code: "BLACKFRIDAY",
            percent: 50,
            deadline: "1403-3-10",
        },
        {
            id: 4,
            code: "FREESHIP",
            percent: 100,
            deadline: "1403-5-10",
        },
    ]

    return (



        <table className={styles.table}>
            <thead>
                <tr>
                    <th>شناسه</th>
                    <th>کد</th>
                    <th>درصد</th>
                    <th>مهلت استفاده</th>

                </tr>
            </thead>
            <tbody>
                {discounts.map((discount, index) => (
                    <tr >
                        <td>{discount.id}</td>
                        <td>{discount.code}</td>
                        <td>{discount.percent}</td>
                        <td>{discount.deadline}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table