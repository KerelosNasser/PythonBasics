/* ============================================================
   copy.js — Copy code block to clipboard
   ============================================================ */

/**
 * Copy the text of a <pre> block to the clipboard.
 * Strips the "copy" / "copied" button label from the captured text.
 *
 * @param {HTMLButtonElement} btn - The copy button that was clicked
 */
function cpCode(btn) {
  const pre  = btn.parentElement;
  const text = pre.innerText
    .replace(/^copy\n?/, '')
    .replace(/^copied\n?/, '')
    .trim();

  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'copied';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'copy';
      btn.classList.remove('copied');
    }, 1500);
  });
}
