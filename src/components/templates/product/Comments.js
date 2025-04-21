import React, { useState, useRef, useEffect } from 'react';
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';
import styles from './Comments.module.css';
import { FaRegStar } from 'react-icons/fa';
import { GoStarFill } from 'react-icons/go';
import { showSwal } from '@/utils/helpers';
import ReplyForm from './ReplyForm';
import { useComment } from '@/Redux/hooks/useComment';

function Comments({ product }) {
  const [score, setScore] = useState(5);
  const { replyForm, openReplyForm } = useComment();

  const strengthsInputRef = useRef();
  const weaknessesInputRef = useRef();

  useEffect(() => {
    new Tagify(strengthsInputRef.current, { placeholder: 'با کلید اینتر اضافه کنید' });
    new Tagify(weaknessesInputRef.current, { placeholder: 'با کلید اینتر اضافه کنید' });
  }, []);

  const submitScore = (score) => {
    setScore(score);
    showSwal('امتیاز مورد نظر شما با موفقیت ثبت شد', 'success', 'ادامه ثبت کامنت');
  };

  // دریافت همه کامنت‌ها
  const allComments = product?.comments || [];
  console.log('کامنت‌های دریافتی در کامپوننت Comments:', allComments);

  // فیلتر کردن کامنت‌های اصلی (isReply: false و parent: null)
  const mainComments = allComments.filter(
    (comment) => !comment.isReply && !comment.parent
  );
  console.log('mainComments =====>', mainComments);

  // تبدیل تاریخ میلادی به شمسی
  const formatDate = (timestamp) => {
    if (!timestamp) return '';

    try {
      const date = new Date(parseInt(timestamp) || timestamp);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        calendar: 'persian',
      };
      return new Intl.DateTimeFormat('fa-IR', options).format(date);
    } catch (error) {
      console.error('خطا در تبدیل تاریخ:', error);
      return '';
    }
  };

  // رندر کردن ستاره‌ها بر اساس امتیاز
  const renderStars = (rating) => {
    const numericRating = parseFloat(rating) || 0;
    const fullStars = Math.floor(numericRating);
    const emptyStars = 5 - fullStars;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<GoStarFill key={`full-${i}`} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }

    return stars;
  };

  // یافتن پاسخ‌ها برای یک کامنت اصلی
  const getReplies = (comment) => {
    if (!comment.replies || comment.replies.length === 0) {
      console.log(`No replies for comment ${comment._id}:`, comment.replies);
      return [];
    }
    console.log(`Raw replies for comment ${comment._id}:`, comment.replies);
    const replies = allComments.filter((reply) => {
      const match = comment.replies.some((r) => {
        const isMatch = r._id === reply._id && reply.isReply;
        console.log(`Comparing reply._id: ${reply._id} with r._id: ${r._id}, isReply: ${reply.isReply}, Match: ${isMatch}`);
        return isMatch;
      });
      return match;
    });
    console.log(`Filtered replies for comment ${comment._id}:`, replies);
    return replies;
  };

  // هندل کردن کلیک روی دکمه پاسخ
  const handleReplyClick = (e, commentId) => {
    e.preventDefault();
    openReplyForm(commentId);
  };

  // رندر یک کامنت (چه اصلی و چه پاسخ)
  const renderComment = (comment, isReply = false) => (
    <div
      key={comment._id}
      className={`bg-light shadow-inner mb-4 ${isReply ? styles.comment_response : styles.comment}`}
    >
      <div className={styles.title}>
        <div className="row align-items-center">
          <div className="col-sm-10">
            <div className="d-flex align-items-center">
              <div
                className={`${styles.avatar} p-2 bg-white shadow-box rounded-circle`}
              >
                <img
                  className="img-fluid rounded-circle"
                  src="/images/user.png"
                  alt=""
                />
              </div>
              <div className="d-flex flex-wrap align-items-center me-2">
                <h6 className="text-muted font-14">
                  {comment.user?.username || comment.name || 'مهدی حق دوست'}
                </h6>
                <h6 className="text-muted font-14 me-2">
                  {formatDate(comment.createdAt)}
                </h6>
              </div>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="d-flex justify-content-end">
              {renderStars(comment.rating)}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.comment_desc}>
        <p className="font-14 text-muted">{comment.commentText}</p>
      </div>
      <div className={styles.comment_foot}>
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className={styles.comment_rates}>
              {comment.strengths && comment.strengths.length > 0 && (
                <div className={`${styles.comment_rates_positive} rounded-4`}>
                  <div className="d-flex align-items-center">
                    <h6 className="font-14 ms-3">نقاط قوت</h6>
                    <nav className={`${styles.positive_nav} navbar flex-column`}>
                      <ul className="navbar-nav flex-wrap">
                        {comment.strengths.map((strength, idx) => (
                          <li key={idx} className="nav-item">
                            <span className="nav-link font-14">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
              {comment.weaknesses && comment.weaknesses.length > 0 && (
                <div className={`${styles.comment_rates_negative} rounded-4 mt-3`}>
                  <div className="d-flex align-items-center">
                    <h6 className="font-14 ms-3">نقاط ضعف</h6>
                    <nav className={`${styles.negative_nav} navbar flex-column`}>
                      <ul className="navbar-nav flex-wrap">
                        {comment.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="nav-item">
                            <span className="nav-link font-14">{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
          {!isReply && (
            <div className="col-12">
              <div className={styles.comment_replay}>
                <a
                  href=""
                  className="btn btn-sm rounded-pill main-color-two-bg px-4"
                  onClick={(e) => handleReplyClick(e, comment._id)}
                >
                  پاسخ
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* نمایش فرم پاسخ اگر برای این کامنت باز شده باشد */}
      {replyForm.isOpen && replyForm.parentId === comment._id && (
        <ReplyForm parentId={comment._id} />
      )}
      
      {/* رندر پاسخ‌ها برای کامنت اصلی */}
      {getReplies(comment).length > 0 && (
        <div className={styles.replies_container}>
          {getReplies(comment).map((reply) => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <h6 className={styles.product_desc_tab_title}>نظرت در مورد این محصول چیه؟</h6>
      <p className="font-14 text-muted mt-2">
        برای ثبت نظر، از طریق دکمه افزودن دیدگاه جدید نمایید. اگر این محصول را قبلا
        خریده باشید، نظر شما به عنوان خریدار ثبت خواهد شد.
      </p>
      <div className="row gy-4">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-6">
              <div className={styles.comment_item}>
                <input
                  type="email"
                  className="form-control"
                  id="floatingInputEmail"
                />
                <label
                  className={`form-label ${styles.comment_item_label}`}
                  htmlFor="floatingInputEmail"
                >
                  ایمیل خود را وارد کنید
                </label>
              </div>
            </div>
            <div className="col-sm-6">
              <div className={styles.comment_item}>
                <input
                  type="name"
                  className="form-control"
                  id="floatingInputName"
                />
                <label
                  className={`form-label ${styles.comment_item_label}`}
                  htmlFor="floatingInputName"
                >
                  نام خود را وارد کنید
                </label>
              </div>
            </div>
            <div className="col-12">
              <div
                className={`${styles.comment_item} d-flex align-items-center mb-3`}
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberComment"
                />
                <label
                  className="form-check-label d-block"
                  htmlFor="rememberComment"
                >
                  ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
                  می‌نویسم.
                </label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-group mt-3">
                <label>امتیاز شما</label>
                <div className={styles.rate}>
                  <GoStarFill onClick={() => submitScore(5)} />
                  <GoStarFill onClick={() => submitScore(4)} />
                  <GoStarFill onClick={() => submitScore(3)} />
                  <GoStarFill onClick={() => submitScore(2)} />
                  <GoStarFill onClick={() => submitScore(1)} />
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className={`${styles.comment_item} my-3`}>
                <textarea
                  style={{ height: '150px' }}
                  className="form-control"
                  id="floatingTextarea"
                ></textarea>
                <label
                  className={`form-label ${styles.comment_item_label}`}
                  htmlFor="floatingTextarea"
                >
                  متن نظر
                </label>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group mt-3">
                <label className="text-success mb-2" htmlFor="tags-pos">
                  نقاط قوت
                </label>
                <input
                  ref={strengthsInputRef}
                  className={`tagify ${styles.comment_tags} tags-pos form-control`}
                  name="tags-pos"
                  id="tags-pos"
                  placeholder="با کلید اینتر اضافه کنید"
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group mt-3">
                <label className="text-danger mb-2" htmlFor="tags-neg">
                  نقاط ضعف
                </label>
                <input
                  ref={weaknessesInputRef}
                  className={`tagify ${styles.comment_tags} tags-neg form-control`}
                  name="tags-neg"
                  id="tags-neg"
                  placeholder="با کلید اینتر اضافه کنید"
                />
              </div>
            </div>
            <div className="col-12">
              <a
                href=""
                className={`btn border-0 main-color-one-bg my-3 mx-auto btn-lg waves-effect waves-light ${styles.btn_comment}`}
              >
                ثبت نظر
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* نمایش کامنت‌های اصلی */}
      {mainComments.length > 0 ? (
        mainComments.map((comment) => renderComment(comment))
      ) : (
        <div className="alert alert-info mt-4">
          هنوز هیچ نظری برای این محصول ثبت نشده است. اولین نفری باشید که نظر
          می‌دهید!
        </div>
      )}
    </>
  );
}

export default Comments;