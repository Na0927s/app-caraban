import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [backendMessage, setBackendMessage] = useState('');
  const [error, setError] = useState('');

  const fetchBackend = async () => {
    try {
      setError('');
      // Vite 프록시를 통해 백엔드 API 서버로 요청
      const response = await fetch('/api/hello');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text(); // 또는 response.json()
      setBackendMessage(data);
    } catch (e: any) {
      setError(`백엔드 통신 오류: ${e.message}`);
      setBackendMessage('');
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <div className="backend-test-section">
        <h2>Backend API Test</h2>
        <button onClick={fetchBackend}>Fetch Backend /api/hello</button>
        {backendMessage && <p>Backend says: <strong>{backendMessage}</strong></p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
