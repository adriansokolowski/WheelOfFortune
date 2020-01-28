class Game {
    currentClue = null; // <= current randomized clue from clues object
    currentClueLetters = null; // <= all letters in clue
    attempts = 5; // <= attempts didnt used yet
    line = 15;
    max = clues.length - 1;
    min = 0;
    rand = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
    tilesContainer = document.querySelector("#tiles"); // <= letter board container
    tiles = document.querySelectorAll(".tile"); // <= every tile in letter board
    lettersContainer = document.querySelector("#letters"); // <= click buttons container
    playersContainer = document.querySelector("#players"); // <= players container
    letterButtons = ["a", "ą", "b", "c", "ć", "d", "e", "ę", "f", "g", "h", "i", "j", "k",
        "l", "ł", "m", "n", "ń", "o", "ó", "p", "q", "r", "s", "ś", "t", "u", "v",
        "w", "x", "y", "z", "ź", "ż"]; // <= alphabetical letters for buttons

    wordsToDisplay = this.getWordsArray(clues[this.rand].clue, this.line).join('');

    getRandomClue() {

        let category = document.querySelector("#clue"); // get clue span element

        category.innerText = clues[this.rand].category;

        this.currentClue = clues[this.rand].clue.toUpperCase();
        this.currentClueLetters = this.currentClue.replace(/ /g, "");
        console.log(this.currentClue);

        [...this.wordsToDisplay].forEach((letter, index) => {
            if (letter != " ") {
                this.tiles[index].className = "tile-active";
                this.tiles[index].dataset.letter = letter.toUpperCase(); // add letter to button data
            }

        });

    }
    generateButtons() {
        this.letterButtons.forEach(letter => {
            const button = document.createElement("button");
            button.classList.add("letter");
            button.type = "button";
            button.dataset.letter = letter.toUpperCase(); // add letter to button data
            button.innerText = letter.toUpperCase();
            this.lettersContainer.appendChild(button);
        });
    }

    setButtonEvents() {
        this.lettersContainer.addEventListener("click", e => {
            if (e.target.nodeName.toUpperCase() === "BUTTON" && e.target.classList.contains("letter")) {
                const letter = e.target.dataset.letter;

                this.checkLettersInBoard(letter);
                e.target.disabled = true; // disable button
            }
        }
        );
    }

    checkLettersInBoard(letter) {

        if (this.currentClue.includes(letter)) { // if clicked letter exists in clue

            for (let i = 0; i < this.wordsToDisplay.length; i++) {
                if (this.tiles[i].dataset.letter === letter) {
                    this.tiles[i].innerText = letter; // put letter in tile
                }
            }

        }
    }

    centerText(text, limit) {
        const spaceAvailable = (limit - text.length) / 2;
        const spaceLeft = Math.floor(spaceAvailable);
        const spaceRight = Math.ceil(spaceAvailable);
        return (' ').repeat(spaceLeft) + text + (' ').repeat(spaceRight);
    }

    getWordsArray(text, limit) {
        const words = text.split(' ');
        const wordsArray = [];
        let line = [];
        while (words.length > 0) {
            let lineLength = line.join(' ').length + words[0].length + 1;
            if (lineLength > limit) {
                wordsArray.push(this.centerText(line.join(' '), 15));
                line = [];
                continue;
            }

            line.push(words[0]);

            if (lineLength === limit) {
                wordsArray.push(this.centerText(line.join(' '), 15));
                line = [];
            } else if (words.length === 1) {
                wordsArray.push(this.centerText(line.join(' '), 15));
            }

            words.shift();
        }
        return wordsArray;
    }

    initGame() {
        this.getRandomClue();
        this.generateButtons();
        this.setButtonEvents();
    }

    startGame() {
        this.attempts = 5;
    }
}

const game = new Game();

game.initGame();