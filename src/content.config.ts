import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const about = defineCollection({
  loader: glob({ pattern: 'about.md', base: './src/content' }),
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    photo: z.string(),
    emails: z.array(z.string()).default([]),
    scholar: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    cv: z.string().optional(),
    education: z.array(
      z.object({
        school: z.string(),
        degree: z.string(),
        note: z.string().optional(),
        place: z.string().optional(),
        years: z.string(),
      }),
    ),
  }),
});

const publications = defineCollection({
  loader: file('src/content/publications.yaml'),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    status: z.string().optional(),
    image: z.string().optional(),
    links: z
      .object({
        paper: z.string().optional(),
        pdf: z.string().optional(),
        project: z.string().optional(),
        code: z.string().optional(),
      })
      .default({}),
  }),
});

const activities = defineCollection({
  loader: file('src/content/activities.yaml'),
  schema: z.object({
    group: z.string(),
    title: z.string(),
    date: z.coerce.string(), // 写 2022 或 "Nov. 2022" 都可以
  }),
});

const projects = defineCollection({
  loader: file('src/content/projects.yaml'),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    cover: z.string(),
    images: z.array(z.string()),
    description: z.string().optional(),
  }),
});

export const collections = { about, publications, activities, projects };
