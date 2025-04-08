// src/app/menu/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import WidgetManager from '@/components/WidgetManager';

const ALLOWED_USERS = ['jinkyu', 'jaewon', 'hanul', 'minseok'];

const MENU_ITEMS = [
  { label: 'About 랑구', href: '/about' },
  { label: 'Music Project', href: '/music' },
  { label: 'Our Travel', href: '/travel' },
  { label: 'Whose', href: '/whose' },
];

const EXTRA_ITEMS = [
  { label: 'Calendar', href: '/calendar' },
  { label: 'Todo List', href: '/todo' },
];

export default function MenuPage() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  // Load user from localStorage
  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      const { username } = JSON.parse(data);
      setUser(username);
    }
  }, []);

  const isAllowed = user !== null && ALLOWED_USERS.includes(user);

  // Site search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">메뉴</h1>

      {/* 사이트 내 검색 */}
      <form onSubmit={handleSearch} className="mb-8 flex">
        <input
          type="text"
          placeholder="사이트 내 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-l bg-white text-black"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
        >
          검색
        </button>
      </form>

      {/* 위젯 설정 (로그인 사용자만) */}
      {isAllowed && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">위젯 설정</h2>
          <WidgetManager username={user!} />
        </section>
      )}

      {/* 기본 메뉴 */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">기본 메뉴</h2>
        <ul className="space-y-1">
          {MENU_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-blue-500 hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 추가 메뉴 (권한 있는 사용자만) */}
      {isAllowed && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">추가 메뉴</h2>
          <ul className="space-y-1">
            {EXTRA_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-blue-500 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}