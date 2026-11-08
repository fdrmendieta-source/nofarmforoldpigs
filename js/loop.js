let lastT;

function loop(t) {

    let deltaT = (t - lastT) / 1000;
    lastT = t;
    deltaT = Math.min(deltaT, 0.1);

    spawnEnemy();
    enemiesMove(deltaT);
    enemiesStab();
    knivesMove(deltaT);

    pigMoves(deltaT);
    pigShoots();
    shotsMove(deltaT);

    bonusesMove(deltaT);
    dogMoves(deltaT);
    dogShots();

    enemiesGetShot();
    pigIsButchered();
    bonusIsCatched();

    displayPoints();
    increaseDifficulty();
    gameWon();

    requestAnimationFrame(loop);

}

startPulse.addEventListener("click", () => {

    startPulse.disabled = true;
    lastT = performance.now();
    requestAnimationFrame(loop);
    state = "init";

    spawnPig();

});