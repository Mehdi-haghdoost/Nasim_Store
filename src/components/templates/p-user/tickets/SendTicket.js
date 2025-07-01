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
            {/* Header section - responsive */}
            <div className={styles.ticket_panel}>
                <h5>ارسال تیکت جدید</h5>
                <Link
                    className={`${styles.back_btn} main-color-two-bg btn border-0 d-flex align-items-center rounded-pill`}
                    href={"/p-user/tickets"}>
                    <i className="bi bi-arrow-right me-2 d-none d-md-inline"></i>
                    لیست تیکت ها
                </Link>
            </div>

            {/* Form section */}
            <form onSubmit={handleSubmit} className={styles.form_container}>
                {/* Form fields - responsive grid */}
                <div className={styles.content}>
                    {/* Department selection */}
                    <div className={styles.group}>
                        <label className={styles.form_label}>
                            <i className="bi bi-building ms-2"></i>
                            دپارتمان را انتخاب کنید:
                        </label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            disabled={loadingDepartments}
                            className={styles.form_select}
                        >
                            <option value="">لطفا یک دپارتمان را انتخاب نمایید.</option>
                            {data && data.getDepartments && data.getDepartments.map((dep) => (
                                <option key={dep.departmentId} value={dep.departmentId}>
                                    {dep.departmentName}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Sub-department selection */}
                    <div className={styles.group}>
                        <label className={styles.form_label}>
                            <i className="bi bi-tags ms-2"></i>
                            نوع تیکت را انتخاب کنید:
                        </label>
                        <select
                            name="subDepartment"
                            value={formData.subDepartment}
                            onChange={handleChange}
                            disabled={!formData.department || subDepartments.length === 0}
                            className={styles.form_select}
                        >
                            <option value="">لطفا یک مورد را انتخاب نمایید.</option>
                            {subDepartments.map((subDep, index) => (
                                <option key={index} value={subDep}>
                                    {subDep}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Title input */}
                    <div className={styles.group}>
                        <label className={styles.form_label}>
                            <i className="bi bi-pencil ms-2"></i>
                            عنوان تیکت را وارد کنید:
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="عنوان..."
                            type="text"
                            className={styles.form_input}
                        />
                    </div>
                    
                    {/* Priority selection */}
                    <div className={styles.group}>
                        <label className={styles.form_label}>
                            <i className="bi bi-exclamation-triangle ms-2"></i>
                            سطح اولویت تیکت را انتخاب کنید:
                        </label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className={styles.form_select}
                        >
                            <option value="">لطفا یک مورد را انتخاب نمایید.</option>
                            <option value="low">کم</option>
                            <option value="medium">متوسط</option>
                            <option value="high">بالا</option>
                        </select>
                    </div>
                </div>
                
                {/* Content textarea - full width */}
                <div className={styles.group}>
                    <label className={styles.form_label}>
                        <i className="bi bi-chat-text ms-2"></i>
                        محتوای تیکت را وارد نمایید:
                    </label>
                    <textarea
                        name="initialRequest"
                        value={formData.initialRequest}
                        onChange={handleChange}
                        rows={10}
                        className={styles.form_textarea}
                        placeholder="توضیحات کامل مشکل یا درخواست خود را بنویسید..."
                    ></textarea>
                </div>
                
                {/* File uploader */}
                <div className={styles.uploader}>
                    <div className={styles.uploader_info}>
                        <i className="bi bi-cloud-upload ms-2"></i>
                        <div className={styles.uploader_text}>
                            <span className={styles.uploader_title}>آپلود فایل (اختیاری)</span>
                            <div className={styles.uploader_details}>
                                <span>حداکثر اندازه: 6 مگابایت</span>
                                <span>فرمت‌های مجاز: jpg, png, jpeg, rar, zip</span>
                            </div>
                        </div>
                    </div>
                    <input 
                        type="file" 
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.rar,.zip"
                        className={styles.file_input}
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className={styles.file_label}>
                        <i className="bi bi-paperclip text-white ms-2"></i>
                        {file ? file.name : 'انتخاب فایل'}
                    </label>
                    {fileError && <p className={styles.error}>{fileError}</p>}
                </div>

                {/* Submit button */}
                <div className={styles.submit_section}>
                    <button 
                        type="submit" 
                        className={styles.submit_btn} 
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className={styles.loading_spinner}></div>
                                در حال ارسال...
                            </>
                        ) : (
                            <>
                                <IoIosSend className={styles.send_icon} />
                                ارسال تیکت
                            </>
                        )}
                    </button>
                </div>
            </form>
        </main>
    );
};

export default SendTicket;