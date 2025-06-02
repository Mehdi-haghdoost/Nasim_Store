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
    setOpenReplyForm: openReplyForm,
    replySuccess,
    addLoading,
    addError,
    addSuccess,
    addComment, // استفاده از این تابع بجای submitComment
    clearAddStatus
  } = useComment();
  const { getProduct } = useProduct();

  // state برای نگهداری داده‌های فرم کامنت اصلی
  const [commentForm, setCommentForm] = useState({
    name: user?.username || '',
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
  const successAlertShown = useRef(false);

  // بروزرسانی state برای تغییرات در user
  useEffect(() => {
    if (user) {
      setCommentForm(prev => {
        if (
          prev.name === user.username &&
          prev.email === user.email
        ) {
          return prev;
        }
        return {
          ...prev,
          name: user.username || prev.name,
          email: user.email || prev.email,
        };
      });
    }
  }, [user]);

  // اگر ثبت پاسخ موفق بود، اطلاعات محصول را از سرور به‌روزرسانی کن
  useEffect(() => {
    if (replySuccess && product?._id) {
      getProduct(product._id);
    }
  }, [replySuccess, product, getProduct]);

  // اگر ثبت کامنت اصلی موفق بود، اطلاعات محصول را از سرور به‌روزرسانی کن
  useEffect(() => {
    if (addSuccess && product?._id && !successAlertShown.current) {
      successAlertShown.current = true;

      showSwal('نظر شما با موفقیت ثبت شد', 'success', 'تأیید');

      setCommentForm({
        name: user?.username || '',
        email: user?.email || '',
        website: '',
        commentText: '',
        rememberMe: commentForm.rememberMe
      });
      setScore(5);
      setStrengths([]);
      setWeaknesses([]);

      if (strengthsInputRef.current && strengthsInputRef.current._tagify) {
        strengthsInputRef.current._tagify.removeAllTags();
      }

      if (weaknessesInputRef.current && weaknessesInputRef.current._tagify) {
        weaknessesInputRef.current._tagify.removeAllTags();
      }

      getProduct(product._id);

      setTimeout(() => {
        clearAddStatus();
        successAlertShown.current = false;
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

  // بارگذاری اطلاعات ذخیره‌شده از localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('commentFormName');
    const savedEmail = localStorage.getItem('commentFormEmail');
    const savedWebsite = localStorage.getItem('commentFormWebsite');
    const savedRememberMe = localStorage.getItem('commentFormRememberMe') === 'true';

    setCommentForm((prev) => {
      const newForm = {
        ...prev,
        name: savedRememberMe ? savedName || prev.name : prev.name,
        email: savedRememberMe ? savedEmail || prev.email : prev.email,
        website: savedRememberMe ? savedWebsite || prev.website : prev.website,
        rememberMe: savedRememberMe,
      };
      return newForm;
    });
  }, []);

  // تنظیم Tagify برای نقاط قوت و ضعف
  useEffect(() => {
    if (strengthsInputRef.current && !strengthsInputRef.current._tagify) {
      const strengthsTagify = new Tagify(strengthsInputRef.current, {
        placeholder: 'با کلید اینتر اضافه کنید',
        callbacks: {
          add: onStrengthsChange,
          remove: onStrengthsChange,
          input: function (e) { }
        }
      });
    }

    if (weaknessesInputRef.current && !weaknessesInputRef.current._tagify) {
      const weaknessesTagify = new Tagify(weaknessesInputRef.current, {
        placeholder: 'با کلید اینتر اضافه کنید',
        callbacks: {
          add: onWeaknessesChange,
          remove: onWeaknessesChange,
          input: function (e) { }
        }
      });
    }

    return () => {
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

  // مدیریت تغییرات فرم
  const handleCommentFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCommentForm((prev) => {
      const newValue = type === 'checkbox' ? checked : value;
      if (prev[name] === newValue) {
        return prev;
      }

      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  // تابع برای تغییر وضعیت rememberMe
  const toggleRememberMe = () => {
    setCommentForm(prev => {
      const newRememberMe = !prev.rememberMe;

      // ذخیره یا حذف داده‌ها بر اساس وضعیت جدید
      if (newRememberMe) {

        localStorage.setItem('commentFormName', prev.name);
        localStorage.setItem('commentFormEmail', prev.email);
        localStorage.setItem('commentFormWebsite', prev.website || '');
        localStorage.setItem('commentFormRememberMe', 'true');
      } else {
        localStorage.removeItem('commentFormName');
        localStorage.removeItem('commentFormEmail');
        localStorage.removeItem('commentFormWebsite');
        localStorage.setItem('commentFormRememberMe', 'false');
      }

      return {
        ...prev,
        rememberMe: newRememberMe
      };
    });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      if (!commentForm.commentText.trim()) {
        showSwal('لطفاً متن نظر را وارد کنید', 'error', 'تلاش مجدد');
        return;
      }

      if (!product || !product._id) {
        console.error("شناسه محصول یافت نشد:", product);
        showSwal('خطا در شناسایی محصول', 'error', 'تلاش مجدد');
        return;
      }

      let currentStrengths = [...strengths];
      let currentWeaknesses = [...weaknesses];

      if (commentForm.rememberMe) {
        localStorage.setItem('commentFormName', commentForm.name);
        localStorage.setItem('commentFormEmail', commentForm.email);
        localStorage.setItem('commentFormWebsite', commentForm.website || '');
        localStorage.setItem('commentFormRememberMe', 'true');
      }

      const commentData = {
        product: product._id,
        commentText: commentForm.commentText,
        rating: score,
        name: commentForm.name || user?.username || 'کاربر',
        email: commentForm.email || user?.email || '',
        website: commentForm.website || null,
        strengths: currentStrengths,
        weaknesses: currentWeaknesses
      };

      // اینجا باید addComment فراخوانی شود - این خط را اضافه میکنیم
      await addComment(commentData);
    } catch (error) {
      console.error("Error submitting comment:", error);
      showSwal('خطا در ارسال کامنت: ' + (error.message || 'خطای ناشناخته'), 'error', 'تلاش مجدد');
    }
  };

  // دریافت همه کامنت‌ها
  const allComments = product?.comments || [];

  // فیلتر کردن کامنت‌های اصلی
  const mainComments = allComments.filter(
    (comment) => !comment.isReply && !comment.parent
  );

  // تبدیل تاریخ میلادی به شمسی
  const formatDate = (timestamp) => {
    if (!timestamp) {
      return '';
    }

    try {
      let numericTimestamp;
      if (typeof timestamp === 'string') {
        numericTimestamp = parseInt(timestamp, 10);
      } else if (typeof timestamp === 'number') {
        numericTimestamp = timestamp;
      } else {
        return new Date(timestamp).toLocaleDateString('fa-IR');
      }

      const date = new Date(numericTimestamp);
      if (date.toString() === 'Invalid Date') {
        console.error("تبدیل تاریخ ناموفق بود، مقدار خام:", timestamp);
        return timestamp.toString().substring(0, 10);
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

  // رندر ستاره‌ها
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

  // یافتن پاسخ‌ها
  const getReplies = (comment) => {
    if (!comment.replies || comment.replies.length === 0) {
      return [];
    }
    return comment.replies;
  };

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

  // رندر یک کامنت
  const renderComment = (comment, isReply = false) => {
    if (!comment || !comment._id) {
      console.warn("کامنت نامعتبر یا بدون آیدی:", comment);
      return null;
    }

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
                    {comment.name || comment.user?.username || 'کاربر'}
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
                    href="#"
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

        {replyForm.isOpen && replyForm.parentId === comment._id && (
          <ReplyForm parentId={comment._id} />
        )}

        {replies.length > 0 && (
          <div className={styles.replies_container}>
            {replies.map((reply) => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {addLoading && (
        <div className="alert alert-info mt-2 mb-4">
          <div className="d-flex align-items-center">
            <div className="spinner-border spinner-border-sm me-2" role="status">
              <span className="visually-hidden">در حال بارگذاری...</span>
            </div>
            <span>در حال ثبت نظر شما...</span>
          </div>
        </div>
      )}

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

              {/* جایگزین کردن چک‌باکس استاندارد با چک‌باکس سفارشی */}
              <div className="col-12">
                <div
                  className="d-flex align-items-center mb-3"
                  style={{ cursor: 'pointer' }}
                  onClick={toggleRememberMe}
                >
                  <div
                    className={styles.comment_item_checkbox}
                    style={{ backgroundColor: commentForm.rememberMe ? '#007bff' : 'white', }}
                  >
                    {commentForm.rememberMe && '✓'}
                  </div>
                  <span className="form-check-label">
                    ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
                    می‌نویسم.
                  </span>
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
                  type="button"
                  className={`btn border-0 main-color-one-bg my-3 mx-auto btn-lg waves-effect waves-light ${styles.btn_comment}`}
                  onClick={handleSubmitComment}
                  disabled={addLoading}
                >
                  {addLoading ? 'در حال ثبت...' : 'ثبت نظر'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

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