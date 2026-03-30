document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const generateBtn = document.getElementById('generate-btn');
  const numbersDisplay = document.getElementById('numbers-display');
  const html = document.documentElement;

  // --- Theme Management ---
  const savedTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
  }

  // --- Lotto Logic ---
  function generateOneGame() {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    let bonus;
    do {
      bonus = Math.floor(Math.random() * 45) + 1;
    } while (numbers.has(bonus));

    return { main: sortedNumbers, bonus: bonus };
  }

  generateBtn.addEventListener('click', () => {
    numbersDisplay.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
      const game = generateOneGame();
      const gameRow = document.createElement('div');
      gameRow.className = 'game-row';
      gameRow.style.animationDelay = `${i * 0.1}s`;

      const gameIndex = document.createElement('span');
      gameIndex.textContent = `${i + 1}번: `;
      gameIndex.style.marginRight = '10px';
      gameRow.appendChild(gameIndex);

      game.main.forEach(num => {
        const numSpan = document.createElement('span');
        numSpan.className = 'number';
        numSpan.textContent = num;
        gameRow.appendChild(numSpan);
      });

      const plusSign = document.createElement('span');
      plusSign.textContent = '+';
      plusSign.style.margin = '0 5px';
      gameRow.appendChild(plusSign);

      const bonusSpan = document.createElement('span');
      bonusSpan.className = 'number bonus-number';
      bonusSpan.textContent = game.bonus;
      gameRow.appendChild(bonusSpan);

      numbersDisplay.appendChild(gameRow);
    }
  });
});
