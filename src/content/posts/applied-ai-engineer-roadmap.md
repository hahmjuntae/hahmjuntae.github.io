---
title: Applied AI Engineer 3년 로드맵
description: 2029-10까지 Applied AI Engineer 로 전환합니다. 근거는 2025~2026 국내외 채용 데이터입니다.
date: 2026-10-13
topic: 커리어
nodes: []
---

## 목표

2029-10까지 Applied AI Engineer 직함을 얻습니다. Applied AI Engineer 는 외부에서 학습한 모델을 제품에 붙이고, 평가하고, 운영하는 직무입니다. 모델 학습과 서빙 인프라는 ML Engineer 의 영역입니다.

| 결과 | 기준 |
|---|---|
| 국내 이직 | AI 엔지니어 직함, 연봉 6,000만원 이상(ML 엔지니어 5년차 중위값) |
| 해외 원격 | 원격 근무 오퍼 1건 |
| 사내 기술 오너 | 사내 AI 시스템의 기술 책임 |

세 결과는 같은 증거로 채웁니다. 증거는 측정 수치가 붙은 AI 기능 사례 2~3개입니다.

## 시장 근거

| 지표 | 값 | 출처 |
|---|---|---|
| AI 전문 직무 공고 | 전년 대비 +128%, 경력직 +140% | 잡코리아, 2026 상반기 |
| AI 외 개발자 공고 | 전년 대비 -6.6%, 웹퍼블리셔 -40.1%, 앱 -32.2% | 잡코리아, 2026 상반기 |
| SI, 프로그래밍업 청년 고용 | -16.6%(2022-06~2026-06) | 한국은행 |
| 3년차 중위연봉 | ML 엔지니어 4,577만원, 프론트엔드 3,558만원 | 잡플래닛, 2025 |
| 5년차 중위연봉 | ML 엔지니어 6,000만원, 프론트엔드 4,380만원 | 잡플래닛, 2025 |
| 미국 소프트웨어 공고 구성 | 시니어 69.3%, 신입 4.5%(2026 1분기) | Indeed Hiring Lab |
| 미국 직함별 공고 | 프론트엔드 감소 폭 최대, ML 엔지니어 +40%(2025) | Bloomberry |

프론트엔드 단독 직무는 공고가 줄고, AI 직무는 공고가 늘고 있습니다. LLM 애플리케이션 엔지니어만 따로 집계한 국내 연봉은 미확인입니다.

## 직무 선택

| 직무 | 판단 | 근거 |
|---|---|---|
| Applied AI Engineer | 선택 | 학습된 모델을 제품에 붙이고 평가하고 운영. 모델 학습 불필요 |
| Forward Deployed Engineer | 제외 | 고객 대면 업무 중심. Anthropic 공고 기준 고객 대면 경력 4년 이상, 출장 약 25% |
| AI 연구원 | 제외 | 모델 연구와 학습 중심, 박사 학위 요구가 일반적 |

## 강점과 공백

국내 AI 엔지니어 공고 4건과 미국 공고 통계의 공통 요구를 기준으로 판정합니다.

| 공통 요구 | 상태 | 공고 근거 |
|---|---|---|
| 에이전트, 도구 호출, MCP | 강점 | 국내 공고 4건 공통 |
| 프롬프트, 컨텍스트 엔지니어링 | 강점 | 미국 실무 사용률 80%(2026 설문) |
| LLM 서비스 프론트엔드 | 강점 | - |
| Python | 공백 | 미국 AI 엔지니어 공고의 62~71% |
| RAG(검색, 리랭크) | 공백 | 국내 공고 4건 공통 |
| Eval, 효과 측정 | 공백 | 2026 설문 기준 AI 스택 최대 난제 |
| 공개 결과물 | 공백 | - |

파인튜닝은 국내 공고 4건 모두 필수 요건이 아닙니다. 노드별 상태는 [로드맵](/roadmap/)에서 갱신합니다.

## 단계별 계획

### 1단계

기간은 2026-10~2027-03입니다. 측정 수치가 붙은 AI 기능 사례를 만듭니다.

1. AI 개발 도구의 도입 전후를 비교합니다. 사용자 수, 작업당 시간, 재작업률을 잽니다.
2. 문서 검색의 평가 세트 100문항을 Python 으로 만듭니다.
3. 검색 서비스(RAG) 코드에 기여를 1건 이상 넣습니다.
4. 측정 수치로 AI 시스템의 기술 오너 역할을 요청합니다.

평가 세트는 다음 절차를 따릅니다.

1. 실제 사용자 질문 100건의 실패 원인을 분류합니다.
2. 실패 유형의 우선순위를 정합니다.
3. LLM 채점기를 사람 라벨과 비교해 TPR, TNR 을 냅니다.

### 2단계

기간은 2027-04~2028-03입니다. 블로그와 공개 저장소로 결과물을 밖에서 보이게 만듭니다.

1. 에이전트 하네스를 일반화한 공개 저장소 1개를 냅니다.
2. 측정 결과 중심의 글 4편을 한국어와 영어로 씁니다.
3. 2027년 하반기에 면접 1~2건으로 시장 가격을 확인합니다.

### 3단계

기간은 2028-04~2029-10입니다. 2단계 결과로 국내 이직, 해외 원격, 사내 기술 오너 중 하나를 고릅니다.

## 시간 배분

업무 시간 안에서 1단계를 진행합니다. 개인 시간은 주 5시간입니다.

| 시간 | 내용 |
|---|---|
| 2시간 | 영어 기술 글 읽기와 쓰기 |
| 2시간 | 블로그 글, 공개 저장소 |
| 1시간 | Python, RAG 기본기 |

## 제외 항목

| 항목 | 이유 |
|---|---|
| 석사 | Applied AI Engineer 공고에서 필수 요건이 아님 |
| 파인튜닝, 모델 학습 | 국내 공고 필수 요건 0건, 2026 설문에서 사용 빈도 최하위 |
| 고객 대면 직무 | 직무 선호와 맞지 않음 |

## 출처

- 잡코리아 2026 상반기 AI 채용: [비즈워치, 2026-09-16](https://news.bizwatch.co.kr/article/industry/2026/09/16/0006)
- 직무별 중위연봉: [한국경제, 2025-06-19](https://www.hankyung.com/article/202506183688g)
- 청년 고용과 AI 노출 업종: [한국은행 이슈노트 보도, 2026-08-18](https://news.tf.co.kr/read/economy/2355127.htm)
- 미국 공고의 시니어 비중: [Indeed Hiring Lab, 2026-07-23](https://hiringlab.indeed.com/2026/07/23/the-labor-market-is-tilting-toward-seniority/)
- 직함별 공고 변화: [Bloomberry, 2025-11-03](https://bloomberry.com/blog/i-analyzed-180m-jobs-to-see-what-jobs-ai-is-actually-replacing-today/)
- AI 엔지니어 공고의 Python 비중: [Axial Search, 2026-07-21](https://axialsearch.com/insights/ai-engineering-jobs)
- Forward Deployed Engineer 공고: [Anthropic 채용 공고, 2026-08-13](https://jobs.accel.com/companies/anthropic/jobs/89778489-forward-deployed-engineer)
- 평가 세트 절차: [Lenny's Newsletter, 2025-09-09](https://www.lennysnewsletter.com/p/building-eval-systems-that-improve)
- AI 엔지니어링 스택: [The Pragmatic Engineer, 2025-05-20](https://newsletter.pragmaticengineer.com/p/the-ai-engineering-stack)
- 기법별 사용 빈도: [2026 AI Engineering Survey, 2026-06](https://www.notion.com/lp/ai-engineering-survey)
- AI 엔지니어와 AI 연구원 구분: [스파르타 브런치, 2026-05-26](https://brunch.co.kr/@sparta/107)
- 국내 공고: [현대오토에버](https://career.hyundai-autoever.com/ko/o/210269), [젠틀파이](https://www.wanted.co.kr/wd/361200), [삼양식품](https://linkareer.com/activity/288080), [지엠코퍼레이션](https://www.jobkorea.co.kr/Recruit/GI_Read/49542312)
