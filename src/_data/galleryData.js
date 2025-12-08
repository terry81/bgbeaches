const fs = require('fs');
const path = require('path');

module.exports = function() {
  const galleries = [];
  const locales = ['bg', 'en'];
  const locationsData = require('./locations.json');

  for (const locale of locales) {
    const locations = locationsData[locale];

    for (const location of locations) {
      const locationSlug = location.slug;
      const dataPath = path.join(__dirname, locale, `${locationSlug}.json`);

      if (fs.existsSync(dataPath)) {
        const locationData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        galleries.push({
          locale,
          location: locationSlug,
          locationName: locationData.name,
          title: locationData.name,
          photos: locationData.photos || [],
          gallery_description: locationData.gallery_description || null,
          breadcrumbs: [
            {
              url: `/${locale}/`,
              title: locale === 'bg' ? 'Българските плажове' : 'Bulgarian Beaches'
            },
            {
              title: locationData.name
            }
          ]
        });
      }
    }
  }

  return galleries;
};

