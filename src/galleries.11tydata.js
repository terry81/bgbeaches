module.exports = {
  layout: "base.njk",

  eleventyComputed: {
    title: data => data.gallery?.title || "",
    locale: data => data.gallery?.locale || "en",
    description: data => {
      if (!data.gallery) return "";
      const name = data.gallery.locationName || data.gallery.title;
      if (data.gallery.locale === 'bg') {
        return `${name} - Снимки и детайлна информация за плажа. Разгледайте фотогалерия и описания на българското Черноморие.`;
      }
      return `${name} - Photos and detailed information about this Bulgarian Black Sea beach. View photo gallery and comprehensive descriptions.`;
    },
    breadcrumbs: data => {
      if (!data.gallery?.breadcrumbs) return "";

      return data.gallery.breadcrumbs.map((crumb, index) => {
        const separator = index > 0 ? ' &raquo; ' : '';
        if (crumb.url) {
          return `${separator}<a href="${crumb.url}">${crumb.title}</a>`;
        }
        return `${separator}<span>${crumb.title}</span>`;
      }).join('\n  ');
    }
  }
};

