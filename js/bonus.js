const bone = {
    sprite: "imgs/bone.png",
    vel: 75,
    activate: spawnDog
};

const sandal = {
    sprite: "imgs/sandal.png",
    vel: 75,
    activate: increaseVel
};

const bonuses = [bone, sandal];

let bonusRate = 0.05;

function drop(enemy) {

    if (state !== "init") return;

    if (Math.random() <= bonusRate) {

        const lucky = bonuses[Math.floor(Math.random() * bonuses.length)];
        const bonus = document.createElement("div");
        bonus.classList.add("bonus");
        environment.appendChild(bonus);
        
        for (let key in lucky) bonus[key] = lucky[key];

        let x = enemy.offsetLeft + (enemy.offsetWidth / 2);
        let y = enemy.offsetTop + (enemy.offsetHeight / 2);

        bonus.innerHTML = `<img src="${bonus.sprite}">`;
        bonus.style.left = `${x}px`;
        bonus.style.top = `${y}px`;

    }

}

function bonusesMove(deltaT) {

    if (state !== "init") return;

    let currentBonuses = environment.querySelectorAll(".bonus");

    currentBonuses.forEach(b => { 

        elementFalls(b, deltaT);

    });

}

function increaseVel() {

    if (state !== "init") return;

    let originalVel = pig.vel;
    let originalShotDelay = pig.shotDelay;
    pig.vel = 400;
    pig.shotDelay = "250ms";

    setTimeout(() => {

        pig.vel = originalVel;
        pig.shotDelay = originalShotDelay;

    }, 5000);

}

const dog = {
    sprite: "imgs/dog.png",
    className: "dog",
    max: 1,
    vel: 200,
    canShoot: true,
    shotDelay: "1000ms",
    maxShots: 10,
    shots: 0
}

const dogShot = {
    sprites: ["imgs/ball01.png", "imgs/ball02.png"],
    className: "shot",
    vel: 300,
    minPower: 10,
    maxPower: 15
};

function spawnDog() {

    if (state !== "init") return;

    let currentDogs = environment.querySelectorAll(".dog");
    if (currentDogs.length >= dog.max) return;

    let spawn = document.createElement("div");
    environment.appendChild(spawn);

    for (let key in dog) spawn[key] = dog[key];
    spawn.newX = environment.clientWidth - spawn.offsetWidth;

    spawn.innerHTML = `<img src="${spawn.sprite}">`;
    spawn.classList.add(spawn.className);

    let x = environment.clientWidth / 2;
    let y = environment.clientHeight - (spawn.offsetHeight * 4);

    spawn.style.left = `${x}px`;
    spawn.style.top = `${y}px`;

}

function dogMoves(deltaT) {

    if (state !== "init") return;

    let currentDogs = environment.querySelectorAll(".dog");

    currentDogs.forEach(d => {

        let newX = d.newX;
        let currentX = d.offsetLeft;
        let step = d.vel * deltaT;
        let difX = newX - currentX;

        if (Math.abs(difX) > step) {

            let dir = difX > 0 ? 1 : -1;
            d.style.left = `${currentX + (step * dir)}px`;

        } else {

            if (newX > (environment.clientWidth / 2)) {
                d.newX = 0;
            } else {
                d.newX = environment.clientWidth - d.offsetWidth;
            }

        }

    });

}

function dogShots() {

    if (state !== "init") return;

    let currentDogs = environment.querySelectorAll(".dog");

    currentDogs.forEach(d => {

        if (d.canShoot) {

            d.canShoot = false;
            spawnShot(d, dogShot);

            d.addEventListener("animationend", () => {
                d.canShoot = true;
                d.shots += 1;
            }, { once: true });

            if (d.shots >= d.maxShots) d.remove();

        }

    });

}