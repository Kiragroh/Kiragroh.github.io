export function pinnedNamesFromHtml(html) {
  const list = html.match(/<ol\b[^>]*class="[^"]*js-pinned-items-reorder-list[^"]*"[^>]*>([\s\S]*?)<\/ol>/)?.[1];
  if (!list) throw new Error('GitHub pinned repository list not found; keeping the previous snapshot.');
  const names = [...list.matchAll(/href="\/Kiragroh\/([^"/]+)"[^>]*>\s*<span class="repo"/g)].map(match => match[1]);
  if (!names.length || names.length > 6 || new Set(names).size !== names.length) throw new Error('Unexpected GitHub pin list; keeping the previous snapshot.');
  return names;
}

export function normalizeRepo(repo) {
  return { name: repo.name, url: repo.html_url, description: repo.description || '', language: repo.language || 'Code', stars: repo.stargazers_count || 0, updated: repo.pushed_at, topics: repo.topics || [] };
}

export function selectPinned(repos, names) {
  return names.map(name => {
    const repo = repos.find(repo => repo.name === name);
    if (!repo) throw new Error(`Pinned repository missing from API response: ${name}`);
    return normalizeRepo(repo);
  });
}

export function normalizeDoi(value) {
  return String(value || '').trim().replace(/^(?:https?:\/\/(?:dx\.)?doi\.org\/|doi:\s*)+/i, '').toLowerCase();
}

export function normalizeWorks(grouped, orcid) {
  const works = (grouped?.group || []).map(group => {
    const summaries = [...(group['work-summary'] || [])].sort((a, b) => Number(b['display-index'] || 0) - Number(a['display-index'] || 0));
    const summary = summaries[0] || {};
    const dates = summaries.map(work => ['year', 'month', 'day'].map(part => work['publication-date']?.[part]?.value).filter(Boolean).join('-')).filter(Boolean);
    // Prefer the most precise date for the same work; never invent a month/day.
    const date = dates.sort((a, b) => b.length - a.length || b.localeCompare(a))[0] || '';
    const ids = summaries.flatMap(work => work['external-ids']?.['external-id'] || []);
    const doi = normalizeDoi(ids.find(id => String(id['external-id-type']).toLowerCase() === 'doi' && id['external-id-relationship'] !== 'part-of')?.['external-id-value']);
    return {
      title: String(summary.title?.title?.value || '').replace(/\s+/g, ' ').trim(),
      year: date.slice(0, 4), date, doi: doi || null,
      url: doi ? `https://doi.org/${doi}` : summary.url?.value || `https://orcid.org/${orcid}`,
      journal: summaries.find(work => work['journal-title']?.value)?.['journal-title'].value || '', type: summary.type || '',
    };
  }).filter(work => work.title).sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  const seen = new Set();
  return works.filter(work => {
    const key = work.doi || work.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
