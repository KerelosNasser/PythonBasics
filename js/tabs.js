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
function switchTab(id, event) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

  // Deactivate all tab buttons
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  // Activate target section
  document.getElementById(`section-${id}`).classList.add('active');

  // Activate clicked button
  (event?.target ?? document.querySelector(`[data-tab="${id}"]`))
    .classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
