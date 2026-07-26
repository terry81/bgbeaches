const siteUrl = 'https://bgbeaches.com';

module.exports = {
  url: siteUrl,
  name: 'Bulgarian Beaches',
  title: 'Bulgarian Beaches - Black Sea Coast Photo Guide',
  author: 'Bulgarian Beaches',
  description: {
    en: "Explore Bulgaria's Black Sea coast through an archive of 46 beach destinations, practical travel notes, and hundreds of authentic coastal photographs.",
    bg: 'Открийте българското Черноморие чрез архив от 46 плажни дестинации, практични бележки за пътуване и стотици автентични снимки.'
  },
  defaultImage: '/albums/Silistar/Beach.jpg',
  themeColor: '#0077b6',
  locales: {
    en: 'en_US',
    bg: 'bg_BG'
  },
  lastModified: process.env.SITE_LASTMOD || new Date().toISOString().slice(0, 10)
};

