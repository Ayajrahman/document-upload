import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Replace 'document-upload' with your actual repository name
export default defineConfig({
  base: "/document-upload/", // 👈 Correct way to set base for GitHub Pages
  plugins: [react(), tailwindcss()],
});
