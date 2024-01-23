import * as path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    host: 'localhost',
    open: true,
    port: 3001,
  }, // поменял порт из-за cors-ошибки ( запросы на сервер social-network разрешено только с localhost:3000, localhost:3001, localhost:9009)
})
