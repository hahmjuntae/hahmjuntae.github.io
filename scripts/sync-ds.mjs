import { cpSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

// 원본은 ~/.claude/design-system, 배포본은 public/ds 사본 기준
const src = join(homedir(), '.claude/design-system');
const dest = new URL('../public/ds/', import.meta.url).pathname;

mkdirSync(join(dest, 'fonts'), { recursive: true });
for (const file of ['ds.css', 'ds-pages.css']) cpSync(join(src, file), join(dest, file));
for (const file of ['PretendardVariable.woff2', 'JetBrainsMono-Variable.woff2', 'LICENSE-Pretendard.txt']) {
  cpSync(join(src, 'fonts', file), join(dest, 'fonts', file));
}
console.log(`synced ${src} → ${dest}`);
