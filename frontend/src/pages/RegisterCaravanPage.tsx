import React from 'react';
import CaravanForm from '../components/CaravanForm';

const RegisterCaravanPage: React.FC = () => {
  const handleSubmit = (data: { capacity: number; amenities: string[]; location: string; photos: File[] }) => {
    console.log('카라반 등록 요청:', data);
    // 실제 백엔드 API 호출 로직은 여기에 구현
    // data.photos를 FormData와 함께 백엔드로 전송해야 합니다.
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <CaravanForm onSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterCaravanPage;
