let timer;
let timeLeft = 20 * 60; // 20 минут в секундах
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.textContent = 'Пауза';
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                startBtn.textContent = 'Старт';
                chrome.runtime.sendMessage({ type: "TIMER_FINISHED" }); // Уведомление о завершении
            }
        }, 1000);
    } else {
        clearInterval(timer);
        isRunning = false;
        startBtn.textContent = 'Старт';
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 20 * 60;
    updateDisplay();
    startBtn.textContent = 'Старт';
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
