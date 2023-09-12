import styles from './postSlug.module.css';
import React from 'react';
import BlogHero from '@/components/BlogHero';
import {MDXRemote} from 'next-mdx-remote/rsc';
import Spinner from '@/components/Spinner';
import {delay} from '@/utils';
import {loadBlogPost} from '@/helpers/file-helpers';

const BlogPost = ({params}) => {
  return (
    <article className={styles.wrapper}>
      <React.Suspense fallback={<Spinner/>}>
        <Post slug={params.postSlug}/>
      </React.Suspense>
    </article>
  );
}

const getData = async (slug, ms) => {
  const post = await loadBlogPost(slug);
  await delay(ms);
  return post;
};

const Post = async ({slug}) => {
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

export default BlogPost;
