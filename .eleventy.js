module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy({
    "css": "css",
    "src/albums": "albums",
    "scripts": "scripts",
    "ads.txt": "ads.txt",
    "robots.txt": "robots.txt",
    "sitemap.xml": "sitemap.xml",
    "CNAME": "CNAME"
  });

  // Provide a noop translation filter `t` so existing templates render
  eleventyConfig.addNunjucksFilter("t", function(str) {
    return str;
  });

  return {
    dir: {
      input: ".",
      includes: "src/_includes",
      data: "src/_data",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
    passthroughFileCopy: true
  };
};
