// "use client";
// import React from 'react';
// import { MDXRemote } from 'next-mdx-remote';

// const MDXContent = ({ source }) => {
//   if (!source) return null;
  
//   return <MDXRemote {...source} />;
// };

// export default MDXContent;

"use client";
import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';

// کامپوننت‌های سفارشی برای MDX
const MDXComponents = {
  // کامپوننت سفارشی برای تصاویر
  img: ({ src, alt, ...props }) => {
    return (
      <div className="mdx-image-container">
        <Image
          src={src}
          alt={alt || 'تصویر'}
          width={800}
          height={450}
          className="mdx-image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority={false}
          {...props}
        />
      </div>
    );
  },
  
  // کامپوننت سفارشی برای پاراگراف‌ها
  p: ({ children, ...props }) => {
    return <p className="mdx-paragraph" {...props}>{children}</p>;
  },
  
  // کامپوننت سفارشی برای تیترها
  h1: ({ children, ...props }) => {
    return <h1 className="mdx-heading-1" {...props}>{children}</h1>;
  },
  
  h2: ({ children, ...props }) => {
    return <h2 className="mdx-heading-2" {...props}>{children}</h2>;
  },
  
  h3: ({ children, ...props }) => {
    return <h3 className="mdx-heading-3" {...props}>{children}</h3>;
  },
};

const MDXContent = ({ source }) => {
  if (!source) return null;
  
  return (
    <div className="mdx-content">
      <MDXRemote {...source} components={MDXComponents} />
    </div>
  );
};

export default MDXContent;