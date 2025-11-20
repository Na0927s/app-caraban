import React, { useState } from 'react';

interface CaravanFormProps {
  onSubmit: (data: { capacity: number; amenities: string[]; location: string; photos: File[] }) => void;
  loading?: boolean;
  error?: string;
  initialData?: {
    capacity?: number;
    amenities?: string[];
    location?: string;
  };
}

const allAmenities = ['Wi-Fi', '에어컨', '히터', '주방', '화장실', '샤워실', 'TV', '침대', '테이블'];

const CaravanForm: React.FC<CaravanFormProps> = ({ onSubmit, loading = false, error, initialData }) => {
  const [capacity, setCapacity] = useState(initialData?.capacity || 2);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(initialData?.amenities || []);
  const [location, setLocation] = useState(initialData?.location || '');
  const [photos, setPhotos] = useState<File[]>([]);

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ capacity, amenities: selectedAmenities, location, photos });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        카라반 등록
      </h2>

      <div className="mb-4">
        <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2">
          수용 인원
        </label>
        <input
          type="number"
          id="capacity"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
          min="1"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          편의시설
        </label>
        <div className="grid grid-cols-2 gap-2">
          {allAmenities.map((amenity) => (
            <label key={amenity} className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
              />
              <span className="ml-2 text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
          위치
        </label>
        <input
          type="text"
          id="location"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="photos" className="block text-gray-700 text-sm font-bold mb-2">
          사진 (최대 5장)
        </label>
        <input
          type="file"
          id="photos"
          multiple
          accept="image/*"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
          onChange={handlePhotoChange}
          // required // 사진은 필수가 아닐 수도 있으므로 주석 처리
        />
        {photos.length > 0 && (
          <p className="text-gray-600 text-xs mt-1">{photos.length}개 파일 선택됨</p>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs italic mb-4 text-center">{error}</p>
      )}

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? '등록 중...' : '카라반 등록'}
        </button>
      </div>
    </form>
  );
};

export default CaravanForm;
