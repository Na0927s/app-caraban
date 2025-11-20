import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';

const AuthPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true); // 로그인 모드인지 회원가입 모드인지

  const handleSubmit = (data: { email: string; password: string; role?: 'host' | 'guest' }) => {
    console.log(`${isLoginMode ? '로그인' : '회원가입'} 요청:`, data);
    // 실제 백엔드 API 호출 로직은 여기에 구현
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthForm isLogin={isLoginMode} onSubmit={handleSubmit} />

        <div className="text-center">
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-indigo-600 hover:text-indigo-500 text-sm"
          >
            {isLoginMode ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
