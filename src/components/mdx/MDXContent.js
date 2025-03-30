"use client";
import React from 'react';
import { MDXRemote } from 'next-mdx-remote';

const MDXContent = ({ source }) => {
  if (!source) return null;
  
  return <MDXRemote {...source} />;
};

export default MDXContent;