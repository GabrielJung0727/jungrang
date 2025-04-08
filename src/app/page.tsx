'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';
import 'dayjs/locale/de';
import { useTheme } from '@/context/ThemeContext';
import languages from '@/i18n';
import ChatPlaceholder from '@/components/ChatPlaceholder';
import FooterPlayer from '@/components/FooterPlayer';
import SlideMenu from '@/components/SlideMenu';
import { Menu } from 'lucide-react';
import WidgetManager from '@/components/WidgetManager';
import Header from '@/components/Header';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function HomePage() {
  const [times, setTimes] = useState({
    seoul: '',
    vancouver: '',
    lucerne: '',
    dates: { seoul: '', vancouver: '', lucerne: '' },
  });

  const bgImages = ['/images/bg1.jpg', '/images/bg2.jpg', '/images/bg3.jpg', '/images/bg4.jpg'];
  const [slideIndex, setSlideIndex] = useState(0);

  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPersonalSettings, setShowPersonalSettings] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [widgets, setWidgets] = useState<string[]>([]);

  const { language, background, setLanguage, setBackground } = useTheme();
  const text = languages[language];

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
  const isAllowed = user && ALLOWED_USERS.includes(user.username);

  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search.trim())}`);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) setUser(JSON.parse(data));
  }, []);

  useEffect(() => {
    const updateTimes = () => {
      const now = dayjs();
      setTimes({
        seoul: now.tz('Asia/Seoul').locale('ko').format('A hh:mm:ss'),
        vancouver: now.tz('America/Vancouver').locale('en').format('hh:mm:ss A'),
        lucerne: now.tz('Europe/Zurich').locale('de').format('HH:mm:ss'),
        dates: {
          seoul: now.tz('Asia/Seoul').locale('ko').format('YYYY년 MM월 DD일'),
          vancouver: now.tz('America/Vancouver').locale('en').format('MMMM DD, YYYY'),
          lucerne: now.tz('Europe/Zurich').locale('de').format('DD.MM.YYYY'),
        },
      });
    };
    updateTimes();
    const iv = setInterval(updateTimes, 1000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${bgImages[slideIndex]})` }}
      />
      <div className="absolute inset-0 bg-black opacity-60" />

      <div className="relative z-10 flex flex-col min-h-screen text-white">

        <SlideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
        {/* 사이트 내 검색 */}
        <form onSubmit={handleSearch} className="mb-4 flex">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="사이트 내 검색..."
            className="flex-1 px-3 py-1 rounded-l bg-gray-800 text-white"
          />
          <button type="submit" className="px-3 bg-blue-600 rounded-r">
            검색
          </button>
        </form>

        {/* 위젯 설정 (권한 있는 사용자만) */}
        {isAllowed && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">위젯 설정</h3>
            <WidgetManager username={user.username} />
          </div>
        )}

        {/* 기본 메뉴 */}
        <div className="mb-4 space-y-2">
          {MENU_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="block hover:underline">
              {item.label}
            </Link>
          ))}
        </div>

        {/* 추가 메뉴 (권한 있는 사용자만) */}
        {isAllowed && (
          <div className="space-y-2 mb-4">
            {EXTRA_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="block hover:underline">
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </SlideMenu>

        <section className="flex-1 flex flex-col items-center justify-center text-center mt-36 px-4">
          <h1 className="text-4xl font-bold mb-4">{text.welcomeMessage} 👋</h1>
          <p className="text-lg">{text.familyMessage}</p>
        </section>

        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {bgImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIndex(idx)}
              className={`w-3 h-3 rounded-full border-2 border-white transition-colors ${
                idx === slideIndex ? 'bg-white' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}