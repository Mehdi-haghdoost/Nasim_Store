import React, { useState, useRef, useEffect } from 'react'
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';
import styles from './Comments.module.css';
import { FaRegStar } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import { showSwal } from '@/utils/helpers';
function Comments() {
    const [score, setScore] = useState(5);

    const strengthsInputRef = useRef();
    const weaknessesInputRef = useRef();

    useEffect(() => {
        new Tagify(strengthsInputRef.current, { placeholder: 'با کلید اینتر اضافه کنید', });
        new Tagify(weaknessesInputRef.current, { placeholder: 'با کلید اینتر اضافه کنید', });
    }, []);

    const submitScore = (score) => {
        setScore(score);
        showSwal("امتیاز مورد نظر شما با موفقیت ثبت شد", "success", "ادامه ثبت کامنت")
    }

    return (
        <>
            <h6 className={styles.product_desc_tab_title}>نظرت در مورد این محصول چیه ؟</h6>
            <p className='font-14 text-muted mt-2'>
                برای ثبت نظر، از طریق دکمه افزودن
                دیدگاه جدید
                نمایید. اگر این محصول را قبلا خریده باشید، نظر شما به عنوان
                خریدار
                ثبت خواهد
                شد.
            </p>
            <div className='row gy-4'>
                <div className="col-12">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className={styles.comment_item}>
                                <input type="email" className="form-control" id='floatingInputEmail' />
                                <label
                                    className={`form-label ${styles.comment_item_label}`}
                                    htmlFor="floatingInputEmail">
                                    ایمیل خود را وارد کنید
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className={styles.comment_item}>
                                <input type="name" className="form-control" id='floatingInputName' />
                                <label
                                    className={`form-label ${styles.comment_item_label}`}
                                    htmlFor="floatingInputName">
                                    نام خود را وارد کنید
                                </label>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className={`${styles.comment_item} d-flex alifn-items-center mb-3`}>
                                <input type="checkbox" className='form-check-input' id="rememberComment" />
                                <label
                                    className='form-check-label d-block'
                                    htmlFor="rememberComment">
                                    ذخیره
                                    نام، ایمیل و وبسایت من در مرورگر برای زمانی
                                    که
                                    دوباره
                                    دیدگاهی می‌نویسم.
                                </label>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className='form-group mt-3'>
                                <label>امتیاز شما</label>
                                <div className={styles.rate}>
                                    <GoStarFill onClick={() => submitScore(5)} />
                                    <GoStarFill onClick={() => submitScore(4)} />
                                    <GoStarFill onClick={() => submitScore(3)} />
                                    <GoStarFill onClick={() => submitScore(2)} />
                                    <GoStarFill onClick={() => submitScore(1)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className={`${styles.comment_item} my-3`}>
                                <textarea
                                    style={{ height: '150px' }}
                                    className='form-control' id="floatingTextarea">
                                </textarea>
                                <label
                                    className={`form-label ${styles.comment_item_label}`}
                                    htmlFor="floatingTextarea">
                                    متن نظر
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className='form-group mt-3'>
                                <label className='text-success mb-2' htmlFor="tags-pos"> نقاط قوت </label>
                                <input
                                    ref={strengthsInputRef}
                                    className={`tagify ${styles.comment_tags} tags-pos form-control`}
                                    name="tags-pos"
                                    id="tags-pos"
                                    placeholder='با کلید اینتر اضافه کنید' />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className='form-group mt-3'>
                                <label
                                    className='text-danger mb-2'
                                    htmlFor="tags-neg">
                                    نقاط ضعف
                                </label>
                                <input
                                    ref={weaknessesInputRef}
                                    className={`tagify ${styles.comment_tags} tags-neg form-control`}
                                    name="tags-neg"
                                    id="tags-neg"
                                    placeholder='با کلید اینتر اضافه کنید' />
                            </div>
                        </div>
                        <div className="col-12">
                            <a href=""
                                className={`btn border-0 main-color-one-bg my-3 mx-auto btn-lg waves-effect waves-light ${styles.btn_comment}`}
                            >
                                ثبت نظر
                            </a>
                        </div>
                    </div>
                </div>
            </div >
            <div className={`bg-light shadow-inner mb-4 ${styles.comment}`}>
                <div className={styles.title}>
                    <div className='row align-items-center'>
                        <div className="col-sm-10">
                            <div className="d-flex align-items-center">
                                <div className={`${styles.avatar} p-2 bg-white shadow-box rounded-circle`}>
                                    <img className='img-fluid rounded-circle' src="/images/user.png" alt="" />
                                </div>
                                <div className='d-flex flex-wrap align-items-center me-2'>
                                    <h6 className='text-muted font-14'>مهدی حق دوست</h6>
                                    <h6 className='text-muted font-14 me-2'> 15 آبان 1403</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="d-flex justify-content-end">
                                <FaRegStar />
                                <GoStarFill />
                                <GoStarFill />
                                <GoStarFill />
                                <GoStarFill />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.comment_desc}>
                    <p className='font-14 text-muted'>
                        بنده این گوشی را خریداری کردم و کاملا راضی هشتم و بهترین
                        گارانتی
                        را دارد
                        و پلپ بود و حتما به شما هم پیشنهاد می نمایم که چنانچه قصد
                        خرید
                        این کالا
                        را دارید از دیجی کالا تهیه نمایید ؛پارت نامبر من هم سنگاپور
                        بود
                        که
                        بهترین پارت نامبر در بازار است و هیچ محدودیتی ندارد.
                    </p>
                </div>
                <div className={styles.comment_foot}>
                    <div className="row alifn-items-center">
                        <div className="col-md-8">
                            <div className={styles.comment_rates}>
                                <div className={`${styles.comment_rates_positive} rounded-4`}>
                                    <div className='d-flex align-items-center justify-content-start'>
                                        <h6 className='font-14 ms-3'>نقاط قوت</h6>
                                        <nav className={`${styles.positive_nav} navbar flex-column`}>
                                            <ul className='navbar-nav flex-wrap'>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        جنس بدنه
                                                    </span>
                                                </li>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        شارژ باتری
                                                    </span>
                                                </li>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        کیفیت تصویر
                                                    </span>
                                                </li>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        دوربین قوی
                                                    </span>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className={`${styles.comment_rates_negative} rounded-4 mt-3`}>
                                    <div className='d-flex align-items-center justify-content-start'>
                                        <h6 className='font-14 ms-3'>نقاط ضعف</h6>
                                        <nav className={`${styles.negative_nav} navbar flex-column`}>
                                            <ul className='navbar-nav flex-wrap'>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        جنس بدنه
                                                    </span>
                                                </li>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        شارژ باتری
                                                    </span>
                                                </li>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        کیفیت تصویر
                                                    </span>
                                                </li>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        دوربین قوی
                                                    </span>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className={styles.comment_replay}>
                                <a href=""
                                    className='btn btn-sm rounded-pill main-color-two-bg px-4'
                                >
                                    پاسخ
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`bg-light shadow-inner mb-4 ${styles.comment}`}>
                <div className={styles.title}>
                    <div className='row align-items-center'>
                        <div className="col-sm-10">
                            <div className="d-flex align-items-center">
                                <div className={`${styles.avatar} p-2 bg-white shadow-box rounded-circle`}>
                                    <img className='img-fluid rounded-circle' src="/images/user.png" alt="" />
                                </div>
                                <div className='d-flex flex-wrap align-items-center me-2'>
                                    <h6 className='text-muted font-14'>مهدی حق دوست</h6>
                                    <h6 className='text-muted font-14 me-2'> 15 آبان 1403</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="d-flex justify-content-end">
                                <FaRegStar />
                                <GoStarFill />
                                <GoStarFill />
                                <GoStarFill />
                                <GoStarFill />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.comment_desc}>
                    <p className='font-14 text-muted'>
                        بنده این گوشی را خریداری کردم و کاملا راضی هشتم و بهترین
                        گارانتی
                        را دارد
                        و پلپ بود و حتما به شما هم پیشنهاد می نمایم که چنانچه قصد
                        خرید
                        این کالا
                        را دارید از دیجی کالا تهیه نمایید ؛پارت نامبر من هم سنگاپور
                        بود
                        که
                        بهترین پارت نامبر در بازار است و هیچ محدودیتی ندارد.
                    </p>
                </div>
                <div className={styles.comment_foot}>
                    <div className="row alifn-items-center">
                        <div className="col-md-8">
                            <div className={styles.comment_rates}>
                                <div className={`${styles.comment_rates_positive} rounded-4`}>
                                    <div className='d-flex align-items-center'>
                                        <h6 className='font-14 ms-3'>نقاط قوت</h6>
                                        <nav className={`${styles.positive_nav} navbar flex-column`}>
                                            <ul className='navbar-nav flex-wrap'>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        جنس بدنه
                                                    </span>
                                                </li>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        شارژ باتری
                                                    </span>
                                                </li>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        کیفیت تصویر
                                                    </span>
                                                </li>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        دوربین قوی
                                                    </span>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className={`${styles.comment_rates_negative} rounded-4 mt-3`}>
                                    <div className='d-flex align-items-center'>
                                        <h6 className='font-14 ms-3'>نقاط ضعف</h6>
                                        <nav className={`${styles.negative_nav} navbar flex-column`}>
                                            <ul className='navbar-nav flex-wrap'>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        جنس بدنه
                                                    </span>
                                                </li>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        شارژ باتری
                                                    </span>
                                                </li>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        کیفیت تصویر
                                                    </span>
                                                </li>
                                                <li className='nav-item'>
                                                    <span className='nav-link font-14'>
                                                        دوربین قوی
                                                    </span>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className={styles.comment_replay}>
                                <a href=""
                                    className='btn btn-sm rounded-pill main-color-two-bg px-4'
                                >
                                    پاسخ
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={`bg-light shadow-inner mb-4 ${styles.comment_response}`}>
                        <div className={styles.title}>
                            <div className='row align-items-center'>
                                <div className="col-sm-10">
                                    <div className="d-flex align-items-center">
                                        <div className={`${styles.avatar} p-2 bg-white shaodw-box rounded-circle`}>
                                            <img className='img-fluid rounded-circle' src="/images/user.png" alt="" />
                                        </div>
                                        <div className='d-flex flex-wrap align-items-center me-2'>
                                            <h6 className='text-muted font-14'>مهدی حق دوست</h6>
                                            <h6 className='text-muted font-14 me-2'> 15 آبان 1403</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div className="d-flex justify-content-end">
                                        <FaRegStar />
                                        <GoStarFill />
                                        <GoStarFill />
                                        <GoStarFill />
                                        <GoStarFill />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.comment_desc}>
                            <p className='font-14 text-muted'>
                                بنده این گوشی را خریداری کردم و کاملا راضی هشتم و بهترین
                                گارانتی
                                را دارد
                                و پلپ بود و حتما به شما هم پیشنهاد می نمایم که چنانچه قصد
                                خرید
                                این کالا
                                را دارید از دیجی کالا تهیه نمایید ؛پارت نامبر من هم سنگاپور
                                بود
                                که
                                بهترین پارت نامبر در بازار است و هیچ محدودیتی ندارد.
                            </p>
                        </div>
                        <div className={styles.comment_foot}>
                            <div className="row alifn-items-center">
                                <div className="col-md-8">
                                    <div className={styles.comment_rates}>
                                        <div className={`${styles.comment_rates_positive} rounded-4`}>
                                            <div className='d-flex align-items-center justify-content-start'>
                                                <h6 className='font-14 ms-3'>نقاط قوت</h6>
                                                <nav className={`${styles.positive_nav} navbar flex-column`}>
                                                    <ul className='navbar-nav flex-wrap'>
                                                        <li className='nav-item'>
                                                            <span className='nav-link font-14'>
                                                                جنس بدنه
                                                            </span>
                                                        </li>
                                                        <li className='nav-item'>
                                                            <span className='nav-link font-14'>
                                                                شارژ باتری
                                                            </span>
                                                        </li>
                                                        <li className='nav-item'>
                                                            <span className='nav-link font-14'>
                                                                کیفیت تصویر
                                                            </span>
                                                        </li>
                                                        <li className='nav-item'>
                                                            <span className='nav-link font-14'>
                                                                دوربین قوی
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                        <div className={`${styles.comment_rates_negative} rounded-4 mt-3`}>
                                            <div className='d-flex align-items-center justify-content-start'>
                                                <h6 className='font-14 ms-3'>نقاط ضعف</h6>
                                                <nav className={`${styles.negative_nav} navbar flex-column`}>
                                                    <ul className='navbar-nav flex-wrap'>
                                                        <li className='nav-item'>
                                                            <span className='nav-link font-14'>
                                                                جنس بدنه
                                                            </span>
                                                        </li>
                                                        <li className='nav-item'>
                                                            <span className='nav-link font-14'>
                                                                شارژ باتری
                                                            </span>
                                                        </li>
                                                        <li className='nav-item'>
                                                            <span className='nav-link font-14'>
                                                                کیفیت تصویر
                                                            </span>
                                                        </li>
                                                        <li className='nav-item'>
                                                            <span className='nav-link font-14'>
                                                                دوربین قوی
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className={styles.comment_replay}>
                                        <a href=""
                                            className='btn btn-sm rounded-pill main-color-two-bg px-4'
                                        >
                                            پاسخ
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comments