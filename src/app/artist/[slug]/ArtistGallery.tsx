'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Artist, Work } from '@/lib/artists';
import { workDateLabel } from '@/lib/artists';

type Group = { label: string; works: Work[] };
interface Props { artist: Artist; groups: Group[]; allWorks: Work[] }

export default function ArtistGallery({ artist, groups }: Props) {
  const [view, setView] = useState<'grid' | 'large'>('grid');
  useEffect(() => {
    try { if (sessionStorage.getItem('gallery-view') === 'large') setView('large'); } catch {}
  }, []);
  function changeView(next: 'grid' | 'large') {
    setView(next);
    try { sessionStorage.setItem('gallery-view', next); } catch {}
  }
  return <div className="pb-20 space-y-10">
    <div className="flex justify-end gap-2" role="group" aria-label="작품 보기 방식">
      {(['grid', 'large'] as const).map(mode => <button key={mode} type="button" aria-label={mode === 'grid' ? '격자 보기' : '크게 보기'} aria-pressed={view === mode} onClick={() => changeView(mode)} className={'inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ' + (view === mode ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50')}>
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          {mode === 'grid' ? <><rect x="2" y="2" width="6" height="6" rx="1"/><rect x="12" y="2" width="6" height="6" rx="1"/><rect x="2" y="12" width="6" height="6" rx="1"/><rect x="12" y="12" width="6" height="6" rx="1"/></> : <rect x="2" y="2" width="16" height="16" rx="1.5"/>}
        </svg>
        {mode === 'grid' ? '격자' : '크게'}
      </button>)}
    </div>
    {groups.map(group => <section key={group.label}>
      <div className="flex items-center gap-3 mb-6"><h3 className="text-[13px] font-bold text-gray-900">{group.label}</h3><div className="flex-1 h-px bg-gray-200" /></div>
      <div className={view === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8' : 'max-w-[640px] mx-auto space-y-12'}>
        {group.works.map(work => <article key={work.slug} id={'work-' + work.slug}>
          <Link href={`/artist/${artist.slug}/${work.slug}`} className="group block" aria-label={`${work.title} 작품 상세 보기`}>
            <div className={(view === 'grid' ? 'aspect-[4/5]' : 'aspect-square') + ' overflow-hidden relative bg-gray-50 mb-3'}>
              <Image src={work.image} alt={work.title} fill className={(view === 'grid' ? 'object-cover' : 'object-contain') + ' group-hover:scale-[1.02] transition-transform duration-300'} sizes={view === 'grid' ? '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw' : '(max-width: 640px) 100vw, 640px'} />
            </div>
            <h4 className={view === 'grid' ? 'text-[15px] sm:text-[16px] font-bold text-gray-900 leading-snug line-clamp-2' : 'text-xl font-bold text-gray-900'}>{work.title}</h4>
          </Link>
          <p className="text-xs text-gray-500 mt-1">{work.materials.length ? work.materials.join(', ') + ' · ' : ''}{workDateLabel(work)}</p>
          {view === 'large' && work.description && <p className="mt-3 whitespace-pre-wrap text-sm text-gray-700">{work.description}</p>}
          {view === 'large' && <Link href={`/artist/${artist.slug}/${work.slug}`} className="inline-block mt-3 text-sm underline underline-offset-4">작품 상세 보기 →</Link>}
        </article>)}
      </div>
    </section>)}
  </div>;
}
