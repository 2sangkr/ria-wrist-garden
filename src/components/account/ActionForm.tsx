'use client';
import { useActionState } from 'react';
import type { ActionResult } from '@/app/my/actions';
export default function ActionForm({ action, children, label, confirm, className = 'space-y-4', buttonClassName = 'bg-gray-900 text-white rounded-xl px-5 py-3' }: {
 action: (state: ActionResult, form: FormData) => Promise<ActionResult>;
 children?: React.ReactNode; label: string; confirm?: string; className?: string; buttonClassName?: string;
}) {
 const [state, submit, pending] = useActionState(action, {});
 return <form action={submit} onSubmit={e => { if (confirm && !window.confirm(confirm)) e.preventDefault(); }} className={className}>
 {children}{state.error && <p role="alert" className="text-red-700">{state.error}</p>}
 <button disabled={pending} className={buttonClassName + ' disabled:opacity-50'}>{pending ? '처리 중…' : label}</button></form>;
}
