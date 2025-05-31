import Error503 from '@/components/templates/error-pages/Error503';

export default function Page503() {
  return <Error503 />;
}

export const metadata = {
  title: 'خطای 503 - سرویس در دسترس نیست',
  description: 'سرویس موقتا در دسترس نیست، لطفا بعدا تلاش کنید',
};