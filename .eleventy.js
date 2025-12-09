module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy({
    "css": "css",
    "src/albums": "albums",
    "scripts": "scripts",
    "ads.txt": "ads.txt",
    "robots.txt": "robots.txt",
    "CNAME": "CNAME"
  });

  // Provide a noop translation filter `t` so existing templates render
  eleventyConfig.addNunjucksFilter("t", function(str) {
    return str;
  });

  // Filter to convert **text** to <strong>text</strong>
  eleventyConfig.addNunjucksFilter("markdownBold", function(str) {
    if (!str) return str;
    // Replace **text** with <strong>text</strong>
    return str.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
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
