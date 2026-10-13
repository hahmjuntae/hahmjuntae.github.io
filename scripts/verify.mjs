import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { chromium } from 'playwright-core';

const root = new URL('../dist/', import.meta.url).pathname;
const out = new URL('../.verify/', import.meta.url).pathname;
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml' };

const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  try {
    const body = await readFile(join(root, path));
    res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});
await new Promise((resolve) => server.listen(4399, resolve));
const base = 'http://localhost:4399';

await mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath: chrome });
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });

const pages = [
  { slug: 'home', path: '/' },
  { slug: 'post', path: '/posts/applied-ai-engineer-roadmap/' },
  { slug: 'roadmap', path: '/roadmap/' },
];

for (const theme of ['light', 'dark']) {
  for (const width of [390, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme });
    for (const { slug, path } of pages) {
      const page = await context.newPage();
      const errors = [];
      page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
      page.on('pageerror', (err) => errors.push(err.message));
      await page.goto(base + path, { waitUntil: 'networkidle' });
      const tag = `${slug} ${theme} ${width}px`;
      const overflow = await page.evaluate(() => Math.max(document.body.scrollWidth - document.body.clientWidth, document.documentElement.scrollWidth - window.innerWidth));
      check(`가로 넘침 없음 ${tag}`, overflow <= 0, `${overflow}px`);
      check(`콘솔 오류 없음 ${tag}`, errors.length === 0, errors.join(' | '));
      const appliedTheme = await page.evaluate(() => document.documentElement.dataset.theme);
      check(`테마 적용 ${tag}`, appliedTheme === theme, appliedTheme);
      const fontOk = await page.evaluate(async () => {
        await document.fonts.ready;
        return document.fonts.check('16px "Pretendard Variable"');
      });
      check(`Pretendard 로드 ${tag}`, fontOk);
      // body 스크롤 컨테이너 구조라 전체 캡처 때만 문서 스크롤로 전환
      await page.addStyleTag({ content: 'html,body{height:auto!important;overflow:visible!important}' });
      await page.screenshot({ path: join(out, `${slug}-${theme}-${width}.png`), fullPage: true });
      await page.close();
    }
    await context.close();
  }
}

const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
await page.goto(base + '/roadmap/', { waitUntil: 'networkidle' });
const nodeCount = await page.locator('.rm-node').count();
check('로드맵 노드 렌더', nodeCount >= 30, `${nodeCount}개`);
await page.locator('#python').click();
await page.waitForTimeout(700);
const title = await page.locator('#node-modal-title').textContent();
check('노드 클릭 시 모달 열림', (await page.locator('#node-modal.is-open').count()) === 1 && title === 'Python', title ?? '');
check('모달 열림 시 해시 갱신', page.url().endsWith('#python'), page.url());
await page.screenshot({ path: join(out, 'roadmap-modal-1280.png') });
await page.keyboard.press('Escape');
await page.waitForTimeout(500);
check('Escape 로 모달 닫힘', (await page.locator('#node-modal.is-open').count()) === 0);
await page.goto(base + '/roadmap/#hybrid-search', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
check('해시 딥링크로 모달 열림', (await page.locator('#node-modal-title').textContent()) === 'Hybrid Search, Rerank');
const toggle = page.locator('[data-theme-toggle]');
const before = await page.evaluate(() => document.documentElement.dataset.theme);
await page.keyboard.press('Escape');
await page.waitForTimeout(400);
await toggle.click();
const after = await page.evaluate(() => document.documentElement.dataset.theme);
check('테마 토글', before !== after, `${before} → ${after}`);
const rss = await page.goto(base + '/rss.xml');
check('RSS 응답', rss?.status() === 200);
await context.close();

await browser.close();
server.close();

let failed = 0;
for (const { name, ok, detail } of results) {
  if (!ok) failed += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  ${detail}` : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} PASS`);
process.exit(failed ? 1 : 0);
