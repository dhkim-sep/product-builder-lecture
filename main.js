document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate-btn');
  const numbersDisplay = document.getElementById('numbers-display');

  generateBtn.addEventListener('click', () => {
    const numbers = new Set();
    while (numbers.size < 6) {
      const randomNum = Math.floor(Math.random() * 45) + 1;
      numbers.add(randomNum);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    numbersDisplay.innerHTML = sortedNumbers.map(num => `<span class="number">${num}</span>`).join('');
  });
});