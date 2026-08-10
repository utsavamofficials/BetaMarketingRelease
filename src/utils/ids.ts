/** Small dependency-free id generator (avoids pulling in uuid for a beta build). */
export function generateId(prefix = ''): string {
  const random = Math.random().toString(36).slice(2, 10);
  const time = Date.now().toString(36);
  return `${prefix}${prefix ? '_' : ''}${time}${random}`;
}

/** Short, human-shareable receipt code, e.g. UTS-8F3K2Q */
export function generateReceiptCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `UTS-${code}`;
}
