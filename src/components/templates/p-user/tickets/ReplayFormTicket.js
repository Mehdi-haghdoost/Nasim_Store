import React from 'react'
import styles from './ReplayFormTicket.module.css';

const ReplayFormTicket = () => {
    return (
        <>
            <div className="content-box">
                <div className="container-fluid">
                    <div className="title-panel">
                        <h5 className="mb-3">ارسال پیام</h5>
                    </div>
                    <form method='post'>
                        <div className="form-group">
                            <textarea
                                className='form-control form-control-rounded'
                                name="" id="review_text"
                                rows="8"
                                placeholder="پیام خود را وارد کنید..."
                                required=""
                            >
                            </textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className='form-label'>فایل</label>
                            <input type="file" className='form-control' id='formFile' />
                        </div>
                        <div className="text-right">
                            <button className="btn border-0 main-color-one-bg" type='submit'>ارسال پیام</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ReplayFormTicket