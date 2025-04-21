import React, { useState, useEffect } from 'react';
import styles from './Comments.module.css';
import { useComment } from '@/Redux/hooks/useComment';
import { useAuth } from '@/Redux/hooks/useAuth';
import { showSwal } from '@/utils/helpers';

function ReplyForm({ parentId }) {
  const { submitReply, closeReplyForm, replyLoading, replyError, replySuccess, clearReplyStatus } = useComment();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    commentText: '',
  });

  // نمایش پیام موفقیت بعد از ثبت پاسخ
  useEffect(() => {
    if (replySuccess) {
      console.log("پاسخ با موفقیت ثبت شد، نمایش پیام موفقیت");
      showSwal('پاسخ شما با موفقیت ثبت شد و پس از تأیید نمایش داده خواهد شد', 'success', 'تأیید');
      
      // پاک کردن فرم
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        commentText: '',
      });
      
      // پاک کردن وضعیت پاسخ بعد از 3 ثانیه
      setTimeout(() => {
        clearReplyStatus();
      }, 3000);
    }
  }, [replySuccess, user, clearReplyStatus]);

  // نمایش پیام خطا در صورت بروز مشکل
  useEffect(() => {
    if (replyError) {
      console.log("خطا در ثبت پاسخ:", replyError);
      showSwal(replyError, 'error', 'تلاش مجدد');
    }
  }, [replyError]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.commentText.trim()) {
      showSwal('لطفاً متن پاسخ را وارد کنید', 'error', 'تلاش مجدد');
      return;
    }

    console.log("ارسال پاسخ با داده:", {
      parentId,
      commentText: formData.commentText,
      name: formData.name,
      email: formData.email
    });
    
    submitReply({
      parentId,
      commentText: formData.commentText,
      name: formData.name,
      email: formData.email
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
          {!user && (
            <>
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
            </>
          )}
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