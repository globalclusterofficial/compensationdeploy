import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
/**
 * Defines the configuration for the project.
 * @returns {Object} The project configuration object.
 */
export default defineConfig({
  plugins: [react(), eslint()],
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: "jsdom",
    // hey! 👋 over here
    globals: true,
    setupFiles: "./src/tests/setup.js", // assuming the test folder is in the root of our project
  },
});

//testing vercel deployment
"scripts"; {
  "build"; "vite build"
}

