/* ============================================================
   tabs.js — Tab switching
   ============================================================ */

/**
 * Switch between the primary pillars: Leaderboard, Study, Quizzes.
 * @param {string} pillarId - 'leaderboard', 'study', or 'quiz'
 */
async function switchPillar(pillarId) {
  // 1. Deactivate all primary buttons
  document.querySelectorAll('.nav-btn.primary').forEach(b => b.classList.remove('active'));
  
  // 2. Activate target pillar button
  const btn = document.querySelector(`[data-pillar="${pillarId}"]`);
  if (btn) btn.classList.add('active');

  // 3. Handle sub-navigation visibility
  const subnav = document.getElementById('study-subnav');
  if (pillarId === 'study') {
    subnav.classList.add('active');
    // Auto-load first study topic if none is active
    const activeSub = subnav.querySelector('.tab-btn.active');
    if (!activeSub) {
      const firstTab = subnav.querySelector('.tab-btn');
      if (firstTab) firstTab.click();
    }
  } else {
    subnav.classList.remove('active');
    // For Leaderboard and Quiz, they are direct sections
    await switchTab(pillarId, null);
  }
}

/**
 * Activate a content section and its matching tab button.
 */
async function switchTab(id, event) {
  // 1. Lazy-load the section if needed
  if (window.loadSection) {
    await window.loadSection(id);
  }

  // 2. Hide all sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

  // 3. Deactivate Topic tab buttons (Study sub-nav)
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  // 4. Activate target section
  const target = document.getElementById(`section-${id}`);
  if (target) target.classList.add('active');

  // 5. Activate clicked button in sub-nav (if it exists)
  const btn = event?.currentTarget || document.querySelector(`.tab-btn[data-tab="${id}"]`);
  if (btn) btn.classList.add('active');

  // 6. Ensure correct pillar is active for direct calls
  if (id === 'leaderboard' || id === 'quiz') {
    document.querySelectorAll('.nav-btn.primary').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-pillar="${id}"]`)?.classList.add('active');
    document.getElementById('study-subnav')?.classList.remove('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
