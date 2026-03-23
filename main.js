const generateBtn = document.getElementById('generate');
const numbersContainer = document.getElementById('numbers');

generateBtn.addEventListener('click', () => {
    numbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    for (const number of numbers) {
        const circle = document.createElement('div');
        circle.classList.add('number');
        circle.textContent = number;
        numbersContainer.appendChild(circle);
    }
});