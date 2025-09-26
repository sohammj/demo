import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    // Hero
    defineField({ name: 'heroTitle', type: 'string', title: 'Hero Title' }),
    defineField({ name: 'heroSubtitle', type: 'text', title: 'Hero Subtitle' }),
    defineField({
      name: 'portrait',
      type: 'image',
      title: 'Hero Portrait',
      options: { hotspot: true },
    }),

    // About
    defineField({
      name: 'aboutTitle',
      type: 'string',
      title: 'About Title',
      initialValue: 'About the Founder',
    }),
    defineField({
      name: 'aboutBody',
      type: 'array',
      title: 'About Body',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'focusAreas',
      type: 'array',
      title: 'Core Strengths',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'certifications',
      type: 'array',
      title: 'Certifications & Learning',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'aboutPortrait',
      type: 'image',
      title: 'About Section Portrait',
    }),

    // Hero Slides (Carousel)
    defineField({
      name: 'heroSlides',
      title: 'Hero Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', type: 'image', title: 'Image' },
            { name: 'title', type: 'string', title: 'Headline' },
            { name: 'subtitle', type: 'text', title: 'Subhead' },
            { name: 'ctaText', type: 'string', title: 'CTA Text' },
            { name: 'ctaHref', type: 'string', title: 'CTA Link' },
          ],
        },
      ],
    }),

    // ✅ Services Section
    defineField({
      name: 'servicesTitle',
      type: 'string',
      title: 'Services Title',
      initialValue: 'Services',
    }),
    defineField({
      name: 'servicesSubtitle',
      type: 'text',
      title: 'Services Subtitle',
      initialValue: 'Psychology-led programs tailored to people, culture, and performance.',
    }),

    // ✅ Testimonials Section
    defineField({
      name: 'testimonialsTitle',
      type: 'string',
      title: 'Testimonials Title',
      initialValue: 'Testimonials',
    }),
    defineField({
      name: 'testimonialsSubtitle',
      type: 'text',
      title: 'Testimonials Subtitle',
      initialValue: 'What leaders and learners say.',
    }),

    // ✅ Contact Section
    defineField({
      name: 'contactTitle',
      type: 'string',
      title: 'Contact Title',
      initialValue: 'Get in Touch',
    }),
    defineField({
      name: 'contactHelpText',
      type: 'text',
      title: 'Contact Help Text',
      initialValue: 'Prefer a quick call? Drop a message with your number and we’ll reach out.',
    }),
  ],
})


// import { defineType, defineField } from 'sanity'


// export default defineType({
// name: 'home',
// title: 'Home Page',
// type: 'document',
// fields: [
// defineField({ name: 'heroTitle', type: 'string', title: 'Hero Title' }),
// defineField({ name: 'heroSubtitle', type: 'text', title: 'Hero Subtitle' }),
// defineField({ name: 'portrait', type: 'image', title: 'Hero Portrait', options: { hotspot: true } }),
// defineField({ name: 'aboutTitle', type: 'string', title: 'About Title', initialValue: 'About the Founder' }),
// defineField({ name: 'aboutBody', type: 'array', title: 'About Body', of: [{ type: 'block' }] }),
// defineField({
//       name: 'focusAreas',
//       type: 'array',
//       title: 'Core Strengths',
//       of: [{ type: 'string' }],
//     }),
// defineField({
// name: 'certifications',
// type: 'array',
// title: 'Certifications & Learning',
// of: [{ type: 'string' }],
// }),

//  defineField({
//       name: 'aboutPortrait',
//       type: 'image',
//       title: 'About Section Portrait',   // 👈 new field
//     }),



//     // studio schema
// defineField({
//   name: 'heroSlides',
//   title: 'Hero Slides',
//   type: 'array',
//   of: [{
//     type: 'object',
//     fields: [
//       { name: 'image', type: 'image', title: 'Image' },
//       { name: 'title', type: 'string', title: 'Headline' },
//       { name: 'subtitle', type: 'text', title: 'Subhead' },
//       { name: 'ctaText', type: 'string' },
//       { name: 'ctaHref', type: 'string' }
//     ]
//   }]
// })

// ],
// })