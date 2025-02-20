const gameContainer = document.querySelector(".gameContainer");

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const square = document.createElement("div");
        // square.classList(`gameSquare index${i}${j}`);
        square.setAttribute('class', `gameSquare row${i} col${j}`);
        square.textContent = "square";
        gameContainer.appendChild(square);
    }

}