/* ============================================================
   quiz.js — Categorized interactive quiz engine
   ============================================================ */

let quizData = { categories: [] };
let currentQuestions = [];
let currentIndex = 0;
let currentScore = 0;
let currentCategoryId = '';
let isAnswered = false;

/**
 * Boot: Fetch quizzes and render selection grid
 */
async function initQuizEngine() {
  try {
    const response = await fetch('js/quizzes.json');
    quizData = await response.json();
    renderCategorySelection();
  } catch (error) {
    console.error('Error loading quizzes:', error);
    const grid = document.getElementById('category-grid');
    if (grid) {
      grid.innerHTML = `<p class="error">Failed to load quizzes. Please try refreshing.</p>`;
    }
  }
}

/**
 * Renders the "NotebookLM style" category tiles
 */
function renderCategorySelection() {
  const grid = document.getElementById('category-grid');
  if (!grid) return;

  grid.innerHTML = quizData.categories
    .map(cat => `
      <div class="category-card" onclick="startQuiz('${cat.id}')">
        <div class="category-icon">${cat.icon}</div>
        <div class="category-title">${cat.title}</div>
        <div class="category-desc">${cat.description}</div>
        <div class="category-q-count">${cat.questions.length} Questions</div>
      </div>
    `)
    .join('');
  
  document.getElementById('category-selection').style.display = 'block';
  document.getElementById('active-quiz').style.display = 'none';
}

/**
 * Transitions to the active quiz view
 */
function startQuiz(categoryId) {
  const category = quizData.categories.find(c => c.id === categoryId);
  if (!category) return;

  const countSelect = document.getElementById('q-count-select');
  const selectedCount = countSelect ? countSelect.value : '10';

  currentCategoryId = categoryId;
  
  // Randomize and slice
  let allQs = [...category.questions];
  shuffleArray(allQs);

  if (selectedCount === 'all') {
    currentQuestions = allQs;
  } else {
    currentQuestions = allQs.slice(0, parseInt(selectedCount));
  }

  currentIndex = 0;
  currentScore = 0;
  isAnswered = false;

  document.getElementById('current-category-title').textContent = category.title;
  document.getElementById('category-selection').style.display = 'none';
  document.getElementById('active-quiz').style.display = 'block';

  renderQuiz();
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Toggles back to selection view
 */
function showCategories() {
  renderCategorySelection();
}

/**
 * Renders the current question and options
 */
function renderQuiz() {
  const q = currentQuestions[currentIndex];
  const pct = (currentIndex / currentQuestions.length) * 100;

  document.getElementById('qprogress').style.width = `${pct}%`;
  document.getElementById('qscore').textContent =
    `Question ${currentIndex + 1} of ${currentQuestions.length} • Score: ${currentScore}`;

  const optionsHtml = q.opts
    .map((opt, i) => `
      <button class="quiz-opt" onclick="handleAnswer(${i})">
        ${opt.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
      </button>`)
    .join('');

  document.getElementById('quiz-body').innerHTML = `
    <div class="quiz-q">${q.q}</div>
    <div class="quiz-options">${optionsHtml}</div>
    <div class="quiz-feedback" id="qfb">${q.exp}</div>
    <div class="quiz-nav">
      <span></span>
      <button class="quiz-nav-btn" id="qnext" onclick="handleNext()" style="display:none">
        ${currentIndex < currentQuestions.length - 1 ? 'Next →' : 'See Results'}
      </button>
    </div>`;

  isAnswered = false;
}

/**
 * Processes an answer selection
 */
function handleAnswer(index) {
  if (isAnswered) return;
  isAnswered = true;

  const q = currentQuestions[currentIndex];
  const buttons = document.querySelectorAll('.quiz-opt');

  buttons[q.ans].classList.add('correct');
  if (index !== q.ans) {
    buttons[index].classList.add('wrong');
  } else {
    currentScore++;
  }

  buttons.forEach(btn => (btn.disabled = true));
  document.getElementById('qfb').classList.add('show');
  document.getElementById('qnext').style.display = 'block';
  document.getElementById('qscore').textContent =
    `Question ${currentIndex + 1} of ${currentQuestions.length} • Score: ${currentScore}`;
}

/**
 * Advances to the next question or shows results
 */
function handleNext() {
  currentIndex++;

  if (currentIndex >= currentQuestions.length) {
    showResults();
    return;
  }

  renderQuiz();
}

/**
 * Renders the final result screen
 */
function showResults() {
  const pct = Math.round((currentScore / currentQuestions.length) * 100);
  document.getElementById('qprogress').style.width = '100%';
  document.getElementById('qscore').textContent = `Final score: ${currentScore}/${currentQuestions.length}`;

  const resultMarkup = `
    <div class="quiz-result-card">
      <div class="result-icon">
        ${pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : '📚'}
      </div>
      <div class="result-score">
        ${currentScore}/${currentQuestions.length} — ${pct}%
      </div>
      <div class="result-msg">
        ${pct >= 80 ? 'Exceptional! Fundamentals mastered. 🔥' : pct >= 60 ? 'Great progress! Keep at it. 💪' : 'Keep studying to level up your skills! 📖'}
      </div>
      <div style="display:flex;gap:12px;justify-content:center">
        <button class="quiz-nav-btn" onclick="startQuiz('${currentCategoryId}')">Try Again</button>
        <button class="back-btn" onclick="showCategories()">Main Categories</button>
      </div>
    </div>`;

  document.getElementById('quiz-body').innerHTML = resultMarkup;
}

/**
 * Restarts the current quiz
 */
function restartQuiz() {
  startQuiz(currentCategoryId);
}

// Initial Boot
if (document.getElementById('category-grid')) {
  initQuizEngine();
}
