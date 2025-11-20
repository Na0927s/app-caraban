import React, { useState } from 'react';

interface AuthFormProps {
  isLogin: boolean; // 로그인 폼인지 회원가입 폼인지 구분
  onSubmit: (data: { email: string; password: string; role?: 'host' | 'guest' }) => void;
  // 백엔드와 통신할 때 사용할 로딩 상태와 에러 메시지도 props로 받을 수 있음
  loading?: boolean;
  error?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onSubmit, loading = false, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'host' | 'guest'>('guest'); // 회원가입 시에만 사용

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onSubmit({ email, password });
    } else {
      onSubmit({ email, password, role });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {isLogin ? '로그인' : '회원가입'}
      </h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          이메일
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {!isLogin && (
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            회원 유형
          </label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="role"
                value="guest"
                checked={role === 'guest'}
                onChange={() => setRole('guest')}
              />
              <span className="ml-2 text-gray-700">게스트</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="role"
                value="host"
                checked={role === 'host'}
                onChange={() => setRole('host')}
              />
              <span className="ml-2 text-gray-700">호스트</span>
            </label>
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-xs italic mb-4 text-center">{error}</p>
      )}

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? '처리 중...' : (isLogin ? '로그인' : '회원가입')}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
