import styles from './postSlug.module.css';
import React from 'react';
import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet';
import {MDXRemote} from 'next-mdx-remote/rsc';
import Spinner from '@/components/Spinner';
import dynamic from 'next/dynamic';
import {loadBlogPost} from '@/helpers/file-helpers';
import {BLOG_TITLE} from '@/constants';
import {notFound} from 'next/navigation';

const DivisionGroupsDemo = dynamic(
  () => import('@/components/DivisionGroupsDemo'),
  {loading: Spinner}
);

const CircularColorsDemo = dynamic(
  () => import('@/components/CircularColorsDemo'),
  {loading: Spinner}
);

export const generateMetadata = async ({params}) => {
  const post = await loadBlogPost(params.postSlug);

  if (post === null) {
    return {title: `404 Not found • ${BLOG_TITLE}`};
  }

  const {frontmatter: {abstract, title}} = post;
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
  const post = await loadBlogPost(slug);

  if (post === null) {
    notFound();
  }

  const {frontmatter: {publishedOn, title}, content} = post;

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
