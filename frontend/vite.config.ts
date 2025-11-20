import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // /api로 시작하는 요청을 프록시
        target: 'http://localhost:3000', // 백엔드 서버 주소
        changeOrigin: true, // 대상 호스트 헤더를 변경 (가상 호스트 기반의 백엔드에서 필요)
        rewrite: (path) => path.replace(/^\/api/, ''), // /api 접두사 제거
      },
    },
  },
})
