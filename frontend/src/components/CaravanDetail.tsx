import React from 'react';

interface CaravanDetailProps {
  caravan: {
    id: string;
    capacity: number;
    amenities: string[];
    location: string;
    photos: string[]; // 이미지 URL
    dailyRate: number;
    // 기타 필요한 정보 (예: 호스트 정보, 설명 등)
  };
}

const CaravanDetail: React.FC<CaravanDetailProps> = ({ caravan }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        카라반 상세 정보 #{caravan.id}
      </h2>

      {caravan.photos && caravan.photos.length > 0 && (
        <div className="mb-4">
          <img src={caravan.photos[0]} alt={`Caravan ${caravan.id} main`} className="w-full h-64 object-cover rounded-lg" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div>
          <p className="text-lg"><strong>위치:</strong> {caravan.location}</p>
          <p className="text-lg"><strong>수용 인원:</strong> {caravan.capacity}명</p>
          <p className="text-lg"><strong>일일 요금:</strong> {caravan.dailyRate.toLocaleString()}원</p>
        </div>
        <div>
          <p className="text-lg"><strong>편의시설:</strong></p>
          <ul className="list-disc list-inside ml-4">
            {caravan.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* 추가 상세 설명 등 */}
      <p className="mt-4 text-gray-600">
        이 카라반은 아름다운 자연 속에서 편안한 휴식을 제공합니다. 최신 편의시설과 함께 잊지 못할 추억을 만들어 보세요.
      </p>
    </div>
  );
};

export default CaravanDetail;
