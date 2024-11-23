import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ hideModal, showModal }) => {
    return (
        <div
            className={`${styles.modal} ${showModal ? styles.open : ''}`}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header justify-content-between mb-3">
                        <h1 className="modal-title fs-5">ویرایش اطلاعات شخصی</h1>
                        <button
                            onClick={hideModal}
                            type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className={`modal-body ${styles.modal_content}`}>
                        <form action="">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="name" className="form-label">نام <span
                                                className="text-danger ms-1">*</span></label>
                                            <input type="text" id="name" className="form-control rounded-pill" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="lname" className="form-label">نام خانوادگی <span
                                                className="text-danger ms-1">*</span></label>
                                            <input type="text" id="lname" className="form-control rounded-pill" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="tel" className="form-label">تلفن<span className="text-danger ms-1">*</span></label>
                                <input type="text" id="tel" className="form-control rounded-pill" />
                            </div>
                            <div className="form-group">
                                <label for="ncode" className="form-label">کد ملی<span className="text-danger ms-1">*</span></label>
                                <input type="text" id="ncode" className="form-control rounded-pill" />
                            </div>
                            <div className="form-group">
                                <label for="email" className="form-label">آدرس ایمیل<span
                                    className="text-danger ms-1">*</span></label>
                                <input type="text" id="email" className="form-control rounded-pill" />
                            </div>
                            <div className="form-group">
                                <label for="postal-code" className="form-label">کد پستی<span
                                    className="text-danger ms-1">*</span></label>
                                <input type="text" id="postal-code" className="form-control rounded-pill" />
                            </div>
                            <div className="form-group">
                                <label for="descOrder" className="form-label">بیو<span className="text-danger ms-1">*</span></label>
                                <textarea id="descOrder" rows="5" className="form-control rounded-3"
                                    placeholder="توضحیاتی در مورد خودتان"></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button onClick={hideModal} type="button" className="btn btn-danger rounded-pill" data-bs-dismiss="modal">بستن</button>
                        <button type="button" className="btn btn-success rounded-pill me-3">ویرایش</button>
                    </div>
                </div>
            </div>
        </div >


    )
}

export default Modal