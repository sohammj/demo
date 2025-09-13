import { defineType, defineField } from 'sanity'


export default defineType({
name: 'home',
title: 'Home Page',
type: 'document',
fields: [
defineField({ name: 'heroTitle', type: 'string', title: 'Hero Title' }),
defineField({ name: 'heroSubtitle', type: 'text', title: 'Hero Subtitle' }),
defineField({ name: 'portrait', type: 'image', title: 'Hero Portrait', options: { hotspot: true } }),
defineField({ name: 'aboutTitle', type: 'string', title: 'About Title', initialValue: 'About the Founder' }),
defineField({ name: 'aboutBody', type: 'array', title: 'About Body', of: [{ type: 'block' }] }),
],
})