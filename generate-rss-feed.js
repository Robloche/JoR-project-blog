const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const RSS = require('rss');

console.log('Generating RSS feed...');

const files = fs.readdirSync(path.join(process.cwd(), '/content'));

const blogPosts = files.map((fileName) => {
  const rawContent = fs.readFileSync(path.join(process.cwd(), `/content/${fileName}`));
  const {data: frontmatter} = matter(rawContent);

  return {
    slug: fileName.replace('.mdx', ''), ...frontmatter,
  };
});

blogPosts.sort((p1, p2) => p1.publishedOn < p2.publishedOn ? 1 : -1);

const feed = new RSS({
  author: 'Josh Comeau', pubDate: new Date(), title: 'Bits & Bytes'
});

blogPosts.forEach((post) => {
  feed.item({
    author: 'Josh Comeau', date: post.publishedOn, description: post.abstract, title: post.title, url: `/${post.slug}`
  })
});

fs.writeFileSync(path.join(process.cwd(), '/public/rss.xml'), feed.xml({indent: true}));

console.log(`Wrote rss.xml (${blogPosts.length} posts)`);
