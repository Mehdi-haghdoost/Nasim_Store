import Footer from "@/components/modules/footer/Footer";
import Header from "@/components/modules/header/Header";
import Amazing from "@/components/templates/index/amazing/Amazing";
import Banner from "@/components/templates/index/banner/Banner";
import BestSell from "@/components/templates/index/bestSelling/BestSell";
import Blog from "@/components/templates/index/blog/Blog";
import Category from "@/components/templates/index/category/Category";
import CustomerFavories from "@/components/templates/index/customerFavorites/CustomerFavories";
import Feature from "@/components/templates/index/feature/Feature";
import MainSlider from "@/components/templates/index/mainSlider/MainSlider"
import NewProduct from "@/components/templates/index/newProduct/NewProduct";
import PhoneBanner from "@/components/templates/index/phoneBanner/PhoneBanner";
import Service from "@/components/templates/index/service/Service";
import { getAllPosts } from '@/lib/mdx';

export default function Home() {
   // دریافت همه پست‌های بلاگ از سیستم MDX
   const blogPosts = getAllPosts();

  return (
    <>
      <Header />
      <MainSlider />
      <Feature />
      <Service />
      <Category />
      <Amazing />
      <BestSell />
      <Banner />
      <NewProduct />
      <PhoneBanner />
      <CustomerFavories />
      <Blog posts={blogPosts} />
      <Footer />
    </>
  );
}
