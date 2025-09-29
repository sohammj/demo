// // import { defineType, defineField } from 'sanity'
// // export default defineType({
// // name: 'service',
// // title: 'Service',
// // type: 'document',
// // fields: [
// // defineField({ name: 'icon', type: 'string', title: 'Icon (Bootstrap class or name)' }),
// // defineField({ name: 'title', type: 'string', title: 'Title' }),
// // defineField({ name: 'description', type: 'text', title: 'Description' }),
// // defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
// // ],
// // })



// import { defineType, defineField } from 'sanity'

// export default defineType({
//   name: 'service',
//   title: 'Service',
//   type: 'document',
//   fields: [
//     defineField({ name: 'icon', type: 'string', title: 'Icon (Bootstrap class or name)' }),
//     defineField({ name: 'title', type: 'string', title: 'Title' }),
//     defineField({ name: 'description', type: 'text', title: 'Short description' }),
//     defineField({
//       name: 'slug',
//       type: 'slug',
//       title: 'Slug',
//       options: { source: 'title', maxLength: 96 },
//     }),

//     // NEW:
//     // defineField({
//     //   name: 'heroImage',
//     //   type: 'image',
//     //   title: 'Hero image',
//     //   options: { hotspot: true },
//     // }),
//     defineField({
//       name: 'body',
//       title: 'Detailed content',
//       type: 'array',
//       of: [
//         { type: 'block' },
//         { type: 'image', options: { hotspot: true } },
//       ],
//     }),
//     defineField({
//       name: 'gallery',
//       title: 'Gallery',
//       type: 'array',
//       of: [{ type: 'image', options: { hotspot: true } }],
//     }),

//     // fields: [
//     { name: 'badge', type: 'string', title: 'Badge (e.g., Workshop)' },
//     { name: 'heroImage', type: 'image', title: 'Hero Image', options: { hotspot: true } },
//     {
//       name: 'outcomes',
//       type: 'array',
//       title: 'What you’ll get',
//       of: [{ type: 'string' }],
//     },
//     {
//       name: 'agenda',
//       type: 'array',
//       title: 'Agenda',
//       of: [{
//         type: 'object',
//         fields: [
//           { name: 'title', type: 'string', title: 'Title' },
//           { name: 'duration', type: 'string', title: 'Duration (e.g., 30m)' },
//         ],
//         preview: {
//           select: { title: 'title', duration: 'duration' },
//           prepare: ({ title, duration }) => ({ title, subtitle: duration }),
//         },
//       }],
//     },
//     {
//       name: 'quickFacts',
//       type: 'array',
//       title: 'Quick facts',
//       of: [{
//         type: 'object',
//         fields: [
//           { name: 'label', type: 'string', title: 'Label' },
//           { name: 'value', type: 'string', title: 'Value' },
//         ],
//         preview: {
//           select: { title: 'label', subtitle: 'value' },
//         },
//       }],
//     },
//     {
//       name: 'related',
//       type: 'array',
//       title: 'Related services',
//       of: [{ type: 'reference', to: [{ type: 'service' }] }],
//     },
//     // ]

//   ],

// })
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
            { name: "title", type: "string", title: "Title" },
            {
              name: "slug",
              type: "slug",
              title: "Slug",
              options: {
                source: (doc, { parent }) => parent?.title, // 👈 this ensures slug is based on sub-service title
                maxLength: 96,},
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
