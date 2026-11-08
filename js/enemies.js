const farmer = {
    sprite: "imgs/farmer.png",
    className: "farmer",
    max: 3,
    vel: 100,
    minY: 70,
    maxY: 180,
    shotRate: 0.005,
    health: 10
};

const butcher = {
    sprite: "imgs/butcher.png",
    className: "butcher",
    max: 0,
    vel: 200,
    minY: 10,
    maxY: 60,
    shotRate: 0.008,
    health: 30
};

const enemies = [farmer, butcher];

function spawnEnemy() {

    if (state !== "init") return;

    enemies.forEach(ene => {

        let currentOnes = environment.querySelectorAll(`.${ene.className}`);
        
        if (currentOnes.length < ene.max) {

            const spawn = document.createElement("div");
            environment.appendChild(spawn);

            for (let key in ene) spawn[key] = ene[key];
            spawn.newX = getRandomNumber(0, environment.clientWidth - spawn.offsetWidth);

            spawn.classList.add(spawn.className, "enemy");
            spawn.innerHTML = `<img src="${ene.sprite}">`;

            let x = Math.random() < 0.5 ? -spawn.offsetWidth : environment.clientWidth;
            let y = getRandomNumber(spawn.minY, spawn.maxY);

            spawn.style.left = `${x}px`;
            spawn.style.top = `${y}px`;

        }

    });

}

function enemiesMove(deltaT) {

    if (state !== "init") return;

    let currentEnemies = environment.querySelectorAll(".enemy");
    if (!currentEnemies.length) return;

    currentEnemies.forEach(ene => {

        let currentX = ene.offsetLeft;
        let newX = ene.newX;
        let step = ene.vel * deltaT;
        let difX = newX - currentX;

        if (Math.abs(difX) > step) {

            let dir = difX > 0 ? 1 : -1;

            ene.style.left = `${currentX + (step * dir)}px`;

        } else {

            ene.newX = getRandomNumber(0, environment.clientWidth - ene.offsetWidth);

        }

    });

}

const knife = {
    sprite: "imgs/knife.png",
    className: "knife",
    vel: 250
}

function enemiesStab() {

    if (state !== "init") return;

    let currentEnemies = environment.querySelectorAll(".enemy");

    currentEnemies.forEach(ene => {

        if (Math.random() < ene.shotRate) {

            const spawn = document.createElement("div");
            
            environment.appendChild(spawn);

            for (let key in knife) spawn[key] = knife[key];

            spawn.classList.add(spawn.className);
            
            spawn.innerHTML = `<img src="${spawn.sprite}">`;

            let x = ene.offsetLeft + (ene.offsetWidth / 2);
            let y = ene.offsetTop + ene.offsetHeight;

            spawn.style.left = `${x}px`;
            spawn.style.top = `${y}px`;

        }

    });

}

function knivesMove(deltaT) {

    if (state !== "init") return;

    let currentKnives = environment.querySelectorAll(".knife");

    currentKnives.forEach(knife => {

        elementFalls(knife, deltaT);

    });

}