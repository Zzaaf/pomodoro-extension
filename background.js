chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "TIMER_FINISHED") {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon16.png",
            title: "Pomodoro завершен!",
            message: "Пора сделать перерыв!",
        });
    }
});
