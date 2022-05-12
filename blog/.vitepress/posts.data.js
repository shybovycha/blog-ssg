const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { createMarkdownRenderer } = require('vitepress');
const { format: formatDate, parse: parseDate, isValid: isValidDate } = require('date-fns');

const md = createMarkdownRenderer(process.cwd());

const cache = new Map();

const getPost = (absoluteFilePath, postDir) => {
  const postPath = path.relative(postDir, absoluteFilePath);
  const timestamp = fs.statSync(absoluteFilePath).mtimeMs;

  const cached = cache.get(postPath);

  if (cached && timestamp === cached.timestamp) {
    return cached.post;
  }

  const src = fs.readFileSync(absoluteFilePath, 'utf-8');
  const { data: frontMatter, excerpt, content } = matter(src, { excerpt: true, excerpt_separator: '<!--more-->' });

  const parsePostDate = () => {
    const fileDate = path.basename(postPath).replace(/^(\d{4}-\d{2}-\d{2}).+$/, '$1');
    const fallbackDate = parseDate(fileDate, 'yyyy-MM-dd', new Date());

    const frontMatterDate = frontMatter.date ? parseDate(frontMatter.date, 'yyyy-MM-dd HH:mm:ss XXXXX', new Date()) : null;

    if (frontMatterDate && isValidDate(frontMatterDate)) {
      return frontMatterDate;
    }

    if (fallbackDate && isValidDate(fallbackDate)) {
      return fallbackDate;
    }

    return new Date();
  };

  const post = {
    title: frontMatter.title,
    href: `/posts/${postPath.replace(/\.md$/, '.html')}`,
    timestamp: parsePostDate(), // formatRelative ?
    date: formatDate(parsePostDate(), 'yyyy MMM dd HH:mm'),
    excerpt: md.render(excerpt),
    content: md.render(content).replace(/<lazyimg /g, '<img '),
  };

  cache.set(postPath, {
    timestamp,
    post
  });

  return post;
};

const getFilesRec = (dir) => {
  const result = [];
  const queue = [dir];

  while (queue.length > 0) {
    const p = queue.shift();

    const stat = fs.lstatSync(p);

    if (stat.isDirectory()) {
      fs.readdirSync(p).forEach(f => queue.push(path.join(p, f)));
    } else {
      result.push(p);
    }
  }

  return result;
};

module.exports = {
  watch: '../posts/*.md',

  load() {
    const postDir = path.resolve(__dirname, '../posts');

    const posts = getFilesRec(postDir)
      .map((file) => getPost(file, postDir))
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return posts;
  }
};
