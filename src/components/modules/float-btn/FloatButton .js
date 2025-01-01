"use client";
import React, { useEffect, useState } from 'react';
import styles from './FloatButton.module.css';
import { FaArrowUp } from "react-icons/fa";

const FloatButton = () => {

  const [activeProgress, setActiveProgress] = useState(false)

  const goToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const listenToScroll = () => {
    let heighToHidden = 550;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heighToHidden) {
      setActiveProgress(true)
    } else {
      setActiveProgress(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll)
  }, [])

  return (
    <div className={`${styles.wrapper} d-none d-lg-block`}>
      <div className={`${styles.top_btn} ${activeProgress ? styles.active : ''}`} onClick={goToTop}>
      </div>
    </div>
  )
}

export default FloatButton 