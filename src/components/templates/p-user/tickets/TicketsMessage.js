import React from 'react';
import styles from './TicketsMessage.module.css';
const TicketsMessage = () => {
    return (
        <div className={styles.ticket_message}>
            <div className={`${styles.ticket} shadow-none`}>
                <div className={styles.ticket_author_ava}>
                    <img src="/images/user-profile.png" alt="Avatar" />
                </div>
                <div className={styles.ticket_body}>
                    <p className={styles.ticket_text}>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                    </p>
                    <div className={styles.ticket_footer}>
                        <span className={styles.ticket_footer_name}>مهدی حق دوست</span>
                        <div className={`float-start ${styles.ticket_date}`}>
                            <span>09 آذر 1403 ساعت 01:20</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.ticket} shadow-none `}>
                <div className={styles.ticket_author_ava}>
                    <img src="/images/user.png" alt="Avatar" />
                </div>
                <div className={styles.ticket_body}>
                    <p className={styles.ticket_text}>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                    </p>
                    <div className={styles.ticket_footer}>
                        <span className={styles.ticket_footer_name}>پشتیبان</span>
                        <div className={`float-start ${styles.ticket_date}`}>
                            <span>09 آذر 1403 ساعت 01:20</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketsMessage