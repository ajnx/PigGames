# 🐷 Pig Memory Game

A fun and colorful memory card game featuring cute pig emojis! Test your memory by matching pairs of cards with different colored backgrounds.

## Features

- **Pig-themed design** with adorable pig emojis 🐷
- **Colorful backgrounds** for each card pair
- **Responsive design** that works on mobile, tablet, and desktop
- **Score tracking** with moves, matches, and time
- **Smooth animations** and visual feedback
- **Game statistics** upon completion
- **Adaptive grid layout** based on screen size

## How to Play

1. Click on any card to flip it and reveal the pig emoji
2. Click on a second card to try to find its matching pair
3. If the cards match (same background color), they stay flipped
4. If they don't match, they flip back over
5. Continue until all pairs are matched
6. Try to complete the game with the fewest moves and shortest time!

## Game Layout

- **Mobile (< 480px)**: 3×4 grid with 6 pairs
- **Tablet (480-768px)**: 4×4 grid with 8 pairs  
- **Desktop (> 768px)**: 4×4 grid with 8 pairs

## Controls

- **New Game**: Start a fresh game with new card positions
- **Reset**: Reset the current game to the beginning
- **Play Again**: Start a new game after completion

## Technical Details

- **Pure vanilla JavaScript** - No frameworks or dependencies
- **Responsive CSS Grid** layout
- **CSS animations** for card flips and effects
- **Mobile-first design** approach
- **Cross-browser compatible**

## Files

- `index.html` - Main HTML structure
- `styles.css` - Responsive CSS styling and animations
- `script.js` - Game logic and interactivity

## How to Run

1. Open `index.html` in any modern web browser
2. Or serve the files using a local server:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Game Features

### Visual Design
- Gradient backgrounds for an attractive appearance
- Smooth hover effects and transitions
- Card flip animations
- Shake animation for non-matching cards
- Celebration modal upon game completion

### Responsive Behavior
- Adaptive grid layout for different screen sizes
- Touch-friendly on mobile devices
- Optimized button sizes for mobile interaction
- Flexible typography that scales with screen size

### Game Mechanics
- Prevents rapid clicking to avoid bugs
- Timer pauses when browser tab is hidden
- Tracks moves and time accurately
- Proper game state management

Enjoy playing the Pig Memory Game! 🐷🎮