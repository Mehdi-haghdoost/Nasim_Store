import React, { useState, useRef, useEffect } from 'react';
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';
import styles from './Comments.module.css';
import { FaRegStar } from 'react-icons/fa';
import { GoStarFill } from 'react-icons/go';
import { showSwal } from '@/utils/helpers';
import ReplyForm from './ReplyForm';
import { useComment } from '@/Redux/hooks/useComment';
import { useProduct } from '@/Redux/hooks/useProduct';
import { useAuth } from '@/Redux/hooks/useAuth';

function Comments({ product }) {
  const [score, setScore] = useState(5);
  const { user } = useAuth();
  const {
    replyForm,
    openReplyForm,
    replySuccess,
    addLoading,
    addError,
    addSuccess,
    submitComment,
    clearAddStatus
  } = useComment();
  const { getProduct } = useProduct();

  // state برای نگهداری داده‌های فرم کامنت اصلی
  const [commentForm, setCommentForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    website: '',
    commentText: '',
    rememberMe: false
  });

  // state برای نگهداری نقاط قوت و ضعف
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);

  const strengthsInputRef = useRef();
  const weaknessesInputRef = useRef();

  // اگر ثبت پاسخ موفق بود، اطلاعات محصول را از سرور به‌روزرسانی کن
  useEffect(() => {
    if (replySuccess && product?._id) {
      getProduct(product._id);
    }
  }, [replySuccess, product, getProduct]);

  // اگر ثبت کامنت اصلی موفق بود، اطلاعات محصول را از سرور به‌روزرسانی کن
  useEffect(() => {
    if (addSuccess && product?._id) {
      showSwal('نظر شما با موفقیت ثبت شد و پس از تأیید نمایش داده خواهد شد', 'success', 'تأیید');

      // پاک کردن فرم
      setCommentForm({
        name: user?.name || '',
        email: user?.email || '',
        website: '',
        commentText: '',
        rememberMe: commentForm.rememberMe
      });
      setScore(5);
      setStrengths([]);
      setWeaknesses([]);

      // ریست تگ‌های نقاط قوت و ضعف
      if (strengthsInputRef.current && strengthsInputRef.current._tagify) {
        strengthsInputRef.current._tagify.removeAllTags();
      }

      if (weaknessesInputRef.current && weaknessesInputRef.current._tagify) {
        weaknessesInputRef.current._tagify.removeAllTags();
      }

      // به‌روزرسانی محصول
      getProduct(product._id);

      // پاک کردن وضعیت پس از 3 ثانیه
      setTimeout(() => {
        clearAddStatus();
      }, 3000);
    }
  }, [addSuccess, product, getProduct, user, clearAddStatus, commentForm.rememberMe]);

  // نمایش خطا در صورت بروز مشکل در ثبت کامنت اصلی
  useEffect(() => {
    if (addError) {
      console.error("خطا در ثبت کامنت:", addError);
      showSwal(addError, 'error', 'تلاش مجدد');
    }
  }, [addError]);

  useEffect(() => {
    // تنظیم Tagify برای نقاط قوت
    if (strengthsInputRef.current) {
      const strengthsTagify = new Tagify(strengthsInputRef.current, {
        placeholder: 'با کلید اینتر اضافه کنید',
        // اتصال به event برای دریافت تغییرات تگ‌ها
        callbacks: {
          add: onStrengthsChange,
          remove: onStrengthsChange,
          input: function (e) { }
        }
      });
    }

    // تنظیم Tagify برای نقاط ضعف
    if (weaknessesInputRef.current) {
      const weaknessesTagify = new Tagify(weaknessesInputRef.current, {
        placeholder: 'با کلید اینتر اضافه کنید',
        // اتصال به event برای دریافت تغییرات تگ‌ها
        callbacks: {
          add: onWeaknessesChange,
          remove: onWeaknessesChange,
          input: function (e) { }
        }
      });
    }

    // تابع cleanup
    return () => {
      // پاک کردن Tagify در صورت unmount شدن کامپوننت
      if (strengthsInputRef.current && strengthsInputRef.current._tagify) {
        strengthsInputRef.current._tagify.destroy();
      }

      if (weaknessesInputRef.current && weaknessesInputRef.current._tagify) {
        weaknessesInputRef.current._tagify.destroy();
      }
    };
  }, []);

  // تابع دریافت تغییرات نقاط قوت
  const onStrengthsChange = (e) => {
    try {
      const tagifyEl = e.detail.tagify;
      if (tagifyEl && tagifyEl.value) {
        const tagValues = tagifyEl.value.map(tag => tag.value);

        setStrengths(tagValues);
      }
    } catch (error) {
      console.error("خطا در دریافت نقاط قوت:", error);
    }
  };

  // تابع دریافت تغییرات نقاط ضعف
  const onWeaknessesChange = (e) => {
    try {
      const tagifyEl = e.detail.tagify;
      if (tagifyEl && tagifyEl.value) {
        const tagValues = tagifyEl.value.map(tag => tag.value);
        setWeaknesses(tagValues);
      }
    } catch (error) {
      console.error("خطا در دریافت نقاط ضعف:", error);
    }
  };

  const submitScore = (score) => {
    setScore(score);
    showSwal('امتیاز مورد نظر شما با موفقیت ثبت شد', 'success', 'ادامه ثبت کامنت');
  };

  const handleCommentFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCommentForm({
      ...commentForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!commentForm.commentText.trim()) {
      showSwal('لطفاً متن نظر را وارد کنید', 'error', 'تلاش مجدد');
      return;
    }

    // استخراج مجدد تگ‌های نقاط قوت و ضعف از Tagify (برای اطمینان)
    let currentStrengths = [...strengths];
    let currentWeaknesses = [...weaknesses];

    // روش پشتیبان برای دریافت تگ‌ها اگر state خالی باشد
    if (currentStrengths.length === 0 && strengthsInputRef.current && strengthsInputRef.current._tagify) {
      try {
        const strengthTags = strengthsInputRef.current._tagify.value;
        if (Array.isArray(strengthTags)) {
          currentStrengths = strengthTags.map(tag => tag.value);
        }
      } catch (error) {
        console.error("خطا در دریافت نقاط قوت:", error);
      }
    }

    if (currentWeaknesses.length === 0 && weaknessesInputRef.current && weaknessesInputRef.current._tagify) {
      try {
        const weaknessTags = weaknessesInputRef.current._tagify.value;
        if (Array.isArray(weaknessTags)) {
          currentWeaknesses = weaknessTags.map(tag => tag.value);
        }
      } catch (error) {
        console.error("خطا در دریافت نقاط ضعف:", error);
      }
    }

    // ذخیره اطلاعات در localStorage اگر گزینه "به خاطر سپردن" فعال است
    if (commentForm.rememberMe) {
      localStorage.setItem('commentFormName', commentForm.name);
      localStorage.setItem('commentFormEmail', commentForm.email);
      localStorage.setItem('commentFormWebsite', commentForm.website || '');
    }

    submitComment({
      product: product._id,
      commentText: commentForm.commentText,
      rating: score,
      name: commentForm.name,
      email: commentForm.email,
      website: commentForm.website || null,
      strengths: currentStrengths,
      weaknesses: currentWeaknesses
    });
  };

  // دریافت همه کامنت‌ها
  const allComments = product?.comments || [];

  // فیلتر کردن کامنت‌های اصلی (isReply: false و parent: null)
  const mainComments = allComments.filter(
    (comment) => !comment.isReply && !comment.parent
  );

  // تبدیل تاریخ میلادی به شمسی
  const formatDate = (timestamp) => {
    if (!timestamp) {
      return '';
    }

    try {

      // تبدیل timestamp رشته‌ای به عدد
      let numericTimestamp;
      if (typeof timestamp === 'string') {
        numericTimestamp = parseInt(timestamp, 10);
      } else if (typeof timestamp === 'number') {
        numericTimestamp = timestamp;
      } else {
        // اگر نوع دیگری باشد (مثلاً تاریخ)
        return new Date(timestamp).toLocaleDateString('fa-IR');
      }

      // اگر timestamp میلی‌ثانیه‌ای است (13 رقمی)
      const date = new Date(numericTimestamp);

      if (date.toString() === 'Invalid Date') {
        console.error("تبدیل تاریخ ناموفق بود، مقدار خام:", timestamp);
        return timestamp.toString().substring(0, 10); // نمایش بخشی از رشته خام
      }

      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        calendar: 'persian',
      };

      return new Intl.DateTimeFormat('fa-IR', options).format(date);
    } catch (error) {
      console.error('خطا در کل فرآیند تبدیل تاریخ:', error);
      return 'تاریخ نامشخص';
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

  // یافتن پاسخ‌ها برای یک کامنت اصلی - روش بهبود یافته
  const getReplies = (comment) => {
    // اگر کامنت replies نداشته باشد یا آرایه خالی باشد
    if (!comment.replies || comment.replies.length === 0) {
      return [];
    }

    // به جای فیلتر کردن، مستقیماً از replies استفاده می‌کنیم
    // زیرا این فیلد در GraphQL resolver تکمیل می‌شود
    return comment.replies;
  };

  // یا روش جایگزین: پیدا کردن پاسخ‌ها با استفاده از parent
  const findRepliesByParent = (parentId) => {
    return allComments.filter(comment =>
      comment.isReply &&
      comment.parent &&
      (comment.parent._id === parentId || comment.parent === parentId)
    );
  };

  // هندل کردن کلیک روی دکمه پاسخ
  const handleReplyClick = (e, commentId) => {
    e.preventDefault();
    openReplyForm(commentId);
  };

  // رندر یک کامنت (چه اصلی و چه پاسخ)
  const renderComment = (comment, isReply = false) => {
    if (!comment || !comment._id) {
      console.warn("کامنت نامعتبر یا بدون آیدی:", comment);
      return null;
    }

    // بررسی ساختار کامل کامنت
    console.log(`ساختار کامل کامنت ${comment._id}:`, comment);
    console.log(`comment.name: ${comment.name}, comment.user?.username: ${comment.user?.username}`);

    // پیدا کردن پاسخ‌ها
    const replies = comment.replies && comment.replies.length > 0
      ? comment.replies
      : findRepliesByParent(comment._id);


    return (
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
                    {/* نمایش نام از فیلد name کامنت */}
                    {comment.name || comment.user?.username || 'کاربر'}
                    {console.log('comment.name:', comment.name, 'comment.user?.username:', comment.user?.username)}
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
        {replies.length > 0 && (
          <div className={styles.replies_container}>
            {replies.map((reply) => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
  };

  // بارگذاری اطلاعات ذخیره شده کاربر در هنگام مونت کامپوننت
  useEffect(() => {
    const savedName = localStorage.getItem('commentFormName');
    const savedEmail = localStorage.getItem('commentFormEmail');
    const savedWebsite = localStorage.getItem('commentFormWebsite');

    if (savedName || savedEmail || savedWebsite) {
      setCommentForm(prev => ({
        ...prev,
        name: savedName || prev.name,
        email: savedEmail || prev.email,
        website: savedWebsite || prev.website,
        rememberMe: true
      }));
    }
  }, []);

  return (
    <>
      <h6 className={styles.product_desc_tab_title}>نظرت در مورد این محصول چیه؟</h6>
      <p className="font-14 text-muted mt-2">
        برای ثبت نظر، از طریق دکمه افزودن دیدگاه جدید نمایید. اگر این محصول را قبلا
        خریده باشید، نظر شما به عنوان خریدار ثبت خواهد شد.
      </p>
      <div className="row gy-4">
        <div className="col-12">
          <form onSubmit={handleSubmitComment}>
            <div className="row">
              <div className="col-sm-6">
                <div className={styles.comment_item}>
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInputEmail"
                    name="email"
                    value={commentForm.email}
                    onChange={handleCommentFormChange}
                    required
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
                    type="text"
                    className="form-control"
                    id="floatingInputName"
                    name="name"
                    value={commentForm.name}
                    onChange={handleCommentFormChange}
                    required
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
                    name="rememberMe"
                    checked={commentForm.rememberMe}
                    onChange={handleCommentFormChange}
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
                    <GoStarFill
                      onClick={() => submitScore(5)}
                      className={`cursor-pointer ${score >= 5 ? 'text-warning' : 'text-muted'}`}
                    />
                    <GoStarFill
                      onClick={() => submitScore(4)}
                      className={`cursor-pointer ${score >= 4 ? 'text-warning' : 'text-muted'}`}
                    />
                    <GoStarFill
                      onClick={() => submitScore(3)}
                      className={`cursor-pointer ${score >= 3 ? 'text-warning' : 'text-muted'}`}
                    />
                    <GoStarFill
                      onClick={() => submitScore(2)}
                      className={`cursor-pointer ${score >= 2 ? 'text-warning' : 'text-muted'}`}
                    />
                    <GoStarFill
                      onClick={() => submitScore(1)}
                      className={`cursor-pointer ${score >= 1 ? 'text-warning' : 'text-muted'}`}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className={`${styles.comment_item} my-3`}>
                  <textarea
                    style={{ height: '150px' }}
                    className="form-control"
                    id="floatingTextarea"
                    name="commentText"
                    value={commentForm.commentText}
                    onChange={handleCommentFormChange}
                    required
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
                <button
                  type="submit"
                  className={`btn border-0 main-color-one-bg my-3 mx-auto btn-lg waves-effect waves-light ${styles.btn_comment}`}
                  disabled={addLoading}
                >
                  {addLoading ? 'در حال ثبت...' : 'ثبت نظر'}
                </button>
              </div>
            </div>
          </form>
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