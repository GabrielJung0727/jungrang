'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, List } from 'lucide-react';

interface Track {
  title: string;
  artist: string;
  src: string;
}

const playlist: Track[] = [
  { title: '스물 (20)', artist: '랑구', src: '/music/20.mp3' },
  { title: 'Track 2', artist: 'Artist B', src: '/music/track2.mp3' },
  { title: 'Track 3', artist: 'Artist C', src: '/music/track3.mp3' },
  { title: 'Track 4', artist: 'Artist D', src: '/music/track4.mp3' },
];

export default function FooterPlayer() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showList, setShowList] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 트랙 변경 시
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = playlist[current].src;
    if (isPlaying) audioRef.current.play();
  }, [current]);

  // 재생 상태 변경 시
  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(p => !p);
  const nextTrack = () => setCurrent(c => (c + 1) % playlist.length);
  const prevTrack = () => setCurrent(c => (c - 1 + playlist.length) % playlist.length);
  const selectTrack = (idx: number) => {
    setCurrent(idx);
    setIsPlaying(true);
    setShowList(false);
  };

  return (
    <div className="relative flex items-center gap-4">
      <audio ref={audioRef} />

      {/* Prev / Play-Pause / Next */}
      <button onClick={prevTrack} className="text-white hover:text-blue-400">
        <SkipBack size={20} />
      </button>
      <button onClick={togglePlay} className="text-white hover:text-blue-400">
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <button onClick={nextTrack} className="text-white hover:text-blue-400">
        <SkipForward size={20} />
      </button>

      {/* 현재 곡 정보 */}
      <div className="flex flex-col text-sm text-white">
        <span className="font-semibold">{playlist[current].title}</span>
        <span className="text-xs text-gray-300">{playlist[current].artist}</span>
      </div>

      {/* 플레이리스트 토글 */}
      <button onClick={() => setShowList(p => !p)} className="text-white hover:text-blue-400">
        <List size={20} />
      </button>

      {/* 플레이리스트 드롭업 */}
      {showList && (
        <div className="absolute bottom-16 left-0 bg-gray-800 border border-gray-700 rounded shadow-lg p-2 w-48 z-20">
          {playlist.map((t, idx) => (
            <div
              key={idx}
              onClick={() => selectTrack(idx)}
              className={`px-2 py-1 cursor-pointer hover:bg-gray-700 ${
                idx === current ? 'bg-gray-700' : ''
              }`}
            >
              <div className="text-xs font-medium">{t.title}</div>
              <div className="text-[10px] text-gray-400">{t.artist}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}