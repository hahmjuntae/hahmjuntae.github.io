# hahmjuntae.github.io

Applied AI Engineer 전환 과정을 기록하는 개인 블로그입니다. Astro 7 정적 사이트이고 GitHub Pages(`https://hahmjuntae.github.io`)로 배포합니다.

## 구조

| 경로 | 내용 |
|---|---|
| `src/content/posts/*.md` | 글. frontmatter 는 `title` `description` `date` `topic` `nodes` `draft` |
| `src/data/roadmap.ts` | 로드맵 노드와 상태(`done` `doing` `gap` `skip`), 근거, 다음 할 일, 단계 |
| `src/pages/roadmap.astro` | roadmap.sh 형식 노드 맵과 노드 상세 모달 |
| `src/layouts/Base.astro` | 헤더, 테마 초기화, 테마 토글 |
| `public/ds/` | `~/.claude/design-system` 사본. `npm run ds:sync` 로 갱신 |
| `scripts/verify.mjs` | Chrome 으로 390px, 1280px, 라이트, 다크 검사. `.verify/` 에 스크린샷 |

## 작업

| 요청 | 할 일 |
|---|---|
| 새 글 | `src/content/posts/<slug>.md` 추가. 다룬 로드맵 노드 id 를 `nodes` 에 넣음 |
| 노드 완료 | `src/data/roadmap.ts` 의 `status` 와 `evidence` 수정, `updatedAt` 갱신 |
| 디자인 갱신 | `npm run ds:sync` 후 `npm run check` |

## 규칙

- 디자인은 `ds.css`, `ds-pages.css` 토큰과 클래스만 씁니다. 페이지 전용 스타일도 토큰으로만 값을 지정합니다.
- 글 문체는 `~/.claude/DOC-STYLE.md` 를 따릅니다.
- 회사 이름, 사내 저장소 이름, 사내 수치는 글에 쓰지 않습니다. 사내 사례는 회사 승인 후 일반화해서 씁니다.

## 완료 기준

1. `npm run check` 전 항목 PASS
2. `.verify/*.png` 육안 확인
3. `main` 푸시 후 Actions 의 Deploy to GitHub Pages 성공, `https://hahmjuntae.github.io` 200
