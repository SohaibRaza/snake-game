# 🐍 Modern Snake Game

<div align="center">

![Snake Game](https://raw.githubusercontent.com/sohaib/snake-game/main/preview.svg)

A modern implementation of the classic Snake game using HTML5 Canvas and JavaScript.

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

</div>

## ✨ Features

- 🎮 Smooth and responsive controls
- 🌈 Progressive difficulty levels with unique colors
- 📈 Score tracking and level progression
- 💫 Beautiful animations and transitions
- 🎯 Collision detection (walls and self)
- 🎨 Modern UI with dark theme
- 📱 Responsive design

## 🎮 Game Mechanics

### Levels

1. **Level 1** (Green) - Speed: Normal
2. **Level 2** (Blue) - Speed: Fast
3. **Level 3** (Purple) - Speed: Faster
4. **Level 4** (Orange) - Speed: Very Fast
5. **Level 5** (Red) - Speed: Expert

### Scoring

- Each food item: 10 points
- Level progression thresholds:
  - Level 2: 50 points
  - Level 3: 100 points
  - Level 4: 200 points
  - Level 5: 300 points

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- Basic HTTP server (Python's `http.server`, Node's `http-server`, etc.)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sohaib/snake-game.git
cd snake-game
```

2. Start a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# OR using Node.js
npx http-server
```

3. Open your browser and navigate to:

```
http://localhost:8000
```

## 🎯 How to Play

1. Use arrow keys to control the snake:
   - ⬆️ Up Arrow: Move Up
   - ⬇️ Down Arrow: Move Down
   - ⬅️ Left Arrow: Move Left
   - ➡️ Right Arrow: Move Right

2. Eat the yellow food to grow and earn points
3. Avoid hitting the walls or the snake's body
4. Progress through levels by reaching score thresholds

## 🏗️ Architecture

The game follows SOLID principles and is built with a modular architecture:

- **Game State Management**: Handles scoring, levels, and game status
- **Input Handler**: Manages keyboard controls
- **Renderer**: Handles all visual aspects and animations
- **Snake Entity**: Controls snake behavior and collision detection

## 🛠️ Technical Implementation

- HTML5 Canvas for rendering
- Modular JavaScript with ES6+ features
- CSS3 animations and transitions
- Responsive design principles

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

## 🙏 Acknowledgments

- Inspired by the classic Nokia Snake game
- Modern UI design principles
- Community feedback and contributions

---

<div align="center">
Made with ❤️ by [Sohaib](https://meetsr.com)
</div>
