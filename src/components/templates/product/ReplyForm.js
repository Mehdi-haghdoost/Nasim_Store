import React, { useState, useEffect } from 'react';
import styles from './Comments.module.css';
import { useComment } from '@/Redux/hooks/useComment';
import { useAuth } from '@/Redux/hooks/useAuth';
import { showSwal } from '@/utils/helpers';
import { FaRegStar } from 'react-icons/fa';
import { GoStarFill } from 'react-icons/go';

function ReplyForm({ parentId }) {
  const { submitReply, closeReplyForm, replyLoading, replyError, replySuccess, clearReplyStatus } = useComment();
  const { user } = useAuth();
  const [rating, setRating] = useState(5); // امتیاز پیش‌فرض 5
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    commentText: '',
  });

  // بارگذاری اطلاعات ذخیره شده کاربر در هنگام مونت کامپوننت
  useEffect(() => {
    const savedName = localStorage.getItem('commentFormName');
    const savedEmail = localStorage.getItem('commentFormEmail');
    
    if (savedName || savedEmail) {
      setFormData(prev => ({
        ...prev,
        name: savedName || prev.name,
        email: savedEmail || prev.email,
      }));
    }
  }, []);

  // نمایش پیام موفقیت بعد از ثبت پاسخ
  useEffect(() => {
    if (replySuccess) {
      showSwal('پاسخ شما با موفقیت ثبت شد و نمایش داده خواهد شد', 'success', 'تأیید');
      
      // پاک کردن فرم
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        commentText: '',
      });
      setRating(5); // بازگرداندن امتیاز به حالت پیش‌فرض
      
      // پاک کردن وضعیت پاسخ بعد از 3 ثانیه
      setTimeout(() => {
        clearReplyStatus();
      }, 3000);
    }
  }, [replySuccess, user, clearReplyStatus]);

  // نمایش پیام خطا در صورت بروز مشکل
  useEffect(() => {
    if (replyError) {
      showSwal(replyError, 'error', 'تلاش مجدد');
    }
  }, [replyError]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitScore = (score) => {
    setRating(score);
    showSwal('امتیاز مورد نظر شما با موفقیت ثبت شد', 'success', 'ادامه ثبت پاسخ');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.commentText.trim()) {
      showSwal('لطفاً متن پاسخ را وارد کنید', 'error', 'تلاش مجدد');
      return;
    }

    // ذخیره اطلاعات در localStorage برای استفاده مجدد
    localStorage.setItem('commentFormName', formData.name);
    localStorage.setItem('commentFormEmail', formData.email);

    submitReply({
      parentId,
      commentText: formData.commentText,
      name: formData.name,
      email: formData.email,
      rating // اضافه کردن امتیاز به اطلاعات ارسالی
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    closeReplyForm();
  };

  return (
    <div className={`${styles.reply_form} bg-light p-3 rounded-3 mt-3 mb-4`}>
      <h6 className="mb-3">ارسال پاسخ</h6>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-6 mb-3">
            <div className={styles.comment_item}>
              <input
                type="text"
                className="form-control"
                id="replyName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label
                className={`form-label ${styles.comment_item_label}`}
                htmlFor="replyName"
              >
                نام خود را وارد کنید
              </label>
            </div>
          </div>
          <div className="col-sm-6 mb-3">
            <div className={styles.comment_item}>
              <input
                type="email"
                className="form-control"
                id="replyEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label
                className={`form-label ${styles.comment_item_label}`}
                htmlFor="replyEmail"
              >
                ایمیل خود را وارد کنید
              </label>
            </div>
          </div>
          
          {/* اضافه کردن بخش امتیازدهی */}
          <div className="col-12">
            <div className="form-group mt-2 mb-3">
              <label className="d-block mb-2">امتیاز شما</label>
              <div className={styles.rate}>
                <GoStarFill 
                  onClick={() => submitScore(5)} 
                  className={`cursor-pointer ${rating >= 5 ? 'text-warning' : 'text-muted'}`} 
                />
                <GoStarFill 
                  onClick={() => submitScore(4)} 
                  className={`cursor-pointer ${rating >= 4 ? 'text-warning' : 'text-muted'}`} 
                />
                <GoStarFill 
                  onClick={() => submitScore(3)} 
                  className={`cursor-pointer ${rating >= 3 ? 'text-warning' : 'text-muted'}`} 
                />
                <GoStarFill 
                  onClick={() => submitScore(2)} 
                  className={`cursor-pointer ${rating >= 2 ? 'text-warning' : 'text-muted'}`} 
                />
                <GoStarFill 
                  onClick={() => submitScore(1)} 
                  className={`cursor-pointer ${rating >= 1 ? 'text-warning' : 'text-muted'}`} 
                />
              </div>
            </div>
          </div>
          
          <div className="col-12 mb-3">
            <div className={styles.comment_item}>
              <textarea
                className="form-control"
                id="replyText"
                name="commentText"
                value={formData.commentText}
                onChange={handleChange}
                rows="3"
                placeholder="متن پاسخ خود را بنویسید..."
                required
              ></textarea>
            </div>
          </div>
          <div className="col-12 d-flex gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary px-3"
              onClick={handleCancel}
              disabled={replyLoading}
            >
              انصراف
            </button>
            <button
              type="submit"
              className="btn btn-sm main-color-two-bg px-4"
              disabled={replyLoading}
            >
              {replyLoading ? 'در حال ارسال...' : 'ارسال پاسخ'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReplyForm;