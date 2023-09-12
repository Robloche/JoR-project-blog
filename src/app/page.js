import React from 'react';

import BlogPostPage from '@/components/BlogPostPage';
import Spinner from '@/components/Spinner';

import styles from './homepage.module.css';

const Home = async () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>
      <React.Suspense fallback={<Spinner/>}>
        <BlogPostPage/>
      </React.Suspense>
    </div>
  );
}

export default Home;
