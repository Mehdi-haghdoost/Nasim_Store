import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ClientPage from './client-page';

export default async function Page() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  // بررسی سمت سرور، قبل از رندر شدن صفحه
  if (accessToken) {
    redirect('/');
  }

  // فقط اگر کاربر لاگین نباشد، محتوای صفحه لاگین را نمایش می‌دهیم
  return <ClientPage />;
}