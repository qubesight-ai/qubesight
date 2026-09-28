import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Public (publishable) backend config. Fallback for builds where .env is
// excluded by .gitignore; these values are safe to ship in the browser.
const PUBLIC_SUPABASE_URL = "https://jhrxqzbdjexdfhaujvmf.supabase.co";
const PUBLIC_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpocnhxemJkamV4ZGZoYXVqdm1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMzk5NzksImV4cCI6MjA5MjYxNTk3OX0.Sb_3GsySW-A5HYKU5rw20KMelQcDUqXQ15VYbb0XZik";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const url = env.VITE_SUPABASE_URL || PUBLIC_SUPABASE_URL;
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY || PUBLIC_SUPABASE_KEY;
  return {
  define: {
    "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(url),
    "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(key),
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Keep Vite's default chunking. Custom manualChunks caused circular vendor
  // dependencies in production, making React-dependent code execute before
  // React initialized and resulting in a black screen.
}));
