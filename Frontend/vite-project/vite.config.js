import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from "fs";

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    server: command === "serve" ? {
      https: {
        key: fs.readFileSync("./key.pem"),
        cert: fs.readFileSync("./cert.pem"),
      },
      host: "localhost",
      port: 5173,
    } : undefined,  // production build ignores server config
  };
});
