class PigMemoryGame {
    constructor() {
        this.gameBoard = document.getElementById('gameBoard');
        this.movesElement = document.getElementById('moves');
        this.matchesElement = document.getElementById('matches');
        this.timeElement = document.getElementById('time');
        this.gameComplete = document.getElementById('gameComplete');
        this.finalMovesElement = document.getElementById('finalMoves');
        this.finalTimeElement = document.getElementById('finalTime');
        
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.gameStarted = false;
        this.gameTimer = null;
        this.startTime = null;
        this.isProcessing = false;
        
        this.colors = [
            'color-1', 'color-2', 'color-3', 'color-4',
            'color-5', 'color-6', 'color-7', 'color-8'
        ];
        
        this.initializeGame();
        this.bindEvents();
    }
    
    initializeGame() {
        this.resetGameState();
        this.createCards();
        this.renderCards();
    }
    
    resetGameState() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.gameStarted = false;
        this.isProcessing = false;
        
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
        
        this.updateDisplay();
        this.gameComplete.classList.add('hidden');
    }
    
    createCards() {
        const cardPairs = [];
        
        // Determine number of pairs based on screen size
        const screenWidth = window.innerWidth;
        let numPairs;
        
        if (screenWidth < 480) {
            numPairs = 6; // 3x4 grid for mobile
        } else if (screenWidth < 768) {
            numPairs = 8; // 4x4 grid for tablet
        } else {
            numPairs = 8; // 4x4 grid for desktop
        }
        
        // Create pairs of cards
        for (let i = 0; i < numPairs; i++) {
            const colorClass = this.colors[i % this.colors.length];
            cardPairs.push(
                { id: i * 2, color: colorClass, matched: false },
                { id: i * 2 + 1, color: colorClass, matched: false }
            );
        }
        
        // Shuffle cards
        this.cards = this.shuffleArray(cardPairs);
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    renderCards() {
        this.gameBoard.innerHTML = '';
        
        // Update grid layout based on screen size
        const screenWidth = window.innerWidth;
        if (screenWidth < 480) {
            this.gameBoard.style.gridTemplateColumns = 'repeat(3, 1fr)';
        } else {
            this.gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
        }
        
        this.cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = `card ${card.color}`;
            cardElement.dataset.index = index;
            
            cardElement.innerHTML = `
                <div class="card-content">🐷</div>
            `;
            
            cardElement.addEventListener('click', () => this.handleCardClick(index));
            this.gameBoard.appendChild(cardElement);
        });
    }
    
    handleCardClick(index) {
        if (this.isProcessing) return;
        
        const card = this.cards[index];
        const cardElement = this.gameBoard.children[index];
        
        // Don't allow clicking on already flipped or matched cards
        if (card.flipped || card.matched) return;
        
        // Don't allow more than 2 cards to be flipped at once
        if (this.flippedCards.length >= 2) return;
        
        // Start the game timer on first click
        if (!this.gameStarted) {
            this.startGame();
        }
        
        // Flip the card
        this.flipCard(index);
        
        // Check for match if two cards are flipped
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.updateDisplay();
            this.checkForMatch();
        }
    }
    
    flipCard(index) {
        const card = this.cards[index];
        const cardElement = this.gameBoard.children[index];
        
        card.flipped = true;
        cardElement.classList.add('flipped');
        this.flippedCards.push(index);
    }
    
    checkForMatch() {
        this.isProcessing = true;
        
        setTimeout(() => {
            const [firstIndex, secondIndex] = this.flippedCards;
            const firstCard = this.cards[firstIndex];
            const secondCard = this.cards[secondIndex];
            const firstElement = this.gameBoard.children[firstIndex];
            const secondElement = this.gameBoard.children[secondIndex];
            
            if (firstCard.color === secondCard.color) {
                // Cards match
                firstCard.matched = true;
                secondCard.matched = true;
                firstElement.classList.add('matched');
                secondElement.classList.add('matched');
                
                // Add match animation
                firstElement.classList.add('card-match');
                secondElement.classList.add('card-match');
                
                this.matchedPairs++;
                this.updateDisplay();
                
                // Check if game is complete
                if (this.matchedPairs === this.cards.length / 2) {
                    this.endGame();
                }
            } else {
                // Cards don't match
                firstElement.classList.add('card-shake');
                secondElement.classList.add('card-shake');
                
                setTimeout(() => {
                    firstCard.flipped = false;
                    secondCard.flipped = false;
                    firstElement.classList.remove('flipped', 'card-shake');
                    secondElement.classList.remove('flipped', 'card-shake');
                }, 500);
            }
            
            this.flippedCards = [];
            this.isProcessing = false;
        }, 1000);
    }
    
    startGame() {
        this.gameStarted = true;
        this.startTime = Date.now();
        this.gameTimer = setInterval(() => this.updateTimer(), 1000);
    }
    
    updateTimer() {
        if (!this.gameStarted) return;
        
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        this.timeElement.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateDisplay() {
        this.movesElement.textContent = this.moves;
        this.matchesElement.textContent = this.matchedPairs;
    }
    
    endGame() {
        clearInterval(this.gameTimer);
        this.finalMovesElement.textContent = this.moves;
        this.finalTimeElement.textContent = this.timeElement.textContent;
        
        setTimeout(() => {
            this.gameComplete.classList.remove('hidden');
        }, 1000);
    }
    
    newGame() {
        this.initializeGame();
    }
    
    resetGame() {
        this.resetGameState();
        this.renderCards();
    }
    
    bindEvents() {
        // New Game button
        document.getElementById('newGame').addEventListener('click', () => {
            this.newGame();
        });
        
        // Reset button
        document.getElementById('resetGame').addEventListener('click', () => {
            this.resetGame();
        });
        
        // Play Again button
        document.getElementById('playAgain').addEventListener('click', () => {
            this.newGame();
        });
        
        // Handle window resize for responsive behavior
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    handleResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            // Only recreate cards if game hasn't started or is complete
            if (!this.gameStarted || this.matchedPairs === this.cards.length / 2) {
                this.createCards();
                this.renderCards();
            } else {
                // Just update grid layout
                const screenWidth = window.innerWidth;
                if (screenWidth < 480) {
                    this.gameBoard.style.gridTemplateColumns = 'repeat(3, 1fr)';
                } else {
                    this.gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
                }
            }
        }, 300);
    }
}

// Initialize game when DOM is loaded and store globally
document.addEventListener('DOMContentLoaded', () => {
    window.pigGame = new PigMemoryGame();
});

// Handle visibility change to pause/resume timer
document.addEventListener('visibilitychange', () => {
    if (window.pigGame && window.pigGame.gameTimer) {
        if (document.hidden) {
            // Pause timer when tab is hidden
            clearInterval(window.pigGame.gameTimer);
        } else {
            // Resume timer when tab is visible
            if (window.pigGame.gameStarted && window.pigGame.matchedPairs < window.pigGame.cards.length / 2) {
                window.pigGame.gameTimer = setInterval(() => window.pigGame.updateTimer(), 1000);
            }
        }
    }
});