module.exports = {
  layout: "base.njk",

  eleventyComputed: {
    title: data => data.pageData?.title || "",
    locale: data => data.pageData?.locale || "en"
  }
};

