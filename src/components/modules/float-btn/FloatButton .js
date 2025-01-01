"use client";
import React, { useEffect, useState } from 'react';
import styles from './FloatButton.module.css';
import { FaArrowUp } from "react-icons/fa";

const FloatButton = () => {

  const [activeProgress, setActiveProgress] = useState(false)
  const [strokeOffset, setStrokeOffset] = useState(0)

  const goToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const listenToScroll = () => {
    let heighToHidden = 10;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heighToHidden) {
      setActiveProgress(true)
    } else {
      setActiveProgress(false)
    }
  }

  const handleStrokeOffset = () => {
    const scrollY = window.scrollY;
    const maxHeight = document.documentElement.scrollHeight - window.innerHeight;

    const scrollPercentage = (scrollY / maxHeight) * 100;
    setStrokeOffset(307 - (307 * scrollPercentage) / 100);

  }

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleStrokeOffset)
    return () => window.removeEventListener('scroll', handleStrokeOffset)
  }, [])

  return (
    <div className={`${styles.wrapper} d-none d-lg-block`}>
      <div className={`${styles.top_btn} ${activeProgress ? styles.active : ''}`} onClick={goToTop}>
        <svg className={`${styles.progress_circle} ${styles.svg_content}`} width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            strokeWidth="2"
            fill='none'
            style={{
              strokeDasharray: 307,
              strokeDashoffset: strokeOffset,
              transition: 'stroke-dashoffset 0.3s ease'
            }}
          />
        </svg>
      </div>
    </div>
  )
}

export default FloatButton 