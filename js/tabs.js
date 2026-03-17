/* ============================================================
   tabs.js — Tab switching
   ============================================================ */

/**
 * Activate a content section and its matching tab button.
 * Called from each tab button's onclick attribute.
 *
 * @param {string} id - Section id suffix (e.g. "types", "quiz")
 * @param {MouseEvent} event - Click event (passed automatically via onclick)
 */
async function switchTab(id, event) {
  // 1. Lazy-load the section if needed
  if (window.loadSection) {
    await window.loadSection(id);
  }

  // 2. Hide all sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

  // 3. Deactivate all tab buttons
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  // 4. Activate target section
  const target = document.getElementById(`section-${id}`);
  if (target) target.classList.add('active');

  // 5. Activate clicked button
  // If event is null (manual call), find the button by data attribute
  const btn = event?.currentTarget || document.querySelector(`[data-tab="${id}"]`);
  if (btn) btn.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
