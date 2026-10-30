# Profile refresh — 2026-10-30

The landing page leads with the six repositories currently pinned on the public GitHub profile, in profile order. ARIA and ESAPI examples sit in two initially closed, keyboard-accessible disclosures underneath. The project section follows the introduction; the primary hero link goes there. The header and favicon use the GitHub avatar. Remove poster links from the landing page; retain the existing poster URL for old external links.

Keep the existing visual identity and English/German switch. Refresh ORCID records, sort by the full available publication date, normalize DOI URLs, and show journal/date metadata. Generate static project/publication markup as well as JSON so the initial page and JavaScript rendering agree.

Implementation and verification:
- Replace score-based project selection in `scripts/update-profile-data.mjs` with public-profile pins. Fetch all repository pages; fail without overwriting data if upstream pins are unavailable.
- Add shared rendering and normalization helpers, plus two curated script groups backed by existing public repositories.
- Update `index.html` and `i18n.js`; retain the ESAPI toolbox link inside its disclosure.
- Test pin ordering, exclusion of non-pinned projects, DOI normalization and ORCID date ordering/deduplication. Run a live refresh.
- Inspect desktop/mobile layouts, keyboard disclosure controls, language switching, links and JavaScript-disabled fallback. Publish and verify GitHub Pages.

## Refreshing the content

Run `node scripts/update-profile-data.mjs` with Node.js 20 or newer. The refresh reads the public GitHub profile and repository API plus the ORCID public API; no token is required. It updates **both** `data/profile.json` and the embedded snapshots in `index.html`. Commit both files when running it in a scheduled job. GitHub pins are authoritative: there is no star-based fallback. An unavailable or unrecognizable pin list fails the refresh before files are written. The browser also reads the JSON snapshot, so data-only refreshes remain compatible.

Run `node --test scripts/profile-data.test.mjs` for the data and rendering regression checks. The GitHub avatar is a local copy of the public profile avatar retrieved on 2026-10-30.
