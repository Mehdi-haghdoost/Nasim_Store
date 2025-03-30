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

// تولید مسیرهای استاتیک برای تمام پست‌های بلاگ
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map(path => path.params);
}

export async function generateMetadata({ params }) {
  const { id } = params;
  const postData = getPostData(id);
  
  return {
    title: postData.title || 'جزئیات بلاگ',
    description: postData.description || '',
  };
}

export default async function BlogDetailPage({ params }) {
  const { id } = params;
  const postData = getPostData(id);
  
  // دریافت پست‌های مرتبط (با دسته‌بندی یکسان)
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(post => post.category === postData.category && post.id !== id)
    .slice(0, 8);
  
  return (
    <>
      <Header />
      <BreadCroumb />
      <BlogContent postData={postData} />
      <BlogComments />
      <CommentForm />
      <RelatedArticles posts={relatedPosts} />
      <Footer />
    </>
  );
}