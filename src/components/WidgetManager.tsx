// src/components/WidgetManager.tsx
'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Edit2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Widget {
  name: string;
  url: string;
  image?: string;
}

export default function WidgetManager({ username }: { username: string }) {
  const router = useRouter();
  const STORAGE_KEY = `widgets_${username}`;

  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [temp, setTemp] = useState<Widget>({ name: '', url: '', image: '' });

  // 1) Load from localStorage
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) setWidgets(JSON.parse(data));
  }, [STORAGE_KEY]);

  // 2) Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
  }, [widgets, STORAGE_KEY]);

  const openEditor = (idx: number) => {
    setTemp(widgets[idx] || { name: '', url: '', image: '' });
    setEditingIndex(idx);
  };

  const saveWidget = () => {
    if (!temp.name.trim() || !temp.url.trim()) {
      alert('이름과 URL은 필수입니다.');
      return;
    }
    setWidgets(prev => {
      const next = [...prev];
      if (editingIndex! < prev.length) next[editingIndex!] = temp;
      else next.push(temp);
      return next.slice(0, 6); // 최대 6개
    });
    setEditingIndex(null);
  };

  const cancel = () => setEditingIndex(null);

  return (
    <>
      {/* 3×2 위젯 그리드 */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4 mb-4">
        {[0,1,2,3,4,5].map(i => {
          const w = widgets[i];
          return (
            <div
              key={i}
              className="relative h-24 border border-white bg-gray bg-opacity-20 rounded flex items-center justify-center overflow-hidden"
            >
              {/* 클릭 시 이동 또는 추가/편집 */}
              {w ? (
                <button
                  className="absolute inset-0"
                  onClick={() => router.push(w.url)}
                  title={w.name}
                />
              ) : (
                <button
                  className="absolute inset-0"
                  onClick={() => openEditor(i)}
                  title="위젯 추가"
                />
              )}

              {/* 콘텐츠 */}
              {w ? (
                <>
                  {w.image && (
                    <img
                      src={w.image}
                      alt={w.name}
                      className="h-full w-full object-cover opacity-80"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-1">
                    <span className="text-sm font-semibold text-white truncate">
                      {w.name}
                    </span>
                  </div>
                </>
              ) : (
                <PlusCircle size={32} className="text-white opacity-70" />
              )}

              {/* 편집 아이콘 (hover) */}
              <button
                className="absolute top-1 right-1 opacity-0 hover:opacity-100 transition-opacity text-white"
                onClick={() => openEditor(i)}
                title={w ? '위젯 수정' : '위젯 추가'}
              >
                <Edit2 size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {/* 편집 모달 */}
      {editingIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-80 text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingIndex < widgets.length ? '위젯 수정' : '위젯 추가'}
              </h3>
              <button onClick={cancel} className="text-white hover:text-red-400">
                <X size={20} />
              </button>
            </div>
            <input
              placeholder="이름 (필수)"
              value={temp.name}
              onChange={e => setTemp({ ...temp, name: e.target.value })}
              className="w-full mb-2 p-2 bg-gray-700 rounded"
            />
            <input
              placeholder="URL (필수)"
              value={temp.url}
              onChange={e => setTemp({ ...temp, url: e.target.value })}
              className="w-full mb-2 p-2 bg-gray-700 rounded"
            />
            <input
              placeholder="이미지 URL (선택)"
              value={temp.image}
              onChange={e => setTemp({ ...temp, image: e.target.value })}
              className="w-full mb-4 p-2 bg-gray-700 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={cancel}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                취소
              </button>
              <button
                onClick={saveWidget}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}