'use client';

import { useState } from 'react';
import ChatPlaceholder from './ChatPlaceholder';
import FooterPlayer from './FooterPlayer';

export default function Footer() {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <footer className="fixed bottom-0 w-full h-16 border-t border-white bg-black px-6 flex items-center justify-between text-white z-30">
        <FooterPlayer />
        <button
          onClick={() => setShowChat((p) => !p)}
          className="text-sm"
        >
          💬 채팅
        </button>
      </footer>
      {showChat && <ChatPlaceholder />}
    </>
  );
}