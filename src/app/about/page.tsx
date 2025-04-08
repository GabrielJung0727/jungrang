// src/app/about/page.tsx

export const metadata = {
  title: 'About 랑구팸',
  description: '중랑구 패밀리 랑구팸을 소개합니다',
};

import AboutContent from '@/components/AboutContent';

export default function AboutPage() {
  return <AboutContent />;
}