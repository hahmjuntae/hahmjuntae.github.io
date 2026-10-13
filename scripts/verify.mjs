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
// VERIFY_BASE 지정 시 운영 주소 검사, 미지정 시 dist 로컬 서버 기준
const remote = process.env.VERIFY_BASE;
if (!remote) await new Promise((resolve) => server.listen(4399, resolve));
const base = remote ?? 'http://localhost:4399';

await mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath: chrome });
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok, detail });
const isOpen = (page) => page.locator('#node-modal.is-open').count().then((n) => n === 1);

for (const theme of ['light', 'dark']) {
  for (const width of [390, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme });
    const page = await context.newPage();
    const errors = [];
    page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    const tag = `${theme} ${width}px`;
    const overflow = await page.evaluate(() => Math.max(document.body.scrollWidth - document.body.clientWidth, document.documentElement.scrollWidth - window.innerWidth));
    check(`가로 넘침 없음 ${tag}`, overflow <= 0, `${overflow}px`);
    check(`콘솔 오류 없음 ${tag}`, errors.length === 0, errors.join(' | '));
    check(`테마 적용 ${tag}`, (await page.evaluate(() => document.documentElement.dataset.theme)) === theme);
    const fontOk = await page.evaluate(async () => {
      await document.fonts.ready;
      return document.fonts.check('16px "Pretendard Variable"');
    });
    check(`Pretendard 로드 ${tag}`, fontOk);
    await page.locator('#python-basics').click();
    await page.waitForTimeout(700);
    await page.screenshot({ path: join(out, `modal-${theme}-${width}.png`) });
    const modalOverflow = await page.evaluate(() => {
      const panel = document.querySelector('#node-modal .ds-modal__panel');
      return panel.scrollWidth - panel.clientWidth;
    });
    check(`모달 가로 넘침 없음 ${tag}`, modalOverflow <= 0, `${modalOverflow}px`);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    // body 스크롤 컨테이너 구조라 전체 캡처 때만 문서 스크롤로 전환
    await page.addStyleTag({ content: 'html,body{height:auto!important;overflow:visible!important}' });
    await page.screenshot({ path: join(out, `roadmap-${theme}-${width}.png`), fullPage: true });
    await context.close();
  }
}

const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
await page.goto(base + '/', { waitUntil: 'networkidle' });
const nodeCount = await page.locator('.rm-node').count();
check('노드 렌더', nodeCount >= 120, `${nodeCount}개`);
check('파트 경계 박스 3개', (await page.locator('.rm-box').count()) === 3);
check('종착 노드', (await page.locator('.rm-end__node').count()) === 1);
const mapText = await page.evaluate(() => [...document.querySelectorAll('.rm-main, .rm-box__label, .rm-end__node, .rm-node__label')].map((el) => el.textContent).join(' '));
check('맵 라벨 영어', !/[가-힣]/.test(mapText));
check('상단 설명과 하단 영역 제거', (await page.locator('.ds-article__lead, .rm-foot, .site-footer, [data-reset-progress]').count()) === 0);
const solid = await page.locator('.rm-lines__solid').count();
const spineCount = await page.locator('[data-spine]').count();
const branchCount = await page.locator('[data-branch-to]').count();
check('척추와 곁가지 연결선', solid === spineCount - 1 + branchCount && branchCount >= 9, `실선 ${solid}, 척추 ${spineCount}, 곁가지 ${branchCount}`);
const bends = await page.evaluate(() => [...document.querySelectorAll('.rm-lines__solid')].filter((p) => /V.*H.*V/.test(p.getAttribute('d'))).length);
check('척추 일직선', bends === 0, `꺾임 ${bends}곳`);
check('하위 노드 점선', (await page.locator('.rm-lines__dotted').count()) > 50, `${await page.locator('.rm-lines__dotted').count()}개`);
const overlap = await page.evaluate(() => {
  const boxes = [...document.querySelectorAll('.rm-node, .rm-main, .rm-end__node')].map((el) => el.getBoundingClientRect());
  let hits = 0;
  for (let i = 0; i < boxes.length; i += 1) for (let j = i + 1; j < boxes.length; j += 1) {
    const a = boxes[i], b = boxes[j];
    if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) hits += 1;
  }
  return hits;
});
check('노드 겹침 없음', overlap === 0, `${overlap}건`);

const contentGaps = await page.evaluate(() => {
  const data = JSON.parse(document.getElementById('node-data').textContent);
  return Object.entries(data)
    .filter(([, n]) => !n.goal || n.goal.includes('작성 중') || n.todo.length < 1 || n.resources.length < 1)
    .map(([id]) => id);
});
check('노드 콘텐츠 채움', contentGaps.length === 0, `${contentGaps.length}개 미작성 ${contentGaps.slice(0, 6).join(', ')}`);

await page.locator('#fastapi').click();
await page.waitForTimeout(700);
check('노드 클릭 시 모달 열림', (await isOpen(page)) && (await page.locator('#node-modal-title').textContent()) === 'FastAPI');
const goalLength = (await page.locator('[data-modal-goal]').textContent()).length;
const todoCount = await page.locator('[data-modal-todo] li').count();
const resCount = await page.locator('[data-modal-res] a').count();
check('모달 목표, 할 일, 강의 표시', goalLength > 5 && todoCount >= 1 && resCount >= 1, `할 일 ${todoCount}, 강의 ${resCount}`);
check('모달 참고 로드맵 링크', (await page.locator('[data-modal-refs] a[href^="https://roadmap.sh/"]').count()) >= 1);
check('해시 갱신', page.url().endsWith('#fastapi'));
const trendText = (await page.locator('[data-modal-trend]').textContent()) ?? '';
check('모달 교육 과정 동향', trendText.includes('곳 중'), trendText);
check('노드 과정 수 표시', (await page.locator('.rm-node__trend').count()) >= 1, `${await page.locator('.rm-node__trend').count()}개`);

const doneBefore = Number(await page.locator('[data-progress-done]').textContent());
await page.locator('[data-set-status="done"]').click();
check('완료 버튼 반영', (await page.locator('#fastapi').getAttribute('data-status')) === 'done');
check('완료 수 증가', Number(await page.locator('[data-progress-done]').textContent()) === doneBefore + 1);
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(500);
check('새로고침 후 상태 유지', (await page.locator('#fastapi').getAttribute('data-status')) === 'done');
check('해시로 모달 다시 열림', await isOpen(page));
await page.locator('[data-set-status="done"]').click();
check('같은 버튼 재클릭 시 미시작', (await page.locator('#fastapi').getAttribute('data-status')) === 'pending');
await page.locator('[data-set-status="skip"]').click();
check('건너뜀 반영', (await page.locator('#fastapi').getAttribute('data-status')) === 'skip');
await page.keyboard.press('Escape');
await page.waitForTimeout(500);
check('Escape 로 모달 닫힘', !(await isOpen(page)));
await page.evaluate(() => localStorage.removeItem('roadmap-progress-v1'));
await page.reload({ waitUntil: 'networkidle' });
check('저장 기록 삭제 후 기본 상태', (await page.locator('#fastapi').getAttribute('data-status')) === 'pending');

await page.locator('.rm-end__node').click();
await page.waitForTimeout(700);
check('종착 노드 모달', (await isOpen(page)) && (await page.locator('[data-modal-status]').isHidden()));
await page.screenshot({ path: join(out, 'modal-end-1280.png') });
await page.keyboard.press('Escape');
await page.waitForTimeout(400);

const before = await page.evaluate(() => document.documentElement.dataset.theme);
await page.locator('[data-theme-toggle]').click();
check('테마 토글', before !== (await page.evaluate(() => document.documentElement.dataset.theme)));
const redirect = await page.goto(base + '/roadmap/');
check('/roadmap/ 리다이렉트 페이지', redirect?.status() === 200);
await context.close();

await browser.close();
if (!remote) server.close();

let failed = 0;
for (const { name, ok, detail } of results) {
  if (!ok) failed += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  ${detail}` : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} PASS`);
process.exit(failed ? 1 : 0);
