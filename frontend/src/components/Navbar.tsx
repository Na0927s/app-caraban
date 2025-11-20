import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Caravan Share</Link>
        <ul className="flex space-x-4">
          <li><Link to="/auth" className="hover:text-gray-300">로그인/회원가입</Link></li>
          <li><Link to="/register-caravan" className="hover:text-gray-300">카라반 등록</Link></li>
          <li><Link to="/caravan/123" className="hover:text-gray-300">카라반 상세 (예시)</Link></li>
          <li><Link to="/my-page" className="hover:text-gray-300">마이페이지</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
