let state = "noInit";
let points = 0;

document.addEventListener("keydown", e => {

    if (e.code === "KeyP") {

        if (state === "init") {
            state = "paused";
        } else if (state === "paused") {
            state = "init";
        }

    }

});

function displayPoints() {

    pointsDisplayer.textContent = points;

}

function increaseDifficulty() {

    if (points >= 10 && points < 30) {
        farmer.max = 4;
    } else if (points >= 30 && points < 50) {
        farmer.max = 5;
    } else if (points >= 50 && points < 70) {
        farmer.max = 6;
    } else if (points >= 70) {
        farmer.max = 7;
    }

    if (points >= 25 && points < 50) {
        butcher.max = 1;
    } else if (points >= 50 && points < 75) {
        butcher.max = 2;
    } else if (points >= 75) {
        butcher.max = 3;
    }

}

function gameover() {

    state = "gameover";

    setTimeout(() => {

        finishedGameDialog.showModal();
        finishedGameWords.textContent = "The pig loses :(";

    }, 500);

}

function gameWon() {

    if (points >= 100) {

        points = 100;
        state = "won";

        setTimeout(() => {

            finishedGameDialog.showModal();
            finishedGameWords.textContent = "THE PIG WINS! :)";

        }, 500);

    }

}

finishedGameUnderstood.addEventListener("click", () => {

    location.reload();

});