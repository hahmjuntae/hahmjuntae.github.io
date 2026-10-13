import skeleton from './skeleton.json';
import fe from './content/fe.json';
import be from './content/be.json';
import ai from './content/ai.json';
import extra from './content/extra.json';
import future from './content/future.json';

export type Status = 'pending' | 'learning' | 'done' | 'skip';

export interface Resource {
  title: string;
  url: string;
  lang: 'ko' | 'en';
  kind: string;
}

export interface NodeContent {
  goal: string;
  todo: string[];
  resources: Resource[];
}

export interface RoadmapRef {
  name: string;
  url: string;
}

export interface RoadmapNode extends NodeContent {
  id: string;
  label: string;
  status: Status;
}

export interface RoadmapSection {
  id: string;
  part: string;
  title: string;
  refs: RoadmapRef[];
  nodes: RoadmapNode[];
}

export const updatedAt = '2026-10-13';

export const statusMeta: Record<Status, { label: string; color: string }> = {
  pending: { label: '미시작', color: 'secondary' },
  learning: { label: '진행', color: 'info' },
  done: { label: '완료', color: 'success' },
  skip: { label: '건너뜀', color: 'secondary' },
};

// roadmap.sh 로드맵 이름 표기 기준
const roadmapNames: Record<string, string> = {
  frontend: 'Frontend', html: 'HTML', css: 'CSS', javascript: 'JavaScript', 'git-github': 'Git and GitHub',
  react: 'React', vue: 'Vue', typescript: 'TypeScript', nextjs: 'Next.js', python: 'Python', backend: 'Backend',
  sql: 'SQL', 'postgresql-dba': 'PostgreSQL', 'api-design': 'API Design', 'cyber-security': 'Cyber Security',
  redis: 'Redis', qa: 'QA', devops: 'DevOps', docker: 'Docker', linux: 'Linux', 'system-design': 'System Design',
  'software-design-architecture': 'Software Design and Architecture',
  'datastructures-and-algorithms': 'Data Structures and Algorithms', 'computer-science': 'Computer Science',
  'ai-engineer': 'AI Engineer', 'prompt-engineering': 'Prompt Engineering', 'ai-agents': 'AI Agents',
  'claude-code': 'Claude Code', mlops: 'MLOps', 'ai-red-teaming': 'AI Red Teaming', 'machine-learning': 'Machine Learning',
  'inference-engineering': 'Inference Engineering',
};

const content = { ...fe, ...be, ...ai, ...extra, ...future } as Record<string, NodeContent>;

function contentOf(id: string): NodeContent {
  const found = content[id];
  if (!found) throw new Error(`노드 콘텐츠 없음: ${id}`);
  return found;
}

function refOf(id: string): RoadmapRef {
  const name = roadmapNames[id];
  if (!name) throw new Error(`로드맵 이름 없음: ${id}`);
  return { name, url: `https://roadmap.sh/${id}` };
}

export const parts = skeleton.parts;

export const sections: RoadmapSection[] = skeleton.sections.map((section) => ({
  id: section.id,
  part: section.part,
  title: section.title,
  refs: section.refs.map(refOf),
  nodes: section.nodes.map(([id, label, status]) => ({ id, label, status: status as Status, ...contentOf(id) })),
}));

export const endNode: RoadmapNode & { refs: RoadmapRef[] } = {
  id: skeleton.end[0],
  label: skeleton.end[1],
  status: 'pending',
  refs: ['ai-engineer', 'ai-agents'].map(refOf),
  ...contentOf(skeleton.end[0]),
};

export const allRefs: RoadmapRef[] = [...new Set(skeleton.sections.flatMap((section) => section.refs))].map(refOf);
