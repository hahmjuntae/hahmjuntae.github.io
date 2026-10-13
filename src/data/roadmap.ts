export type Status = 'done' | 'doing' | 'gap' | 'skip';

export interface RoadmapNode {
  id: string;
  label: string;
  status: Status;
  note?: string;
  next?: string;
  phase?: 1 | 2 | 3;
}

export interface RoadmapSection {
  id: string;
  title: string;
  nodes: RoadmapNode[];
}

export const updatedAt = '2026-10-13';

export const statusMeta: Record<Status, { label: string; color: string }> = {
  done: { label: '완료', color: 'success' },
  doing: { label: '진행', color: 'info' },
  gap: { label: '공백', color: 'warning' },
  skip: { label: '건너뜀', color: 'secondary' },
};

export const phases = [
  { id: 1, title: '1단계', period: '2026-10 ~ 2027-03', goal: '평가 세트와 RAG 로 측정 수치가 붙은 사례를 만듦' },
  { id: 2, title: '2단계', period: '2027-04 ~ 2028-03', goal: '블로그와 공개 저장소로 밖에서 보이게 만듦' },
  { id: 3, title: '3단계', period: '2028-04 ~ 2029-10', goal: '국내 이직, 해외 원격, 사내 기술 오너 중 선택' },
] as const;

// 노드 이름은 roadmap.sh AI Engineer 로드맵 주제 기준
export const sections: RoadmapSection[] = [
  {
    id: 'llm-basics',
    title: 'LLM 기초',
    nodes: [
      { id: 'tokens', label: 'Tokens, Context Window', status: 'doing', next: '토크나이저 차이와 비용 계산을 정리합니다.', phase: 2 },
      { id: 'embeddings', label: 'Embeddings', status: 'gap', next: '문서 100건으로 임베딩 유사도 실험을 합니다.', phase: 1 },
      { id: 'sampling', label: 'Temperature, Top-p', status: 'gap', next: '같은 질문 20개로 파라미터별 결과를 비교합니다.', phase: 2 },
      { id: 'model-choice', label: 'Choosing the Right Model', status: 'done' },
    ],
  },
  {
    id: 'model-api',
    title: '모델 API',
    nodes: [
      { id: 'messages-api', label: 'Messages API', status: 'doing', next: 'SDK 로 직접 호출하는 작은 서비스를 만듭니다.', phase: 1 },
      { id: 'streaming', label: 'Streaming Responses', status: 'done' },
      { id: 'structured-output', label: 'Structured Output', status: 'gap', next: '문서 분류 결과를 JSON 스키마로 받는 실험을 합니다.', phase: 2 },
      { id: 'prompt-caching', label: 'Prompt Caching', status: 'gap', next: '긴 시스템 프롬프트로 캐시 전후 비용을 비교합니다.', phase: 2 },
    ],
  },
  {
    id: 'context',
    title: '프롬프트와 컨텍스트 엔지니어링',
    nodes: [
      { id: 'system-prompt', label: 'System Prompting', status: 'done' },
      { id: 'compaction', label: 'Context Compaction', status: 'done' },
      { id: 'isolation', label: 'Context Isolation', status: 'done' },
      { id: 'few-shot', label: 'Few-shot, CoT', status: 'doing', next: '평가 세트로 예시 유무의 차이를 측정합니다.', phase: 2 },
    ],
  },
  {
    id: 'agents',
    title: '에이전트',
    nodes: [
      { id: 'tool-calling', label: 'Tool Calling', status: 'done' },
      { id: 'multi-agents', label: 'Multi-agents', status: 'done' },
      { id: 'guardrails', label: 'Hooks, Guardrails', status: 'done' },
      { id: 'mcp-server', label: 'Building an MCP Server', status: 'gap', next: '문서 검색을 MCP 서버로 감쌉니다.', phase: 2 },
      { id: 'agent-sdk', label: 'Agent SDK', status: 'gap', next: '에이전트 하나를 SDK 기반 서비스로 만듭니다.', phase: 2 },
    ],
  },
  {
    id: 'rag',
    title: 'RAG',
    nodes: [
      { id: 'chunking', label: 'Chunking', status: 'gap', next: '청크 크기별 검색 결과를 비교합니다.', phase: 1 },
      { id: 'vector-db', label: 'Vector Databases', status: 'gap', next: 'pgvector 로 작은 검색 서비스를 만듭니다.', phase: 1 },
      { id: 'hybrid-search', label: 'Hybrid Search, Rerank', status: 'gap', next: '오픈소스 RAG 프로젝트의 하이브리드 검색과 리랭크 코드를 분석합니다.', phase: 1 },
      { id: 'feedback-loop', label: 'Retrieval Feedback', status: 'gap', next: '좋아요, 싫어요 기록으로 실패 질문 목록을 만듭니다.', phase: 1 },
    ],
  },
  {
    id: 'evals',
    title: 'Evals',
    nodes: [
      { id: 'deterministic-evals', label: 'Deterministic Evals', status: 'doing', next: '답변 형식 검사를 평가 세트에 넣습니다.', phase: 1 },
      { id: 'error-analysis', label: 'Error Analysis', status: 'gap', next: '사용자 질문 100건의 실패 원인을 분류합니다.', phase: 1 },
      { id: 'llm-judge', label: 'Model-based Evals', status: 'gap', next: '채점기 결과를 사람 라벨과 비교해 TPR, TNR 을 냅니다.', phase: 1 },
      { id: 'regression', label: 'Regression Testing', status: 'gap', next: '평가 세트를 CI 에서 돌립니다.', phase: 2 },
    ],
  },
  {
    id: 'ops',
    title: '관측성과 운영',
    nodes: [
      { id: 'tracing', label: 'Tracing, Logging', status: 'doing', next: '서비스 요청 단위 트레이스를 붙입니다.', phase: 2 },
      { id: 'cost-latency', label: 'Cost, Latency Monitoring', status: 'doing', next: '요청당 비용과 지연을 대시보드로 봅니다.', phase: 2 },
      { id: 'production-monitoring', label: 'Production Monitoring', status: 'gap', next: '운영 중인 검색 서비스의 품질 지표를 정합니다.', phase: 2 },
    ],
  },
  {
    id: 'backend',
    title: '백엔드 기본기',
    nodes: [
      { id: 'python', label: 'Python', status: 'gap', next: '평가 스크립트를 Python 으로 씁니다.', phase: 1 },
      { id: 'fastapi', label: 'FastAPI, Async', status: 'gap', next: '검색 API 를 FastAPI 로 만듭니다.', phase: 2 },
      { id: 'docker-ci', label: 'Docker, CI/CD', status: 'doing', next: '평가 서비스를 컨테이너로 배포합니다.', phase: 2 },
    ],
  },
  {
    id: 'security',
    title: '보안',
    nodes: [
      { id: 'prompt-injection', label: 'Prompt Injection', status: 'gap', next: '챗봇에 주입 공격 20건을 시험합니다.', phase: 2 },
      { id: 'secrets', label: 'Data, Secrets Handling', status: 'doing', next: '문서 등급별 접근 규칙을 정리합니다.', phase: 2 },
    ],
  },
  {
    id: 'skip',
    title: '건너뛰는 영역',
    nodes: [
      { id: 'fine-tuning', label: 'Fine-tuning', status: 'skip', note: '국내 AI 엔지니어 공고 4건 모두 필수 요건이 아닙니다.' },
      { id: 'training', label: 'Model Training', status: 'skip', note: '모델 연구직의 영역입니다.' },
      { id: 'self-hosted', label: 'Self-hosted Models', status: 'skip', note: 'API 기반 애플리케이션 계층에 집중합니다.' },
    ],
  },
];

export function countByStatus() {
  const counts: Record<Status, number> = { done: 0, doing: 0, gap: 0, skip: 0 };
  for (const section of sections) for (const node of section.nodes) counts[node.status] += 1;
  return counts;
}
