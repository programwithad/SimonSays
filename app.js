let gameSeq = [];
let userSeq = [];

const startS = new Audio('sounds/start.wav');
const clickS = new Audio('sounds/click.wav');
const wrongS = new Audio('sounds/wrong.mp3');

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;

let highH = document.querySelector("#highScore");
let levH = document.querySelector("#level");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game Started");
        started = true;
        startS.play();
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function levelUp(){
    userSeq = []; 
    level++;
    levH.innerText = "Level " + level;

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randbtn);
}

function checkAns(idx){
    // console.log("current level : ", level);
    
    if(userSeq[idx] === gameSeq[idx]){
        console.log("same value");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        wrongS.play();
        levH.innerHTML = `Game Over ! Your Score was <b>${level}</b>. Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },400);
        reset();
    }
}

function btnPress(){
    let btn = this;
    console.log(btn.innerText," button clicked")
    clickS.play();
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    startButton.style.display = "block";
    gameSeq = [];
    userSeq = [];
    if(level > highScore){
        highScore = level;
    }
    highH.innerHTML = `High Score : ${highScore}`;
    level = 0;
}

let startButton = document.querySelector("#start");
startButton.addEventListener("click", function(){
    if(started == false){
        console.log("Game Started");
        started = true;
        startS.play();
        levelUp();
        startButton.style.display="none";
    }
});
