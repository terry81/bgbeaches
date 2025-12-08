const fs = require('fs');
const path = require('path');

module.exports = function() {
  const locationsData = require('./locations.json');
  const enrichedData = { bg: [], en: [] };

  // Path to albums folder (root level, before copying to src)
  const albumsPath = path.join(__dirname, '../../albums');

  for (const locale of ['bg', 'en']) {
    for (const location of locationsData[locale]) {
      const locationSlug = location.slug;
      const locationAlbumPath = path.join(albumsPath, locationSlug);

      let firstPhotoThumb = null;

      // Try to find first actual thumbnail file in albums folder
      if (fs.existsSync(locationAlbumPath)) {
        const files = fs.readdirSync(locationAlbumPath);
        // Find first thumbnail file (ends with _TN)
        const thumbnails = files.filter(f => f.endsWith('_TN')).sort();
        if (thumbnails.length > 0) {
          firstPhotoThumb = thumbnails[0];
        }
      }

      // Fallback: try to get from data file
      if (!firstPhotoThumb) {
        const dataPath = path.join(__dirname, locale, `${locationSlug}.json`);
        if (fs.existsSync(dataPath)) {
          const locationData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
          if (locationData.photos && locationData.photos.length > 0) {
            const firstPhoto = locationData.photos[0];
            firstPhotoThumb = firstPhoto.filename
              .replace(/\.(jpg|JPG|png|PNG)$/, '.$1_TN');
          }
        }
      }

      enrichedData[locale].push({
        ...location,
        thumbnail: firstPhotoThumb || 'us.JPG_TN'
      });
    }
  }

  return enrichedData;
};

