const pig = document.createElement("div");
pig.id = "pig";
pig.sprite = "imgs/pig.png";
pig.vel = 200;
pig.canShoot = true;
pig.shotDelay = "500ms";

function spawnPig() {

    environment.appendChild(pig);
    pig.innerHTML = `<img src="${pig.sprite}">`;

    let x = (environment.clientWidth / 2) - (pig.offsetWidth / 2);
    let y = environment.clientHeight - (pig.offsetHeight * 6);

    pig.style.left = `${x}px`;
    pig.style.top = `${y}px`;

}

function pigMoves(deltaT) {

    if (state !== "init") return;

    let currentX = pig.offsetLeft;
    let currentY = pig.offsetTop;

    let minX = 0;
    let maxX = environment.clientWidth - pig.offsetWidth;
    let minY = farmer.maxY + pig.offsetHeight;
    let maxY = environment.clientHeight - pig.offsetHeight;

    let step = pig.vel * deltaT;

    if (pulses["KeyD"]) pig.style.left = `${Math.min(maxX, currentX + step)}px`;
    if (pulses["KeyA"]) pig.style.left = `${Math.max(minX, currentX - step)}px`;
    if (pulses["KeyW"]) pig.style.top = `${Math.max(minY, currentY - step)}px`;
    if (pulses["KeyS"]) pig.style.top = `${Math.min(maxY, currentY + step)}px`;

}


const shot = {
    sprites: ["imgs/apple.png", "imgs/banana.png"],
    className: "shot",
    vel: 300,
    minPower: 7,
    maxPower: 12
};

pig.addEventListener("animationend", () => {

    pig.canShoot = true;

});

function pigShoots() {

    if (state !== "init") return;
    if (!pig.canShoot) return;

    if (pulses["Space"]) {

        pig.canShoot = false;

        spawnShot(pig, shot);

    }

}