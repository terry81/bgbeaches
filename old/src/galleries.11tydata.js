module.exports = {
  layout: "base.njk",

  eleventyComputed: {
    title: data => data.gallery?.title || "",
    locale: data => data.gallery?.locale || "en"
  }
};

