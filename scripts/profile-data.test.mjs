import test from 'node:test';
import assert from 'node:assert/strict';
import { pinnedNamesFromHtml, selectPinned, normalizeDoi, normalizeWorks } from './profile-data.mjs';
import { renderRepos, renderScripts } from '../profile-view.mjs';

test('only profile pins are selected, in profile order rather than star order', () => {
  const html = '<a href="/Kiragroh/Other"><span class="repo">Other</span></a><ol class="js-pinned-items-reorder-list"><li><a href="/Kiragroh/B"><span class="repo">B</span></a></li><li><a href="/Kiragroh/A"><span class="repo">A</span></a></li></ol>';
  const names = pinnedNamesFromHtml(html);
  assert.deepEqual(names, ['B', 'A']);
  assert.deepEqual(selectPinned([{name:'A'}, {name:'Other', stargazers_count:1000}, {name:'B'}], names).map(repo => repo.name), names);
  assert.throws(() => pinnedNamesFromHtml('<html>Temporarily unavailable</html>'), /not found/);
  assert.throws(() => selectPinned([], names), /missing/);
});

test('DOIs supplied as URLs cannot produce doubled resolver prefixes', () => {
  for (const value of ['10.1016/j.phro.2026.100942', 'https://doi.org/10.1016/j.phro.2026.100942', 'doi: 10.1016/j.phro.2026.100942']) {
    assert.equal(normalizeDoi(value), '10.1016/j.phro.2026.100942');
  }
});

test('ORCID uses full available dates, preferred metadata and unique DOIs', () => {
  const summary = (title, year, month, day, doi, index = '0') => ({ title:{title:{value:title}}, 'publication-date':{year:{value:year}, month:month && {value:month}, day:day && {value:day}}, 'display-index':index, 'external-ids':{'external-id':[{'external-id-type':'doi','external-id-value':doi}]}});
  const result = normalizeWorks({group:[
    {'work-summary':[summary('January', '2026','01','08','10.1/early')]},
    {'work-summary':[summary('Unpreferred', '2026','07','03','10.1/latest'), summary('Preferred', '2026','07',null,'10.1/latest','1')]},
    {'work-summary':[summary('Year only', '2026',null,null,'10.1/year')]},
    {'work-summary':[summary('Duplicate', '2026','01','08','https://doi.org/10.1/early')]},
  ]}, 'example');
  assert.equal(result.length, 3);
  assert.equal(result[0].title, 'Preferred');
  assert.equal(result[0].date, '2026-07-03');
  assert.equal(result[1].date, '2026-01-08');
  assert.equal(result[2].date, '2026');
  assert.equal(result[1].url, 'https://doi.org/10.1/early');
});

test('external metadata is escaped and script disclosures start closed', () => {
  const repo = {name:'<script>alert(1)</script>', url:'javascript:alert(1)', description:'"<img src=x onerror=alert(1)>', stars:0};
  const html = renderRepos([repo]);
  assert.ok(!html.includes('<script>'));
  assert.ok(!html.includes('href="javascript:'));
  assert.ok(html.includes('&lt;img'));
  const details = renderScripts([{id:'esapi',title:'ESAPI',repositories:[repo]}]);
  assert.ok(details.includes('<details class="script-group">'));
  assert.ok(!details.includes('<details open'));
});
