// === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ===
let timer; // Идентификатор интервала для таймера
let timeLeft = 20 * 60; // Оставшееся время в секундах (20 минут по умолчанию)
let isRunning = false; // Флаг состояния таймера (запущен/остановлен)

// === ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ DOM ===
const timerDisplay = document.getElementById('timer'); // Элемент отображения времени
const startBtn = document.getElementById('startBtn'); // Кнопка запуска/паузы
const resetBtn = document.getElementById('resetBtn'); // Кнопка сброса

// === ФУНКЦИЯ ОБНОВЛЕНИЯ ОТОБРАЖЕНИЯ ВРЕМЕНИ ===
function updateDisplay() {
    // Вычисляем минуты и секунды из общего времени в секундах
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Обновляем текст таймера с форматированием (добавляем ведущий ноль для секунд < 10)
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// === ФУНКЦИЯ ЗАПУСКА/ПАУЗЫ ТАЙМЕРА ===
function startTimer() {
    // Если таймер не запущен - запускаем
    if (!isRunning) {
        isRunning = true;
        startBtn.textContent = 'Пауза'; // Меняем текст кнопки

        // Создаем интервал, который выполняется каждую секунду
        timer = setInterval(() => {
            if (timeLeft > 0) {
                // Уменьшаем время на 1 секунду и обновляем отображение
                timeLeft--;
                updateDisplay();
            } else {
                // Время истекло - останавливаем таймер
                clearInterval(timer);
                isRunning = false;
                startBtn.textContent = 'Старт';

                // Отправляем сообщение фоновому скрипту для показа уведомления
                chrome.runtime.sendMessage({ type: "TIMER_FINISHED" });
            }
        }, 1000);
    } else {
        // Если таймер запущен - ставим на паузу
        clearInterval(timer);
        isRunning = false;
        startBtn.textContent = 'Старт';
    }
}

// === ФУНКЦИЯ СБРОСА ТАЙМЕРА ===
function resetTimer() {
    clearInterval(timer); // Останавливаем текущий интервал
    isRunning = false; // Сбрасываем флаг состояния
    timeLeft = 20 * 60; // Возвращаем время к начальному значению (20 минут)
    updateDisplay(); // Обновляем отображение
    startBtn.textContent = 'Старт'; // Возвращаем текст кнопки
}

// === ПРИВЯЗКА ОБРАБОТЧИКОВ СОБЫТИЙ ===
startBtn.addEventListener('click', startTimer); // Обработчик для кнопки старт/пауза
resetBtn.addEventListener('click', resetTimer); // Обработчик для кнопки сброса

// === ИНИЦИАЛИЗАЦИЯ ===
updateDisplay(); // Первоначальное отображение времени при загрузке
