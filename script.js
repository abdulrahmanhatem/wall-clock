
let clockFace = document.querySelector(".clock-face");
let docStyles = window.getComputedStyle(document.body);   
let viewRatio = docStyles.getPropertyValue("--view-ratio");
let frameRadius = docStyles.getPropertyValue("--clock-frame-radius");
let unit = viewRatio.replace(/[^a-z]/gi, ""); 
viewRatio = parseFloat(viewRatio) ;

clockRadius = frameRadius * parseFloat(viewRatio);


for (let n = 0; n < 12; n++) {

    let number = document.createElement("span");
    number.style.height = `${0.11 * clockRadius * viewRatio}${unit}` ;

    let deg = n *30; 

    console.log("Clock Radius" , clockRadius);

    let translate = 0.8 * clockRadius + unit;

    console.log(translate);

    // let translate = `${50 }%, ${-4 * clockRadius}`;


    

    let line = document.createElement("span");
    line.classList.add("line");

    let lineHeight = line.style;

    line.style.rotate = `0 0 1 ${-deg}deg`;
    line.style.top = `calc(4 * var(--view-ratio))`;
    line.style.left = 0;


    // line.style.top = `calc(${Math.sin(deg)} * var(--view-ratio))`;
    // line.style.left = `calc(- var(--view-ratio))`;
 
    number.appendChild(line);



    number.style.transform = `rotate(${deg}deg) translate(${translate})`;

    clockFace.appendChild(number)

    console.log(number.style.height)
}



let audio = document.querySelector(".audio-option img");





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

    let isTwelve = (hours === 12 || hours === 0) && minutes === 0 && seconds === 0;

    if (audioPermession) {
        tick()

        if (isTwelve) {
            strikeTwelve()
        }
    }

    // Update Details every 12 hours
    if (isTwelve) {
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

// Toggle Audio Permission
function changeAudioPermission() {
    let audioSrc = audio.getAttribute("src");

    audioPermession = !audioPermession;

    
    if (audioPermession) {
        audioSrc = "icons/volume.svg";
        
        
    }else{
        audioSrc = "icons/volume-slash.svg";
    }
    
    console.log(!false);
}



audio.addEventListener("click", () => changeAudioPermission())


// Update Clock every second
setInterval(updateClock, 1000);

// Initiate clock hands before interval
updateClock()

// Initiate Details before interval
getDetails()
