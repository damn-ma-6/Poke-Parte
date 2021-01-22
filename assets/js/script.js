var pokemonContainerEl = document.querySelector(".poke-card");
var currentPokemonEl = document.querySelector(".poke-name");
var currentTypeEl = document.querySelector(".poke-type");
var currentImageEl = document.querySelector(".poke-image");
var currentMoveEl = document.querySelector(".poke-move");
//var currentHabitatEl = document.querySelector("#pokemon-habitat");
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
    // if (pokeOneType === "grass") {
    //     window.alert("Hi!");
    // }
    
    currentPokemonEl.textContent = pokeOne;

    currentTypeEl.textContent = pokeOneType + " / " + pokeTwoType; 

    var moveOne = pokemon.moves[Math.floor(Math.random() * 10)].move.name; 
    var moveTwo = pokemon.moves[Math.floor(Math.random() * 10)].move.name; 
    var moveThree = pokemon.moves[Math.floor(Math.random() * 10)].move.name; 
    currentMoveEl.textContent= moveOne + " / " + moveTwo + " / " + moveThree;
}

//display Pokemon image
var pokemonImage = function (pokemon) {
    var pokeNumber = pokemon.id; 
    console.log(pokemon.id);
    var pokeImage = document.createElement("img");
    pokeImage.setAttribute("style", "width:250px;height:250px;")

    pokeImage.srcset = "https://pokeres.bastionbot.org/images/pokemon/" + pokeNumber + ".png";
    currentImageEl.appendChild(pokeImage);
}

//display Pokemon region 

// var pokemonRegion = function () {
//      //format the PokeAPI data 
//      var apiURL = "https://pokeapi.co/api/v2/region/kanto/"; 
//      //make a request to the URL(404 ERROR and network connectivity)
//      fetch(apiURL).then(function(response) {
//          //request for data was successful 
//          if (response.ok) { //"ok" - when the HTTP request status code is something in the 200s - ok = true 404 error
//              response.json().then(function(data) {
//                      console.log(data);
//                      getPokemonRegion(data);
//              });
//          } else { //ok = false (not in the 200s)
//              alert("Error: " + response.statusText); //statusText property - what the issue is 
//          }
//      })

// }

// var getPokemonRegion = function () {
    
// }


//search for city 
    // find weather condition - ie. sunny, cloudy, snowy etc.
        //find pokemon types based on weather 
            // if sunny -- find fire pokemon, display 10 

let cardEl = $(".poke-card");
let infoEl = $(".poke-info");
let imageEl = $("#pokemon-image");
      
$(cardEl).on('mousemove', (e) => {
    let x = ((window.innerWidth / 2) - e.pageX) / 15;
    let y = ((window.innerHeight / 2) - e.pageY) / 15;
      
    $(cardEl).css("transform", `rotateY(${-x}deg) rotateX(${-y}deg)`);
      
    $(infoEl).css("transform", "translateZ(40px)")
    $(imageEl).css("transform", "translateZ(40px) rotateZ(-2deg)")
});
      
$(cardEl).on("mouseenter", () => {
    $(cardEl).css("transition", "none");
});
      
$(cardEl).on("mouseleave", () => {
    $(cardEl).css("transition", "all .5s ease");
    $(cardEl).css("transform", "rotateY(0deg) rotateX(0deg)");
      
    $(infoEl).css("transform", "translateZ(0px)");
    $(imageEl).css("transform", "translateZ(0px) rotateZ(0deg)");
});


getPokemon(); 
//getPokemonRegion(); 