import os
import re
import base64
import markdown

def convert_md_to_styled_html():
    with open('cheerio_product_assignment.md', 'r', encoding='utf-8') as f:
        md_text = f.read()

    html_content = markdown.markdown(md_text, extensions=['tables', 'fenced_code'])

    # Inline all images as base64 data URIs so HTML & PDF are 100% self-contained
    def replace_img(match):
        src = match.group(1)
        # Search in screenshots or root
        candidates = [
            src,
            os.path.join(os.getcwd(), src),
            os.path.join(os.getcwd(), 'public', src),
            os.path.join(os.getcwd(), 'screenshots', os.path.basename(src))
        ]
        for c in candidates:
            if os.path.exists(c):
                with open(c, 'rb') as img_f:
                    b64 = base64.b64encode(img_f.read()).decode('utf-8')
                ext = os.path.splitext(c)[1].lower().replace('.', '')
                mime = 'image/png' if ext == 'png' else ('image/jpeg' if ext in ['jpg', 'jpeg'] else 'image/webp')
                return f'src="data:{mime};base64,{b64}"'
        return match.group(0)

    html_content = re.sub(r'src="([^"]+\.(?:png|jpg|jpeg|webp))"', replace_img, html_content)

    styled_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ASSIGNMENT: Make customer support scale for non-technical users - Ganesh Gouli</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
    
    body {{
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background: #f8fafc;
      margin: 0;
      padding: 40px 20px;
    }}
    .container {{
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
      padding: 60px 80px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      border: 1px solid #e2e8f0;
    }}
    h1 {{
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin-top: 0;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 16px;
    }}
    h2 {{
      font-size: 19px;
      font-weight: 700;
      color: #1e1b4b;
      margin-top: 36px;
      margin-bottom: 14px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 8px;
    }}
    h3 {{
      font-size: 15px;
      font-weight: 700;
      color: #334155;
      margin-top: 24px;
      margin-bottom: 10px;
    }}
    h4 {{
      font-size: 13.5px;
      font-weight: 700;
      color: #475569;
      margin-top: 20px;
      margin-bottom: 6px;
    }}
    p, li {{
      font-size: 13.5px;
      color: #334155;
    }}
    blockquote {{
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
      margin: 16px 0;
      padding: 12px 18px;
      border-radius: 0 8px 8px 0;
      color: #1e40af;
      font-size: 13px;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 12.5px;
    }}
    th, td {{
      padding: 10px 12px;
      border: 1px solid #e2e8f0;
      text-align: left;
    }}
    th {{
      background: #f1f5f9;
      color: #1e293b;
      font-weight: 600;
    }}
    tr:nth-child(even) {{
      background: #f8fafc;
    }}
    code {{
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      color: #0f172a;
    }}
    pre {{
      background: #0f172a;
      color: #f8fafc;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      font-size: 12px;
    }}
    pre code {{
      background: transparent;
      color: #f8fafc;
      padding: 0;
    }}
    a {{
      color: #4f46e5;
      text-decoration: underline;
      font-weight: 500;
    }}
    a:hover {{
      color: #3730a3;
    }}
    hr {{
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 32px 0;
    }}
    img {{
      max-width: 100%;
      height: auto;
      border-radius: 10px;
      border: 1px solid #cbd5e1;
      box-shadow: 0 4px 16px rgba(0,0,0,0.06);
      margin: 14px 0 6px 0;
      display: block;
    }}
    p > em {{
      font-size: 11.5px;
      color: #64748b;
      display: block;
      margin-top: 4px;
      margin-bottom: 24px;
      line-height: 1.4;
    }}
    
    @media print {{
      body {{
        background: #ffffff;
        padding: 0;
      }}
      .container {{
        box-shadow: none;
        border: none;
        padding: 0;
        max-width: 100%;
      }}
      h1, h2 {{
        page-break-before: auto;
      }}
      h3, h4 {{
        page-break-after: avoid;
      }}
      table, pre, blockquote, img {{
        page-break-inside: avoid;
      }}
      p > em {{
        page-break-before: avoid;
      }}
    }}
  </style>
</head>
<body>
  <div class="container">
    {html_content}
  </div>
</body>
</html>
"""
    with open('cheerio_product_assignment.html', 'w', encoding='utf-8') as f:
        f.write(styled_html)
    print("Successfully created cheerio_product_assignment.html with embedded base64 images")

if __name__ == '__main__':
    convert_md_to_styled_html()
