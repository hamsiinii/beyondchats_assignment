export const API_BASE = "http://localhost:3000";

export async function fetchArticles() {
  const res = await fetch(`${API_BASE}/articles`);
  return res.json();
}
