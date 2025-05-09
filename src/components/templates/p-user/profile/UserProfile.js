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
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        nationalId: '',
        email: '',
        postalCode: '',
        bio: '' // اضافه کردن بیو به صورت صحیح
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user?.username || '',
                phone: user?.phone || '',
                nationalId: user?.nationalId || '',
                email: user?.email || '',
                postalCode: user?.postalCode || '',
                bio: user?.bio || '' // بیو به درستی مقداردهی شود
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
            
            const response = await dispatch(updateUserProfile(formData));
            console.log("Update profile response:", response);

            if (response?.payload) {
                showSwal("اطلاعات شما با موفقیت ویرایش شد", "success", "باشه");
                setShowModal(false);
            } else {
                showSwal("مشکلی در ویرایش اطلاعات پیش آمد", "error", "باشه");
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
                                        className="btn btn-sm main-color-one-bg waves-effect waves-light">
                                        ویرایش
                                        <i className="bi bi-pencil-fill text-white"></i>
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
            />
        </>
    );
};

export default UserProfile;
