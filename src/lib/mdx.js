import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// مسیر پوشه محتوای پست‌ها
const postsDirectory = path.join(process.cwd(), 'content/posts');

// دریافت همه آیدی‌های پست‌ها
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, '')
      }
    };
  });
}

// دریافت اطلاعات همه پست‌ها
export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // آیدی پست را از نام فایل استخراج می‌کنیم
    const id = fileName.replace(/\.mdx$/, '');
    
    // فایل MDX را به صورت رشته می‌خوانیم
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // از gray-matter برای تجزیه داده‌های متا استفاده می‌کنیم
    const matterResult = matter(fileContents);
    
    // داده‌ها را با آیدی ترکیب می‌کنیم
    return {
      id,
      ...matterResult.data
    };
  });
  
  // پست‌ها را بر اساس تاریخ مرتب می‌کنیم
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// دریافت داده‌های یک پست با آیدی مشخص
export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // از gray-matter برای تجزیه داده‌های متا استفاده می‌کنیم
  const matterResult = matter(fileContents);
  
  // محتوا و داده‌های متا را برمی‌گردانیم
  return {
    id,
    content: matterResult.content,
    ...matterResult.data
  };
}

// دریافت پست‌ها بر اساس دسته‌بندی
export function getPostsByCategory(category) {
  const allPosts = getAllPosts();
  
  // فیلتر کردن پست‌ها بر اساس دسته‌بندی
  return allPosts.filter(post => post.category === category);
}