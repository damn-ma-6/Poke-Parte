var pokemonContainerEl = document.querySelector(".poke-card");
var currentPokemonEl = document.querySelector(".poke-name");
var currentTypeEl = document.querySelector(".poke-type");
var currentImageEl = document.querySelector(".poke-image");
var currentMoveEl = document.querySelector(".poke-move");

var getGroundType = function () { //returns 3 random ground type pokemon - display if weather is clear/sunny
    var apiURL = "https://pokeapi.co/api/v2/type/ground/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<3; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

var getFireType = function() { //returns 3 random fire type pokemon - display if weather is clear/sunny 
    var apiURL = "https://pokeapi.co/api/v2/type/fire/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<3; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

var getGrassType = function() { //returns 4 random grass type pokemon - display if weather is clear/sunny 
    var apiURL = "https://pokeapi.co/api/v2/type/grass/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<4; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

var getDarkType = function() { //returns 5 random dark type pokemon - display if weather is foggy 
    var apiURL = "https://pokeapi.co/api/v2/type/dark/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<5; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

var getGhostType = function() { //returns 5 random ghost type pokemon - display if weather is foggy 
    var apiURL = "https://pokeapi.co/api/v2/type/ghost/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<5; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

var getIceType = function() { //returns 5 random ice type pokemon - display if weather is snowy 
    var apiURL = "https://pokeapi.co/api/v2/type/ice/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<5; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

var getSteelType = function() { //returns 5 random steel type pokemon - display if weather is snowy 
    var apiURL = "https://pokeapi.co/api/v2/type/steel/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<5; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

var getWaterType = function() { //returns 3 random water type pokemon - display if weather is rainy 
    var apiURL = "https://pokeapi.co/api/v2/type/water/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<3; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

var getElectricType = function() { //returns 3 random electric type pokemon - display if weather is rainy 
    var apiURL = "https://pokeapi.co/api/v2/type/electric/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<3; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

var getBugType = function() { //returns 4 random bug type pokemon - display if weather is rainy 
    var apiURL = "https://pokeapi.co/api/v2/type/bug/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<4; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

var getFairyType = function() { //returns 3 random fairy type pokemon - display if weather is cloudy
    var apiURL = "https://pokeapi.co/api/v2/type/fairy/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<3; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

var getFightingType = function() { //returns 3 random fighting type pokemon - display if weather is cloudy 
    var apiURL = "https://pokeapi.co/api/v2/type/fighting/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<3; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

var getPoisonType = function() { //returns 4 random poison type pokemon - display if weather is cloudy 
    var apiURL = "https://pokeapi.co/api/v2/type/poison/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<4; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

var getFlyingType = function() { //returns 3 random flying type pokemon - display if weather is windy
    var apiURL = "https://pokeapi.co/api/v2/type/flying/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<3; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

var getDragonType = function() { //returns 3 random dragon type pokemon - display if weather is windy
    var apiURL = "https://pokeapi.co/api/v2/type/dragon/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<3; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};

var getPsychicType = function() { //returns 4 random pyschic type pokemon - display if weather is windy
    var apiURL = "https://pokeapi.co/api/v2/type/dragon/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                for (var i=0; i<4; i++) {
                    console.log(data.pokemon[Math.floor(Math.random() * 20)]);
                }
            });
        } else {
            alert("Error: " + response.statusText); //statusText property - what the issue is 
        }
    })
};


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
getGroundType(); 
getFireType(); 
getGrassType(); 
getDarkType(); 
getGhostType(); 
getIceType(); 
getSteelType(); 
getWaterType(); 
getElectricType(); 
getBugType(); 
getFairyType(); 
getFightingType(); 
getPoisonType(); 
getFlyingType(); 
getDragonType(); 
getPsychicType(); 
