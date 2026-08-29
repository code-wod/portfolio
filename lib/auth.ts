import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getAdminSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session || (session.user as any)?.role !== 'admin') {
    return null;
  }
  return session;
}