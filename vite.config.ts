import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { crx, defineManifest } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";
import pkg from "./package.json";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Metabase Dev Extension",
  permissions: ["tabs", "activeTab", "scripting"],
  version: pkg.version,
  content_scripts: [
    {
      js: ["src/content-script.ts"],
      matches: ["<all_urls>"],
      run_at: "document_start",
    },
  ],
  devtools_page: "src/devtools.html",
});

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        panel: resolve(__dirname, "src/panel.html"),
      },
    },
  },
  plugins: [react(), crx({ manifest })],
  optimizeDeps: {
    entries: ["src/*.html"],
  },
  server: {
    port: 3001,
  },
});
