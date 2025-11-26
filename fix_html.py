#!/usr/bin/env python3
"""
Script to fix HTML errors and optimize SEO for all HTML files in the project.
"""

import os
import re
from pathlib import Path

def fix_html_file(file_path):
    """Fix common HTML errors and improve SEO in a single file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # 1. Remove HTTrack meta tag that appears before <head>
        content = re.sub(
            r'<!-- Added by HTTrack --><meta http-equiv="content-type"[^>]*/><!-- /Added by HTTrack -->\s*',
            '',
            content
        )

        # 2. Remove IE CSS conditional comment referencing missing ie.css
        content = re.sub(
            r'<!--\[if lt IE 8\]>\s*<link rel="stylesheet"[^>]*href="[^"]*ie\.css"[^>]*>\s*<!\[endif\]-->\s*',
            '',
            content
        )

        # 3. Fix script tags with Cloudflare obfuscated type attributes
        content = re.sub(
            r'type="[a-f0-9]+-text/javascript"',
            'type="text/javascript"',
            content
        )

        # 4. Fix Facebook SDK to use HTTPS instead of HTTP
        content = content.replace(
            'js.src = "http://connect.facebook.net/',
            'js.src = "https://connect.facebook.net/'
        )

        # 5. Remove Cloudflare scripts at end of body with invalid attributes
        content = re.sub(
            r'<script data-cfasync="false"[^>]*></script><script[^>]*data-cf-settings[^>]*></script></body>',
            '</body>',
            content
        )

        # 6. Fix invalid HTML structure: <p align='left'><h1>...</h1></p>
        content = re.sub(
            r'<p align=["\']left["\']><h1>([^<]+)</h1></p>',
            r'<h1>\1</h1>',
            content
        )

        # 7. Fix invalid HTML structure: <p align='center'><h1>...</h1></p>
        content = re.sub(
            r'<p align=["\']center["\']><h1>([^<]+)</h1></p>',
            r'<h1 style="text-align: center;">\1</h1>',
            content
        )

        # 8. Add viewport meta tag if missing (only in head section)
        if '<meta name="viewport"' not in content and '<head>' in content:
            content = content.replace(
                '<meta name="language"',
                '<meta name="viewport" content="width=device-width, initial-scale=1" />\n<meta name="language"'
            )

        # 9. Fix email obfuscation in footer - replace with plain text
        content = re.sub(
            r'<a href="[^"]*cdn-cgi/l/email-protection\.html"[^>]*>\[email[^<]*protected\]</a>',
            'tollodim at gmail dot com',
            content
        )

        # 10. Update copyright year to 2025
        content = re.sub(
            r'Copyright &copy; (20\d{2})',
            r'Copyright &copy; 2025',
            content
        )
        content = re.sub(
            r'плажове (\d{4})\.',
            r'плажове &copy; 2025.',
            content
        )

        # 11. Fix duplicate alt attributes in img tags (e.g., alt="X" / alt="X")
        content = re.sub(
            r'(<img[^>]*)\s+alt="([^"]+)"\s*/\s*alt="[^"]+">',
            r'\1 alt="\2">',
            content
        )

        # 12. Add alt attributes to images that are missing them
        # Match img tags without alt attribute
        def add_alt_to_img(match):
            img_tag = match.group(0)
            if 'alt=' not in img_tag:
                # Extract src to create meaningful alt text
                src_match = re.search(r'src="([^"]+)"', img_tag)
                if src_match:
                    src = src_match.group(1)
                    # Create alt text from filename
                    filename = os.path.basename(src)
                    alt_text = filename.replace('_TN', '').replace('.jpg', '').replace('.JPG', '').replace('_', ' ').replace('-', ' ')
                    # Insert alt attribute before closing />
                    img_tag = img_tag.replace('/>', f' alt="{alt_text}" />')
                    img_tag = img_tag.replace('>', f' alt="{alt_text}">')
            return img_tag

        content = re.sub(r'<img[^>]*/?>', add_alt_to_img, content)

        # 13. Fix malformed meta description with &lt;/p&gt;
        content = re.sub(
            r'(<meta name="description" content="[^"]*?)&lt;/p&gt;',
            r'\1',
            content
        )

        # Only write if content changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Main function to process all HTML files."""
    base_dir = Path('/Users/i339389_1/git/sites/bgbeaches')

    # Find all HTML files
    html_files = list(base_dir.rglob('*.html'))

    print(f"Found {len(html_files)} HTML files to process...")

    fixed_count = 0
    for html_file in html_files:
        if fix_html_file(html_file):
            fixed_count += 1
            if fixed_count % 100 == 0:
                print(f"Processed {fixed_count} files...")

    print(f"\nCompleted! Fixed {fixed_count} out of {len(html_files)} HTML files.")

if __name__ == '__main__':
    main()

