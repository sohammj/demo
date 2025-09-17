// import { defineType, defineField } from 'sanity'
// export default defineType({
// name: 'service',
// title: 'Service',
// type: 'document',
// fields: [
// defineField({ name: 'icon', type: 'string', title: 'Icon (Bootstrap class or name)' }),
// defineField({ name: 'title', type: 'string', title: 'Title' }),
// defineField({ name: 'description', type: 'text', title: 'Description' }),
// defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
// ],
// })



import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'icon', type: 'string', title: 'Icon (Bootstrap class or name)' }),
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'description', type: 'text', title: 'Short description' }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
    }),

    // NEW:
    defineField({
      name: 'heroImage',
      type: 'image',
      title: 'Hero image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Detailed content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})
