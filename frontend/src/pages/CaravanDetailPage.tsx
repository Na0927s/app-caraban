import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CaravanDetail from '../components/CaravanDetail';
import BookingCalendar from '../components/BookingCalendar';

// 더미 데이터 (실제로는 백엔드에서 가져와야 함)
const dummyCaravan = {
  id: '123',
  capacity: 4,
  amenities: ['Wi-Fi', '에어컨', '주방'],
  location: '제주도 애월읍',
  photos: ['https://via.placeholder.com/600x400?text=Caravan+Image'],
  dailyRate: 120000,
};

const CaravanDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 카라반 ID 가져오기
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const handleDatesSelect = (startDate: Date | null, endDate: Date | null) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    console.log('선택된 시작일:', startDate);
    console.log('선택된 종료일:', endDate);
  };

  const handleBooking = () => {
    if (selectedStartDate && selectedEndDate) {
      console.log(`카라반 ${id} 예약 신청: ${selectedStartDate.toLocaleDateString()} - ${selectedEndDate.toLocaleDateString()}`);
      // 실제 백엔드 API 호출 로직은 여기에 구현
      alert(`카라반 ${id} 예약 신청 완료!\n기간: ${selectedStartDate.toLocaleDateString()} ~ ${selectedEndDate.toLocaleDateString()}`);
    } else {
      alert('날짜를 선택해 주세요.');
    }
  };

  // 실제로는 id를 사용하여 백엔드에서 카라반 정보를 가져와야 합니다.
  // 로딩 상태, 에러 처리 등도 필요합니다.
  const caravan = dummyCaravan; // 현재는 더미 데이터 사용

  if (!caravan) {
    return <div className="text-center text-red-500">카라반 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-4">
      <CaravanDetail caravan={caravan} />
      <BookingCalendar caravanId={caravan.id} onDatesSelect={handleDatesSelect} />
      <div className="text-center mt-4">
        <button
          onClick={handleBooking}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
          disabled={!selectedStartDate || !selectedEndDate}
        >
          선택된 날짜로 예약 신청
        </button>
      </div>
    </div>
  );
};

export default CaravanDetailPage;
