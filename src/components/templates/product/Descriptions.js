import React, { useState, useRef } from 'react'
import styles from './Descriptions.module.css'
function Descriptions() {

  const [isPlayVideo, setIsPlayVideo] = useState(false);


  const videoRef = useRef(null);

  const playVideoHandler = () => {
    setIsPlayVideo(prev => !prev);
    if (videoRef.current) {
      if (isPlayVideo) {
        videoRef.current.pause(); // توقف ویدیو
      } else {
        videoRef.current.play(); // پخش ویدیو
      }
    }
  }
  return (
    <>
      <h6>معرفی محصول</h6>
      <div className="row gy-3">
        <div className="col-lg-6">

        </div>
        <div className="col-lg-6">
          <div className={styles.video}>
            <video
              ref={videoRef}
              poster="/images/product/laptop-1.jpg"
              loop preload="none" className={`img-fluid ${styles.vd_style}`} src="/video/video.mp4">
              <source
                src="/video/video.mp4"
                type="video/mp4"
              />
            </video>
            <div className={`${styles.play_btn} pointer ${isPlayVideo ? `${styles.play_opacity}` : "active"}`}>
              <div
                className={styles.play}
                onClick={playVideoHandler}
              >
                <i className={`bi ${isPlayVideo ? "bi-pause-fill" : "bi-play-fill"}`} id="play-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Descriptions