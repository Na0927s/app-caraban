import React from 'react';
import AuthForm from '../components/AuthForm';

const RegisterPage: React.FC = () => {
  const handleSubmit = (data: { email: string; password: string; role?: 'host' | 'guest' }) => {
    console.log('회원가입 요청:', data);
    // 실제 백엔드 API 호출 로직은 여기에 구현
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm isLogin={false} onSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterPage;
