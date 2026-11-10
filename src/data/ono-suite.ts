/** Enable only after the real-product sandbox is deployed and its entry flow is verified. */
export const onoSuiteDemo: { oneUrl: string | null; compassUrl: string | null; release: string | null } = {
  oneUrl: null,
  compassUrl: null,
  release: null,
};

export function verifiedDemoUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}
