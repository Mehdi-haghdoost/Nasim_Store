
"use client";

import React, { useEffect } from 'react';
import Layout from '@/components/layouts/UserPanelLayout';
import TicketsMessage from '@/components/templates/p-user/tickets/TicketsMessage';
import styles from '@/styles/p-user/ticketMessage.module.css';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_TICKET_BY_ID } from '@/graphql/entities/ticket/ticket.queries';
import { formatDate } from '@/utils/helpers';
import Link from 'next/link';

const Page = () => {
    const searchParams = useSearchParams();
    const ticketId = searchParams.get('id');
    
    // با fetchPolicy: 'network-only' همیشه داده‌ها از سرور دریافت می‌شوند
    const { data, loading, error, refetch } = useQuery(GET_TICKET_BY_ID, {
        variables: { ticketId },
        skip: !ticketId,
        fetchPolicy: 'network-only'
    });

    // هر 5 ثانیه یکبار داده‌ها به‌روز می‌شوند
    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
        }, 5000);
        
        return () => clearInterval(interval);
    }, [refetch]);

    // وقتی صفحه دوباره فعال می‌شود، داده‌ها به‌روز می‌شوند
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                refetch();
            }
        };
        
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [refetch]);

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
            <Layout>
                <div className="d-flex justify-content-center align-items-center p-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">در حال بارگذاری...</span>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error || !data || !data.getTicketById) {
        return (
            <Layout>
                <div className="alert alert-danger m-3">
                    <p className="mb-0">خطا در بارگذاری تیکت. لطفاً مجدداً تلاش کنید.</p>
                    <Link href="/p-user/tickets" className="btn btn-outline-danger mt-3">
                        بازگشت به لیست تیکت‌ها
                    </Link>
                </div>
            </Layout>
        );
    }

    const ticket = data.getTicketById;
    const statusInfo = getStatusInfo(ticket.status);

    return (
        <Layout>
            <div className="content-box">
                <div className="container-fluid">
                    <div className="title-panel">
                        <div className="d-flex alig-items-baseline">
                            <div className={`${styles.ticket_status} ms-4`}>
                                <span className={`badge ${statusInfo.className} rounded-0 font-14 ms-4 text-white`}>
                                    {statusInfo.text}
                                </span>
                                <span className="text-muted font-16 fw-lighter mb-0">
                                    #{ticket._id.substring(ticket._id.length - 6)}
                                </span>
                            </div>
                            <div className={`${styles.ticket_created_at} ms-4`}>
                                <i className="bi bi-clock ms-2"></i>
                                <span>تاریخ ایجاد {formatDate(ticket.createdAt)}</span>
                            </div>
                            <div className={`${styles.ticket_created_at} ms-4`}>
                                <i className="bi bi-arrow-left ms-2"></i>
                                <span>بروز شده {formatDate(ticket.updatedAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TicketsMessage />
        </Layout>
    );
};

export default Page;