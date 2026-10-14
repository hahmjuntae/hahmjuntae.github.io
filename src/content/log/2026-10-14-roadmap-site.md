---
title: 학습 로드맵 사이트 구축
date: 2026-10-14
type: 성과
summary: Front-end 부터 Applied AI Engineer 까지 노드 158개의 학습 로드맵을 만들어 배포했습니다.
nodes: [ssg, playwright, ci-cd]
metrics:
  - label: 노드
    value: 158개
  - label: 참고 로드맵
    value: roadmap.sh 32개
  - label: 반영한 교육 과정
    value: 13곳
  - label: 자동 검사
    value: 53항목
---

## 목표

학습 순서와 진행 상태를 한 화면에서 보고, 노드마다 다음 할 일과 무료 강의를 바로 찾습니다.

## 한 일

| 항목 | 내용 |
|---|---|
| 구성 | Front-end, Back-end, AI Engineering 3파트, 섹션 32개, 노드 158개 |
| 콘텐츠 | 노드마다 목표, 할 일, 무료 강의. 강의 URL 403개 모두 200 응답 |
| 동향 | LLM, AI 엔지니어 교육 과정 13곳의 커리큘럼을 노드 단위로 집계 |
| 저장 | 진행 상태를 브라우저에 저장하고 GitHub 저장소에 커밋 |
| 검증 | Chrome 자동 검사 53항목(390px, 1280px, 라이트, 다크) |

## 결과

로드맵을 https://hahmjuntae.github.io 에 배포했습니다. 노드를 누르면 상태를 바꿀 수 있고, 바꾼 상태는 저장소 커밋으로 남습니다.

## 다음

Python Basics 노드부터 진행하고, 끝낸 노드마다 이 기록에 결과를 남깁니다.
