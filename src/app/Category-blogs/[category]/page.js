import React from 'react';
import { getPostsByCategory, getAllPosts } from '@/lib/mdx';
import CategoryBlogsPage from './CategoryBlogsPage';
import Header from '@/components/modules/header/Header';
import Footer from '@/components/modules/footer/Footer';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Pagination from '@/components/modules/p-user/pagination/Pagination';

export async function generateStaticParams() {
    const posts = getAllPosts();
    const categories = [...new Set(posts.map(post => post.category))].filter(Boolean);
    
    return categories.map(category => ({
        category,
    }));
}

export async function generateMetadata({ params }) {
    const { category } = params;
    
    return {
        title: `دسته ${category} | بلاگ`,
        description: `مقالات و مطالب مربوط به دسته ${category}`,
    };
}

export default function CategoryBlogs({ params }) {
    const { category } = params;
    const posts = getPostsByCategory(category);
    
    return (
        <>
            <Header />
            <BreadCroumb />
            <div className='content'>
                <div className='py-20'>
                    <CategoryBlogsPage category={category} serverPosts={posts} />
                </div>
            </div>
            <Pagination />
            <Footer />
        </>
    );
}