import React, { useState, useRef } from 'react'
import styles from './Descriptions.module.css'
function Descriptions() {

  const [isPlayVideo, setIsPlayVideo] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);


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
      <h6 className={styles.product_desc_tab_title}>معرفی محصول</h6>
      <div className="row gy-3">
        <div className="col-lg-6">
          <p className={styles.product_desc_content_text}>
            اگر به دنبال تهیه یک هدفون بی‌سیم گیمینگ هستید،
            هدفون
            بلوتوثی مدل K55
            به‌عنوان
            یکی از جدیدترین گزینه‌های موجود در بازار ارزش بررسی
            را
            دارد. این مدل با
            ابعادی
            کوچک تولید شده است. ابعاد و وزن کم آن، جابه‌جایی این
            وسیله و استفاده
            طولانی‌مدت
            از آن را آسان می‌کند و باعث خستگی گوش‌ها نخواهد شد.
            این
            مدل برای اتصال
            به
            دستگاه‌ به بلوتوث نسخه 5.0 مجهز شده است و در مدت
            زمان
            اندکی، اتصال با
            گوشی
            موبایل اندروید یا ios شما برقرار خواهد شد. هدفون بی
            سیم
            K55 دارای یک
            میکروفون با
            کیفیت است و ...
          </p>
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
        <div 
        onClick={() => setIsShowMore(prev => !prev)}
        className={styles.product_desc_read_more}>
          {isShowMore ? (
            <label className='mb-2'>
            بستن -
          </label>
          ) : (
            <label className='mb-2'>
            بیشتر +
          </label>
          )}
          {isShowMore && (
            <p>
              و این ویژگی، آن را برای مکالمه مناسب می‌سازد. از
              ویژگی‌های
              اصلی این محصول محفظه نگهدارنده یا همان کیس آن است. این
              کیس
              قابلیت شارژ هدفون را دارد. برای شارژ آن کافی است از
              درگاه
              USB-C تعبیه شده بر روی کیس و کابل شارژ درون بسته‌بندی
              استفاده کنید. گفتنی است باتری 400 میلی‌آمپر ساعتی این
              هدفون
              در حدود 4-6 ساعت مکالمه و 4-6 ساعت پخش موسیقی را پاسخ‌گو
              خواهد بود.
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default Descriptions