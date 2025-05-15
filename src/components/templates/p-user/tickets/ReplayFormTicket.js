"use client";

import React, { useState } from 'react';
import styles from './ReplayFormTicket.module.css';
import { IoIosSend } from "react-icons/io";

const ReplayFormTicket = ({ onSubmit }) => {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);
        try {
            await onSubmit(message, file);
            setMessage('');
            setFile(null);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="content-box">
            <div className="container-fluid">
                <div className="title-panel">
                    <h5 className="mb-3">ارسال پیام</h5>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <textarea
                            className='form-control form-control-rounded'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="8"
                            placeholder="پیام خود را وارد کنید..."
                            required=""
                            disabled={loading}
                        >
                        </textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFile" className='form-label'>فایل</label>
                        <input 
                            type="file" 
                            className='form-control' 
                            id='formFile' 
                            onChange={handleFileChange}
                            disabled={loading}
                            accept=".jpg,.jpeg,.png,.rar,.zip"
                        />
                        {file && (
                            <div className="mt-2 text-success">
                                <small>فایل انتخاب شده: {file.name}</small>
                            </div>
                        )}
                    </div>
                    <div className="text-right">
                        <button 
                            className="btn border-0 main-color-one-bg d-flex align-items-center" 
                            type='submit'
                            disabled={loading || !message.trim()}
                        >
                            {loading ? (
                                <span>در حال ارسال...</span>
                            ) : (
                                <>
                                    <IoIosSend className="me-2" />
                                    ارسال پیام
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReplayFormTicket;