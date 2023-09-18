import styles from './homepage.module.css';
import React from 'react';
import BlogSummaryCard from '@/components/BlogSummaryCard';
import Spinner from '@/components/Spinner';
import {getBlogPostList} from '@/helpers/file-helpers';
import {BLOG_TITLE} from '@/constants';

export async function generateMetadata() {
  return {
    description: 'A wonderful blog about JavaScript',
    title: BLOG_TITLE,
  };
}

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>
      <React.Suspense fallback={<Spinner/>}>
        <PostList/>
      </React.Suspense>
    </div>
  );
}

const PostList = async () => {
  const postList = await getBlogPostList();

  return postList.map(({abstract, publishedOn, slug, title}) => (
    <BlogSummaryCard abstract={abstract} key={slug}
                     publishedOn={publishedOn} slug={slug}
                     title={title}/>
  ));
}

export default Home;
