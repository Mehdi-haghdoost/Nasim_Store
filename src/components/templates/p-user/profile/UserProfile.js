"use client";
import React, { useState } from 'react';
import styles from './UserProfile.module.css';
import DataTable from './DataTable';
import Modal from './Modal';

const UserProfile = () => {
    const [showModal, setShowModal] = useState(false);



    const hideModal = () => setShowModal(false);

    return (
        <>
            <main>
                <div className="ui-boxs">
                    <div className="ui-box">
                        <div className="ui-box-item ui-box-white">
                            <div className="ui-box-item-title">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="fw-bold">
                                        اطلاعات شخصی
                                    </h4>
                                    <button
                                        onClick={() => {
                                            setShowModal(true)
                                        }}
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
                    <Modal hideModal={hideModal} showModal={showModal} />
                

        </>
    )
}

export default UserProfile