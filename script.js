const markersContainer = document.querySelector(".markers");

for (let i = 0; i < 60; i++) {
    const marker = document.createElement("div");

    marker.classList.add("marker");
    if (i % 5 === 0) {
    marker.classList.add("major-marker");
 }

    marker.style.transform = `rotate(${i * 6}deg)`;

    markersContainer.appendChild(marker);
}
function updateClock() {

    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds() + now.getMilliseconds() / 1000;

    const hourAngle = (hours % 12) * 30 + minutes * 0.5;
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    document.querySelector(".hour-hand").style.transform =
        `translateX(-50%) rotate(${hourAngle}deg)`;

    document.querySelector(".minute-hand").style.transform =
        `translateX(-50%) rotate(${minuteAngle}deg)`;

    document.querySelector(".second-hand").style.transform =
        `translateX(-50%) rotate(${secondAngle}deg)`;
}

setInterval(updateClock, 50);
updateClock();
function updateDate() {
    const today = new Date();

    document.querySelector("#date").textContent =
        today.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
}

updateDate();
let cities = [
    { name: "Mumbai", timeZone: "Asia/Kolkata" },
    { name: "London", timeZone: "Europe/London" },
    { name: "New York", timeZone: "America/New_York" },
    { name: "Tokyo", timeZone: "Asia/Tokyo" },
    { name: "Dubai", timeZone: "Asia/Dubai" },
    { name: "Sydney", timeZone: "Australia/Sydney" }
];
const availableCities = [

    { name: "Mumbai", timezone: "Asia/Kolkata" },
    { name: "London", timezone: "Europe/London" },
    { name: "New York", timezone: "America/New_York" },
    { name: "Tokyo", timezone: "Asia/Tokyo" },
    { name: "Dubai", timezone: "Asia/Dubai" },
    { name: "Sydney", timezone: "Australia/Sydney" },


    { name: "Paris", timezone: "Europe/Paris" },
    { name: "Singapore", timezone: "Asia/Singapore" },
    { name: "Los Angeles", timezone: "America/Los_Angeles" },
    { name: "Cairo", timezone: "Africa/Cairo" },
    { name: "Berlin", timezone: "Europe/Berlin" },
    { name: "Toronto", timezone: "America/Toronto" }
];

function updateWorldClocks() {
    const container = document.querySelector("#world-clock-container");

    container.innerHTML = cities.map(city => {

        const time = new Date().toLocaleTimeString("en-US", {
            timeZone: city.timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        });

        return `
            <div class="city-card">
                <h3>${city.name}</h3>
                <p>${time}</p>
                <button class="remove-city" data-city="${city.name}">
                    Remove
                </button>
            </div>
        `;
    }).join("");
}
function updateCityOptions() {
    const select = document.querySelector("#city-select");

    const remainingCities = availableCities.filter(city =>
        !cities.some(existing => existing.name === city.name)
    );

    select.innerHTML = '<option value="">Select a city</option>';

    remainingCities.forEach(city => {
        select.innerHTML += `
            <option value="${city.name}">${city.name}</option>
        `;
    });
}

document.querySelector("#add-city").addEventListener("click", () => {
    const selectedName = document.querySelector("#city-select").value;

    const city = availableCities.find(city =>
        city.name === selectedName
    );

    if (city) {
        cities.push(city);
        updateWorldClocks();
        updateCityOptions();
    }
});

document.querySelector("#world-clock-container").addEventListener("click", event => {
    if (event.target.classList.contains("remove-city")) {
        const cityName = event.target.dataset.city;

        cities = cities.filter(city => city.name !== cityName);

        updateWorldClocks();
        updateCityOptions();
    }
});


updateWorldClocks();
updateCityOptions();

setInterval(updateWorldClocks, 1000);
let stopwatchInterval;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor(milliseconds % 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
}

function updateStopwatch() {
    const currentTime = performance.now() - startTime;
    document.querySelector("#stopwatch-display").textContent =
        formatTime(currentTime);
}

// Start / Pause
document.querySelector("#start-stopwatch").addEventListener("click", function () {
    if (!isRunning) {
        startTime = performance.now() - elapsedTime;

        stopwatchInterval = setInterval(updateStopwatch, 10);

        isRunning = true;
        this.textContent = "Pause";
    } else {
        clearInterval(stopwatchInterval);

        elapsedTime = performance.now() - startTime;

        isRunning = false;
        this.textContent = "Start";
    }
});

// Reset
document.querySelector("#reset-stopwatch").addEventListener("click", () => {
    clearInterval(stopwatchInterval);

    elapsedTime = 0;
    isRunning = false;

    document.querySelector("#stopwatch-display").textContent = "00:00:00.000";
    document.querySelector("#start-stopwatch").textContent = "Start";
    document.querySelector("#lap-list").innerHTML = "";
});

// Lap
document.querySelector("#lap-stopwatch").addEventListener("click", () => {
    if (isRunning || elapsedTime > 0) {
        const lapTime = isRunning
            ? performance.now() - startTime
            : elapsedTime;

        const lap = document.createElement("li");
        lap.textContent = formatTime(lapTime);

        document.querySelector("#lap-list").prepend(lap);
    }
});
let countdownInterval;
let remainingTime = 0;
let endTime = 0;
let timerRunning = false;

function displayCountdown(milliseconds) {
    const totalSeconds = Math.ceil(milliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.querySelector("#countdown-display").textContent =
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
function displayCountdown(milliseconds) {
    const totalSeconds = Math.ceil(milliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.querySelector("#countdown-display").textContent =
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// ADD THE SOUND FUNCTION HERE
const timerSound = new Audio("sounds/timer.mp3");
timerSound.loop = true;

let alarmRinging = false;

function playTimerSound() {
    timerSound.currentTime = 0;
    alarmRinging = true;

    timerSound.play().catch(error => {
        console.error("Audio playback failed:", error);
    });
}

function stopTimerSound() {
    if (alarmRinging) {
        timerSound.pause();
        timerSound.currentTime = 0;
        alarmRinging = false;
    }
}

// Stop alarm on user interaction
document.addEventListener("click", stopTimerSound);
document.addEventListener("keydown", stopTimerSound);
document.addEventListener("touchstart", stopTimerSound);

function updateCountdown() {
    remainingTime = Math.max(0, endTime - Date.now());

    displayCountdown(remainingTime);

    if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        timerRunning = false;

        playTimerSound();
    }
}
document.querySelector("#start-timer").addEventListener("click", () => {
    if (timerRunning) return;

    if (remainingTime === 0) {
        const hours = Number(document.querySelector("#timer-hours").value) || 0;
        const minutes = Number(document.querySelector("#timer-minutes").value) || 0;
        const seconds = Number(document.querySelector("#timer-seconds").value) || 0;

        if (
            hours < 0 || hours > 99 ||
            minutes < 0 || minutes > 59 ||
            seconds < 0 || seconds > 59 ||
            !Number.isInteger(hours) ||
            !Number.isInteger(minutes) ||
            !Number.isInteger(seconds) ||
            hours + minutes + seconds === 0
        ) {
            alert("Please enter a valid time.");
            return;
        }

        remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    }

    endTime = Date.now() + remainingTime;
    timerRunning = true;

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 100);
});

// Pause
document.querySelector("#pause-timer").addEventListener("click", () => {
    if (!timerRunning) return;

    clearInterval(countdownInterval);

    remainingTime = Math.max(0, endTime - Date.now());
    timerRunning = false;

    displayCountdown(remainingTime);
});
document.querySelector("#reset-timer").addEventListener("click", () => {
    clearInterval(countdownInterval);

    stopTimerSound();

    timerRunning = false;
    remainingTime = 0;

    document.querySelector("#timer-hours").value = "";
    document.querySelector("#timer-minutes").value = "";
    document.querySelector("#timer-seconds").value = "";

    displayCountdown(0);
});
// ALARM CLOCK

let alarms = [];

function displayAlarms() {
    const alarmSound = new Audio("sounds/alarm.mp3");
    alarmSound.loop = true;
    const alarmList = document.querySelector("#alarm-list");

    alarmList.innerHTML = alarms.map(alarm => `
    <div class="alarm-card">
        <h3>${alarm.time}</h3>

        <label class="alarm-toggle">
            <input
                type="checkbox"
                class="toggle-alarm"
                data-id="${alarm.id}"
                ${alarm.enabled ? "checked" : ""}
            >
            <span class="toggle-slider"></span>
        </label>

        <button class="delete-alarm" data-id="${alarm.id}">
            Delete
        </button>
    </div>
    `).join(""); 
}

// Add Alarm
document.querySelector("#add-alarm").addEventListener("click", () => {
    const time = document.querySelector("#alarm-time").value;
    console.log("Selected alarm time:", time);

    

    if (!time) {
        alert("Please select an alarm time.");
        return;
    }

    alarms.push({
        id: Date.now(),
        time: time,
        enabled: true,
        lastTriggeredDate: ""
    });

    displayAlarms();
     document.querySelector("#alarm-time").value = "";
});

// Turn alarms ON/OFF or Delete them
document.querySelector("#alarm-list").addEventListener("click", event => {
    if (event.target.classList.contains("delete-alarm")) {
        const id = Number(event.target.dataset.id);

        alarms = alarms.filter(alarm => alarm.id !== id);

        displayAlarms();
    }
});

// Check alarms every second
function checkAlarms() {
    const now = new Date();

    const currentTime = now.toTimeString().slice(0, 5);
    console.log("Current time:", currentTime, "Alarm time:", alarms);
    const today = now.toDateString();

    alarms.forEach(alarm => {
        if (
            alarm.enabled &&
            alarm.time === currentTime &&
            alarm.lastTriggeredDate !== today
        ) {
            alarm.lastTriggeredDate = today;

            alarmSound.currentTime = 0;

            alarmSound.play().catch(error => {
                console.error("Alarm playback failed:", error);
            });
        }
    });
}

setInterval(checkAlarms, 1000);

// Stop Alarm button
document.querySelector("#stop-alarm").addEventListener("click", () => {
    document.querySelector("#stop-alarm").addEventListener("click", () => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
});
});