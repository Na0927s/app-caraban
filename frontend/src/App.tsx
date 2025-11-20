import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import RegisterCaravanPage from './pages/RegisterCaravanPage';
import CaravanDetailPage from './pages/CaravanDetailPage';
import MyPage from './pages/MyPage';

function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [error, setError] = useState('');

  const fetchBackend = async () => {
    try {
      setError('');
      // Vite 프록시를 통해 백엔드 API 서버로 요청
      const response = await fetch('/api/hello');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text(); // 또는 response.json()
      setBackendMessage(data);
    } catch (e: any) {
      setError(`백엔드 통신 오류: ${e.message}`);
      setBackendMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4">
        {/* 기존 Vite + React 시작 화면 내용은 제거 */}
        
        {/* 백엔드 API 테스트 섹션 유지 */}
        <div className="backend-test-section mb-8 p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Backend API Test</h2>
          <button
            onClick={fetchBackend}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Fetch Backend /api/hello
          </button>
          {backendMessage && <p className="mt-2 text-green-600">Backend says: <strong>{backendMessage}</strong></p>}
          {error && <p className="mt-2 text-red-600">Error: {error}</p>}
        </div>

        <Routes>
          <Route path="/" element={<h1 className="text-3xl font-bold text-center">환영합니다! Caravan 공유 앱입니다.</h1>} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/register-caravan" element={<RegisterCaravanPage />} />
          <Route path="/caravan/:id" element={<CaravanDetailPage />} />
          <Route path="/my-page" element={<MyPage />} />
          {/* 404 Not Found 페이지도 추가 가능 */}
          <Route path="*" element={<h1 className="text-3xl font-bold text-center text-red-500">404 - 페이지를 찾을 수 없습니다.</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
