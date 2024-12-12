import React from 'react'
import styles from './BlogCommentItem.module.css';

const BlogCommentItem = () => {
    return (
        <div className={styles.comment_item}>
            <div className={`d-sm-flex d-none ${styles.comment_item_avatar}`}>
                <div className={styles.comment_item_avatar_img}>
                    <a href="" className='rounded-circle'>
                        <img src="/images/user-profile.png" className='rounded-circle' width="40" alt="avatar" />
                    </a>
                </div>
            </div>
            <div className={styles.comment_item_desc}>
                <div className={`d-sm-none d-flex mb-2 ${styles.comment_item_avatar}`}>
                    <div className={styles.comment_item_avatar_img}>
                        <a href="" className="rounded-circle">
                            <img src="/images/user-profile.png" width="40" alt="" className="rounded-circle" />
                        </a>
                    </div>
                </div>
                <div className={styles.comment_item_title}>
                    <div className={styles.comment_date}>
                        <p className={`text-muted ${styles.comment_date_auther}`}>mehdi_haghdoost</p>
                        <p className={`text-muted ${styles.comment_date_speractor}`}>-</p>
                        <p className={`text-muted ${styles.comment_date_date}`}>22 آذر 1403</p>
                    </div>
                </div>
                <div className={styles.comment_item_content}>
                    <p>گوشیه خوبیه. ارزش خرید داره</p>
                    <div className={styles.comment_item}>
                        <div className={`d-sm-flex d-none ${styles.comment_item_avatar}`}>
                            <div className={styles.comment_item_avatar_img}>
                                <a href="" className='rounded-circle'>
                                    <img src="/images/user.png" className='rounded-circle' width="40" alt="avatar" />
                                </a>
                            </div>
                        </div>
                        <div className={`${styles.comment_item_desc} com-response`}>
                            <div className={`d-sm-none d-flex mb-2 ${styles.comment_item_avatar}`}>
                                <div className={styles.comment_item_avatar_img}>
                                    <a href="" className="rounded-circle">
                                        <img src="/images/user.png" width="40" alt="" className="rounded-circle" />
                                    </a>
                                </div>
                            </div>
                            <div className={styles.comment_item_title}>
                                <div className={styles.comment_date}>
                                    <p className={`text-muted ${styles.comment_date_auther}`}>nasim_soudbar</p>
                                    <p className={`text-muted ${styles.comment_date_speractor}`}>-</p>
                                    <p className={`text-muted ${styles.comment_date_date}`}>22 آذر 1403</p>
                                </div>
                            </div>
                            <div className={styles.comment_item_content}>
                                <p>اره واقعا عالیه من که ازش خیلی راضی ام</p>
                            </div>
                            <a href="" className='btn main-color-one-bg px-4 btn-sm'>پاسخ</a>
                        </div>
                    </div>
                </div>
                <a href="" className='btn main-color-one-bg px-4 btn-sm'>پاسخ</a>
            </div>
        </div>
    )
}

export default BlogCommentItem