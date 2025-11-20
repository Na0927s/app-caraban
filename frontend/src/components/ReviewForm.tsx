import React, { useState } from 'react';

interface ReviewFormProps {
  onSubmit: (data: { targetId: string; rating: number; comment: string }) => void;
  loading?: boolean;
  error?: string;
  // 리뷰 대상이 되는 ID (예: Caravan ID 또는 User ID)
  targetId: string; 
  targetType: 'caravan' | 'user'; // 리뷰 대상 유형
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, loading = false, error, targetId, targetType }) => {
  const [rating, setRating] = useState(5); // 기본 평점 5점
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ targetId, rating, comment });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {targetType === 'caravan' ? '카라반 리뷰 작성' : '사용자 리뷰 작성'}
      </h3>

      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">
          평점 ({targetType === 'caravan' ? '카라반' : '사용자'} ID: {targetId})
        </label>
        <select
          id="rating"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}점</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
          리뷰 내용
        </label>
        <textarea
          id="comment"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>

      {error && (
        <p className="text-red-500 text-xs italic mb-4 text-center">{error}</p>
      )}

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? '제출 중...' : '리뷰 제출'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
