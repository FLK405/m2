import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "dev",
    },
    server: {
        proxy: {
            "/api/user/register": {
                target: "http://localhost:8080",
                changeOrigin: true,
            },
            "/api/spinningProcess.create": {
                target: "http://localhost:8080",
                changeOrigin: true,
            },
            "/api/spinningProcess.list": {
                target: "http://localhost:8080",
                changeOrigin: true,
            },
            "/api/spinningProcess.get": {
                target: "http://localhost:8080",
                changeOrigin: true,
            },
            "/api/spinningProcess.update": {
                target: "http://localhost:8080",
                changeOrigin: true,
            },
        },
    },
});
