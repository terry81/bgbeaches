module.exports = {
  layout: "base.njk",

  eleventyComputed: {
    title: data => data.pageData?.title || "",
    locale: data => data.pageData?.locale || "en",
    breadcrumbs: data => {
      if (!data.pageData?.breadcrumbs) return "";

      return data.pageData.breadcrumbs.map((crumb, index) => {
        const separator = index > 0 ? ' &raquo; ' : '';
        if (crumb.url) {
          return `${separator}<a href="${crumb.url}">${crumb.title}</a>`;
        }
        return `${separator}<span>${crumb.title}</span>`;
      }).join('\n  ');
    }
  }
};

