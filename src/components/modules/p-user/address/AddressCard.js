import React from 'react'
import styles from './AddressCard.module.css';


const AddressCard = ({ title }) => {

    return (
        <div className="col-md-4">
            <div className="bg-white card addresses-item mb-4 shadow-sm">
                <div className={`p-4 ${styles.gold_members}`}>
                    <div className={styles.media}>
                        <div className={styles.media_body}>
                            <h6 className="mb-1">
                                خانه
                                <span className="badge fw-normal font-10 float-start main-color-three-bg">
                                    {title}
                                </span>
                            </h6>
                            <p className="text-overflow-2 address-line">
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
                                از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
                                سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
                                متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                                درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با
                                نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
                                خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
                                داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان
                                رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                            </p>
                            <p className="mb-0 text-black btn-group-sm font-weight-bold">
                                <div className={styles.tooltip}>
                                    <a href="#" className="btn btn-primary btn-sm ms-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="ویرایش آدرس">
                                        <i className="bi bi-pencil text-white"></i>
                                    </a>
                                    <span className={styles.tooltipText}>ویرایش آدرس</span>
                                </div>
                                <div className={styles.tooltip}>
                                    <a href="#" className="btn btn-danger btn-sm ms-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="حذف آدرس">
                                        <i className="bi bi-trash text-white"></i>
                                    </a>
                                    <span className={styles.tooltipText}>حذف آدرس</span>
                                </div>
                                <div className={styles.tooltip}>
                                    <a href="#" className="btn btn-success btn-sm ms-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="ثبت به عنوان آدرس پیشفرض">
                                        <i className="bi bi-check-lg text-white"></i>
                                    </a>
                                    <span className={styles.tooltipText}> ثبت به عنوان پیش فرض</span>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressCard