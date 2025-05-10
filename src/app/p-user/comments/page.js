"use client";
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layouts/UserPanelLayout';
import Pagination from '@/components/modules/p-user/pagination/Pagination';
import styles from "@/styles/p-user/comments.module.css";
import CommentItem from '@/components/modules/p-user/comments/CommentItem';
import { useComment } from '@/Redux/hooks/useComment';

const Page = () => {
  const {
    userComments,
    totalPages: apiTotalPages,
    currentPage: apiCurrentPage,
    userCommentsLoading,
    userCommentsError,
    fetchUserComments
  } = useComment();

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  
  const getPaginatedComments = () => {
    if (apiTotalPages > 0) {
      return userComments;
    }
    
    if (!userComments || !userComments.length) return [];
    
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return userComments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };
  
  const getTotalPages = () => {
    if (apiTotalPages > 0) {
      return apiTotalPages;
    }
    
    if (!userComments || !userComments.length) return 0;
    return Math.ceil(userComments.length / ITEMS_PER_PAGE);
  };

  useEffect(() => {
    fetchUserComments(page, ITEMS_PER_PAGE);
  }, []);

  const handleDeleteSuccess = () => {
    fetchUserComments(page, ITEMS_PER_PAGE);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    
    if (apiTotalPages > 0) {
      fetchUserComments(newPage, ITEMS_PER_PAGE);
    }
  };

  const currentComments = getPaginatedComments();
  const totalPages = getTotalPages();

  return (
    <Layout>
      <div className="ui-boxs">
        <div className="ui-box">
          <div className="ui-box-item ui-box-white">
            <div className="ui-box-item-title" style={{ padding: "15px" }}>
              <h4 className="fw-bold">
                دیدگاه های من
              </h4>
            </div>
            <div className="ui-box-item-desc">
              {userCommentsLoading ? (
                <div className="text-center p-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">در حال بارگذاری...</span>
                  </div>
                </div>
              ) : userCommentsError ? (
                <div className="alert alert-danger">
                  خطا در دریافت کامنت‌ها: {userCommentsError}
                  <div>
                    <button 
                      className="btn btn-sm btn-primary mt-2"
                      onClick={() => {
                        fetchUserComments(page, ITEMS_PER_PAGE);
                      }}
                    >
                      تلاش مجدد
                    </button>
                  </div>
                </div>
              ) : !currentComments || currentComments.length === 0 ? (
                <div className="alert alert-info">
                  هیچ دیدگاهی برای نمایش وجود ندارد.
                </div>
              ) : (
                <div className={styles.comments}>
                  {currentComments.map(comment => (
                    <CommentItem 
                      key={comment._id} 
                      comment={comment} 
                      onDeleteSuccess={handleDeleteSuccess} 
                    />
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <Pagination 
                  currentPage={page} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;