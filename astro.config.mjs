import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';

// 넓은 표를 ds-table-wrapper 로 감싸 모바일 가로 스크롤 방지
function rehypeTableWrapper() {
  const wrap = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      if (child.type === 'element' && child.tagName === 'table') {
        return { type: 'element', tagName: 'div', properties: { className: ['ds-table-wrapper'] }, children: [child] };
      }
      wrap(child);
      return child;
    });
  };
  return (tree) => wrap(tree);
}

export default defineConfig({
  site: 'https://hahmjuntae.github.io',
  integrations: [sitemap()],
  markdown: {
    processor: unified({ rehypePlugins: [rehypeTableWrapper] }),
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
