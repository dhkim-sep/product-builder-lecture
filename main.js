document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const recommendBtn = document.getElementById('recommend-btn');
  const displayArea = document.getElementById('display-area');
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

  // --- Menu Database ---
  const menus = [
    { name: '김치찌개', category: '한식', emoji: '🥘' },
    { name: '된장찌개', category: '한식', emoji: '🍲' },
    { name: '비빔밥', category: '한식', emoji: '🥗' },
    { name: '불고기', category: '한식', emoji: '🥩' },
    { name: '삼겹살', category: '한식', emoji: '🥓' },
    { name: '떡볶이', category: '한식', emoji: '🍢' },
    { name: '짜장면', category: '중식', emoji: '🍜' },
    { name: '짬뽕', category: '중식', emoji: '🔥' },
    { name: '탕수육', category: '중식', emoji: '🍖' },
    { name: '마라탕', category: '중식', emoji: '🌶️' },
    { name: '초밥', category: '일식', emoji: '🍣' },
    { name: '돈카츠', category: '일식', emoji: '🍱' },
    { name: '라멘', category: '일식', emoji: '🍜' },
    { name: '우동', category: '일식', emoji: '🍥' },
    { name: '피자', category: '양식', emoji: '🍕' },
    { name: '파스타', category: '양식', emoji: '🍝' },
    { name: '스테이크', category: '양식', emoji: '🥩' },
    { name: '햄버거', category: '양식', emoji: '🍔' },
    { name: '치킨', category: '치킨', emoji: '🍗' },
    { name: '쌀국수', category: '아시안', emoji: '🍜' },
    { name: '팟타이', category: '아시안', emoji: '🍤' },
    { name: '타코', category: '남미', emoji: '🌮' },
    { name: '샌드위치', category: '간편식', emoji: '🥪' }
  ];

  // --- Recommendation Logic ---
  function getRandomMenu() {
    const randomIndex = Math.floor(Math.random() * menus.length);
    return menus[randomIndex];
  }

  recommendBtn.addEventListener('click', () => {
    const menu = getRandomMenu();
    
    displayArea.innerHTML = `
      <div class="menu-result">
        <span class="menu-emoji">${menu.emoji}</span>
        <h3 class="menu-name">${menu.name}</h3>
        <span class="menu-category">${menu.category}</span>
      </div>
    `;
    
    // Add a little haptic-like effect or animation trigger if needed
    recommendBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      recommendBtn.style.transform = '';
    }, 100);
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
