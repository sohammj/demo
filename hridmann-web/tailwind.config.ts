import type { Config } from "tailwindcss"

const config: Config = {
  corePlugins: { preflight: false }, // disable Tailwind reset so Bootstrap works
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: { extend: {} },
  plugins: [],
}

export default config
