





let audioPermession = false;

// Waiting user to interact with document
addEventListener('click', e => {
    audioPermession = true;
});

function updateClock() {
    let time = new Date();
    let hours = time.getHours() > 12 ? (time.getHours() - 12) : time.getHours() ;
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    let hourHand = document.querySelector('.hour-hand');
    let minuteHand = document.querySelector('.min-hand');
    let secondHand = document.querySelector('.second-hand');

    // update clock hands
    hourHand.style.rotate = `0 0 1 ${(hours*30) - 180 + (minutes*30 /60) }deg`;
    minuteHand.style.rotate = `0 0 1 ${(minutes *6) - 180 + (seconds*6 /60)}deg`;
    secondHand.style.rotate = `0 0 1 ${(seconds *6) - 180}deg`;

    if (audioPermession) {
        tick()

        if (hours == 12 && minutes === 0 && seconds === 0) {
            strikeTwelve()
        }
    }

    // Update Details every 12 hours
    if (hours == 12 && minutes === 0 && seconds === 0) {
        getDetails()
    }   
}

// Play Clock Second tick Sound Effect
function tick() {
    let tick = new Audio('./audio/tick.mp3'); 
    tick.play()
}

// Play clock Strike twelve Sound Effect
function strikeTwelve() {
    let strike = new Audio('./audio/strike-twelve.mp3');
    strike.volume = .1;
    strike.play()
}

// Initiate clock hands before interval
updateClock()

// Update Clock every second
setInterval(updateClock, 1000);

// Get User City
function getCity() {
    let cityElement = document.querySelector(".details .city")
    let city = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (city) {
        city = city.split("/");
        city = city[city.length -1]
        cityElement.innerHTML = city;
    }
}

// Get Day
function getDay() {
    let digit = document.querySelector(".details .day .digit");
    let name = document.querySelector(".details .day .name");
    let day = new Date();
    let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];   

    name.innerHTML = week[day.getDay()].toUpperCase();
    digit.innerHTML = day.getDate();  
}

// Get Details
function getDetails() {
    getCity()
    getDay()
}