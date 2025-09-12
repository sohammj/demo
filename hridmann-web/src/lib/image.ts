import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { sanityClient } from './sanity'

const builder = imageUrlBuilder(sanityClient)
export const urlFor = (src: SanityImageSource) => builder.image(src)
