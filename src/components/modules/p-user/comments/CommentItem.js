import React from 'react'
import styles from './CommentItem.module.css';
import { GoStarFill } from "react-icons/go";
const CommentItem = () => {
    return (
        <div className={styles.comment_item}>
            <div className={styles.comment_item_status}>
                <div className={styles.comment_item_status_item}>
                    <img src="/images/product/product-image1.jpg" width="80" alt="productImage" />
                </div>
                <div className={`dropd-status ${styles.comment_item_status_item}`}>
                    <div className="dropdown">
                        <span className="bg-success badge">تایید شده</span>
                        <a href="#" role='button' id='dropdownMenuLink' data-bs-toggle="dropdown" aria-expanded="false" >
                            <i className="bi bi-three-dots-vertical text-dark fs-5"></i>
                        </a>

                        <ul className="dropdown-menu flex-column" aria-labelledby="dropdownMenuLink" >
                            <li>
                                <a href="" className="dropdown-item">
                                    <i className="bi bi-pencil"></i>
                                    ویرایش
                                </a>
                                <a href="" className="dropdown-item">
                                    <i className="bi bi-trash text-danger"></i>
                                    حذف
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`border-0 ${styles.comment_item_detail}`}>
                <div className={styles.comment_content}>
                    <div className={styles.comment_content_desc}>
                        <div className={styles.comment_content_title}>
                            <div className={styles.comment_date}>
                                <p className={`text-muted ${styles.comment_date_author}`}>
                                    mehdihaghdoost
                                </p>
                                <p className={`text-muted ${styles.comment_date_speractor}`}>
                                    -
                                </p>
                                <p className={`text-muted ${styles.comment_date_date}`}>
                                    8 آذر 1403
                                </p>
                            </div>
                            <div className={styles.comment_item_rating}>
                                <GoStarFill />
                                <GoStarFill />
                                <GoStarFill />
                                <GoStarFill />
                                <GoStarFill />
                            </div>
                        </div>
                        <div className={styles.comment_content_text}>
                            گوشی خوبیه. ارزش خرید داره ...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentItem