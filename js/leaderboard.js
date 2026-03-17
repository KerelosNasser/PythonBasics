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
  { name: "Gelan", points: 10, badge: "Newbie", badgeColor: "#92015dff" },
  { name: "Meriam", points: 10, badge: "Master", badgeColor: "#f5df20ff" },
  { name: "Monica", points: 10, badge: "Pro", badgeColor: "#2e12ceff" },
  {
    name: "Merolla",
    points: 10,
    badge: "Ones to watch",
    badgeColor: "#e164a0ff",
  },
  { name: "Peter", points: 0, badge: "Alchemist", badgeColor: "#4ade80" },
  { name: "George", points: 0, badge: "Grinder", badgeColor: "#f5c842" },
  { name: "Lilian", points: 0, badge: "Thinker", badgeColor: "#fb923c" },
  { name: "Youssef", points: 0, badge: "Active", badgeColor: "#ff6b6b" },
  { name: "Selvana", points: 0, badge: "Ghost", badgeColor: "#7070a0" },
];

/** * Renders the students into the leaderboard list.
 */
function renderLeaderboard() {
  const list = document.getElementById("leaderboard-list");
  if (!list) return;

  // Sort students by points descending
  const sorted = [...students].sort((a, b) => b.points - a.points);

  list.innerHTML = sorted
    .map(
      (s, i) => `
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
    `,
    )
    .join("");
}

// Hook into the loader engine
document.addEventListener("sectionLoaded", (e) => {
  if (e.detail.id === "leaderboard") {
    renderLeaderboard();
  }
});

// If the leaderboard section is already loaded (for direct boot)
if (document.getElementById("leaderboard-list")) {
  renderLeaderboard();
}
