// Snowfall.tsx
'use client';

export default function Snowfall() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="snowflake">❆</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      {/* 추가 눈송이 요소들을 배치 */}
    </div>
  );
}