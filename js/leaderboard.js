const students = [
  { name: "Lilian", points: 90, badge: "Thinker", badgeColor: "#fb923c" },
  { name: "Gelan", points: 90, badge: "Newbie", badgeColor: "#92015dff" },
  { name: "Jomana", points: 0, badge: "Oracle", badgeColor: "#8a2525ff" },
  { name: "Meriam", points: 70, badge: "Master", badgeColor: "#0aa99eff" },
  { name: "Monica", points: 0, badge: "Pro", badgeColor: "#745cfcff" },
  { name: "Merolla", points: 120, badge: "OTW", badgeColor: "#e164a0ff" },
  { name: "Peter", points: -10, badge: "Alchemist", badgeColor: "#4ade80" },
  { name: "George", points: 80, badge: "Grinder", badgeColor: "#f5c842" },
  { name: "Youssef", points: 30, badge: "Active", badgeColor: "#ff6b6b" },
  { name: "Selvana", points: -999, badge: "Ghost", badgeColor: "#7070a0" },
];
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
                    <span class="student-badge" style="background: ${s.badgeColor}; color: #fff">
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
