export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatMonthlyEquivalent(annual: number, months: number): string {
  return formatInr(Math.round(annual / months));
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

export function maskContact(contact: string): string {
  if (contact.length <= 4) return '••••';
  return `${contact.slice(0, 2)}${'•'.repeat(Math.max(contact.length - 4, 3))}${contact.slice(-2)}`;
}
