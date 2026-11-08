const searchInput = document.querySelector('#docs-search');
const searchResults = document.querySelector('#docs-search-results');
const searchableSections = [...document.querySelectorAll('.docs-section[data-title]')];
const sidebar = document.querySelector('#docs-sidebar');
const mobileToggle = document.querySelector('.docs-mobile-toggle');
const navLinks = [...document.querySelectorAll('.docs-nav-link')];
const breadcrumbGroup = document.querySelector('#docs-breadcrumb-group');
const breadcrumbCurrent = document.querySelector('#docs-breadcrumb-current');

function setCurrentSection(section) {
  if (!section) return;
  const activeId = `#${section.id}`;
  for (const link of navLinks) {
    const destination = new URL(link.href, location.href);
    const isActive = destination.pathname === location.pathname && destination.hash === activeId;
    link.classList.toggle('is-active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }

  // Show the current category and all of its sibling topics.
  for (const label of document.querySelectorAll('.docs-nav-label')) {
    const links = [];
    let item = label.nextElementSibling;
    while (item && !item.classList.contains('docs-nav-label')) {
      if (item.classList.contains('docs-nav-link')) links.push(item);
      item = item.nextElementSibling;
    }
    const isCurrentGroup = links.some((link) => link.classList.contains('is-active'));
    label.hidden = !isCurrentGroup;
    for (const link of links) link.hidden = !isCurrentGroup;
  }

  const group = section.dataset.group || 'Documentation';
  const groupStart = searchableSections.find((item) => item.dataset.group === group) || searchableSections[0];
  breadcrumbGroup.href = groupStart ? `#${groupStart.id}` : 'index.html';
  breadcrumbGroup.textContent = group;
  breadcrumbCurrent.textContent = section.dataset.title;
}

function closeSearch() {
  searchResults.hidden = true;
  searchResults.replaceChildren();
}

function updateSearch() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  searchResults.replaceChildren();
  if (!query) {
    closeSearch();
    return;
  }

  const language = document.documentElement.lang;
  const matches = (window.ZELIX_DOCS_INDEX || []).filter((entry) =>
    `${entry.title} ${entry[language] || entry.en}`.toLocaleLowerCase().includes(query)
  ).slice(0, 7);

  if (matches.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'docs-search-empty';
    emptyMessage.textContent = document.documentElement.lang === 'tr' ? 'Eşleşen dokümantasyon bulunamadı.' : 'No matching documentation found.';
    searchResults.append(emptyMessage);
  } else {
    for (const entry of matches) {
      const result = document.createElement('a');
      result.href = entry.url;
      result.setAttribute('role', 'option');
      result.textContent = entry.title;
      result.addEventListener('click', () => {
        closeSearch();
        searchInput.value = '';
        sidebar.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
      searchResults.append(result);
    }
  }

  searchResults.hidden = false;
}

searchInput.addEventListener('input', updateSearch);
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    searchInput.value = '';
    closeSearch();
    searchInput.blur();
  }
  if (event.key === 'Enter' && !searchResults.hidden) {
    searchResults.querySelector('a')?.click();
  }
});

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    searchInput.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.docs-search-wrap')) closeSearch();
});

mobileToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('is-open');
  mobileToggle.setAttribute('aria-expanded', String(isOpen));
});

for (const link of navLinks) {
  link.addEventListener('click', () => {
    sidebar.classList.remove('is-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
  });
}

const sectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    setCurrentSection(entry.target);
  }
}, { rootMargin: '-15% 0px -72% 0px' });

for (const section of searchableSections) sectionObserver.observe(section);

function syncSectionFromHash() {
  const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : (document.getElementById('overview') || searchableSections[0]);
  const section = target?.matches('.docs-section[data-title]') ? target : target?.closest('.docs-section[data-title]');
  if (section) setCurrentSection(section);
}

window.addEventListener('hashchange', syncSectionFromHash);
syncSectionFromHash();

document.addEventListener('site-language-change', () => {
  syncSectionFromHash();
  if (searchInput.value.trim()) updateSearch();
});

const imageViewer = document.createElement('dialog');
imageViewer.className = 'docs-image-viewer';
imageViewer.setAttribute('aria-label', 'Image preview');
imageViewer.innerHTML = '<button class="docs-image-viewer-close" type="button" aria-label="Close image preview">Close</button><figure><img alt=""><figcaption></figcaption></figure>';
document.body.append(imageViewer);

const viewerImage = imageViewer.querySelector('img');
const viewerCaption = imageViewer.querySelector('figcaption');
const closeViewerButton = imageViewer.querySelector('.docs-image-viewer-close');
let lastFocusedImage = null;

function openImageViewer(image) {
  lastFocusedImage = image;
  viewerImage.src = image.currentSrc || image.src;
  viewerImage.alt = image.alt;
  viewerCaption.textContent = image.closest('figure')?.querySelector('figcaption')?.textContent || image.alt;
  imageViewer.showModal();
  closeViewerButton.focus();
}

for (const image of document.querySelectorAll('.docs-content img')) {
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `View larger image: ${image.alt || 'documentation image'}`);
  image.addEventListener('click', () => openImageViewer(image));
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openImageViewer(image);
    }
  });
}

closeViewerButton.addEventListener('click', () => imageViewer.close());
imageViewer.addEventListener('click', (event) => {
  if (event.target === imageViewer) imageViewer.close();
});
imageViewer.addEventListener('close', () => {
  requestAnimationFrame(() => lastFocusedImage?.focus({ preventScroll: true }));
});
