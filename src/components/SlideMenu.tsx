// src/components/SlideMenu.tsx
'use client';

import { Fragment, ReactNode } from 'react';
import { X } from 'lucide-react';

interface SlideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function SlideMenu({ isOpen, onClose, children }: SlideMenuProps) {
  return (
    <Fragment>
      {/* 연한 오버레이 (최상단) */}
      <div
        className={`
          fixed inset-0 bg-black bg-opacity-30
          transition-opacity duration-500 ease-in-out
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          z-50
        `}
        onClick={onClose}
      />

      {/* 오른쪽 슬라이드 메뉴 (최상단) */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-64 bg-gray-900 text-white
          transform transition-transform duration-500 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          z-50
        `}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <h2 className="text-lg font-semibold">메뉴</h2>
          <button onClick={onClose} className="text-white hover:text-blue-400">
            <X size={20} />
          </button>
        </div>

        {/* 메뉴 콘텐츠 */}
        <nav className="px-4 py-2 overflow-y-auto space-y-4">
          {children}
        </nav>
      </aside>
    </Fragment>
  );
}