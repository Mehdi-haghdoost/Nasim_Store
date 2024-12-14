import React from 'react'
import styles from '@/styles/blog-detail.module.css';
import Header from '@/components/modules/header/Header';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Footer from '@/components/modules/footer/Footer';
import BlogContent from '@/components/templates/blog-detail/content/BlogContent';
import BlogComments from '@/components/templates/blog-detail/blog-comments/BlogComments';
import CommentForm from '@/components/templates/blog-detail/FeedbackForm/CommentForm';
import RelatedArticles from '@/components/templates/blog-detail/RelatedArticles/RelatedArticles';

const page = () => {
    return (
        <>
            <Header />
            <BreadCroumb />
            <BlogContent />
            <BlogComments />
            <CommentForm />
            <RelatedArticles />
            <Footer />
        </>
    )
}

export default page