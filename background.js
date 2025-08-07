// === ФОНОВЫЙ СКРИПТ РАСШИРЕНИЯ ===
// Обработчик сообщений от popup скрипта
chrome.runtime.onMessage.addListener((message) => {
    // Проверяем тип полученного сообщения
    if (message.type === "TIMER_FINISHED") {
        // Создаем системное уведомление о завершении Pomodoro сессии
        chrome.notifications.create({
            type: "basic", // Тип уведомления - базовое
            iconUrl: "icons/icon16.png", // Иконка для уведомления
            title: "Pomodoro завершен!", // Заголовок уведомления
            message: "Пора сделать перерыв!", // Текст уведомления
        });
    }
});
