import React from 'react';
import PaymentHistory from '../components/PaymentHistory';
import ReviewForm from '../components/ReviewForm';

// 더미 결제 이력 데이터 (실제로는 백엔드에서 가져와야 함)
const dummyPayments = [
  { id: 'pay1', caravanName: '제주 해변 카라반', startDate: '2025-01-01', endDate: '2025-01-03', amount: 360000, status: 'completed' as const },
  { id: 'pay2', caravanName: '설악산 숲속 카라반', startDate: '2025-02-10', endDate: '2025-02-12', amount: 280000, status: 'pending' as const },
  { id: 'pay3', caravanName: '부산 해운대 카라반', startDate: '2025-03-05', endDate: '2025-03-07', amount: 300000, status: 'cancelled' as const },
];

const MyPage: React.FC = () => {
  const handleReviewSubmit = (data: { targetId: string; rating: number; comment: string }) => {
    console.log('리뷰 제출:', data);
    // 실제 백엔드 API 호출 로직은 여기에 구현
    alert(`${data.targetId}에 대한 리뷰가 제출되었습니다!`);
  };

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">마이페이지</h1>
      
      {/* 결제 이력 섹션 */}
      <PaymentHistory payments={dummyPayments} />

      {/* 리뷰 작성 섹션 (예시: 특정 카라반에 대한 리뷰) */}
      <ReviewForm
        targetId="caravan123" // 예시 카라반 ID
        targetType="caravan"
        onSubmit={handleReviewSubmit}
      />
      {/* 사용자에게도 리뷰를 남길 수 있다면 User targetType으로 ReviewForm을 또 렌더링할 수 있습니다. */}
    </div>
  );
};

export default MyPage;
