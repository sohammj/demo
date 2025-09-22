import { defineType, defineField } from 'sanity'
export default defineType({
name: 'settings',
title: 'Site Settings',
type: 'document',
fields: [
defineField({ name: 'siteName', type: 'string', title: 'Site Name', initialValue: 'Hridmann' }),
defineField({ name: 'contactEmail', type: 'string', title: 'Contact Email' }),
defineField({ name: 'instagram', type: 'url', title: 'Instagram URL' }),
defineField({ name: 'footerNote', type: 'string', title: 'Footer Note' }),
defineField({
      name: 'logo',
      type: 'image',
      title: 'Site Logo',
      options: { hotspot: true },
    }),
],
})