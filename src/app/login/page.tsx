'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');  // 이메일 또는 아이디
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 일반 로그인 핸들러
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || '로그인 실패');
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/');
      }
    } catch {
      setError('로그인 중 오류가 발생했습니다.');
    }
  }

  // 방문자 로그인 핸들러
  function handleVisitorLogin() {
    const guest = { name: 'Guest', email: '', username: 'guest' };
    // 토큰 없이도 동작하도록 메인 페이지에서 guest 처리 로직 유지
    localStorage.setItem('user', JSON.stringify(guest));
    router.push('/');
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-md p-6 bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}

        <div className="mb-4">
          <label htmlFor="identifier" className="block mb-1">이메일 또는 아이디</label>
          <input
            id="identifier"
            type="text"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded focus:outline-none"
            required
          />
        </div>

        {/* 비밀번호 찾기 / 방문자 로그인 */}
        <div className="flex justify-between items-center mb-6">
          <a href="/forgot-password" className="text-sm text-blue-400 hover:underline">
            비밀번호 찾기
          </a>
          <button
            type="button"
            onClick={handleVisitorLogin}
            className="text-sm text-blue-400 hover:underline"
          >
            방문자로 로그인
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          로그인
        </button>
      </form>
    </div>
  );
}