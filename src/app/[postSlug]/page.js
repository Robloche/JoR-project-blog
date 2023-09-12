import React from 'react';
import BlogPostPage from '@/components/BlogPostPage';
import Spinner from '@/components/Spinner';
import styles from './postSlug.module.css';

const BlogPost = ({params}) => {
  return (
    <article className={styles.wrapper}>
      <React.Suspense fallback={<Spinner/>}>
        <BlogPostPage slug={params.postSlug}/>
      </React.Suspense>
    </article>
  );
}

export default BlogPost;
