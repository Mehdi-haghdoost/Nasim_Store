
"use client";

import React, { useEffect, useState } from 'react';
import styles from './Tickets.module.css';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_USER_TICKETS } from '@/graphql/entities/ticket/ticket.queries';
import { useToast } from '@/Redux/hooks/useToast';
import { formatDate, showSwal } from '@/utils/helpers';

const Tickets = () => {
    const { showToast } = useToast();
    const { loading, error, data, refetch } = useQuery(GET_USER_TICKETS);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        if (data && data.getUserTickets) {
            setTickets(data.getUserTickets);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            showSwal('خطا در دریافت تیکت ها', 'error', 'تایید');
        }
    }, [error]);

    // تبدیل وضعیت تیکت به فارسی و تعیین کلاس رنگ
    const getStatusInfo = (status) => {
        switch (status) {
            case 'pending':
                return { text: 'در انتظار پاسخ', className: 'bg-secondary' };
            case 'responded':
                return { text: 'پاسخ داده شده', className: 'bg-success' };
            case 'closed':
                return { text: 'بسته شده', className: 'bg-danger' };
            default:
                return { text: status, className: 'bg-secondary' };
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center p-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">در حال بارگذاری...</span>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.table_custom}>
            {tickets && tickets.length > 0 ? (
                <table className="table shadow-none table-bordered">
                    <thead>
                        <tr>
                            <th className='align-middle text-center'> <h6 className="font-18 text-muteLink">شناسه</h6></th>
                            <th className='align-middle text-center'> <h6 className="font-18 text-muted">عنوان</h6></th>
                            <th className='align-middle text-center'> <h6 className="font-18 text-muted">تاریخ بروز رسانی</h6></th>
                            <th className='align-middle text-center'> <h6 className="font-18 text-muted">نمایش</h6></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => {
                            const statusInfo = getStatusInfo(ticket.status);
                            return (
                                <tr key={ticket._id}>
                                    <td className="align-middle text-center">
                                        <p className="mt-2 font-16">{ticket._id.substring(ticket._id.length - 6)}</p>
                                    </td>
                                    <td className="align-middle text-center">
                                        <p className="mt-2 font-16">
                                            {ticket.title}
                                            <span className={`badge ${statusInfo.className} rounded-0 me-2 text-white`}>
                                                {statusInfo.text}
                                            </span>
                                        </p>
                                    </td>
                                    <td className="align-middle text-center">
                                        <p className="mt-2 font-16">
                                            {formatDate(ticket.updatedAt)}
                                        </p>
                                    </td>
                                    <td className="align-middle text-center">
                                        <Link 
                                            href={`/p-user/tickets/ticket-message?id=${ticket._id}`} 
                                            className='btn main-color-three-bg shadow-none btn-sm'
                                        >
                                            <i className="bi bi-eye ms-1 text-white"></i>
                                            نمایش
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info text-center">
                    <p className="mb-0">هیچ تیکتی یافت نشد!</p>
                    <Link href="/p-user/tickets/sendTicket" className="btn main-color-two-bg btn-sm mt-3">
                        ارسال تیکت جدید
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Tickets;