import { defineType, defineField } from 'sanity'
export default defineType({
name: 'service',
title: 'Service',
type: 'document',
fields: [
defineField({ name: 'icon', type: 'string', title: 'Icon (Bootstrap class or name)' }),
defineField({ name: 'title', type: 'string', title: 'Title' }),
defineField({ name: 'description', type: 'text', title: 'Description' }),
defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
],
})