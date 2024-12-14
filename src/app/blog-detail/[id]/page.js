import React from 'react'
import styles from '@/styles/blog-detail.module.css';
import Header from '@/components/modules/header/Header';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Footer from '@/components/modules/footer/Footer';
import BlogContent from '@/components/templates/blog-detail/content/BlogContent';
import BlogComments from '@/components/templates/blog-detail/blog-comments/BlogComments';
import CommentForm from '@/components/templates/blog-detail/FeedbackForm/CommentForm';

const page = () => {
    return (
        <>
            <Header />
            <BreadCroumb />
            <BlogContent />
            <BlogComments />
            <CommentForm />
            <Footer />
        </>
    )
}

export default page