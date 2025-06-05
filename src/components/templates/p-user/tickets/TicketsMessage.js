"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import styles from './TicketsMessage.module.css';
import { useSearchParams } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TICKET_BY_ID } from '@/graphql/entities/ticket/ticket.queries';
import { CLOSE_TICKET } from '@/graphql/entities/ticket/ticket.mutations';
import { formatDate, showSwal } from '@/utils/helpers';
import swal from 'sweetalert';
import Link from 'next/link';

const TicketsMessageContent = () => {
    const searchParams = useSearchParams();
    const ticketId = searchParams.get('id');
    const messagesEndRef = useRef(null);
    const [localTicketClosed, setLocalTicketClosed] = useState(false);
    
    const { data, loading, error, refetch } = useQuery(GET_TICKET_BY_ID, {
        variables: { ticketId },
        skip: !ticketId,
        fetchPolicy: 'network-only'
    });

    const [closeTicket, { loading: closingTicket }] = useMutation(CLOSE_TICKET, {
        onCompleted: () => {
            setLocalTicketClosed(true);
            showSwal('تیکت با موفقیت بسته شد', 'success', 'تایید');
            refetch();
        },
        onError: (error) => {
            showSwal('خطا در بستن تیکت، لطفا بعداً تلاش کنید', 'error', 'تایید');
        }
    });

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [data]);
    
    useEffect(() => {
        if (data?.getTicketById?.status) {
            const serverStatus = data.getTicketById.status.toLowerCase();
            if (serverStatus === 'closed') {
                setLocalTicketClosed(true);
            }
        }
    }, [data]);

    const handleCloseTicket = async () => {
        swal({
            title: "آیا از بستن این تیکت اطمینان دارید؟",
            text: "پس از بستن تیکت، امکان ارسال پیام وجود نخواهد داشت.",
            icon: "warning",
            buttons: ["لغو", "بله، تیکت بسته شود"],
            dangerMode: true,
        }).then((willClose) => {
            if (willClose) {
                closeTicket({ variables: { ticketId } });
            }
        });
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

    if (error || !data || !data.getTicketById) {
        return (
            <div className="alert alert-danger m-3">
                <p className="mb-0">خطا در بارگذاری تیکت. لطفاً مجدداً تلاش کنید.</p>
                <Link href="/p-user/tickets" className="btn btn-outline-danger mt-3">
                    بازگشت به لیست تیکت‌ها
                </Link>
            </div>
        );
    }

    const ticket = data.getTicketById;
    const isTicketClosed = ticket.status.toLowerCase() === 'closed';
    
    const renderMessages = () => {
        if (!ticket) return null;

        const allMessages = [
            {
                _id: 'initial',
                sender: 'user',
                text: ticket.initialRequest,
                createdAt: ticket.createdAt,
                username: ticket.username
            },
            ...(ticket.messages || [])
        ];

        return allMessages.map((msg, index) => {
            if (msg.sender === 'user') {
                return (
                    <div key={`msg-${index}`} className={`${styles.ticket} shadow-none`}>
                        <div className={styles.ticket_author_ava}>
                            <img src="/images/user-profile.png" alt="Avatar" />
                        </div>
                        <div className={styles.ticket_body}>
                            <p className={styles.ticket_text}>
                                {msg.text}
                            </p>
                            <div className={styles.ticket_footer}>
                                <span className={styles.ticket_footer_name}>{ticket.username}</span>
                                <div className={`float-start ${styles.ticket_date}`}>
                                    <span>{formatDate(msg.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div key={`msg-${index}`} className={`${styles.ticket} shadow-none`}>
                        <div className={styles.ticket_author_ava}>
                            <img src="/images/user.png" alt="Avatar" />
                        </div>
                        <div className={styles.ticket_body}>
                            <p className={styles.ticket_text}>
                                {msg.text}
                            </p>
                            <div className={styles.ticket_footer}>
                                <span className={styles.ticket_footer_name}>پشتیبان</span>
                                <div className={`float-start ${styles.ticket_date}`}>
                                    <span>{formatDate(msg.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    };

    return (
        <div className={styles.ticket_message}>
            {renderMessages()}
            <div ref={messagesEndRef} />
            
            {localTicketClosed || isTicketClosed ? (
                <div className="alert alert-warning text-center mt-4">
                    <p className="mb-0">این تیکت بسته شده است و امکان ارسال پیام وجود ندارد.</p>
                    <Link href="/p-user/tickets/sendTicket" className="btn main-color-two-bg btn-sm mt-3">
                        ایجاد تیکت جدید
                    </Link>
                </div>
            ) : (
                <>
                    <div className="alert alert-info text-center mt-4">
                        <p className="mb-0">پاسخ به این تیکت توسط تیم پشتیبانی ارسال خواهد شد.</p>
                    </div>
                    <div className="text-center mt-3 mb-4">
                        <button 
                            className="btn btn-danger" 
                            onClick={handleCloseTicket}
                        >
                            {closingTicket ? 'در حال بستن...' : 'بستن تیکت'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const TicketsMessage = () => (
    <Suspense fallback={
        <div className="d-flex justify-content-center align-items-center p-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">در حال بارگذاری...</span>
            </div>
        </div>
    }>
        <TicketsMessageContent />
    </Suspense>
);

export default TicketsMessage;