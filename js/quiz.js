/* ============================================================
   quiz.js — Interactive quiz engine
   ============================================================ */

const questions = [
  {
    q: "What is the output of `type(3.14)`?",
    opts: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"],
    ans: 1,
    exp: "Decimals are stored as floats in Python.",
  },
  {
    q: "How do you get the last item of a list `arr`?",
    opts: ["arr[last]", "arr.get(-1)", "arr[-1]", "arr[len(arr)]"],
    ans: 2,
    exp: "Negative indexing starts from the back. -1 is the last item, -2 is second to last.",
  },
  {
    q: "Which of these data structures is Immutable (cannot be changed after creation)?",
    opts: ["List []", "Dictionary {}", "Set {}", "Tuple ()"],
    ans: 3,
    exp: "Tuples () are locked. Once created, you cannot append or remove items from them.",
  },
  {
    q: "If `x = 10` and `y = '10'`, what happens when you try `x + y`?",
    opts: ["20", "'1010'", "TypeError", "0"],
    ans: 2,
    exp: "Python prevents adding an integer to a string directly. You must cast first: x + int(y) or str(x) + y.",
  },
  {
    q: "What does `for i in range(2):` print if we `print(i)` inside?",
    opts: ["1, 2", "0, 1", "0, 1, 2", "2, 2"],
    ans: 1,
    exp: "range(2) generates numbers starting from 0, and stops BEFORE 2. So it outputs 0, 1.",
  },
  {
    q: "How do you simulate a 'do-while' loop in Python?",
    opts: [
      "Use the do_while keyword",
      "Use 'while True:' and a 'break' statement inside",
      "Use a for loop backwards",
      "It is impossible",
    ],
    ans: 1,
    exp: "Since Python lacks native do-while, the standard pattern is `while True:` to guarantee at least one execution, breaking out when a condition is met.",
  },
  {
    q: "What is the primary purpose of the `self` keyword in a class method?",
    opts: [
      "It is the name of the class",
      "It refers to the specific instance (object) calling the method",
      "It makes the method private",
      "It imports the module",
    ],
    ans: 1,
    exp: "`self` ensures that when object A calls a method, the method modifies object A's variables, not object B's.",
  },
  {
    q: "How do you safely get a value from a dictionary `d` to avoid crashing if the key doesn't exist?",
    opts: ["d['key']", "d.find('key')", "d.get('key', 'default')", "d.search('key')"],
    ans: 2,
    exp: ".get() is safe! If the key is missing, it returns the default value (or None) instead of throwing a KeyError.",
  },
  {
    q: "What Python version introduced the `match` statement?",
    opts: ["Python 3.8", "Python 3.9", "Python 3.10", "Python 3.12"],
    ans: 2,
    exp: "The match-case statement (structural pattern matching) was introduced in Python 3.10 via PEP 634.",
  },
  {
    q: "What does `'hello'.find('xyz')` return if 'xyz' is not found?",
    opts: ["None", "ValueError", "False", "-1"],
    ans: 3,
    exp: ".find() safely returns -1 when the substring isn't found. Use it instead of .index() to avoid crashes.",
  },
  {
    q: "What is the difference between `.sort()` and `sorted()`?",
    opts: [
      "No difference",
      ".sort() returns a new list; sorted() modifies in place",
      ".sort() modifies list in place; sorted() returns a new list",
      "sorted() only works on numbers",
    ],
    ans: 2,
    exp: ".sort() mutates the original list and returns None. sorted() leaves the original untouched and returns a brand new sorted list.",
  },
  {
    q: "In Tkinter, which method do you call LAST to keep the window open?",
    opts: ["root.open()", "root.start()", "root.run()", "root.mainloop()"],
    ans: 3,
    exp: "root.mainloop() starts the Tkinter event loop. It blocks until the window is closed, listening for clicks, keypresses, and other events.",
  },
  {
    q: "What does `'abc'.upper().replace('A','@')` return?",
    opts: ["'@BC'", "'abc'", "'ABC'", "TypeError"],
    ans: 0,
    exp: "Methods chain left to right. First .upper() converts to 'ABC', then .replace('A','@') produces '@BC'.",
  },
  {
    q: "In a `match` statement, what does `case _:` represent?",
    opts: [
      "Match the underscore character",
      "A syntax error",
      "The default wildcard (catch-all)",
      "Match any integer",
    ],
    ans: 2,
    exp: "The underscore _ is the wildcard pattern in Python's match statement. It acts like 'else' — it matches anything that didn't match any previous case.",
  },
  {
    q: "Which block of a `try` statement ALWAYS runs, regardless of whether an error occurred?",
    opts: ["except", "else", "finally", "catch"],
    ans: 2,
    exp: "The `finally` block is guaranteed to run. It's normally used for cleanup, like closing files or database connections.",
  },
  {
    q: "How can you loop through a list and get both the index and the value at the same time?",
    opts: ["for i, val in list:", "for i, val in enumerate(list):", "for i, val in range(list):", "for i, val in counts(list):"],
    ans: 1,
    exp: "enumerate() is the 'Pythonic' way to get (index, value) pairs during iteration.",
  },
  {
    q: "How do you install a third-party library 'requests' in Python?",
    opts: ["import install requests", "python get requests", "pip install requests", "requests --add"],
    ans: 2,
    exp: "PIP is the standard Package Installer for Python. You use it in your terminal/command prompt.",
  },
];

/* ── State ───────────────────────────────────────────────── */
let current  = 0;
let score    = 0;
let answered = false;

/* ── Render current question ─────────────────────────────── */
function renderQuiz() {
  const q   = questions[current];
  const pct = (current / questions.length) * 100;

  document.getElementById('qprogress').style.width = `${pct}%`;
  document.getElementById('qscore').textContent =
    `Question ${current + 1} of ${questions.length} • Score: ${score}`;

  const escapedOpts = q.opts
    .map((o, i) => `
      <button class="quiz-opt" onclick="answer(${i})">
        ${o.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
      </button>`)
    .join('');

  document.getElementById('quiz-body').innerHTML = `
    <div class="quiz-q">${q.q}</div>
    <div class="quiz-options">${escapedOpts}</div>
    <div class="quiz-feedback" id="qfb">${q.exp}</div>
    <div class="quiz-nav">
      <span></span>
      <button class="quiz-nav-btn" id="qnext" onclick="nextQ()" style="display:none">
        ${current < questions.length - 1 ? 'Next →' : 'See Result'}
      </button>
    </div>`;

  answered = false;
}

/* ── Handle answer selection ─────────────────────────────── */
function answer(i) {
  if (answered) return;
  answered = true;

  const q    = questions[current];
  const opts = document.querySelectorAll('.quiz-opt');

  opts[q.ans].classList.add('correct');
  if (i !== q.ans) opts[i].classList.add('wrong');
  else score++;

  opts.forEach(o => (o.disabled = true));
  document.getElementById('qfb').classList.add('show');
  document.getElementById('qnext').style.display = 'block';
  document.getElementById('qscore').textContent =
    `Question ${current + 1} of ${questions.length} • Score: ${score}`;
}

/* ── Advance to next question ────────────────────────────── */
function nextQ() {
  current++;

  if (current >= questions.length) {
    const pct = Math.round((score / questions.length) * 100);
    document.getElementById('qprogress').style.width = '100%';
    document.getElementById('qscore').textContent = `Final score: ${score}/${questions.length}`;
    document.getElementById('quiz-body').innerHTML = `
      <div style="text-align:center;padding:40px 0">
        <div style="font-size:3rem;margin-bottom:12px">
          ${pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : '📚'}
        </div>
        <div style="font-size:1.5rem;font-weight:800;margin-bottom:8px;color:var(--teal)">
          ${score}/${questions.length} — ${pct}%
        </div>
        <div style="color:var(--muted);margin-bottom:24px">
          ${pct >= 80 ? 'Fundamentals mastered! 🔥' : pct >= 60 ? 'Solid progress! 💪' : 'Keep studying! 📖'}
        </div>
        <button class="quiz-nav-btn" onclick="restartQuiz()">Restart Quiz</button>
      </div>`;
    return;
  }

  renderQuiz();
}

/* ── Restart ─────────────────────────────────────────────── */
function restartQuiz() {
  current = 0;
  score   = 0;
  renderQuiz();
}

/* ── Boot ────────────────────────────────────────────────── */
// Only run immediately if the quiz container is already in the DOM
// Otherwise, loader.js will call this once the HTML is fetched.
if (document.getElementById('quiz-body')) {
  renderQuiz();
}
