// import type { Config } from "tailwindcss"

// const config: Config = {
//   corePlugins: { preflight: false }, // disable Tailwind reset so Bootstrap works
//   content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
//   theme: { extend: {} },
//   plugins: [],
// }

// export default config


// tailwind.config.ts
export default {
  // keep Bootstrap happy by disabling Tailwind’s CSS reset
  corePlugins: { preflight: false },
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: { extend: {} },
  plugins: [],
}

safelist: [
  'text-muted-foreground',
  'text-foreground',
  'bg-background',
  'text-primary',
  'text-secondary',
]
