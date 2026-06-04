#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';

const GITHUB_USER = 'Kiragroh';
const ORCID = '0000-0002-6909-811X';
const root = new URL('..', import.meta.url);
const outFile = new URL('data/profile.json', root);

async function getJson(url, headers = {}) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Kiragroh.github.io profile updater',
      'Accept': 'application/json',
      ...headers,
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`);
  return res.json();
}

function repoScore(repo) {
  const text = `${repo.name} ${repo.description || ''}`.toLowerCase();
  const domainBoost = [
    'dicom', 'radiotherapy', 'rt-', 'rt_', 'esapi', 'monai', 'dose', 'medical',
    'clinical', 'srs', 'segmentation', 'patient', 'clearplan', 'aria', 'imaging'
  ].some((word) => text.includes(word)) ? 100 : 0;
  return domainBoost + (repo.stargazers_count || 0) * 3 + (repo.forks_count || 0) * 2 + new Date(repo.pushed_at).getTime() / 1e13;
}

function normalizeRepos(repos) {
  return repos
    .filter((repo) => !repo.fork && !repo.archived && repo.name !== `${GITHUB_USER}.github.io`)
    .sort((a, b) => repoScore(b) - repoScore(a))
    .slice(0, 9)
    .map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description || 'Open-source clinical tooling and automation project.',
      language: repo.language || 'Code',
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      updated: repo.pushed_at,
      topics: repo.topics || [],
    }));
}

function titleCaseFromWork(work) {
  const title = work?.title?.title?.value || work?.title?.value || 'Untitled work';
  return String(title).replace(/\s+/g, ' ').trim();
}

function doiFromWork(work) {
  const ids = work?.['external-ids']?.['external-id'] || [];
  const doi = ids.find((id) => String(id?.['external-id-type']).toLowerCase() === 'doi');
  return doi?.['external-id-value'] || null;
}

function normalizeWorks(grouped) {
  const groups = grouped?.group || [];
  return groups.map((group) => {
    const summary = group?.['work-summary']?.[0] || {};
    const year = summary?.['publication-date']?.year?.value || '';
    const doi = doiFromWork(summary);
    return {
      title: titleCaseFromWork(summary),
      year,
      doi,
      url: doi ? `https://doi.org/${doi}` : (summary?.url?.value || `https://orcid.org/${ORCID}`),
      journal: summary?.['journal-title']?.value || '',
      type: summary?.type || '',
    };
  }).filter((work) => work.title && work.title !== 'Untitled work')
    .sort((a, b) => String(b.year).localeCompare(String(a.year)))
    .slice(0, 8);
}

async function main() {
  const generatedAt = new Date().toISOString();
  const [reposRaw, worksRaw] = await Promise.all([
    getJson(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`),
    getJson(`https://pub.orcid.org/v3.0/${ORCID}/works`, { Accept: 'application/json' }),
  ]);

  const data = {
    generatedAt,
    profile: {
      name: 'Maximilian Grohmann',
      role: 'Medical Informatics Specialist',
      location: 'Leipzig, Germany',
      github: `https://github.com/${GITHUB_USER}`,
      linkedin: 'https://www.linkedin.com/in/maximilian-grohmann-b70588b1',
      orcid: `https://orcid.org/${ORCID}`,
    },
    metrics: {
      publicRepositories: reposRaw.filter((repo) => !repo.fork).length,
      selectedRepositories: normalizeRepos(reposRaw).length,
      orcidWorks: worksRaw?.group?.length || 0,
    },
    repositories: normalizeRepos(reposRaw),
    publications: normalizeWorks(worksRaw),
  };

  await mkdir(new URL('data/', root), { recursive: true });
  await writeFile(outFile, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`Updated ${outFile.pathname}`);
  console.log(`Repos: ${data.repositories.length}; publications: ${data.publications.length}; generatedAt: ${generatedAt}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
