#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { pinnedNamesFromHtml, selectPinned, normalizeRepo, normalizeWorks } from './profile-data.mjs';
import { renderRepos, renderScripts, renderPublications } from '../profile-view.mjs';

const GITHUB_USER = 'Kiragroh';
const ORCID = '0000-0002-6909-811X';
const root = new URL('..', import.meta.url);

async function get(url, accept = 'application/json') {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Kiragroh.github.io profile updater', Accept: accept },
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return accept === 'application/json' ? response.json() : response.text();
}

async function getRepos() {
  const repos = [];
  for (let page = 1; ; page++) {
    const batch = await get(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${page}&sort=updated`);
    repos.push(...batch);
    if (batch.length < 100) return repos;
  }
}

const scriptGroups = [
  { id: 'aria', title: 'ARIA · interfaces & data', names: ['ARIA-API_CustomerRepo', 'ARIA18-Throughput-Collector', 'ESAPI_DICOMrt-Mining'] },
  { id: 'esapi', title: 'ESAPI · planning & quality', names: ['ESAPI-Runner-Hub', 'ClearPlan-OpenSource', 'PAM-BAM', 'ESAPI_Beam-Namer', 'ESAPI_SingleFilePlugins', 'ESAPI_DataMiner_PortalDosimetry'] },
];

function replaceSnapshot(html, id, content) {
  const start = `<!-- ${id}:start -->`;
  const end = `<!-- ${id}:end -->`;
  if (!html.includes(start) || !html.includes(end)) throw new Error(`Missing static snapshot marker: ${id}`);
  return html.replace(new RegExp(`${start}[\\s\\S]*?${end}`), () => `${start}\n${content}\n${end}`);
}

async function main() {
  const [reposRaw, worksRaw, profileHtml, oldData, originalHtml] = await Promise.all([
    getRepos(),
    get(`https://pub.orcid.org/v3.0/${ORCID}/works`),
    get(`https://github.com/${GITHUB_USER}`, 'text/html'),
    readFile(new URL('data/profile.json', root), 'utf8').then(JSON.parse),
    readFile(new URL('index.html', root), 'utf8'),
  ]);
  const repositories = selectPinned(reposRaw, pinnedNamesFromHtml(profileHtml));
  const scripts = scriptGroups.map(group => ({
    id: group.id, title: group.title,
    repositories: group.names.filter(name => !repositories.some(repo => repo.name === name)).map(name => {
      const repo = reposRaw.find(repo => repo.name === name);
      if (!repo) throw new Error(`Script repository missing from API response: ${name}`);
      return normalizeRepo(repo);
    }),
  })).filter(group => group.repositories.length);
  const works = normalizeWorks(worksRaw, ORCID);
  if (!works.length) throw new Error('ORCID returned no works; keeping the previous snapshot.');
  const data = {
    generatedAt: new Date().toISOString(),
    profile: { ...oldData.profile, avatar: 'assets/github-avatar.png' },
    metrics: { publicRepositories: reposRaw.filter(repo => !repo.fork).length, selectedRepositories: repositories.length, orcidWorks: worksRaw.group.length },
    repositories, scripts, publications: works.slice(0, 8),
  };
  let html = replaceSnapshot(originalHtml, 'pinned-repos', renderRepos(repositories));
  html = replaceSnapshot(html, 'script-groups', renderScripts(scripts));
  html = replaceSnapshot(html, 'publications', renderPublications(data.publications));
  html = html.replace(/(<b id="repoCount">)[^<]*/, `$1${data.metrics.publicRepositories}`)
    .replace(/(<b id="selectedCount">)[^<]*/, `$1${repositories.length}`)
    .replace(/(<b id="updatedAt">)[^<]*/, `$1${data.generatedAt.slice(0, 10)}`);
  await mkdir(new URL('data/', root), { recursive: true });
  await writeFile(new URL('data/profile.json', root), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  await writeFile(new URL('index.html', root), html, 'utf8');
  console.log(`Updated ${repositories.length} pins, ${scripts.reduce((sum, group) => sum + group.repositories.length, 0)} scripts and ${data.publications.length} publications (${worksRaw.group.length} ORCID groups).`);
  console.log(`Pins: ${repositories.map(repo => repo.name).join(', ')}`);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
