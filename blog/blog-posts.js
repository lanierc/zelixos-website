/*
 * ZelixOS blog content
 *
 * To publish a post, copy the example entry below and add it to this array.
 * Set a unique, URL-safe id and provide title, excerpt, and body in both
 * English and Turkish. Use YYYY-MM-DD for the date. Posts are shown newest first.
 * Set articleUrl to link the card to a dedicated full release/article page.
 */
window.ZELIXOS_BLOG_POSTS = [
  {
    id: 'zelixos-aurora-1-0-1',
    date: '2026-11-07',
    category: { en: 'Release notes', tr: 'Sürüm notları' },
    title: {
      en: 'ZelixOS Aurora 1.0.1 is here',
      tr: 'ZelixOS Aurora 1.0.1 yayınlandı'
    },
    excerpt: {
      en: 'Aurora 1.0.1 adds multi-desktop installation support, visual previews, desktop-specific themes, stronger installer checks, and better updater package information.',
      tr: 'Aurora 1.0.1 çoklu masaüstü kurulum desteği, görsel önizlemeler, masaüstüne özel temalar, güçlü kurulum kontrolleri ve gelişmiş güncelleyici paket bilgileri sunuyor.'
    },
    articleUrl: 'release-aurora-1-0-1.html',
    articleLabel: { en: 'Read full release notes', tr: 'Tüm sürüm notlarını oku' }
  },
  {
    id: 'zelixos-aurora-1-0-0',
    date: '2026-10-27',
    category: { en: 'Release notes', tr: 'Sürüm notları' },
    title: {
      en: 'ZelixOS Aurora 1.0.0 is here',
      tr: 'ZelixOS Aurora 1.0.0 yayınlandı'
    },
    excerpt: {
      en: 'The full Aurora 1.0.0 release refines the monochrome KDE desktop, updates Zelix Installer and Updater, and keeps the base image clean and lightweight.',
      tr: 'Aurora 1.0.0 tam sürümü tek renkli KDE masaüstünü geliştiriyor, Zelix Installer ve Updater araçlarını güncelliyor; temel kalıbı sade ve hafif tutuyor.'
    },
    articleUrl: 'release-aurora.html',
    articleLabel: { en: 'Read full release notes', tr: 'Tüm sürüm notlarını oku' }
  }
];
