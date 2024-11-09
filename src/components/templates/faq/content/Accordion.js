'use client';
import React, { useState } from 'react'
import styles from './accordion.module.css'
import Card from './AccordionItem';
function Accordion() {



    return (
        <div className="accordion" id="accordionExample">
            <Card index={0} label={'آیا میتوانم آنلاین رزرو کنم؟'} />
            <Card index={1} label={'چطور میتوانم سفارشم را لغو کنم ؟'} />
            <Card index={2} label={'هزینه ی ارسال در نسیم استور چگونه محاسبه میشود؟'} />
            <Card index={3} label={'شرایط استفاده از کد تخفیف اولین خرید چیست؟'} />
            <Card index={4} label={'چطور میتوانم امتیاز‌ بگیریم؟'} />
        </div>
    )
}

export default Accordion