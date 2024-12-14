import React from 'react'
import styles from './CommentForm.module.css';

const CommentForm = () => {
    return (
        <div className='container-fluid'>
            <div className="content-box">
                <div className="container-fluid">
                    <div className={styles.comment_from}>
                        <div className="title-panel mb-3">
                            <h6 className="font-18">دیدگاه خود را بنویسید</h6>
                        </div>
                        <form >
                            <div className="form-group mb-2">
                                <label htmlFor="commentbody" className='form-label my-3'>
                                    دیدگاه شما
                                    <span className='text-danger me-1'>*</span>
                                </label>
                                <textarea id="commentbody" rows="7" className='form-control' placeholder='دیدگاه خئد را بنویسید ...' required></textarea>
                            </div>
                            <div className="form-group mb-2">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-inline w-100">
                                            <label htmlFor="commentName" className='form-label my-3'>نام شما
                                                <span className='text-danger me-1'>*</span>
                                            </label>
                                            <input type="text" id='commentName' className='form-control' required placeholder='نام شما' />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-inline w-100 mb-2">
                                            <label htmlFor="commentEmail" className='form-label my-3'>ایمیل شما
                                                <span className='text-danger me-1'>*</span>
                                            </label>
                                            <input type="email" id='commentEmail' className='form-control text-end' required placeholder='ایمیل شما' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`form-check mb-2 ${styles.form_checkbox}`}>
                                <input type="checkbox" name='' id='commentCheckBox' required className='form-check-input' />
                                <label htmlFor="commentCheckBox" className='form-check-label text-muted'>
                                    ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی می‌نویسم.
                                </label>
                            </div>
                            <input type="submit" value="ثبت" className={`btn main-color-one-bg px-5 rounded-3 mt-3 ${styles.submit}`}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentForm