"use client";

import React, { useState, useEffect } from 'react';
import styles from './SendTicket.module.css';
import Link from 'next/link';
import { IoIosSend } from "react-icons/io";
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TICKET } from '@/graphql/entities/ticket/ticket.mutations';
import { GET_DEPARTMENTS } from '@/graphql/entities/ticket/ticket.queries';
import { useRouter } from 'next/navigation';
import { useToast } from '@/Redux/hooks/useToast';
import { showSwal, formatDate } from '@/utils/helpers';

const SendTicket = () => {
    const router = useRouter();
    const { showToast } = useToast();
    
    // GraphQL Queries & Mutations
    const { data, loading: loadingDepartments, error: departmentsError } = useQuery(GET_DEPARTMENTS);
    const [createTicket, { loading, error }] = useMutation(CREATE_TICKET, {
        onCompleted: () => {
            showSwal('تیکت شما با موفقیت ثبت شد', 'success', 'تایید');
            router.push('/p-user/tickets');
        },
        onError: (error) => {
            showSwal('خطا در ایجاد تیکت، لطفا بعداً تلاش کنید', 'error', 'تایید');
        }
    });

    // Local States
    const [formData, setFormData] = useState({
        title: '',
        department: '',
        subDepartment: '',
        priority: '',
        initialRequest: '',
    });
    const [subDepartments, setSubDepartments] = useState([]);
    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState('');

    // Update subDepartments when department changes or data loads
    useEffect(() => {
        if (formData.department && data && data.getDepartments) {
            const selectedDepartment = data.getDepartments.find(
                (dep) => dep.departmentId === formData.department
            );
            if (selectedDepartment) {
                setSubDepartments(selectedDepartment.subDepartments || []);
                setFormData(prev => ({ ...prev, subDepartment: '' }));
            }
        } else {
            setSubDepartments([]);
        }
    }, [formData.department, data]);

    // Handle errors
    useEffect(() => {
        if (departmentsError) {
            showSwal('خطا در دریافت دپارتمان‌ها', 'error', 'تایید');
        }
    }, [departmentsError]);

    // Form event handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFileError('');

        if (selectedFile) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/zip', 'application/x-rar-compressed'];
            const maxSize = 6 * 1024 * 1024; // 6 MB

            if (!allowedTypes.includes(selectedFile.type)) {
                setFileError('فرمت فایل نامعتبر است. فقط jpg, png, jpeg, rar و zip پشتیبانی می‌شوند.');
                setFile(null);
                return;
            }

            if (selectedFile.size > maxSize) {
                setFileError('حجم فایل بیشتر از 6 مگابایت است.');
                setFile(null);
                return;
            }

            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        if (!formData.title.trim()) {
            showSwal('لطفاً عنوان تیکت را وارد کنید.', 'error', 'تایید');
            return;
        }
        if (!formData.department) {
            showSwal('لطفاً دپارتمان را انتخاب کنید.', 'error', 'تایید');
            return;
        }
        if (!formData.priority) {
            showSwal('لطفاً اولویت را انتخاب کنید.', 'error', 'تایید');
            return;
        }
        if (!formData.initialRequest.trim()) {
            showSwal('لطفاً محتوای تیکت را وارد کنید.', 'error', 'تایید');
            return;
        }

        // Prepare variables for the mutation
        const variables = {
            input: { ...formData }
        };

        // If there's a file, add it to the variables
        if (file) {
            variables.file = file;
        }

        try {
            await createTicket({ variables });
        } catch (err) {
            // Error is handled in the onError callback of the mutation
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.ticket_panel}>
                <h5>ارسال تیکت جدید</h5>
                <Link
                    className='main-color-two-bg btn border-0 d-flex align-items-center rounded-pill ms-3'
                    href={"/p-user/tickets"}>
                    لیست تیکت ها
                </Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.content}>
                    <div className={styles.group}>
                        <label>دپارتمان را انتخاب کنید:</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            disabled={loadingDepartments}
                        >
                            <option value="">لطفا یک دپارتمان را انتخاب نمایید.</option>
                            {data && data.getDepartments && data.getDepartments.map((dep) => (
                                <option key={dep.departmentId} value={dep.departmentId}>
                                    {dep.departmentName}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className={styles.group}>
                        <label>نوع تیکت را انتخاب کنید:</label>
                        <select
                            name="subDepartment"
                            value={formData.subDepartment}
                            onChange={handleChange}
                            disabled={!formData.department || subDepartments.length === 0}
                        >
                            <option value="">لطفا یک مورد را انتخاب نمایید.</option>
                            {subDepartments.map((subDep, index) => (
                                <option key={index} value={subDep}>
                                    {subDep}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className={styles.group}>
                        <label>عنوان تیکت را وارد کنید:</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="عنوان..."
                            type="text"
                        />
                    </div>
                    
                    <div className={styles.group}>
                        <label>سطح اولویت تیکت را انتخاب کنید:</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option value="">لطفا یک مورد را انتخاب نمایید.</option>
                            <option value="low">کم</option>
                            <option value="medium">متوسط</option>
                            <option value="high">بالا</option>
                        </select>
                    </div>
                </div>
                
                <div className={styles.group}>
                    <label>محتوای تیکت را وارد نمایید:</label>
                    <textarea
                        name="initialRequest"
                        value={formData.initialRequest}
                        onChange={handleChange}
                        rows={10}
                    ></textarea>
                </div>
                
                <div className={styles.uploader}>
                    <span>حداکثر اندازه: 6 مگابایت</span>
                    <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
                    <input 
                        type="file" 
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.rar,.zip"
                    />
                    {fileError && <p className={styles.error}>{fileError}</p>}
                </div>

                <button 
                    type="submit" 
                    className={styles.btn} 
                    disabled={loading}
                >
                    {loading ? (
                        <span>در حال ارسال...</span>
                    ) : (
                        <>
                            <IoIosSend />
                            ارسال تیکت
                        </>
                    )}
                </button>
            </form>
        </main>
    );
};

export default SendTicket;