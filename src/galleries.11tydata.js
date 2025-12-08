module.exports = {
  layout: "base.njk",

  eleventyComputed: {
    title: data => data.gallery?.title || "",
    locale: data => data.gallery?.locale || "en",
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

