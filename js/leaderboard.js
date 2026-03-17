/* ============================================================
   leaderboard.js — Data and Rendering for Ranking
   ============================================================ */

/**
 * Data for students. 
 * 'name' is student name
 * 'points' is their total score
 * 'badge' is a special label (e.g., "PRO", "MVP", "NEW")
 * 'badgeColor' handles the background for that badge
 */
const students = [
  { name: "Kero", points: 2550, badge: "Master", badgeColor: "#22d3b0" },
  { name: "Nasser", points: 2340, badge: "Pro", badgeColor: "#38bdf8" },
  { name: "zxc", points: 2100, badge: "Rising Star", badgeColor: "#a78bfa" },
  { name: "vcx", points: 1950, badge: "Scholar", badgeColor: "#4ade80" },
  { name: "ces", points: 1800, badge: "Grinder", badgeColor: "#f5c842" },
  { name: "qwe", points: 1650, badge: "Thinker", badgeColor: "#fb923c" },
  { name: "asd", points: 1400, badge: "Active", badgeColor: "#ff6b6b" },
  { name: "rty", points: 1200, badge: "Newbie", badgeColor: "#7070a0" },
  { name: "fgh", points: 1050, badge: "Newbie", badgeColor: "#7070a0" }
];

/**
 * Renders the students into the leaderboard list.
 */
function renderLeaderboard() {
    const list = document.getElementById('leaderboard-list');
    if (!list) return;

    // Sort students by points descending
    const sorted = [...students].sort((a, b) => b.points - a.points);

    list.innerHTML = sorted.map((s, i) => `
        <div class="student-card rank-${i + 1}">
            <div class="rank-badge">${i + 1}</div>
            <div class="student-info">
                <div class="student-name">
                    ${s.name}
                    <span class="student-badge" style="background: ${s.badgeColor}; color: #000">
                        ${s.badge}
                    </span>
                </div>
            </div>
            <div class="student-points">${s.points.toLocaleString()} pts</div>
        </div>
    `).join('');
}

// Hook into the loader engine
document.addEventListener('sectionLoaded', (e) => {
    if (e.detail.id === 'leaderboard') {
        renderLeaderboard();
    }
});

// If the leaderboard section is already loaded (for direct boot)
if (document.getElementById('leaderboard-list')) {
    renderLeaderboard();
}
