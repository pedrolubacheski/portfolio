/**
 * Resolves files served from Vite's public directory while respecting the
 * configured base path (for example, /portfolio/ on GitHub Pages).
 */
export function publicAsset(path) {
  const normalizedPath = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
}
