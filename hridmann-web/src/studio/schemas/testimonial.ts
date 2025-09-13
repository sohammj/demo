import { defineType, defineField } from 'sanity'
export default defineType({
name: 'testimonial',
title: 'Testimonial',
type: 'document',
fields: [
defineField({ name: 'name', type: 'string', title: 'Name' }),
defineField({ name: 'role', type: 'string', title: 'Role/Company' }),
defineField({ name: 'message', type: 'text', title: 'Message' }),
defineField({ name: 'photo', type: 'image', title: 'Photo', options: { hotspot: true } }),
],
})