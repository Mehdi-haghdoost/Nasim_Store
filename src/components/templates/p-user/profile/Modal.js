import React from 'react';
import styles from './Modal.module.css';
import { useDispatch } from 'react-redux';
import { showSwal } from '@/utils/helpers';

const Modal = ({ hideModal, showModal, formData, onInputChange, onSubmit }) => {
    return (
        <div className={`${styles.modal} ${showModal ? styles.open : ''}`}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                <div className="modal-content">
                    <div className="modal-header justify-content-between mb-3">
                        <h1 className="modal-title fs-5">ویرایش اطلاعات شخصی</h1>
                        <button onClick={hideModal} type="button" className="btn-close" aria-label="Close"></button>
                    </div>
                    <div className={`modal-body ${styles.modal_content}`}>
                        <form>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="username" className="form-label">نام و نام خانوادگی</label>
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                value={formData.username}
                                                onChange={onInputChange}
                                                className="form-control rounded-pill"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="phone" className="form-label">شماره تلفن</label>
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={onInputChange}
                                                className="form-control rounded-pill"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">آدرس ایمیل</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={onInputChange}
                                    className="form-control rounded-pill"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="postalCode" className="form-label">کد پستی</label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={onInputChange}
                                    className="form-control rounded-pill"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bio" className="form-label">بیو</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={onInputChange}
                                    className="form-control rounded-3"
                                    placeholder="توضیحاتی در مورد خودتان"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address" className="form-label">آدرس</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={onInputChange}
                                    className="form-control rounded-pill"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button onClick={hideModal} type="button" className="btn btn-danger rounded-pill">بستن</button>
                        <button type="button" className="btn btn-success rounded-pill me-3" onClick={onSubmit}>ویرایش</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
