import React from 'react';
import BlogHero from '@/components/BlogHero';
import {MDXRemote} from 'next-mdx-remote/rsc';
import {loadBlogPost} from '@/helpers/file-helpers';
import styles from '@/app/[postSlug]/postSlug.module.css';

const getData = async (slug, delay) => new Promise((resolve) => {
  const postList = loadBlogPost(slug);
  setTimeout(() => resolve(postList), delay)
});

const BlogPostPage = async ({slug}) => {
  const {frontmatter: {publishedOn, title}, content} = await getData(slug, 3_000);

  return (
    <>
      <BlogHero
        title={title}
        publishedOn={publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content}/>
      </div>
    </>
  );
}

export default BlogPostPage;
