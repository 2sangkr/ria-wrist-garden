'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Artist, Work } from '@/lib/artists';

type Props = { artists: Artist[] };

export default function AdminClient({ artists }: Props) {
  const router = useRouter();
  const [openForm, setOpenForm] = useState<string | null>(null);

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
      <header className="bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <p className="text-[11px] text-gray-400 tracking-widest uppercase">admin</p>
          <h1 className="text-[16px] font-bold text-gray-800">모든 아이의 모든 예술</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-[12px] text-gray-400 hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-full transition-colors"
        >
          로그아웃
        </button>
      </header>

      <main className="max-w-[720px] mx-auto px-4 py-8 space-y-8">
        {artists.map((artist) => (
          <ArtistSection
            key={artist.id}
            artist={artist}
            showForm={openForm === artist.id}
            onToggleForm={() => setOpenForm(openForm === artist.id ? null : artist.id)}
            onRefresh={() => router.refresh()}
          />
        ))}
      </main>
    </div>
  );
}

function ArtistSection({
  artist,
  showForm,
  onToggleForm,
  onRefresh,
}: {
  artist: Artist;
  showForm: boolean;
  onToggleForm: () => void;
  onRefresh: () => void;
}) {
  return (
    <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{ borderLeft: `4px solid ${artist.profileColor}` }}
      >
        <div
          className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold text-[14px]"
          style={{ background: artist.profileColor }}
        >
          {artist.name[0]}
        </div>
        <div className="flex-1">
          <p className="text-[15px] font-semibold text-gray-800">{artist.name}</p>
          <p className="text-[11px] text-gray-400">{artist.works?.length ?? 0}개 작품</p>
        </div>
        <button
          onClick={onToggleForm}
          className="text-[12px] font-medium bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors"
        >
          {showForm ? '취소' : '+ 작품 추가'}
        </button>
      </div>

      {showForm && (
        <AddWorkForm artist={artist} onSuccess={() => { onToggleForm(); onRefresh(); }} />
      )}

      {(artist.works?.length ?? 0) > 0 && (
        <div className="px-5 pb-5 pt-2">
          <div className="grid grid-cols-3 gap-3">
            {artist.works!.map((work) => (
              <WorkCard key={work.id ?? work.slug} work={work} onDeleted={onRefresh} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function WorkCard({ work, onDeleted }: { work: Work; onDeleted: () => void }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`"${work.title}" 삭제할까요?`)) return;
    setDeleting(true);
    await fetch(`/api/admin/works/${work.id}`, { method: 'DELETE' });
    onDeleted();
  }

  return (
    <div className="relative group">
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative">
        {work.image ? (
          <Image src={work.image} alt={work.title} fill className="object-cover" sizes="150px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px]">no img</div>
        )}
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
        >
          ✕
        </button>
      </div>
      <p className="text-[11px] text-gray-700 mt-1 leading-tight truncate">{work.title}</p>
      <p className="text-[10px] text-gray-400">{work.created_at?.slice(0, 4)}</p>
    </div>
  );
}

function AddWorkForm({ artist, onSuccess }: { artist: Artist; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set('artist_id', artist.id);

    const res = await fetch('/api/admin/works', { method: 'POST', body: fd });
    if (res.ok) {
      formRef.current?.reset();
      setPreview(null);
      onSuccess();
    } else {
      const data = await res.json();
      setError(data.error ?? '오류가 발생했어요');
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mx-5 mb-4 p-4 bg-gray-50 rounded-xl space-y-3">
      <p className="text-[12px] font-semibold text-gray-600">새 작품 추가 — {artist.name}</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="block text-[11px] text-gray-500 mb-1">제목 *</label>
          <input name="title" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400 bg-white" />
        </div>
        <div>
          <label className="block text-[11px] text-gray-500 mb-1">날짜 *</label>
          <input name="created_at" type="date" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400 bg-white" />
        </div>
        <div>
          <label className="block text-[11px] text-gray-500 mb-1">나이 (살)</label>
          <input name="age" type="number" min="1" max="20" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400 bg-white" />
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] text-gray-500 mb-1">재료 (쉼표로 구분)</label>
          <input name="materials" placeholder="예: 연필, 스케치북" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-gray-400 bg-white" />
        </div>
        <div className="col-span-2">
          <label className="block text-[11px] text-gray-500 mb-1">이미지</label>
          <input
            ref={fileRef}
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-[12px] text-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[11px] file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
          />
          {preview && (
            <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>

      {error && <p className="text-[11px] text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 text-white text-[13px] font-medium py-2.5 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
      >
        {loading ? '저장 중…' : '저장'}
      </button>
    </form>
  );
}
