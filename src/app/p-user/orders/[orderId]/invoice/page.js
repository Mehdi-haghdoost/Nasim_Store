"use client"
import React from 'react'

const page = () => {

    const printInvoice = () => {
        window.print()
    }

    return (
        <div className="container-xl" style={{ marginTop: "100px" }}>
            <div className="row">
                <div className="col-3 text-center"></div>
                <div className="col-6 text-center"><h3 className="font-weight-bold">صورتحساب فروش کالا و خدمات</h3></div>
                <div className="col-3 text-right">
                    <p>شماره سفارش: ۱۲۳۴۵۶۷</p>
                    <p>تاریخ سفارش: ۱۴۰۳/۰۹/۱۰</p>
                </div>
            </div>
            <div className="row">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-center" colspan="11">مشخصات فروشنده</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="11" className="text-right">
                                <div className="row">
                                    <div className="col-4">
                                        <p>نام شخص حقیق / حقوقی: راستین وب</p>
                                        <p>آدرس کامل: استان تهران، شهر تهران، میدان ونک، خیابان حقانی، طبقه سوم</p>
                                    </div>
                                    <div className="col-4">
                                        <p>شماره اقتصادی:</p>
                                        <p>کد پستی:</p>
                                    </div>
                                    <div className="col-4">
                                        <p>شماره ثبت / شناسه ملی:</p>
                                        <p>تلفن / نمابر:</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center" colspan="11">مشخصات خریدار</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="11" className="text-right">
                                <div className="row">
                                    <div className="col-4">
                                        <p>نام شخص حقیق / حقوقی: مرتضی شجاعی</p>
                                        <p>آدرس کامل:</p>
                                    </div>
                                    <div className="col-4">
                                        <p>شماره اقتصادی:</p>
                                        <p>کد پستی:</p>
                                    </div>
                                    <div className="col-4">
                                        <p>شماره ثبت / شناسه ملی:</p>
                                        <p>تلفن / نمابر:</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center" colspan="11">مشخصات کالا یا خدمات مورد معامله</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr className="text-center">
                            <th>ردیف</th>
                            <th>کد کالا</th>
                            <th>شرح کالا یا خدمات</th>
                            <th>تعداد / مقدار</th>
                            <th>واحد انداز گیری</th>
                            <th>مبلغ واحد (ریال)</th>
                            <th>مبلغ کل (ریال)</th>
                            <th>مبلغ تخفیف (ریال)</th>
                            <th>مبلغ کل پس از تخفیف (ریال)</th>
                            <th>جمع مالیات و عوارض (ریال)</th>
                            <th>جمع مبلغ کل به علاوه مالیات و عوارض (ریال)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-center">
                            <td>۱</td>
                            <td>۵۲۰</td>
                            <td>موس بی سیم فراسو</td>
                            <td>۱</td>
                            <td>عدد</td>
                            <td>۱۵,۰۰۰</td>
                            <td>۱۵,۰۰۰</td>
                            <td>۱,۰۰۰</td>
                            <td>۱۴,۰۰۰</td>
                            <td>۵۰۰</td>
                            <td>۱۴,۵۰۰</td>
                        </tr>
                        <tr>
                            <th colspan="5" className="text-right">جمع کل</th>
                            <th className="text-center">۱۵,۰۰۰</th>
                            <th className="text-center">۱۵,۰۰۰</th>
                            <th className="text-center">۱,۰۰۰</th>
                            <th className="text-center">۱۴,۰۰۰</th>
                            <th className="text-center">۵۰۰</th>
                            <th className="text-center">۱۴,۵۰۰</th>
                        </tr>
                        <tr>
                            <th colspan="5" className="text-right">
                                شرایط و نحوه فروش:
                                <span style={{ marginLeft: "4px", marginRight: "20px", display: "inline-block" }}>نقدی</span>
                                <span style={{ marginLeft: "20px", marginRight: "20px", display: "inline-block" }}>غیر نقدی</span>
                            </th>
                            <th colspan="6" className="text-right">توضیحات:</th>
                        </tr>
                        <tr style={{ padding: "60px 0" }}>
                            <td colspan="5" className="text-right">مهر و امضا فروشنده</td>
                            <td colspan="6" className="text-right">مهر و امضا خریدار</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <a href="" className="btn btn-dark text-white d-block" style={{ width: "70px", margin: "10px auto" }} id="printPageButton" onClick={printInvoice}>پرینت</a>

        </div>
    )
}

export default page