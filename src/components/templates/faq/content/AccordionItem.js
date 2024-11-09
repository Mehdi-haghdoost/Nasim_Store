import React, { useState } from 'react'
import styles from './AccordionItem.module.css';
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";

function Card({ index, label }) {

  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (index) => {
    setOpenIndex(prevIndex => (prevIndex === index ? -1 : index));
  }
  return (
    <div className={styles.accordion_item}>
      <div className={styles.accordion_header}>

        <h5 className="mb-0">
          <button
            onClick={() => toggleIndex(index)}
            className={`btn ${styles.accordion_button} ${openIndex === index ? '' : 'collapsed'}`}
            type="button"
            data-bs-target="#collapseOne"
            aria-expanded={openIndex === index}
            aria-controls="collapseOne">
            {label}
            {openIndex === index ? (
              <IoChevronUpOutline />
            ) : (
              <IoChevronDownOutline />
            )}
          </button>
        </h5>
      </div>
      <div
        className={`accordion-collapse collapse ${openIndex === index ? 'show' : ''}`}
        data-bs-parent="#accordionExample">
        <div className={styles.accordion_body}>

          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
          است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
          تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم
          افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
          فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
          شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
          پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.

        </div>
      </div>
    </div>
  )
}

export default Card