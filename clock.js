var head = document.getElementsByTagName('h1')[0],
start = document.getElementById('start'),
pause = document.getElementById('pause'),
reset = document.getElementById('reset'),
seconds = 0, minutes = 0, hours = 0,
t;
var status = 'resumed';

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    head.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
timer();

start.onclick = function() {
    if(status !== 'resumed') {
        timer();
        status = 'resumed';
        document.getElementById("status").style.cssText = 'background: #9DE492;';
        document.getElementById("status").innerHTML = "RESUMED";
    }
};

pause.onclick = function() {
    clearTimeout(t);
    status = 'paused';
    document.getElementById("status").style.cssText = 'background: #FF7C7C;';
    document.getElementById("status").innerHTML = "PAUSED";
}

reset.onclick = function() {
    clearTimeout(t);
    head.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    status = 'reset';
    document.getElementById("status").style.cssText = 'background: #D1D1D1;';
    document.getElementById("status").innerHTML = "RESET";
}
