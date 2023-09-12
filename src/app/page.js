import React from 'react';
import BlogPostListPage from 'src/components/BlogPostListPage';
import Spinner from '@/components/Spinner';
import styles from './homepage.module.css';

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>
      <React.Suspense fallback={<Spinner/>}>
        <BlogPostListPage/>
      </React.Suspense>
    </div>
  );
}

export default Home;
