import { groq } from 'next-sanity'

export const HOME_QUERY = groq`*[_type == "home"][0]{
  heroTitle, heroSubtitle, aboutTitle, aboutBody, portrait
}`

// export const SERVICES_QUERY = groq`*[_type == "service"] | order(title asc){
//   title, description, icon, slug
// }`


export const SERVICES_QUERY = groq`*[_type == "service"] | order(title asc){
  _id,
  title,
  description,
  icon,
  slug      // keep as object {current}
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


type Service = {
  _id: string
  title: string
  description?: string
  icon?: string
  slug?: string
}




// export const SERVICE_SLUGS_QUERY = groq`*[_type == "service" && defined(slug.current)]{
//   "slug": slug.current
// }`




export const SERVICE_SLUGS_QUERY = /* groq */ `
*[_type == "service" && defined(slug.current)]{ "slug": slug.current }
`



// export const SERVICE_BY_SLUG_QUERY = groq`*[_type == "service" && slug.current == $slug][0]{
//   _id,
//   title,
//   description,
//   icon,
//   "slug": slug.current,
//   heroImage,
//   body,
//   gallery
// }`


// export const SERVICE_BY_SLUG_QUERY = /* groq */ `
// *[_type == "service" && slug.current == $slug][0]{
//   _id,
//   title,
//   description,
//   icon,
//   "slug": slug.current,

//   // map whatever you named it to "body"
//   "body": coalesce(detailedContent, body),

//   // deref to get .asset.url directly
//   heroImage{ _key, _type, asset->{ url } },
//   gallery[]{ _key, _type, asset->{ url } }
// }
// `




export const SERVICE_BY_SLUG_QUERY = /* groq */ `
*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  description,
  icon,
  "slug": slug,
  "heroImage": heroImage{ asset->{ url } },
  body,
  "gallery": gallery[]{ _key, asset->{ url } },
  badge,
  outcomes[],
  agenda[]{ _key, title, duration },
  quickFacts[]{ _key, label, value },
  "related": related[]->{
    _key,
    title,
    "slug": slug
  }
}
`
