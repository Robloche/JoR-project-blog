import styles from './postSlug.module.css';
import React from 'react';
import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet';
import {MDXRemote} from 'next-mdx-remote/rsc';
import Spinner from '@/components/Spinner';
import {delay} from '@/utils';
import dynamic from 'next/dynamic';
import {loadBlogPost} from '@/helpers/file-helpers';
import {BLOG_TITLE} from '@/constants';

const DivisionGroupsDemo = dynamic(
  () => import('@/components/DivisionGroupsDemo'),
  { loading: Spinner }
);

const getData = React.cache(async (slug, ms) => {
  const post = await loadBlogPost(slug);
  await delay(ms);
  return post;
});

export const generateMetadata = async ({params}) => {
  const {frontmatter: {abstract, title}} = await getData(params.postSlug, 2_000);

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
  const {frontmatter: {publishedOn, title}, content} = await getData(slug, 3_000);

  return (<>
    <BlogHero
      title={title}
      publishedOn={publishedOn}
    />
    <div className={styles.page}>
      <MDXRemote source={content} components={{
        DivisionGroupsDemo,
        pre: CodeSnippet
      }}/>
    </div>
  </>);
}

export default BlogPost;
