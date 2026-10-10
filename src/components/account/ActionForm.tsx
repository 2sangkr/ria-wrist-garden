'use client';
import { useActionState } from 'react';
import type { ActionResult } from '@/app/my/actions';
export default function ActionForm({ action, children, label, confirm }: {
 action: (state: ActionResult, form: FormData) => Promise<ActionResult>;
 children?: React.ReactNode; label: string; confirm?: string;
}) {
 const [state, submit, pending] = useActionState(action, {});
 return <form action={submit} onSubmit={e => { if (confirm && !window.confirm(confirm)) e.preventDefault(); }} className="space-y-4">
 {children}{state.error && <p role="alert" className="text-red-700">{state.error}</p>}
 <button disabled={pending} className="bg-gray-900 text-white rounded-xl px-5 py-3 disabled:opacity-50">{pending ? '처리 중…' : label}</button></form>;
}
