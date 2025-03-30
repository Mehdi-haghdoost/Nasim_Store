import React from 'react';
import styles from "@/styles/blog.module.css";
import Header from '@/components/modules/header/Header';
import Footer from '@/components/modules/footer/Footer';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import CategoryBox from '@/components/templates/blog/Header/CategoryBox';
import BlogHighlights from '@/components/templates/blog/Header/BlogHighlights';
import TopViewedPosts from '@/components/templates/blog/content/TopViewedPosts';
import LatestBlogVideos from '@/components/templates/blog/blog-lastVideos/LatestBlogVideos';
import LatestBlogPosts from '@/components/templates/blog/blog-lastPosts/LatestBlogPosts';
import { getAllPosts } from '@/lib/mdx';

// در Next.js 14 و App Router، این تابع به جای getStaticProps استفاده می‌شود
export default async function Page() {
    // دریافت همه پست‌ها از سیستم MDX
    const allPosts = getAllPosts();
    
    // دسته‌بندی‌ها را از پست‌ها استخراج و شمارش می‌کنیم
    const categoryCount = {};
    allPosts.forEach(post => {
        if (post.category) {
            if (categoryCount[post.category]) {
                categoryCount[post.category]++;
            } else {
                categoryCount[post.category] = 1;
            }
        }
    });
    
    // تبدیل به آرایه برای نمایش
    const categories = Object.keys(categoryCount).map(name => ({
        name,
        count: categoryCount[name],
    }));
    
    // سه پست برتر برای نمایش در بخش هایلایت
    const featuredPosts = allPosts.slice(0, 3);
    
    // هشت پست آخر برای نمایش در بخش آخرین پست‌ها
    const latestPosts = allPosts.slice(0, 8);

    return (
        <>
            <Header />
            <BreadCroumb />
            <div className="content">
                <div className="container-fluid">
                    <div className="row gy-3">
                        <div className="col-lg-3">
                            <CategoryBox categories={categories} />
                        </div>
                        <div className="col-lg-9">
                            <BlogHighlights featuredPosts={featuredPosts} />
                        </div>
                    </div>
                </div>
                <TopViewedPosts posts={allPosts} />
                <LatestBlogVideos />
                <LatestBlogPosts posts={latestPosts} />
            </div>
            <Footer />
        </>
    );
}