import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage'; // 새롭게 추가
import RegisterPage from './pages/RegisterPage'; // 새롭게 추가
import HostDashboardPage from './pages/HostDashboardPage'; // 새롭게 추가
import RegisterCaravanPage from './pages/RegisterCaravanPage';
import CaravanDetailPage from './pages/CaravanDetailPage';
import MyPage from './pages/MyPage';

function App() {
  // 백엔드 테스트 관련 상태와 함수는 제거

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4">
        {/* 백엔드 API 테스트 섹션 제거 */}

        <Routes>
          <Route path="/" element={<h1 className="text-3xl font-bold text-center">환영합니다! Caravan 공유 앱입니다.</h1>} />
          <Route path="/login" element={<LoginPage />} /> {/* /auth 대신 /login */}
          <Route path="/register" element={<RegisterPage />} /> {/* /auth 대신 /register */}
          <Route path="/register-caravan" element={<RegisterCaravanPage />} />
          <Route path="/caravans/:id" element={<CaravanDetailPage />} /> {/* /caravan/:id 대신 /caravans/:id */}
          <Route path="/host/dashboard" element={<HostDashboardPage />} /> {/* 새롭게 추가 */}
          <Route path="/my-page" element={<MyPage />} />
          {/* 404 Not Found 페이지 */}
          <Route path="*" element={<h1 className="text-3xl font-bold text-center text-red-500">404 - 페이지를 찾을 수 없습니다.</h1>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
