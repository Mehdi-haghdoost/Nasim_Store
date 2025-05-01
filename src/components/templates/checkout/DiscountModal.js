import React from 'react'
import styles from './DiscountModal.module.css';

const DiscountModal = () => {
    return (
        <>
            <div className='show-discount-modal  py-3 mb-3' role='button' data-bs-toggle="modal" data-bs-target="#discountModal">
                <i className="bi bi-patch-exclamation main-color-one-color ms-3" style={{ fontSize: "40px" }}></i>
                کوپن تخفیف دارید برای نوشتن کد اینجا کلیک
                کنید
            </div>
            <div className={styles.discount_modal}>
                <div className="modal fade" id='discountModal' tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                    <div className='modal-dialog modal-md modal-dialog-centered'>
                        <div className="modal-content">
                            <div className="modal-header justify-content-between">
                                <h6 className="modal-title" id='exampleModalLabel'>کد تخفیف</h6>
                                <button type='button' className='btn-close' style={{ marginLeft: "inherit" }} data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h4 className="font-16 mb-3">
                                    اگر شما کد تخفیف دارید ، برای ثبت آن از طریق زیر اقدام کنید.
                                </h4>
                                <form action="">
                                    <div className="form-group"></div>
                                    <label htmlFor="discount" className='form-lable py-2'>کد تخفیف :</label>
                                    <input type="text" id="discount" className='form-control rounded-3 mb-2' placeholder='برای مثال eyd1402' />
                                </form>
                            </div>
                            <button className='btn main-color-one-bg border-0 mb-2 me-2' style={{ width: "12rem", padding: "10px 0" }}>ثبت کد تخفیف</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiscountModal