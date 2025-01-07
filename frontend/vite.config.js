import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "http://localhost:5000 ",
      "/uploads/": "http://localhost:5000",
      // "/api/": "https://full-stack-ecommerce-website-backend.onrender.com ",
      // "/uploads/": "https://full-stack-ecommerce-website-backend.onrender.com",
    },
  },
});
