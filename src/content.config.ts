import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const log = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/log' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['공부', '성장', '성과']),
    summary: z.string(),
    // 로드맵 노드 id 연결 대상
    nodes: z.array(z.string()).default([]),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { log };
