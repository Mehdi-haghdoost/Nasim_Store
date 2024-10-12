import Header from "@/components/modules/header/Header";
import Feature from "@/components/templates/index/feature/Feature";
import MainSlider from "@/components/templates/index/mainSlider/MainSlider"
import Service from "@/components/templates/index/service/Service";

export default function Home() {
  return (
    <>
      <Header />
      <MainSlider />
      <Feature />
      <Service />
    </>
  );
}
