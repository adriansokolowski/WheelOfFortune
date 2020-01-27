const game = {
    currentSentence: null, //aktualnie pobrane hasło
    currentSentenceLetters: null
}

// losujemy hasło

const randomize = ( max, min ) => { return Math.floor(Math.random()*(max-min+1)+min); }

const rand = randomize(clues.length - 1, 0);

const totalCells = 60;
let count = 0;
let tiles = document.querySelectorAll(".tile");
let row = 1;
let spaces = 0;

category = document.querySelector("#category");

category.innerHTML = "Rodzaj hasła: " + clues[rand].category;

tiles.forEach(function( tile, index ) {

    if ( clues[rand].clue[index] == " "){
        spaces++
    }

    if (index === 14 && spaces == 2 ) {
        row = 1;
    }
    if (index === 28) {
        row = 2;
    }

     if (index < clues[rand].clue.length && clues[rand].clue[index] != " ") {
        // tiles[index].innerHTML = clues[rand].clue[index].toUpperCase();
        tiles[index].className = "tile-active";
    }

  });

let przyciski = document.querySelectorAll(".letter");

let elemLetters = document.querySelector("#letters");

elemLetters.addEventListener("click", e => {
    if (e.target.nodeName.toUpperCase() === "BUTTON" && e.target.classList.contains("letter")) {
        const letter = e.target.innerHTML;
        console.log(letter); //na razie wypiszmy literę w konsoli
        e.target.disabled = true;
    }
}
);