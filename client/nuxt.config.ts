// nuxt.config.ts

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  plugins: ["~/plugins/api/index.ts"],
  ssr: false,
  vite: {
    server: {
      proxy: {
        "/api/v1/": {
          target: "http://localhost:8080",
        },
        "/api/currencies/": {
          target: "http://api.exchangeratesapi.io",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/currencies/, ""),
        },
      },
    },
  },
});
