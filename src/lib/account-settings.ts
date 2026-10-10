export const accountsEnabled = () => process.env.ARTIST_ACCOUNTS_ENABLED === 'true';

// Keep registration-only links for the four artists registered before accounts.
const legacyArtistSlugs = new Set(['dhee', 'james', 'emma', 'evan']);
export const legacyUploadAllowed = (slug: string) => !accountsEnabled() || legacyArtistSlugs.has(slug);

