// src/components/ChatPlaceholder.tsx
'use client';

import { useState } from 'react';

export default function ChatPlaceholder() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 w-80 bg-gray-900 border border-gray-700 rounded shadow-lg z-30 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-800 px-4 py-2 rounded-t">
        <h2 className="text-lg font-bold text-white">채팅</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white focus:outline-none"
        >
          X
        </button>
      </div>
      {/* Chat content area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-white">현재 서비스 개발 중</p>
      </div>
      {/* Input area */}
      <div className="p-2 border-t border-gray-700">
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          className="w-full px-2 py-1 bg-gray-800 text-white rounded focus:outline-none"
        />
      </div>
    </div>
  );
}