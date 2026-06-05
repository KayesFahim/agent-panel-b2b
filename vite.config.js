import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-oxc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env vars (no prefix filter so we get everything)
  const env = loadEnv(mode, process.cwd(), '');

  // Build a process.env object containing all REACT_APP_ vars
  const processEnv = Object.fromEntries(
    Object.entries(env).filter(([key]) => key.startsWith('REACT_APP_'))
  );

  return {
    plugins: [
      {
        name: 'transform-deep-imports',
        enforce: 'pre',
        transform(code, id) {
          // Only transform our own JS/JSX/TS/TSX source files
          if (id.includes('node_modules') || (!id.endsWith('.js') && !id.endsWith('.jsx') && !id.endsWith('.ts') && !id.endsWith('.tsx'))) {
            return null;
          }

          let replaced = code;

          // 1. Transform deep icons imports, e.g.:
          // import DeleteIcon from "@mui/icons-material/Delete"; -> import { Delete as DeleteIcon } from "@mui/icons-material";
          replaced = replaced.replace(
            /import\s+(\w+)\s+from\s+(['"`])@mui\/icons-material\/(\w+)\2;?/g,
            'import { $3 as $1 } from "@mui/icons-material";'
          );

          // 2. Transform deep material imports with named helpers, e.g.:
          // import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"; -> import { Tooltip, tooltipClasses } from "@mui/material";
          replaced = replaced.replace(
            /import\s+(\w+),\s*\{\s*([^}]+)\}\s*from\s+(['"`])@mui\/material\/(\w+)\3;?/g,
            'import { $4 as $1, $2 } from "@mui/material";'
          );

          // 3. Transform deep material component imports, e.g.:
          // import CircularProgress from "@mui/material/CircularProgress"; -> import { CircularProgress } from "@mui/material";
          replaced = replaced.replace(
            /import\s+(\w+)\s+from\s+(['"`])@mui\/material\/(\w+)\2;?/g,
            'import { $3 as $1 } from "@mui/material";'
          );

          return {
            code: replaced,
            map: null
          };
        }
      },
      react(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      // Inject REACT_APP_ env vars into process.env at build/dev time
      // This also polyfills process.env for legacy libs like react-secure-storage
      'process.env': processEnv,
    },
    server: {
      port: 3000,
      host: true,
    },
    build: {
      outDir: 'build',
      sourcemap: false,
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@mui') || id.includes('@emotion')) {
                return 'vendor-mui';
              }
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'vendor-react';
              }
              return 'vendor-libs';
            }
          },
        },
      },
    },
    envPrefix: 'REACT_APP_',
  };
});
