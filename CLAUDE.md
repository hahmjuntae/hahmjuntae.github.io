# hahmjuntae.github.io

Front-end 에서 시작해 Applied AI Engineer 로 끝나는 학습 로드맵 사이트입니다. Astro 7 정적 페이지 하나이고 GitHub Pages(`https://hahmjuntae.github.io`)로 배포합니다.

## 구조

| 경로 | 내용 |
|---|---|
| `src/data/skeleton.json` | 파트(시간 배분 `hours`), 섹션(`branch: true` 는 직전 척추 섹션의 곁가지), 노드 id, 라벨, 기본 상태(`pending` `learning` `done` `skip`), 섹션별 참고 roadmap.sh 로드맵 id |
| `src/data/content/*.json` | 노드별 `goal` `todo` `resources`. `fe` `be` `ai` 파트별 파일, `extra` `future` `trend` 는 추가 노드 |
| `src/data/bootcamps.json`, `src/data/trends.json` | 교육 과정 13곳의 커리큘럼 매핑과 노드별 과정 수, 도구 빈도. 노드 옆 숫자와 모달 동향의 원천 |
| `src/data/roadmap.ts` | 뼈대와 콘텐츠 병합. 콘텐츠가 빠진 노드가 있으면 빌드 실패 |
| `src/pages/index.astro` | 노드 맵(1024px 이상 가운데 척추와 곁가지, 파트별 점선 경계 박스, SVG 연결선. 미만은 세로 목록), 노드 상세 모달, 진행 상태 버튼, 진행률. 진행 상태는 `localStorage` 의 `roadmap-progress-v1` |
| `public/ds/` | `~/.claude/design-system` 사본. `npm run ds:sync` 로 갱신 |
| `scripts/verify.mjs` | Chrome 으로 390px, 1280px, 라이트, 다크, 모달, 상태 저장 검사. `.verify/` 에 스크린샷 |

## 작업

| 요청 | 할 일 |
|---|---|
| 노드 추가 | `skeleton.json` 에 노드 추가, 같은 id 로 `content/*.json` 에 콘텐츠 추가 |
| 기본 상태 변경 | `skeleton.json` 의 세 번째 값 수정. 방문자 브라우저의 진행 기록은 `localStorage` 의 `roadmap-progress-v1` |
| 무료 강의 교체 | URL 을 바꾼 뒤 200 응답 확인 |

## 규칙

- 디자인은 `ds.css`, `ds-pages.css` 토큰과 클래스만 씁니다. 페이지 전용 스타일도 토큰으로만 값을 지정합니다.
- 맵 라벨(파트, 섹션, 노드)은 영어로 씁니다. 모달 문구는 한국어이고 `~/.claude/DOC-STYLE.md` 를 따릅니다. 개인 이력(경력, 회사, 사내 업무)은 쓰지 않습니다.
- roadmap.sh 콘텐츠(설명, 자료 목록, 그림)는 라이선스상 재게시할 수 없습니다. 주제 구성만 참고하고 roadmap.sh 는 링크로만 연결합니다.
- 무료 강의는 무료 자료만 넣고 한국어 자료를 우선합니다.

## 완료 기준

1. `npm run check` 전 항목 PASS
2. `.verify/*.png` 육안 확인
3. `main` 푸시 후 Actions 의 Deploy to GitHub Pages 성공, `https://hahmjuntae.github.io` 200
4. 운영 검사 `VERIFY_BASE=https://hahmjuntae.github.io node scripts/verify.mjs` 전 항목 PASS
