const SITE_INDEX = [
  { title: 'Home', url: 'index.html', desc: 'Homepage — research focus, join, and highlights' },
  { title: 'Publications', url: 'publications.html', desc: 'Publications library, submission guidelines, and department lists' },
  { title: 'Research Team', url: 'ResearchTeam.html', desc: 'Leadership, directors, and researcher list' },
  { title: 'About', url: 'about.html', desc: 'About the organization and contact information' },
  { title: 'AI in Healthcare', url: 'publications-healthcare.html', desc: 'Healthcare department publications' },
  { title: 'Computer Science', url: 'publications-cs.html', desc: 'Computer Science department publications' },
  { title: 'STEM Education', url: 'publications-stem.html', desc: 'STEM Education department publications' },
  { title: 'Law & Ethics', url: 'publications-ethics.html', desc: 'Law and Ethics department publications' },
  { title: 'Education Research', url: 'publications-education.html', desc: 'Education research and outreach' },
  { title: 'Community Projects', url: 'community-projects.html', desc: 'Community STEM projects and showcases' },
  { title: 'Brooke Regan', url: 'brooke-regan.html', desc: 'Founder and president profile' },
  { title: 'Eileen Shao', url: 'eileen-shao.html', desc: 'Digital strategy director profile' },
  { title: 'Sherlyn Pua', url: 'sherlyn-pua.html', desc: 'Fundraising director profile' },
  { title: 'Cade Konishi', url: 'cade-konishi.html', desc: 'STEM research director profile' },
  { title: 'Vince Lin', url: 'vince-lin.html', desc: 'Computer science research director profile' },
  { title: 'Amiyah Rockingham', url: 'amiyah-rockingham.html', desc: 'Law and ethics research director profile' },
  { title: 'Iris He', url: 'iris-he.html', desc: 'Education research director profile' },
  { title: 'Mark Sangalang', url: 'mark-sangalang.html', desc: 'Healthcare research director profile' },
  { title: 'Daniella Soto-Rodriguez', url: 'daniella-soto-rodriguez.html', desc: 'Researcher profile' },
  { title: 'Jency Nguyen', url: 'jency-nguyen.html', desc: 'Researcher profile' },
  { title: 'Angela Zhao', url: 'angela-zhao.html', desc: 'Researcher profile' },
  { title: 'Hanyu Zhang', url: 'hanyu-zhang.html', desc: 'Researcher profile' },
  { title: 'Kali Bosworth', url: 'kali-bosworth.html', desc: 'Researcher profile' },
  { title: 'Giani Powell', url: 'giani-powell.html', desc: 'Researcher profile' }
];

function renderSiteResults(query) {
  const container = document.getElementById('site-search-results');
  if (!container) return;
  const q = (query || '').trim().toLowerCase();
  container.innerHTML = '';
  if (!q) { container.style.display = 'none'; container.setAttribute('aria-hidden','true'); return; }
  const results = SITE_INDEX.filter(item => (item.title + ' ' + item.desc).toLowerCase().includes(q));
  if (results.length === 0) {
    const el = document.createElement('div'); el.className = 'result'; el.textContent = 'No results'; container.appendChild(el);
  } else {
    results.slice(0,8).forEach(item => {
      const el = document.createElement('div'); el.className = 'result';
      el.innerHTML = `<strong style="color:var(--text)">${item.title}</strong><div style="font-size:0.85rem;color:var(--muted)">${item.desc}</div>`;
      el.addEventListener('click', () => { window.location.href = item.url; });
      container.appendChild(el);
    });
  }
  container.style.display = 'block';
  container.setAttribute('aria-hidden','false');
}

function attachSiteSearch() {
  const input = document.getElementById('site-search');
  const results = document.getElementById('site-search-results');
  if (!input || !results) return;
  input.addEventListener('input', (e) => renderSiteResults(e.target.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { results.style.display = 'none'; input.blur(); }
  });
  document.addEventListener('click', (e) => {
    if (!results.contains(e.target) && e.target !== input) { results.style.display = 'none'; }
  });
}

function attachPaperSearch() {
  const input = document.getElementById('paper-search');
  if (!input) return;
  const cards = Array.from(document.querySelectorAll('.publication-card')) || Array.from(document.querySelectorAll('.card'));
  input.addEventListener('input', (e) => {
    const q = (e.target.value || '').trim().toLowerCase();
    cards.forEach(card => {
      const text = (card.textContent || '').toLowerCase();
      card.style.display = q === '' || text.includes(q) ? '' : 'none';
    });
  });
}

function revealObfuscatedEmails() {
  document.querySelectorAll('.obfuscated-email').forEach((el) => {
    const user = (el.dataset.user || '').split('').reverse().join('');
    const domain = (el.dataset.domain || '').split('').reverse().join('');
    if (!user || !domain) return;
    const email = `${user}@${domain}`;
    el.textContent = email;
    el.href = `mailto:${email}`;
    el.setAttribute('aria-label', email);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  attachSiteSearch();
  attachPaperSearch();
  revealObfuscatedEmails();
});
