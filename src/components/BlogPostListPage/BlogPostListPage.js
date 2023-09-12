import React from 'react';
import BlogSummaryCard from '@/components/BlogSummaryCard';
import {getBlogPostList} from '@/helpers/file-helpers';

const getData = async (delay) => new Promise((resolve) => {
  const postList = getBlogPostList();
  setTimeout(() => resolve(postList), delay)
});

const BlogPostListPage = async () => {
  const postList = await getData(2_000);

  return postList.map(({abstract, publishedOn, slug, title}) => (
    <BlogSummaryCard abstract={abstract} key={slug}
                     publishedOn={publishedOn} slug={slug}
                     title={title}/>
  ));
}

export default BlogPostListPage;
