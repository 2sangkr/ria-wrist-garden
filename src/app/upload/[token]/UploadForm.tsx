'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = { token: string; artistName: string; artistSlug: string };

export default function UploadForm({ token, artistName, artistSlug }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const fd = new FormData(e.currentTarget);
    fd.set('token', token);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (res.ok) {
        setDone(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? '오류가 발생했어요');
        setLoading(false);
      }
    } catch {
      setError('네트워크 오류가 발생했어요');
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center space-y-4">
        <div className="text-4xl">🎉</div>
        <p className="text-lg font-bold text-gray-900">갤러리에 등록됐어요!</p>
        <p className="text-sm text-gray-400">{artistName}의 작품이 갤러리에 올라갔어요.</p>
        <div className="flex flex-col gap-2 pt-2">
          <Link
            href={`/artist/${artistSlug}`}
            className="block w-full bg-gray-900 text-white text-sm font-medium py-3 rounded-xl hover:bg-gray-700 transition-colors text-center"
          >
            갤러리 보러가기 →
          </Link>
          <a
            href={`/api/card/${token}`}
            download={`${artistName}-명함.png`}
            className="block w-full bg-sky-500 text-white text-sm font-medium py-3 rounded-xl hover:bg-sky-600 transition-colors text-center"
          >
            명함 파일 받기 ↓
          </a>
          <button
            onClick={() => { setDone(false); setPreview(null); formRef.current?.reset(); }}
            className="block w-full text-sm text-gray-400 hover:text-gray-600 py-2"
          >
            작품 더 올리기
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
      <div>
        <label className="block text-xs text-gray-400 mb-1">작품 사진</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
        {preview && (
          <div className="mt-3 w-full aspect-video rounded-xl overflow-hidden relative bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="미리보기" className="w-full h-full object-contain" />
          </div>
        )}
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">작품 제목 *</label>
        <input
          name="title"
          required
          placeholder="예: 바다속의 집"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">만든 날짜 *</label>
          <input
            name="created_at"
            type="date"
            required
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">당시 나이 (살)</label>
          <input
            name="age"
            type="number"
            min="1"
            max="20"
            placeholder="예: 9"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">재료 (쉼표로 구분)</label>
        <input
          name="materials"
          placeholder="예: 수채화, 색연필, 도화지"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 text-white text-sm font-medium py-3 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50"
      >
        {loading ? '올리는 중…' : '갤러리에 올리기'}
      </button>
    </form>
  );
}
