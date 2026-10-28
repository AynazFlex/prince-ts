import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import * as federationModule from '@originjs/vite-plugin-federation';

const federation = (federationModule.default || federationModule) as any;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "machiavelli",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
      },
      shared: ["react", "react-dom", "@xyflow/react"],
    }),
  ],
  build: {
    target: "esnext",
  },
  server: { port: 5002 }
});
