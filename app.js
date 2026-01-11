let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "blue"];
let started = false;
let level = 0;


let h2 = document.querySelector("h2");





let btn = document.querySelector("button");

btn.addEventListener("click", function () {

    if (started == false) {
        console.log("started");
        started = true;


        levelup();
    }
});






function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColour = btns[randIdx];
    let randBtn = document.querySelector(`.${randColour}`);
    gameSeq.push(randColour);
    gameFlash(randBtn);
}

function checkbtns(idx) {


    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {

            setTimeout(levelup, 1000);
        }

    } else {
        h2.innerHTML = "Game Over! Press the <button class=\"startbutton\">BUTTON</button> to restart.";

        setTimeout(function () {
            gameSeq = [];
            userSeq = [];
            started = false;
            level = 0;
        }, 1000);
    }
}

function btnpress() {
    let btn = this;
    userFlash(btn);
    let userColour = btn.getAttribute("id");
    userSeq.push(userColour);
    checkbtns(userSeq.length - 1);

}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnpress);
}


document.addEventListener("click", function (e) {
    if (e.target.classList.contains("startbutton")) {
        if (started == false) {
            console.log("restarted");
            started = true;
            levelup();
        }
    }
});






let highestScore = localStorage.getItem("highestScore") || 0;
let gameOverModal = document.getElementById("gameOverModal");
let restartBtn = document.querySelector(".restart-btn");


let originalCheckbtns = checkbtns;
checkbtns = function (idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {

        let currentScore = level - 1;

        if (currentScore > highestScore) {
            highestScore = currentScore;
            localStorage.setItem("highestScore", highestScore);
        }

        document.getElementById("finalScore").innerText = currentScore;
        document.getElementById("highestScore").innerText = highestScore;

        gameOverModal.classList.add("show");

        setTimeout(function () {
            gameSeq = [];
            userSeq = [];
            started = false;
            level = 0;
        }, 1000);
    }
};


restartBtn.addEventListener("click", function () {
    gameOverModal.classList.remove("show");
    h2.innerHTML = `Press <button class="startbutton"> <b>START</b></button> to Start the game`;
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];


    let newStartBtn = h2.querySelector(".startbutton");
    if (newStartBtn) {
        newStartBtn.addEventListener("click", function () {
            if (started == false) {
                console.log("started");
                started = true;
                levelup();
            }
        });
    }
});




