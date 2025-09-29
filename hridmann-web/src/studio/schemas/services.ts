// schemas/service.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "icon", type: "string", title: "Icon (Bootstrap class or name)" }),
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "description", type: "text", title: "Short description" }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroImage",
      type: "image",
      title: "Hero Image",
      options: { hotspot: true },
    }),

    defineField({
      name: "body",
      title: "Detailed content",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),

    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),

    { name: "badge", type: "string", title: "Badge (e.g., Workshop)" },

    {
      name: "outcomes",
      type: "array",
      title: "What you’ll get",
      of: [{ type: "string" }],
    },

    {
      name: "agenda",
      type: "array",
      title: "Agenda",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "duration", type: "string", title: "Duration (e.g., 30m)" },
          ],
          preview: {
            select: { title: "title", subtitle: "duration" },
          },
        },
      ],
    },

    {
      name: "quickFacts",
      type: "array",
      title: "Quick facts",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
        },
      ],
    },

    {
      name: "related",
      type: "array",
      title: "Related services",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    },

    defineField({
      name: "subServices",
      title: "Sub Services (Workshops)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() },

            // ✅ slug for sub-service, TS-safe parent typing, robust slugify
            {
              name: "slug",
              type: "slug",
              title: "Slug",
              options: {
                // TS-safe: parent may or may not have title
                source: (_doc: unknown, { parent }: { parent?: { title?: string } }) => parent?.title || "",
                slugify: (input: string) =>
                  (input || "")
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, "-")        // spaces → dashes
                    .replace(/[^a-z0-9-]/g, "")  // strip non-url-safe
                    .replace(/-+/g, "-")         // collapse multiple dashes
                    .replace(/^-|-$/g, "")       // trim leading/trailing dash
                    .slice(0, 96),
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            },

            {
              name: "heroImage",
              type: "image",
              title: "Hero Image",
              options: { hotspot: true },
            },
            {
              name: "content",
              title: "Detailed Content",
              type: "array",
              of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
            },
            {
              name: "outcomes",
              type: "array",
              title: "What you’ll get",
              of: [{ type: "string" }],
            },
            {
              name: "agenda",
              type: "array",
              title: "Agenda",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", type: "string", title: "Title" },
                    { name: "duration", type: "string", title: "Duration (e.g., 30m)" },
                  ],
                  preview: { select: { title: "title", subtitle: "duration" } },
                },
              ],
            },
            {
              name: "quickFacts",
              type: "array",
              title: "Quick facts",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", type: "string", title: "Label" },
                    { name: "value", type: "string", title: "Value" },
                  ],
                  preview: { select: { title: "label", subtitle: "value" } },
                },
              ],
            },
          ],
          preview: {
            select: { title: "title", subtitle: "slug.current" },
          },
        },
      ],
    }),
  ],
});
