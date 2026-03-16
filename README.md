# Python Basics Mastery — Project Structure

A visually driven Python cheat sheet for students.  
Built with **vanilla HTML, CSS, and JS** — zero dependencies, zero build tools.

---

## 📁 File Map

```
python-basics/
│
├── index.html                ← Entry point (open this in the browser)
│
├── sections/                 ← One file per tab/topic
│   ├── types.html            │  📝 Variables, types, I/O
│   ├── strings.html          │  🔤 Indexing, slicing, f-strings
│   ├── loops.html            │  🔄 if/elif/else, for, while
│   ├── data.html             │  📦 Lists, dicts, sets, tuples
│   ├── oop.html              │  🏗️ Functions, classes, OOP
│   ├── switch.html           │  🔀 match/case (Python 3.10+)
│   ├── strmethod.html        │  🧵 String method reference
│   ├── arrmethod.html        │  📋 List method reference
│   ├── tkinter.html          │  🖼️ Tkinter GUI basics
│   └── quiz.html             │  🎯 Quiz wrapper markup
│
├── styles/                   ← One file per concern
│   ├── base.css              │  Design tokens (:root), reset, body, scrollbar
│   ├── layout.css            │  Header, sticky tabs, section grid, animations
│   ├── cards.css             │  Card base + all color variants
│   ├── code.css              │  <pre>, copy button, syntax token colors, .visual-box
│   └── quiz.css              │  Quiz card, options, progress bar, nav
│
└── js/                       ← One file per feature
    ├── tabs.js               │  switchTab() — show/hide sections
    ├── copy.js               │  cpCode()    — clipboard copy for code blocks
    └── quiz.js               │  Quiz engine — questions, state, render, score
```

---

## ✏️ How to Edit

### Add a new section
1. Create `sections/mytopic.html` — just the inner content (cards, grids, code blocks).  
   No `<html>`, `<head>`, or wrapper `<div class="section">` needed.
2. In `index.html`, add a `<button class="tab-btn">` in the tabs bar.
3. In `index.html`, add the wrapper div:
   ```html
   <div class="section" id="section-mytopic">
     <!-- paste or @include sections/mytopic.html content -->
   </div>
   ```

### Edit styles
- Changing a **color or spacing token**? → `styles/base.css`
- Tweaking the **header or tabs**? → `styles/layout.css`
- Changing **card hover/glow**? → `styles/cards.css`
- Changing **code block appearance**? → `styles/code.css`
- Tweaking the **quiz UI**? → `styles/quiz.css`

### Add a quiz question
Open `js/quiz.js` and push a new object into the `questions` array:
```js
{
  q:    "Your question here?",
  opts: ["Option A", "Option B", "Option C", "Option D"],
  ans:  1,          // 0-indexed correct answer
  exp:  "Explanation shown after answering.",
},
```

---

## 🚀 Running

No server needed — just open `index.html` directly in any browser.

For a proper dev workflow with live-reload:
```bash
# VS Code: install Live Server extension, right-click index.html → Open with Live Server
# Or with npx:
npx serve .
```

---

## 🎨 Design Tokens

All colors are CSS custom properties in `styles/base.css`.  
To retheme the whole project, only edit `:root` in that file.

| Token        | Value     | Usage                  |
|--------------|-----------|------------------------|
| `--teal`     | `#22d3b0` | Primary accent, tabs   |
| `--gold`     | `#f5c842` | Variables section      |
| `--coral`    | `#ff6b6b` | Loops / operators      |
| `--purple`   | `#a78bfa` | Strings / OOP          |
| `--bg`       | `#09090e` | Page background        |
| `--card`     | `#13131d` | Card background        |
| `--muted`    | `#7070a0` | Subtitles, comments    |
