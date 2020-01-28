const game = {
    currentClue: null, // <= current randomized clue from clues object
    currentClueLetters: null, // <= all letters in clue
    attempts: 5, // <= attempts didnt used yet
    tilesContainer: document.querySelector("#tiles"), // <= letter board container
    tiles: document.querySelectorAll(".tile"), // <= every tile in letter board
    lettersContainer: document.querySelector("#letters"), // <= click buttons container
    playersContainer: document.querySelector("#players"), // <= players container
    letterButtons: ["a","ą","b","c","ć","d","e","ę","f","g","h","i","j","k",
    "l","ł","m","n","ń","o","ó","p","q","r","s","ś","t","u","v",
    "w","x","y","z","ź","ż"], // <= alphabetical letters for buttons

    getRandomClue() {
        const max = clues.length-1; // how many clues in clue object
        const min = 0;
        const rand = Math.floor(Math.random()*(max-min+1)+min); // get random number
        
        let category = document.querySelector("#clue"); // get clue span element

        category.innerText = clues[rand].category; 

        this.currentClue = clues[rand].clue.toUpperCase();
        this.currentClueLetters = this.currentClue.replace(/ /g, "");
        
        this.tiles.forEach(function( tile, index ) {
            // tile == tile div
            if (index < clues[rand].clue.length && clues[rand].clue[index] != " ") {
                //tile.innerHTML = clues[rand].clue[index].toUpperCase();
                tile.className = "tile-active";
                
            }
          });

    },
    generateButtons() {
       this.letterButtons.forEach(letter => {
            const button = document.createElement("button");
            button.classList.add("letter");
            button.type = "button";
            button.dataset.letter = letter.toUpperCase(); // add letter to button data
            button.innerText = letter.toUpperCase();
            this.lettersContainer.appendChild(button);
        });
    },

    setButtonEvents() {
        this.lettersContainer.addEventListener("click", e => {
            if (e.target.nodeName.toUpperCase() === "BUTTON" && e.target.classList.contains("letter")) {
                const letter = e.target.dataset.letter;
                this.checkLettersInBoard(letter);
                e.target.disabled = true; // disable button
            }
        }
        );
    },

    checkLettersInBoard(letter){
        if (this.currentClue.includes(letter)) { // if clicked letter exists in clue
            for (let i=0; i<this.currentClue.length; i++) {
                if (this.currentClue[i] === letter) {
                    this.tiles[i].innerText = letter; // put letter in tile
                    console.log(i);
                }
            }
    }
},

    initGame() {
        this.getRandomClue();
        this.generateButtons();
        this.setButtonEvents();
    },

    startGame() {
        this.attempts = 5; 
    }

}

game.initGame();
  