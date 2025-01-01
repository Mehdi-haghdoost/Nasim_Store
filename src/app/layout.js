import AosInit from "@/utils/Aos";
import localFont from "next/font/local";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import BootstrapLoader from "@/utils/BootstrapLoader";
import MobileFooter from "@/components/layouts/MobileFooter/MobileFooter";
import FloatButton from "@/components/modules/float-btn/FloatButton ";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: ' Nasim Store | فروشگاه اینترنتی نسیم استور',
  description: "فروشگاه اینترنتی نسیم استور اولین فروشگاه تخصصی لوازم جانبی موبایل و تبلت و لپ تاپ خرید پاور بانک و هندزفری بلوتوث و انوع آنتی ویروس.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="fa" dir="rtl">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AosInit />
        <BootstrapLoader />
        {children}
        <MobileFooter />
        <FloatButton />
      </body>
    </html>
  );
}
