import { defineConfig } from "vite";
import { sveltekit } from "npm:@sveltejs/kit/vite";

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 3000,
    strictPort: false
  }
});
