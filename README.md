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

## Getting Started

### Running the Application

No server setup is required. Simply open `index.html` in any modern web browser to start exploring the content.

For a development environment with live reloading:
- **VS Code**: Install the Live Server extension and right-click `index.html` → "Open with Live Server"
- **Command Line**: Use `npx serve .` in the project directory

### Usage

1. Open `index.html` in your browser.
2. Use the tab buttons to navigate between different topics.
3. Click the copy button on code blocks to copy examples.
4. Take the interactive quiz to test your understanding.

## Contributing

### Adding New Content

1. Create a new HTML file in the `sections/` directory with the topic content (cards, grids, code blocks).
2. Add a corresponding tab button in `index.html`.
3. Include the new section wrapper in `index.html`:
   ```html
   <div class="section" id="section-newtopic">
     <!-- Include the content from sections/newtopic.html -->
   </div>
   ```

### Modifying Styles

- **Global tokens** (colors, spacing): Edit `styles/base.css`
- **Layout elements** (header, tabs): Modify `styles/layout.css`
- **Card appearance**: Update `styles/cards.css`
- **Code blocks**: Adjust `styles/code.css`
- **Quiz interface**: Change `styles/quiz.css`

### Adding Quiz Questions

Edit `js/quiz.js` and append new question objects to the `questions` array:

```javascript
{
  q: "Your question here?",
  opts: ["Option A", "Option B", "Option C", "Option D"],
  ans: 1,  // 0-indexed correct answer
  exp: "Explanation displayed after answering."
}
```

## Design Customization

All visual elements are controlled by CSS custom properties defined in `styles/base.css`. To retheme the application, modify the `:root` variables:

| Property     | Default Value | Description              |
|--------------|---------------|--------------------------|
| `--teal`     | `#22d3b0`     | Primary accent color     |
| `--gold`     | `#f5c842`     | Variables section color  |
| `--coral`    | `#ff6b6b`     | Loops/operators color    |
| `--purple`   | `#a78bfa`     | Strings/OOP color        |
| `--bg`       | `#09090e`     | Page background          |
| `--card`     | `#13131d`     | Card background          |

## License

This project is open-source and available under the MIT License.
| `--muted`    | `#7070a0` | Subtitles, comments    |
