import React from 'react';
import {getBlogPostList} from '@/helpers/file-helpers';
import BlogSummaryCard from '@/components/BlogSummaryCard';

const getData = async (delay) => new Promise((resolve) => {
  const postList = getBlogPostList();
  setTimeout(() => resolve(postList), delay)
});

const BlogPostPage = async () => {
  const postList = await getData();

  return postList.map(({abstract, publishedOn, slug, title}) => (
    <BlogSummaryCard abstract={abstract} key={slug}
                     publishedOn={publishedOn} slug={slug}
                     title={title}/>
  ));
}

export default BlogPostPage;
