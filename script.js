function updateClock() {
    let time = new Date();
    let hours = time.getHours() > 12 ? (time.getHours() - 12) : time.getHours() ;
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    let hourHand = document.querySelector('.hour-hand');
    let minuteHand = document.querySelector('.min-hand');
    let secondHand = document.querySelector('.second-hand');

    hourHand.style.rotate = `0 0 1 ${(hours*30) -180 + (minutes*30 /60) }deg`;
    minuteHand.style.rotate = `0 0 1 ${(minutes *6) -180 + (seconds*6 /60)}deg`;
    secondHand.style.rotate = `0 0 1 ${(seconds *6) -180}deg`;
}

setInterval(updateClock, 1000)

