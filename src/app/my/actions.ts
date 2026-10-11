'use server';
import { sendTelegram } from '@/lib/telegram';
import { accountContext, accountClient } from '@/lib/account-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { checkedImage, workFields } from '@/lib/work-validation';

export type ActionResult = { error?: string };
export async function saveWork(_state: ActionResult, form: FormData): Promise<ActionResult> {
  const ctx = (await accountContext(true))!;
  const artistId = String(form.get('artist_id') ?? '');
  const id = String(form.get('id') ?? '');
  const { data: allowed, error: permissionError } = await ctx.client.rpc('can_manage_artist', { target_artist: artistId });
  if (permissionError || !allowed) return { error: '이 작가의 작품을 관리할 권한이 없어요.' };
  const { data: artist } = await ctx.client.from('artists').select('slug').eq('id', artistId).single();
  if (!artist) return { error: '작가를 찾을 수 없어요.' };
  let old: { image: string; slug: string } | null = null;
  if (id) {
    const { data } = await ctx.client.from('works').select('image,slug').eq('id', id).eq('artist_id', artistId).is('deleted_at', null).single();
    if (!data) return { error: '수정할 작품을 찾을 수 없어요.' };
    old = data;
  }
  let fields;
  try { fields = workFields(form); } catch { return { error: '제목, 날짜, 나이, 설명 입력을 확인해 주세요.' }; }
  const file = form.get('image');
  let image = old?.image ?? '';
  let uploadedPath: string | null = null;
  try {
    if (file instanceof File && file.size > 0) {
      const checked = await checkedImage(file);
      uploadedPath = artistId + '/' + crypto.randomUUID() + '.' + checked.ext;
      const { error } = await ctx.client.storage.from('works').upload(uploadedPath, checked.bytes, { contentType: checked.type, upsert: false });
      if (error) return { error: '사진 업로드에 실패했어요.' };
      image = ctx.client.storage.from('works').getPublicUrl(uploadedPath).data.publicUrl;
    }
  } catch (e) { return { error: e instanceof Error ? e.message : '사진을 확인해 주세요.' }; }
  if (!image) return { error: '작품 사진을 선택해 주세요.' };
  const slug = old?.slug ?? 'work-' + crypto.randomUUID();
  const result = id
    ? await ctx.client.from('works').update({ ...fields, image }).eq('id', id).eq('artist_id', artistId).is('deleted_at', null).select('id').single()
    : await ctx.client.from('works').insert({ ...fields, image, artist_id: artistId, slug }).select('id').single();
  if (result.error) {
    if (uploadedPath) await ctx.client.storage.from('works').remove([uploadedPath]);
    return { error: '작품을 저장하지 못했어요. 다시 시도해 주세요.' };
  }
  // Keep replaced images for recovery. No permanent file deletion in this release.
  revalidatePath('/'); revalidatePath('/artist/' + artist.slug); revalidatePath('/artist/' + artist.slug + '/' + slug);
  redirect('/artist/' + artist.slug + '/' + slug);
}
export async function moveWork(_state: ActionResult, form: FormData): Promise<ActionResult> {
  const ctx = (await accountContext(true))!;
  const id = String(form.get('id') ?? '');
  const restore = form.get('restore') === 'true';
  const { data: work } = await ctx.client.from('works').select('artist_id').eq('id', id).single();
  if (!work) return { error: '작품을 찾을 수 없어요.' };
  const { data: allowed, error } = await ctx.client.rpc('can_manage_artist', { target_artist: work.artist_id });
  if (error || !allowed) return { error: '작품 관리 권한이 없어요.' };
  const { data: artist } = await ctx.client.from('artists').select('slug').eq('id', work.artist_id).single();
  const { error: updateError } = await ctx.client.from('works').update({ deleted_at: restore ? null : new Date().toISOString() }).eq('id', id).select('id').single();
  if (updateError) return { error: '변경하지 못했어요. 다시 시도해 주세요.' };
  revalidatePath('/'); revalidatePath('/artist/' + artist?.slug); revalidatePath('/my/trash');
  redirect(restore ? '/my/trash' : '/artist/' + artist?.slug);
}
export async function logout() {
  const client = await accountClient();
  await client.auth.signOut();
  redirect('/');
}
export async function applyArtist(_state: ActionResult, form: FormData): Promise<ActionResult> {
  const ctx = (await accountContext(true))!;
  const name = String(form.get('name') ?? '').trim();
  const bio = String(form.get('bio') ?? '').trim();
  const email = String(form.get('contact_email') ?? '').trim();
  const referral = String(form.get('referral') ?? '').trim();
  if (!name || name.length > 80 || !bio || bio.length > 2000 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || referral.length > 200 || form.get('acknowledged') !== 'on')
    return { error: '필수 항목과 작품 보관 안내 확인을 입력해 주세요.' };
  const { error } = await ctx.client.from('artist_applications').insert({ user_id: ctx.user.id, name, bio, contact_email: email, referral });
  if (error) return { error: '신청하지 못했어요. 대기 중인 신청이 있는지 확인해 주세요.' };
  try { await sendTelegram('📮 <b>작가 등록 신청 도착!</b>\n\n신청 관리에서 확인해 주세요.\nhttps://mymomo.gallery/my/admin'); } catch { console.error('Artist application notification failed'); }
  revalidatePath('/my'); redirect('/my');
}
export async function reviewApplication(_state: ActionResult, form: FormData): Promise<ActionResult> {
  const ctx = (await accountContext(true))!;
  const { error } = await ctx.client.rpc('review_artist_application', {
    application_id: String(form.get('application_id') ?? ''),
    approve: form.get('approve') === 'true',
    existing_artist: String(form.get('existing_artist') ?? '') || null,
  });
  if (error) return { error: '승인 처리에 실패했어요. 운영자 권한과 신청 상태를 확인해 주세요.' };
  revalidatePath('/my/admin'); revalidatePath('/'); return {};
}

