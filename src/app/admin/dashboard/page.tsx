import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getAllArtistsWithWorks } from '@/lib/data';
import AdminClient from './AdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token || token !== process.env.ADMIN_PASSWORD) {
    redirect('/admin');
  }

  const artists = await getAllArtistsWithWorks();
  return <AdminClient artists={artists} />;
}
