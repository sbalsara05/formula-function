# F1 landing ergonomics report

Base URL: `http://localhost:3000`
Generated: 2026-07-30T03:34:49.905Z

**34 pass · 0 warn · 0 fail**

| ID | Severity | Title | Detail | ms |
|----|----------|-------|--------|----|
| tabs-order | pass | Nav tab order matches DOM section order | #dna → #news → #standings → #eras → #teams → #drivers → #venues |  |
| tab-dna-scroll | pass | Scroll to #dna lands under sticky header | viewport top=81.9px (target ~85.9px, drift 4.0px) | 402 |
| tab-dna-hash | pass | Hash updates to #dna | got #dna |  |
| tab-dna-active | pass | Active state on #dna | aria-current=true |  |
| tab-news-scroll | pass | Scroll to #news lands under sticky header | viewport top=86.4px (target ~85.9px, drift 0.5px) | 889 |
| tab-news-hash | pass | Hash updates to #news | got #news |  |
| tab-news-active | pass | Active state on #news | aria-current=true |  |
| tab-standings-scroll | pass | Scroll to #standings lands under sticky header | viewport top=86.4px (target ~85.9px, drift 0.5px) | 872 |
| tab-standings-hash | pass | Hash updates to #standings | got #standings |  |
| tab-standings-active | pass | Active state on #standings | aria-current=true |  |
| tab-eras-scroll | pass | Scroll to #eras lands under sticky header | viewport top=86.4px (target ~85.9px, drift 0.5px) | 877 |
| tab-eras-hash | pass | Hash updates to #eras | got #eras |  |
| tab-eras-active | pass | Active state on #eras | aria-current=true |  |
| tab-teams-scroll | pass | Scroll to #teams lands under sticky header | viewport top=85.8px (target ~85.9px, drift 0.1px) | 997 |
| tab-teams-hash | pass | Hash updates to #teams | got #teams |  |
| tab-teams-active | pass | Active state on #teams | aria-current=true |  |
| tab-drivers-scroll | pass | Scroll to #drivers lands under sticky header | viewport top=86.3px (target ~85.9px, drift 0.4px) | 750 |
| tab-drivers-hash | pass | Hash updates to #drivers | got #drivers |  |
| tab-drivers-active | pass | Active state on #drivers | aria-current=true |  |
| tab-venues-scroll | pass | Scroll to #venues lands under sticky header | viewport top=85.8px (target ~85.9px, drift 0.1px) | 884 |
| tab-venues-hash | pass | Hash updates to #venues | got #venues |  |
| tab-venues-active | pass | Active state on #venues | aria-current=true |  |
| driver-link-visible | pass | driver entry point visible after tab → #drivers | a[href="/f/1/driver/leclerc"] | 1397 |
| driver-page-load | pass | Open driver page from landing | href=/f/1/driver/leclerc title="f(x) — motorsport analytics" h1="Leclerc" | 100 |
| driver-back-nav | pass | Browser back returns toward F1 landing from driver | url=http://localhost:3000/f/1#drivers | 413 |
| team-link-visible | pass | team entry point visible after tab → #teams | a[href="/f/1/team/ferrari"] | 1399 |
| team-page-load | pass | Open team page from landing | href=/f/1/team/ferrari title="f(x) — motorsport analytics" h1="Ferrari" | 131 |
| team-back-nav | pass | Browser back returns toward F1 landing from team | url=http://localhost:3000/f/1#teams | 420 |
| venue-link-visible | pass | venue entry point visible after tab → #venues | a[href="/f/1/venue/monaco"] | 1511 |
| venue-page-load | pass | Open venue page from landing | href=/f/1/venue/monaco title="f(x) — motorsport analytics" h1="Circuit de Monaco" | 101 |
| venue-back-nav | pass | Browser back returns toward F1 landing from venue | url=http://localhost:3000/f/1#venues | 404 |
| teams-duplicate | pass | Single clear teams entry section | {"teamLinksInTeams":11,"teamLinksInBrowse":0,"hasBrowseTeams":false} |  |
| mobile-nav-overflow | pass | Mobile nav is horizontally scrollable (expected for many tabs) | scrollWidth=453 clientWidth=334 overflowX=auto |  |
| mobile-venues-reach | pass | Mobile: VENUES tab reachable and scrolls to section | visible=true top=85.5 headerH=81.9 drift=3.6 lastFullyVisibleWithoutScroll=false |  |
