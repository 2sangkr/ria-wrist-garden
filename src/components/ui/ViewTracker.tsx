'use client';
import { useEffect } from 'react';

export function ViewTracker({ path }: { path: string }) {
  useEffect(() => {
    fetch('/api/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
      keepalive: true,
    }).catch(() => {});
  }, [path]);
  return null;
}
