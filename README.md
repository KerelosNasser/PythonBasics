# Python Basics Mastery

## Overview

Python Basics Mastery is an interactive, web-based educational resource designed to help students and beginners master fundamental Python programming concepts. This project provides a comprehensive cheat sheet with visual aids, code examples, and interactive quizzes, all built using vanilla HTML, CSS, and JavaScript for optimal performance and accessibility.

The application features a tabbed interface that organizes content into key topics such as data types, control structures, object-oriented programming, and more. Each section includes practical code snippets, explanations, and hands-on exercises to reinforce learning.

## Features

- **Interactive Tabs**: Navigate through different programming topics seamlessly.
- **Code Copy Functionality**: Easily copy code examples to your clipboard for experimentation.
- **Integrated Quiz System**: Test your knowledge with built-in quizzes and receive instant feedback.
- **Responsive Design**: Optimized for various screen sizes and devices.
- **Zero Dependencies**: Built with pure HTML, CSS, and JS for fast loading and no external requirements.
- **Customizable Themes**: Easily modify colors and styles through CSS custom properties.

## Project Structure

```
python-basics/
│
├── index.html                ← Main entry point (open in browser)
│
├── sections/                 ← Content files for each topic
│   ├── types.html            │ Variables, data types, and I/O operations
│   ├── strings.html          │ String manipulation and formatting
│   ├── loops.html            │ Control structures: if/elif/else, loops
│   ├── data.html             │ Data structures: lists, dictionaries, sets, tuples
│   ├── oop.html              │ Functions, classes, and object-oriented programming
│   ├── switch.html           │ Pattern matching with match/case (Python 3.10+)
│   ├── strmethod.html        │ String method reference
│   ├── arrmethod.html        │ List method reference
│   ├── tkinter.html          │ GUI basics with Tkinter
│   └── quiz.html             │ Quiz interface markup
│
├── styles/                   ← Stylesheets organized by concern
│   ├── base.css              │ Design tokens, reset, and base styles
│   ├── layout.css            │ Layout, header, tabs, and animations
│   ├── cards.css             │ Card components and color variants
│   ├── code.css              │ Code block styling and syntax highlighting
│   └── quiz.css              │ Quiz-specific styles
│
└── js/                       ← JavaScript modules
    ├── tabs.js               │ Tab switching functionality
    ├── copy.js               │ Clipboard copy for code blocks
    └── quiz.js               │ Quiz engine and state management
```

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
