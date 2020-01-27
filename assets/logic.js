

const max = clues.length - 1;
const min = 0;
const rand = Math.floor(Math.random()*(max-min+1)+min);

console.log(rand);

let tiles = document.querySelectorAll(".tile");

category = document.querySelector("#category");

category.innerHTML = "Rodzaj hasła: " + clues[rand].category;

tiles.forEach(function( tile, index ) {

    if (index < clues[rand].clue.length && clues[rand].clue[index] != " ") {
        tile.innerHTML = clues[rand].clue[index].toUpperCase();
        tile.className = "tile-active";
    }

  });