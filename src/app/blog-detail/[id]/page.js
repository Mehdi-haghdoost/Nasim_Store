export const dynamic = 'force-dynamic';

import React from 'react';
import styles from '@/styles/blog-detail.module.css';
import Header from '@/components/modules/header/Header';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Footer from '@/components/modules/footer/Footer';
import BlogContent from '@/components/templates/blog-detail/content/BlogContent';
import BlogComments from '@/components/templates/blog-detail/blog-comments/BlogComments';
import CommentForm from '@/components/templates/blog-detail/FeedbackForm/CommentForm';
import RelatedArticles from '@/components/templates/blog-detail/RelatedArticles/RelatedArticles';
import { getAllPostIds, getPostData, getAllPosts } from '@/lib/mdx';

export async function generateMetadata({ params }) {
  try {
    const { id } = params;
    const postData = getPostData(id);
    
    return {
      title: postData?.title || 'جزئیات بلاگ',
      description: postData?.description || '',
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'جزئیات بلاگ',
      description: '',
    };
  }
}

export default async function BlogDetailPage({ params }) {
  try {
    const { id } = params;
    
    if (!id) {
      return (
        <>
          <Header />
          <BreadCroumb />
          <div className="container my-5">
            <div className="alert alert-danger">
              پست مورد نظر یافت نشد.
            </div>
          </div>
          <Footer />
        </>
      );
    }

    const postData = getPostData(id);
    

    if (!postData) {
      return (
        <>
          <Header />
          <BreadCroumb />
          <div className="container my-5">
            <div className="alert alert-warning">
              محتوای پست در دسترس نیست.
            </div>
          </div>
          <Footer />
        </>
      );
    }
    
    const allPosts = getAllPosts();
    const relatedPosts = allPosts
      .filter(post => post?.category === postData?.category && post?.id !== id)
      .slice(0, 8);
    
    return (
      <>
        <Header />
        <BreadCroumb />
        {postData && <BlogContent postData={postData} />}
        <BlogComments />
        <CommentForm />
        {relatedPosts && relatedPosts.length > 0 && (
          <RelatedArticles posts={relatedPosts} />
        )}
        <Footer />
      </>
    );
  } catch (error) {
    console.error('Error rendering blog detail page:', error);
    
    return (
      <>
        <Header />
        <BreadCroumb />
        <div className="container my-5">
          <div className="alert alert-danger">
            خطا در بارگذاری صفحه. لطفاً دوباره تلاش کنید.
          </div>
        </div>
        <Footer />
      </>
    );
  }
}