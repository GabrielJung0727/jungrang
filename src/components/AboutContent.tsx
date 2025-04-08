// src/components/AboutContent.tsx

'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';
import 'dayjs/locale/de';
import { motion } from 'framer-motion';
import Link from 'next/link';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function AboutContent() {
  const startDate = dayjs('2023-06-11');
  const [daysTogether, setDaysTogether] = useState(0);

  useEffect(() => {
    const update = () => setDaysTogether(dayjs().diff(startDate, 'day'));
    update();
    const iv = setInterval(update, 1000 * 60 * 60);
    return () => clearInterval(iv);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gray-50 text-gray-900 p-8 pt-24 pb-24"
    >
      {/* 타이틀 & 소개 */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <h1 className="text-5xl font-extrabold mb-4">About 랑구팸</h1>
        <p className="text-lg leading-relaxed">
          민석, 한울, 재원, 진규 네 친구는 2023년 6월 중랑구에서 우연히 만나,
          함께 꿈을 나누며 '랑구팸'이라는 이름으로 하나의 작은 가족을 이루었습니다.
        </p>
      </motion.div>

      {/* 함께한 시간 */}
      <motion.section
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4">함께한 시간</h2>
        <p suppressHydrationWarning className="text-6xl font-bold text-blue-600">
          {daysTogether}일
        </p>
        <p className="mt-2 text-gray-600">우리의 우정이 자란 날들</p>
      </motion.section>

      {/* 커뮤니티 소개 */}
      <motion.section
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="max-w-3xl mx-auto space-y-6 mb-12 text-gray-800"
      >
        <p>
          랑구팸은 중랑구를 기반으로 모인 네 명의 친구들이 서로의 일상을 공유하고,
          음악과 여행, 일상의 소소한 순간들을 함께 기록하는 커뮤니티입니다.
        </p>
        <p>
          맛집 탐방, 여행 계획, 음악 추천, 그리고 가끔은 진솔한 고민까지.
          우리는 이 공간에서 언제나 서로에게 힘이 되고 영감을 주고받습니다.
        </p>
        <p>
          앞으로도 더 많은 추억을 쌓아가며, 랑구팸만의 특별한 이야기를 만들어 나갈
          것입니다. 여러분도 함께해 주세요!
        </p>
      </motion.section>

      {/* 돌아가기 버튼 */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center"
      >
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          메인으로 돌아가기
        </Link>
      </motion.div>
    </motion.main>
  );
}