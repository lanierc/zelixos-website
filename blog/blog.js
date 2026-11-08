const blogList = document.querySelector('#blog-posts');
const blogEmpty = document.querySelector('#blog-empty');
const posts = (window.ZELIXOS_BLOG_POSTS || [])
  .filter((post) => post.published !== false)
  .sort((a, b) => b.date.localeCompare(a.date));

const blogLabels = {
  en: { readMore: 'Read update', readLess: 'Close update', readArticle: 'Read full article', empty: 'No posts yet. Check back soon for ZelixOS news and release notes.' },
  tr: { readMore: 'Yazıyı oku', readLess: 'Yazıyı kapat', readArticle: 'Yazının tamamını oku', empty: 'Henüz yazı yok. ZelixOS haberleri ve sürüm notları için yakında tekrar bakın.' }
};

function localized(value, language) {
  if (typeof value === 'string') return value;
  return value?.[language] || value?.en || '';
}

function renderBlog() {
  const language = document.documentElement.lang === 'tr' ? 'tr' : 'en';
  const labels = blogLabels[language];
  blogList.replaceChildren();
  blogEmpty.hidden = posts.length > 0;
  if (!posts.length) blogEmpty.textContent = labels.empty;

  for (const post of posts) {
    const article = document.createElement('article');
    article.className = 'card blog-post';
    article.id = `post-${post.id}`;

    const meta = document.createElement('div');
    meta.className = 'blog-post-meta';
    const category = document.createElement('span');
    category.className = 'pill';
    category.textContent = localized(post.category, language);
    const date = document.createElement('time');
    date.dateTime = post.date;
    date.textContent = new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }).format(new Date(`${post.date}T12:00:00`));
    meta.append(category, date);

    const heading = document.createElement('h2');
    heading.className = 'title title-sm';
    heading.textContent = localized(post.title, language);
    const excerpt = document.createElement('p');
    excerpt.className = 'blog-post-excerpt';
    excerpt.textContent = localized(post.excerpt, language);

    article.append(meta, heading, excerpt);

    if (post.articleUrl) {
      const readArticle = document.createElement('a');
      readArticle.className = 'btn btn-outline btn-sm blog-read-article';
      readArticle.href = post.articleUrl;
      readArticle.textContent = localized(post.articleLabel, language) || labels.readArticle;
      article.append(readArticle);
    } else {
      const paragraphs = post.body?.[language] || post.body?.en || [];
      if (paragraphs.length) {
      const details = document.createElement('details');
      details.className = 'blog-post-details';
      const summary = document.createElement('summary');
      summary.textContent = labels.readMore;
      const body = document.createElement('div');
      body.className = 'blog-post-body';
      for (const text of paragraphs) {
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        body.append(paragraph);
      }
      if (post.downloadUrl) {
        const download = document.createElement('a');
        download.className = 'btn btn-outline btn-sm';
        download.href = post.downloadUrl;
        download.textContent = localized(post.downloadLabel, language) || (language === 'tr' ? 'İndir' : 'Download');
        body.append(download);
      }
      details.append(summary, body);
      details.addEventListener('toggle', () => {
        summary.textContent = details.open ? labels.readLess : labels.readMore;
      });
      article.append(details);
      }
    }

    blogList.append(article);
  }
}

renderBlog();
document.addEventListener('site-language-change', renderBlog);
