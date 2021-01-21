var pokemonContainerEl = document.querySelector("#pokemon-container");
var currentPokemonEl = document.querySelector("#current-pokemon");
var currentTypeEl = document.querySelector("#current-type");
var currentImageEl = document.querySelector("#pokemon-image");
var currentMoveEl = document.querySelector("#pokemon-move");
var currentHabitatEl = document.querySelector("#pokemon-habitat");
//var apiURL = "https://pokeapi.co/api/v2/pokemon/"

var getPokemon = function() {
    //format the PokeAPI data 
    var apiURL = "https://pokeapi.co/api/v2/pokemon/bulbasaur/"; 
    //make a request to the URL(404 ERROR and network connectivity)
    fetch(apiURL).then(function(response) {
        //request for data was successful 
        if (response.ok) { //"ok" - when the HTTP request status code is something in the 200s - ok = true 404 error
            response.json().then(function(pokemon) {
                    console.log(pokemon);
                    displayPokemon(pokemon);
                    pokemonImage(pokemon);    
            });
        } else { //ok = false (not in the 200s)
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

//display Pokemon name, type and moves 
var displayPokemon = function(pokemon) {
    var pokeOne = pokemon.name;
    var pokeOneType = pokemon.types[0].type.name;
    var pokeTwoType = pokemon.types[1].type.name; 
    
    currentPokemonEl.innerHTML = "Name: " + pokeOne;
    pokemonContainerEl.appendChild(currentPokemonEl);

    currentTypeEl.innerHTML = "Type: " + pokeOneType + " / " + pokeTwoType; 
    pokemonContainerEl.appendChild(currentTypeEl); 

    for(var i=0; i<3; i++) {
        // var pokeMove = pokemon.moves[i].move.name;
        // console.log (pokeMove);
        var moveOne = pokemon.moves[Math.floor(Math.random() * 10)].move.name; 
        var moveTwo = pokemon.moves[Math.floor(Math.random() * 10)].move.name; 
        var moveThree = pokemon.moves[Math.floor(Math.random() * 10)].move.name; 
        currentMoveEl.innerHTML= "Moves: "  + moveOne + " / " + moveTwo + " / " + moveThree;
        pokemonContainerEl.appendChild(currentMoveEl);
    }  
}

//display Pokemon image
var pokemonImage = function (pokemon) {
    var pokeNumber = pokemon.id; 
    console.log(pokemon.id);
    var pokeImage = document.createElement("img");
    pokeImage.setAttribute("style", "width:250px;height:250px;")

    pokeImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/` + pokeNumber + `.png`;
    currentImageEl.appendChild(pokeImage);
    pokemonContainerEl.appendChild(currentImageEl);
}

//display Pokemon region 


//search for city 
    // find weather condition - ie. sunny, cloudy, snowy etc.
        //find pokemon types based on weather 
            // if sunny -- find fire pokemon, display 10 


getPokemon(); 
