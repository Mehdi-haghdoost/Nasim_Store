import React from 'react';
import styles from './CommentItem.module.css';
import { GoStarFill } from "react-icons/go";
import { FaRegStar } from 'react-icons/fa';
import { formatDate } from '@/utils/helpers';
import { useComment } from '@/Redux/hooks/useComment';
import swal from 'sweetalert';

const CommentItem = ({ comment }) => {
  const { deleteComment, deleteLoading } = useComment();

  if (!comment) return null;

  const persianDate = formatDate(comment.createdAt);

  const renderStars = () => {
    const stars = [];
    const rating = comment.rating || 0;

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<GoStarFill key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }

    return stars;
  };

  const getStatusClass = () => {
    switch (comment.status) {
      case 'APPROVED':
      case 'active':
        return 'bg-success';
      case 'PENDING':
      case 'pending':
        return 'bg-warning';
      case 'REJECTED':
      case 'rejected':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const getStatusText = () => {
    switch (comment.status) {
      case 'APPROVED':
      case 'active':
        return 'تایید شده';
      case 'PENDING':
      case 'pending':
        return 'در انتظار تایید';
      case 'REJECTED':
      case 'rejected':
        return 'رد شده';
      default:
        return 'نامشخص';
    }
  };

  const handleDeleteComment = async (e) => {
    e.preventDefault();

    const willDelete = await swal({
      title: "آیا از حذف این دیدگاه اطمینان دارید؟",
      text: "با حذف این دیدگاه، امکان بازیابی آن وجود نخواهد داشت!",
      icon: "warning",
      buttons: ["انصراف", "حذف کن"],
      dangerMode: true,
    });

    if (willDelete) {
      try {
        await deleteComment(comment._id);
        await swal({
          title: "موفقیت‌آمیز!",
          text: "دیدگاه شما با موفقیت حذف شد.",
          icon: "success",
          timer: 2000,
        });
      } catch (error) {
        console.error('خطا در حذف کامنت:', error);
        await swal({
          title: "خطا!",
          text: "مشکلی در حذف دیدگاه رخ داد. لطفاً دوباره تلاش کنید.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className={styles.comment_item}>
      <div className={styles.comment_item_status}>
        <div className={styles.comment_item_status_item}>
          <img
            src={comment.product?.image ? `/images/product/${comment.product.image}` : "/images/product/product-image1.jpg"}
            width="80"
            alt="productImage"
          />
        </div>
        <div className={`dropd-status ${styles.comment_item_status_item}`}>
          <div className="dropdown">
            <span className={`${getStatusClass()} badge`}>{getStatusText()}</span>
            <a href="#" role='button' id='dropdownMenuLink' data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-three-dots-vertical text-dark fs-5"></i>
            </a>

            <ul className="dropdown-menu flex-column" aria-labelledby="dropdownMenuLink">
              <li>
                <a
                  href="#"
                  className="dropdown-item"
                  onClick={handleDeleteComment}
                  disabled={deleteLoading}
                >
                  <i className="bi bi-trash text-danger"></i>
                  {deleteLoading ? 'در حال حذف...' : 'حذف'}
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
                  {comment.product?.title || 'محصول نامشخص'}
                </p>
                <p className={`text-muted ${styles.comment_date_speractor}`}>
                  -
                </p>
                <p className={`text-muted ${styles.comment_date_date}`}>
                  {persianDate}
                </p>
              </div>
              <div className={styles.comment_item_rating}>
                {renderStars()}
              </div>
            </div>
            <div className={styles.comment_content_text}>
              {comment.commentText}
            </div>

            {comment.strengths && comment.strengths.length > 0 && (
              <div className="mt-2">
                <strong className="text-success">نقاط قوت: </strong>
                {comment.strengths.map((strength, index) => (
                  <span key={index} className="badge bg-light text-success me-1 mb-1">{strength}</span>
                ))}
              </div>
            )}

            {comment.weaknesses && comment.weaknesses.length > 0 && (
              <div className="mt-2">
                <strong className="text-danger">نقاط ضعف: </strong>
                {comment.weaknesses.map((weakness, index) => (
                  <span key={index} className="badge bg-light text-danger me-1 mb-1">{weakness}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;