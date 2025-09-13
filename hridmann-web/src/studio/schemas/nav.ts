import { defineType, defineField } from 'sanity'
export default defineType({
name: 'nav',
title: 'Navigation',
type: 'document',
fields: [
defineField({ name: 'items', type: 'array', title: 'Items', of: [{
type: 'object',
fields: [
{ name: 'label', type: 'string', title: 'Label' },
{ name: 'href', type: 'string', title: 'Href' },
]
}] }),
],
})