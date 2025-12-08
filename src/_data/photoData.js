const fs = require('fs');
const path = require('path');

module.exports = function() {
  const photos = [];
  const locales = ['bg', 'en'];
  const locationsData = require('./locations.json');

  for (const locale of locales) {
    const locations = locationsData[locale];

    for (const location of locations) {
      const locationSlug = location.slug;
      const dataPath = path.join(__dirname, locale, `${locationSlug}.json`);

      if (fs.existsSync(dataPath)) {
        const locationData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        const photoList = locationData.photos || [];

        photoList.forEach((photo, index) => {
          const previous = index > 0 ? photoList[index - 1] : null;
          const next = index < photoList.length - 1 ? photoList[index + 1] : null;

          photos.push({
            locale,
            location: locationSlug,
            locationName: locationData.name,
            title: photo.title,
            photo: {
              ...photo,
              previous: previous ? {
                url: `/${locale}/${locationSlug}/${previous.slug}.html`,
                title: previous.title
              } : null,
              next: next ? {
                url: `/${locale}/${locationSlug}/${next.slug}.html`,
                title: next.title
              } : null
            },
            breadcrumbs: [
              {
                url: `/${locale}/`,
                title: locale === 'bg' ? 'Българските плажове' : 'Bulgarian Beaches'
              },
              {
                url: `/${locale}/${locationSlug}/`,
                title: locationData.name
              },
              {
                title: photo.title
              }
            ]
          });
        });
      }
    }
  }

  return photos;
};

