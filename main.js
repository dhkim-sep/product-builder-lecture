document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const generateBtn = document.getElementById('generate-btn');
  const numbersDisplay = document.getElementById('numbers-display');
  const inquiryForm = document.getElementById('inquiry-form');
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

  // --- Inquiry Form (AJAX) ---
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = document.createElement('p');
      status.style.marginTop = '1rem';
      status.style.fontWeight = 'bold';
      
      const submitBtn = inquiryForm.querySelector('.submit-btn');
      const originalBtnText = submitBtn.textContent;
      
      try {
        submitBtn.disabled = true;
        submitBtn.textContent = '보내는 중...';
        
        const data = new FormData(e.target);
        const response = await fetch(e.target.action, {
          method: inquiryForm.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          inquiryForm.innerHTML = '<div style="text-align: center; padding: 2rem;"><p style="font-size: 1.2rem; color: var(--accent-color); margin-bottom: 1rem;">✅ 문의가 성공적으로 전송되었습니다!</p><p>빠른 시일 내에 답변 드리겠습니다.</p></div>';
        } else {
          const errorData = await response.json();
          throw new Error(errorData.errors ? errorData.errors.map(err => err.message).join(", ") : '전송 실패');
        }
      } catch (error) {
        status.textContent = `❌ 오류: ${error.message}`;
        status.style.color = 'var(--bonus-color)';
        inquiryForm.appendChild(status);
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }
});
