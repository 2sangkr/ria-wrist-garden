'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { Artist, Work } from '@/lib/artists';
import { workDateLabel } from '@/lib/artists';

type Group = { label: string; works: Work[] };

interface Props {
  artist: Artist;
  groups: Group[];
  allWorks: Work[];
}

export default function ArtistGallery({ artist, groups, allWorks }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedWork = selectedIndex !== null ? allWorks[selectedIndex] : null;

  const close = useCallback(() => setSelectedIndex(null), []);
  const prev = useCallback(() => setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(
    () => setSelectedIndex((i) => (i !== null && i < allWorks.length - 1 ? i + 1 : i)),
    [allWorks.length]
  );

  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedIndex, close, prev, next]);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedIndex]);

  return (
    <>
      {/* 그리드 */}
      <div className="px-5 sm:px-8 pb-20 space-y-12">
        {groups.map((group) => (
          <div key={group.label}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[13px] font-semibold text-gray-500">{group.label}</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {group.works.map((work) => {
                const globalIndex = allWorks.findIndex((w) => w.slug === work.slug);
                return (
                  <button
                    key={work.slug}
                    onClick={() => setSelectedIndex(globalIndex)}
                    className="group text-left"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden relative bg-gray-100 mb-2">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                    <p className="text-[13px] font-medium text-gray-900 leading-snug line-clamp-2">{work.title}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{workDateLabel(work)}</p>
                    {work.materials.length > 0 && (
                      <p className="text-[11px] text-gray-300 mt-0.5 truncate">{work.materials.join(' · ')}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 라이트박스 */}
      {selectedWork && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={close}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden w-full mx-4 flex flex-col"
            style={{ maxWidth: 480, maxHeight: '92vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 이미지 영역 */}
            <div className="relative w-full bg-gray-50" style={{ aspectRatio: '1 / 1' }}>
              <Image
                src={selectedWork.image}
                alt={selectedWork.title}
                fill
                className="object-contain"
                sizes="480px"
                priority
              />

              {/* 닫기 */}
              <button
                onClick={close}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/25 hover:bg-black/50 flex items-center justify-center text-white text-[14px] transition-colors"
                aria-label="닫기"
              >
                ✕
              </button>

              {/* 이전 */}
              {selectedIndex > 0 && (
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/25 hover:bg-black/50 flex items-center justify-center text-white text-[18px] transition-colors"
                  aria-label="이전 작품"
                >
                  ←
                </button>
              )}

              {/* 다음 */}
              {selectedIndex < allWorks.length - 1 && (
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/25 hover:bg-black/50 flex items-center justify-center text-white text-[18px] transition-colors"
                  aria-label="다음 작품"
                >
                  →
                </button>
              )}
            </div>

            {/* 정보 */}
            <div className="px-5 py-4 shrink-0">
              <p className="text-[16px] font-bold text-gray-900 leading-snug">{selectedWork.title}</p>
              <p className="text-[12px] text-gray-400 mt-1">{workDateLabel(selectedWork)}</p>
              {selectedWork.materials.length > 0 && (
                <p className="text-[12px] text-gray-400 mt-0.5">{selectedWork.materials.join(' · ')}</p>
              )}
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
                <div
                  className="w-8 h-8 shrink-0 flex items-center justify-center"
                  style={{
                    background: artist.profileColor,
                    borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
                  }}
                >
                  <span className="text-[12px] font-bold text-white/80 select-none">{artist.name[0]}</span>
                </div>
                <p className="text-[13px] font-medium text-gray-700">{artist.name}</p>
                <p className="ml-auto text-[11px] text-gray-400">{selectedIndex + 1} / {allWorks.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
