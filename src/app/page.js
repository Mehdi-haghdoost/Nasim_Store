import Header from "@/components/modules/header/Header";
import Amazing from "@/components/templates/index/amazing/Amazing";
import Banner from "@/components/templates/index/banner/Banner";
import BestSell from "@/components/templates/index/bestSelling/BestSell";
import Category from "@/components/templates/index/category/Category";
import Feature from "@/components/templates/index/feature/Feature";
import MainSlider from "@/components/templates/index/mainSlider/MainSlider"
import NewProduct from "@/components/templates/index/newProduct/NewProduct";
import Service from "@/components/templates/index/service/Service";

export default function Home() {
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
     <br /><br /><br />
     <br /><br /><br />
     <br /><br /><br />
     <br /><br /><br />
     <br /><br /><br />
     <br /><br /><br />
    </>
  );
}
