/** Enable only after the real-product sandbox is deployed and its entry flow is verified. */
export const onoSuiteDemo: { oneUrl: string | null; compassUrl: string | null; release: string | null } = {
  oneUrl: 'https://ono-one-demo.vercel.app/experience',
  compassUrl: 'https://ono-compass-demo.vercel.app/auth/start',
  release: '2026.11.11.demo1',
};

export function verifiedDemoUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}
