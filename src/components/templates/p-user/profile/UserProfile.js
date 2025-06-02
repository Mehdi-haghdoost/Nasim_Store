"use client";
import React, { useState, useEffect } from 'react';
import styles from './UserProfile.module.css';
import DataTable from './DataTable';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '@/Redux/actions/authThunks';
import { showSwal } from '@/utils/helpers';

const UserProfile = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        nationalId: '',
        email: '',
        postalCode: '',
        bio: ''
    });

    useEffect(() => {
        if (user) {
            console.log("User data from Redux:", user);
            const savedBio = localStorage.getItem('userBio') || '';

            setFormData({
                username: user?.username || '',
                phone: user?.phone || '',
                nationalId: user?.nationalId || '',
                email: user?.email || '',
                postalCode: user?.postalCode || '',
                bio: user?.bio || savedBio
            });
        }
    }, [user]);

    const hideModal = () => setShowModal(false);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = async () => {
        try {
            console.log("Submitting form data:", formData);

            const response = await dispatch(updateUserProfile({ input: formData }));
            console.log("Update profile response:", response);

            // بررسی درست response
            if (response.type.endsWith('/fulfilled')) {
                // ذخیره بیو در localStorage
                localStorage.setItem('userBio', formData.bio || '');
                
                showSwal("اطلاعات شما با موفقیت ویرایش شد", "success", "باشه");
                setShowModal(false);
                
                // حذف کردیم checkAuth را چون دیگر نیازی نیست
                // Redux state خودش به‌روزرسانی می‌شود
            } else if (response.type.endsWith('/rejected')) {
                // نمایش خطای دقیق از سرور
                const errorMessage = response.payload || "مشکلی در ویرایش اطلاعات پیش آمد";
                showSwal(errorMessage, "error", "باشه");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            showSwal("مشکلی در ویرایش اطلاعات پیش آمد", "error", "باشه");
        }
    };

    return (
        <>
            <main>
                <div className="ui-boxs">
                    <div className="ui-box">
                        <div className="ui-box-item ui-box-white">
                            <div className="ui-box-item-title">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="fw-bold">اطلاعات شخصی</h4>
                                    <button
                                        onClick={() => { setShowModal(true) }}
                                        style={{ padding: "4px 12px", fontWeight: '500', fontSize: "13px" }}
                                        className="btn btn-sm main-color-one-bg waves-effect waves-light"
                                        disabled={loading}
                                    >
                                        {loading ? "در حال پردازش..." : "ویرایش"}
                                        <i className="bi bi-pencil-fill text-white ms-1"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="ui-box-item-desc p-0">
                                <DataTable />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className={`${styles.overlay} ${showModal ? styles.show : ""}`} onClick={hideModal}></div>
            <Modal
                hideModal={hideModal}
                showModal={showModal}
                formData={formData}
                onInputChange={onInputChange}
                onSubmit={onSubmit}
                loading={loading}
            />
        </>
    );
};

export default UserProfile;