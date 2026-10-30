export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
const safeUrl = value => /^https:\/\//i.test(value || '') ? escapeHtml(value) : '#';

export function renderRepos(repos) {
  return repos.map(repo => `<article class="card repo"><div class="repo-top"><span class="repo-kicker">Pinned on GitHub</span><span class="lang">${escapeHtml(repo.language)}</span></div><h3><a href="${safeUrl(repo.url)}" target="_blank" rel="noreferrer">${escapeHtml(repo.name)}<span aria-hidden="true"> ↗</span></a></h3><p>${escapeHtml(repo.description)}</p><div class="repo-footer"><span>★ ${Number(repo.stars || 0)}</span><a href="${safeUrl(repo.url)}" target="_blank" rel="noreferrer">View repository <span aria-hidden="true">↗</span></a></div></article>`).join('\n');
}

export function renderScripts(groups) {
  return groups.map(group => `<details class="script-group"><summary><span>${escapeHtml(group.title)}</span><span class="script-count">${group.repositories.length}</span></summary><ul class="script-list">${group.repositories.map(repo => `<li><a href="${safeUrl(repo.url)}" target="_blank" rel="noreferrer">${escapeHtml(repo.name)} <span aria-hidden="true">↗</span></a><p>${escapeHtml(repo.description)}</p></li>`).join('')}</ul>${group.id === 'esapi' ? '<a class="toolbox-link" href="esapi/">Explore the full ESAPI toolbox <span aria-hidden="true">↗</span></a>' : ''}</details>`).join('\n');
}

export function renderPublications(publications) {
  return publications.map(pub => `<article class="pub"><div class="pub-year">${escapeHtml(pub.year || '—')}</div><div><a href="${safeUrl(pub.url)}" target="_blank" rel="noreferrer">${escapeHtml(pub.title)}</a><div class="pub-meta">${escapeHtml(pub.journal)}${pub.date ? ` · <time datetime="${escapeHtml(pub.date)}">${escapeHtml(pub.date)}</time>` : ''}</div></div></article>`).join('\n');
}
