import { defineCollection } from "astro/content/config";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { reference } from "astro:content";

const blogCollection = defineCollection({
    loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        image: image(),
        author: reference("author"),
        tags: z.array(z.string())
    })
});

const authorCollection = defineCollection({
    loader: glob({ pattern: "**/[^_]*.{yml}", base: "./src/content/author" }),
    schema: ({ image }) => z.object({
        name: z.string(),
        avatar: image(),
    })
});

export const collections = {
    "blog": blogCollection,
    "author": authorCollection
}