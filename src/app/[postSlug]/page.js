import styles from './postSlug.module.css';
import React from 'react';
import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet';
import {MDXRemote} from 'next-mdx-remote/rsc';
import Spinner from '@/components/Spinner';
import dynamic from 'next/dynamic';
import {loadBlogPost} from '@/helpers/file-helpers';
import {BLOG_TITLE} from '@/constants';

const DivisionGroupsDemo = dynamic(
  () => import('@/components/DivisionGroupsDemo'),
  {loading: Spinner}
);

const CircularColorsDemo = dynamic(
  () => import('@/components/CircularColorsDemo'),
  {loading: Spinner}
);

export const generateMetadata = async ({params}) => {
  console.log('[generateMetadata] ...');

  const {frontmatter: {abstract, title}} = await loadBlogPost(params.postSlug);

  console.log('[generateMetadata] done');

  return {
    description: abstract, title: `${title} • ${BLOG_TITLE}`,
  };
}

const BlogPost = ({params}) => {
  return (<article className={styles.wrapper}>
    <React.Suspense fallback={<Spinner/>}>
      <Post slug={params.postSlug}/>
    </React.Suspense>
  </article>);
}

const Post = async ({slug}) => {
  console.log('[Post]');

  const {frontmatter: {publishedOn, title}, content} = await loadBlogPost(slug);

  return (<>
    <BlogHero
      title={title}
      publishedOn={publishedOn}
    />
    <div className={styles.page}>
      <MDXRemote source={content} components={{
        CircularColorsDemo,
        DivisionGroupsDemo,
        pre: CodeSnippet
      }}/>
    </div>
  </>);
}

export default BlogPost;
