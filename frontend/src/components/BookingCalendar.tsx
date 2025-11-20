import React, { useState } from 'react';

interface BookingCalendarProps {
  onDatesSelect: (startDate: Date | null, endDate: Date | null) => void;
  caravanId: string; // 예약 가능한 날짜를 가져오기 위한 카라반 ID
  // 백엔드에서 예약된 날짜 정보를 받아와서 캘린더에 표시할 수 있도록
  // bookedDates?: { startDate: Date; endDate: Date; }[];
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onDatesSelect, caravanId }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    onDatesSelect(e.target.value ? new Date(e.target.value) : null, endDate ? new Date(endDate) : null);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    onDatesSelect(startDate ? new Date(startDate) : null, e.target.value ? new Date(e.target.value) : null);
  };

  // 실제로는 백엔드에서 특정 카라반의 예약 가능 여부를 조회하여 달력에 표시해야 함
  // 여기서는 단순히 날짜 선택만 제공

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">예약 가능 날짜 선택</h3>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label htmlFor="start-date" className="block text-gray-700 text-sm font-bold mb-2">
            시작일
          </label>
          <input
            type="date"
            id="start-date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="end-date" className="block text-gray-700 text-sm font-bold mb-2">
            종료일
          </label>
          <input
            type="date"
            id="end-date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate} // 시작일 이후만 선택 가능
          />
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => onDatesSelect(startDate ? new Date(startDate) : null, endDate ? new Date(endDate) : null)}
        disabled={!startDate || !endDate}
      >
        예약 신청 (날짜 선택 후 활성화)
      </button>
    </div>
  );
};

export default BookingCalendar;
