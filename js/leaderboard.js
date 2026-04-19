const students = [
  { name: "Lilian", points: 130, badge: "M&P hater", badgeColor: "#fb923c" },
  { name: "Gelan", points: 90, badge: "OTW", badgeColor: "#92015dff" },
  { name: "Jomana", points: 0, badge: "???", badgeColor: "#8a2525ff" },
  { name: "Meriam", points: 110, badge: "Java brain", badgeColor: "#0aa99eff" },
  { name: "Monica", points: 115, badge: "3olom victim", badgeColor: "#745cfcff" },
  { name: "Merolla", points: 120, badge: "handsa", badgeColor: "#e164a0ff" },
  { name: "Peter", points: 60, badge: "Alchemist", badgeColor: "#4ade80" },
  { name: "George", points: 80, badge: "AI abuser", badgeColor: "#f5c842" },
  { name: "Youssef", points: 60, badge: "bruh", badgeColor: "#ff6b6b" },
  { name: "Selvana", points: -999, badge: "???", badgeColor: "#7070a0" },
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
