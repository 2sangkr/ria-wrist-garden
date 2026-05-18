import { createHmac } from 'crypto';

const SECRET = process.env.UPLOAD_TOKEN_SECRET ?? 'momo2026gallery';

export function tokenForSlug(slug: string): string {
  const hash = createHmac('sha256', SECRET).update(slug).digest('hex').substring(0, 6);
  return `${slug}-${hash}`;
}

export function slugFromToken(token: string): string | null {
  const lastDash = token.lastIndexOf('-');
  if (lastDash === -1) return null;
  const slug = token.substring(0, lastDash);
  if (!slug) return null;
  return tokenForSlug(slug) === token ? slug : null;
}
