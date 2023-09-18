import Link from 'next/link'
import styles from './not-found.module.css';
import {getBlogPostList} from '@/helpers/file-helpers';

const NotFound = async () => {
  const postList = await getBlogPostList();
  const randomPost = postList[Math.floor(Math.random() * postList.length)];

  return (
    <div className={styles.page}>
      <h2>404 Not Found</h2>
      <p>Could not find requested post</p>
      <Link className={styles.link} href={`/${randomPost.slug}`}>Try a random post?</Link>
      <Link href='/'>Return Home</Link>
    </div>
  )
};

export default NotFound;
