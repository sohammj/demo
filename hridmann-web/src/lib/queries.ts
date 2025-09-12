import { groq } from 'next-sanity'

export const HOME_QUERY = groq`*[_type == "home"][0]{
  heroTitle, heroSubtitle, aboutTitle, aboutBody, portrait
}`

export const SERVICES_QUERY = groq`*[_type == "service"] | order(title asc){
  title, description, icon, slug
}`

export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial"] | order(_createdAt desc){
  name, role, message, photo
}`

// export const SETTINGS_QUERY = groq`*[_type == "settings"][0]{
//   siteName, contactEmail, instagram, footerNote
// }`



export const SETTINGS_QUERY = /* groq */ `
*[_type == "settings"][0]{
  siteName,
  contactEmail,
  instagram,
  footerNote,
  // if your nav is a separate singleton document:
  "navigation": *[_type == "nav"][0]{
    items[]{ _key, href, label }
  }
}
`
