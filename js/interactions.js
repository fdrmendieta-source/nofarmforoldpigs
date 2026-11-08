function enemiesGetShot() {

    if (state !== "init") return;

    let currentEnemies = environment.querySelectorAll(".enemy");
    let currentShots = environment.querySelectorAll(".shot");

    currentEnemies.forEach(ene => {

        currentShots.forEach(shot => {

            if (areColliding(ene, shot)) {

                ene.health -= shot.power;
                spawnNova(shot);

                if (ene.health <= 0) {

                    drop(ene);
                    ene.remove();
                    points += 1;

                }

                shot.remove();

            }

        });

    });

}

function pigIsButchered() {

    if (state !== "init") return;

    let currentKnives = environment.querySelectorAll(".knife");

    currentKnives.forEach(knife => {

        if (areColliding(knife, pig)) {

            spawnNova(knife);
            knife.remove();
            pig.remove();
            gameover();

        }

    });

}


function spawnNova(shot) {

    if (state !== "init") return;

    const nova = document.createElement("div");
    nova.classList.add("nova");

    environment.appendChild(nova);

    let x = shot.offsetLeft;
    let y = shot.offsetTop;

    let color;
    if (shot.sprite === "imgs/apple.png" || shot.sprite === "imgs/ball02.png") {
        color = "red";
    } else if (shot.sprite === "imgs/banana.png" || shot.sprite === "imgs/ball01.png") {
        color = "yellow";
    } else {
        color = "white";
    }

    nova.style.left = `${x}px`;
    nova.style.top = `${y}px`;
    nova.style.boxShadow = `0 0 5px ${color}`;

    nova.addEventListener("animationend", (e) => {
        nova.remove();
    }, {once: true});

}

function bonusIsCatched() {

    if (state !== "init") return;

    let currentBonuses = environment.querySelectorAll(".bonus");
    
    currentBonuses.forEach(b => {

        if (areColliding(b, pig)) {
            b.activate();
            b.remove();
        }

    });

}