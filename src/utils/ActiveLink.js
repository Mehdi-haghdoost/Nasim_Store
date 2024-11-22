import React from 'react';
import styles from '@/styles/ActiveLink.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

function ActiveLink({ href, children }) {

    const pathName = usePathname();

    const isActive = pathName === href;


    return (
        <Link href={href} className={isActive ? `${styles.sidbar_link_active} nav-link` : "nav-item"}>
            {children}
        </Link>
    )
}

export default ActiveLink;