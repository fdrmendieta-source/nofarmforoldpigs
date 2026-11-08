const environment = document.getElementById("environment");
const startPulse = document.getElementById("start-pulse");
const pointsDisplayer = document.getElementById("points-displayer");
const finishedGameDialog = document.getElementById("finished-game-dialog");
const finishedGameWords = document.getElementById("finished-game-words");
const finishedGameUnderstood = document.getElementById("finished-game-understood");

const leftPulse = document.getElementById("left-pulse");
const rightPulse = document.getElementById("right-pulse");
const shotPulse = document.getElementById("shot-pulse");

const pulses = {};
document.addEventListener("keydown", e => { pulses[e.code] = true; });
document.addEventListener("keyup", e => { pulses[e.code] = false; });

function bindTouchControl(element, code) {

    if (!element) return;

    element.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        pulses[code] = true;
    });

    element.addEventListener("pointerup", (e) => {
        e.preventDefault();
        pulses[code] = false;
    });

    element.addEventListener("pointercancel", () => { pulses[code] = false; });
    element.addEventListener("pointerleave", () => { pulses[code] = false; });

}

bindTouchControl(leftPulse, "KeyA");
bindTouchControl(rightPulse, "KeyD");
bindTouchControl(shotPulse, "Space");


function areColliding(element1, element2) {

    if (!element1 || !element2) return;

    let rect1 = element1.getBoundingClientRect();
    let rect2 = element2.getBoundingClientRect();

    return rect1.left < rect2.right && rect1.right > rect2.left && rect1.top < rect2.bottom && rect1.bottom > rect2.top;

}

function getRandomNumber(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

}


function spawnShot(shooter, type) {

    shooter.style.animation = "none";
    void shooter.offsetHeight;
    shooter.style.animation = `rotate ${shooter.shotDelay} linear`;

    const spawn = document.createElement("div");
    environment.appendChild(spawn);

    for (let key in type) spawn[key] = type[key];
    spawn.power = getRandomNumber(spawn.minPower, spawn.maxPower);

    spawn.sprite = spawn.sprites[Math.floor(Math.random() * spawn.sprites.length)];
    spawn.innerHTML = `<img src="${spawn.sprite}">`;

    let x = shooter.offsetLeft + (shooter.offsetWidth / 2) - (spawn.offsetWidth / 2);
    let y = shooter.offsetTop - spawn.offsetHeight;

    spawn.style.left = `${x}px`;
    spawn.style.top = `${y}px`;

}

function shotsMove(deltaT) {

    if (state !== "init") return;

    let currentShots = environment.querySelectorAll(".shot");

    currentShots.forEach(shot => {

        elementRises(shot, deltaT);

    });

}

function elementRises(element, deltaT) {

    let currentY = element.offsetTop;
    let step = element.vel * deltaT;

    element.style.top = `${currentY - step}px`;

    if (currentY <= 0) element.remove();

}

function elementFalls(element, deltaT) {

    let currentY = element.offsetTop;
    let step = element.vel * deltaT;

    element.style.top = `${currentY + step}px`;

    if (currentY >= environment.clientHeight) element.remove();

}