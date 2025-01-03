"use client";
import React, { useEffect, useState } from 'react'
import styles from './ContactUsFloat.module.css';
import Link from 'next/link';

const ContactUsFloat = () => {

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const toggleOverlay = () => {
        setIsOverlayOpen(!isOverlayOpen)

        if (isOverlayOpen) {
            setIsOptionsOpen(false);
        }
    }

    const toggleOptions = () => {
        setIsOptionsOpen(!isOptionsOpen);
    }

    useEffect(() => {
        // بستن overlay  در صورتی که خارج از آن کلیکی صورت گیرد .
        const handleClickOutside = (event) => {
            if (isOverlayOpen && !event.target.closest("#btncollapzion")) {
                setIsOverlayOpen(false);
                setIsOptionsOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [isOverlayOpen])

    return (
        <>

            <div
                id='btncollapzion'
                className={styles.btn_colapzion}
                onClick={toggleOptions}
            >
                <button className={`${isOptionsOpen ? styles.btn_open : styles.btn_close} ${styles.contactFire}`}>

                </button>
                {
                    isOptionsOpen && (
                        <ul className={`${styles.options_items} ${isOptionsOpen ? styles.open : styles.close}`}>
                            <li>
                                <Link href={'/'} style={{ textDecoration: "none", color: "#0761f6" }} >
                                    <div className={styles.float_contact}>
                                        <span className={styles.title}>پشتیبانی تلفنی</span>
                                        <div className={styles.icon}>
                                            <i className="bi bi-telephone"></i>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/'} style={{ textDecoration: "none", color: "#0761f6" }} >
                                    <div className={styles.float_contact}>
                                        <span className={styles.title}>پشتیبانی تلفنی</span>
                                        <div className={styles.icon}>
                                            <i class="bi bi-telegram"></i>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/'} style={{ textDecoration: "none", color: "#0761f6" }} >
                                    <div className={styles.float_contact}>
                                        <span className={styles.title}>پشتیبانی تلفنی</span>
                                        <div className={styles.icon}>
                                            <i class="bi-whatsapp"></i>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    )
                }
            </div>

            {/* overlay */}
            <div
                id="contactOverlay"
                className={`${styles.overlay} ${isOptionsOpen ? styles.overlay_open : ""}`}
                onClick={toggleOverlay}
                style={{
                    display: isOptionsOpen ? "block" : "none"
                }}
            >

            </div>
        </>

    )
}

export default ContactUsFloat