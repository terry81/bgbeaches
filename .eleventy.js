module.exports = function(eleventyConfig) {
  // Safe HTML tag stripping: loops until no tags remain, preventing
  // incomplete multi-character sanitization (CodeQL js/incomplete-multi-character-sanitization).
  // A single-pass replace(/<[^>]*>/g, '') can be bypassed with nested input
  // like "<scr<script>ipt>" which yields "<script>" after one pass.
  function stripHtmlTags(html) {
    if (!html) return '';
    let result = String(html);
    const tagPattern = /<[^>]*>/g;
    let previous;
    do {
      previous = result;
      result = result.replace(tagPattern, '');
    } while (result !== previous);
    // Remove any remaining stray < or > characters
    return result.replace(/[<>]/g, '');
  }

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

  // Filter to safely strip HTML tags from content
  eleventyConfig.addFilter("stripHtml", function(content) {
    if (!content) return '';
    return stripHtmlTags(content).replace(/\s+/g, ' ').trim();
  });

  // Filter to count words in content after safely stripping HTML
  eleventyConfig.addFilter("wordCount", function(content) {
    if (!content) return 0;
    const text = stripHtmlTags(content).replace(/\s+/g, ' ').trim();
    return text ? text.split(' ').length : 0;
  });

  // Filter to estimate reading time after safely stripping HTML
  eleventyConfig.addFilter("readingTime", function(content) {
    if (!content) return "1 min read";
    const text = stripHtmlTags(content).replace(/\s+/g, ' ').trim();
    const wordCount = text.split(' ').length;
    const readingTime = Math.ceil(wordCount / 200);
    return `${readingTime} min read`;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
    passthroughFileCopy: true
  };
};
