/* ============================================================
   loader.js — Lazy-load sections from external HTML files
   ============================================================ */

/**
 * Loads the HTML content for a section if it hasn't been loaded yet.
 * @param {string} id - The section ID (matching the filename in /sections)
 */
async function loadSection(id) {
  const container = document.getElementById(`section-${id}`);
  
  // If no container found or already has content, skip loading
  if (!container || container.dataset.loaded === "true") return;

  try {
    // Show a subtle loading state if needed (optional)
    // container.innerHTML = '<div class="loading">Loading module...</div>';

    const response = await fetch(`sections/${id}.html`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const html = await response.text();
    container.innerHTML = html;
    container.dataset.loaded = "true";

    // Special case: Quiz engine boot
    // If we just loaded the quiz container, we need to tell the quiz engine to render
    if (id === 'quiz' && typeof renderQuiz === 'function') {
      renderQuiz();
    }
    
    // Dispatch event if other scripts need to know a section loaded
    container.dispatchEvent(new CustomEvent('sectionLoaded', { 
      detail: { id },
      bubbles: true 
    }));

  } catch (err) {
    console.error(`[Loader] Failed to load ${id}:`, err);
    container.innerHTML = `
      <div class="card coral">
        <div class="card-title">Load Error</div>
        <p>Failed to load the <b>${id}</b> module.</p>
        <p style="font-size: 0.8rem; margin-top: 8px; color: var(--muted)">
          Note: Fetching local files requires a web server (e.g., Live Server, Nginx, or Node).
        </p>
      </div>`;
  }
}

// Attach to window so tabs.js can access it
window.loadSection = loadSection;

// Initial load for the active section on page start
document.addEventListener('DOMContentLoaded', () => {
  const activeSection = document.querySelector('.section.active');
  if (activeSection) {
    const id = activeSection.id.replace('section-', '');
    loadSection(id);
  }
});
