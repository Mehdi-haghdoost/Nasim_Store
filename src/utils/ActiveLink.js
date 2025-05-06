import React from 'react';
import styles from '@/styles/ActiveLink.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

function ActiveLink({ href, children, exact = false }) {
    const pathName = usePathname();
    
    // تشخیص لینک فعال با در نظر گرفتن حالت exact
    let isActive;
    if (exact) {
        // اگر exact=true باشد، فقط مسیرهای دقیقاً یکسان فعال خواهند بود
        isActive = pathName === href;
    } else {
        // برای زیرمسیرها (مثل /p-user/profile) اما به روشی که داشبورد را فعال نکند
        isActive = (
            pathName === href || 
            (href !== '/p-user' && pathName.startsWith(href + '/'))
        );
    }

    return (
        <Link href={href} className={isActive ? `${styles.sidbar_link_active} nav-link` : "nav-item"}>
            {children}
        </Link>
    );
}

export default ActiveLink;