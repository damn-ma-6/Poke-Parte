var mainContainerEl = document.querySelector(".poke-cards");
var pokemonContainerEl = document.querySelectorAll(".poke-card");
// this variable will pull the city from the search bar
var city = document.querySelector("#city-name");
var userFormEl = document.querySelector("#user-form");
var displayWeatherEl = document.querySelector("#display-weather");
var pokeType = [];  

var getType = function (type) { 
    var apiURL = "https://pokeapi.co/api/v2/type/"+ type + "/";
    fetch(apiURL).then(function(response) {
        if (response.ok){
            response.json().then(function(data) {
                console.log(data);
                console.log(pokeType);
                for (var i=0; i<pokemonContainerEl.length; i++) {
                    pokeType.push(data.pokemon[Math.floor(Math.random() * 10)].pokemon.name);
                    console.log(pokeType[i]);
                    getPokemon(pokeType[i], i);
                }
            })
        }
    }) 
};

//getType("fire");

var getPokemon = function(pokemon, i) {
    //format the PokeAPI data 
    var apiURL = "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/"; 
    //make a request to the URL(404 ERROR and network connectivity)
    fetch(apiURL).then(function(response) {
    //request for data was successful 
         if (response.ok) { //"ok" - when the HTTP request status code is something in the 200s - ok = true 404 error
            response.json().then(function(pokemon) {
            console.log(pokemon);
            displayPokemon(pokemon, i);
            }); 
        }
    })
};

var displayPokemon = function(pokemon, i) { //for some reason, the data in this paramater is staying static as it loops
    console.log(arguments.length); 
    console.log(pokemon);
    let pokemonContainerEls = document.querySelectorAll(".poke-card");  
        //for(var i=0; i<pokemonContainerEls.length; i++) {
            pokemonContainerEls[i].innerHTML = ""; //empty content
            let pokeDiv = document.createElement("div"); //create div
            //pokemon name 
            let pokeName = pokemon.name; 
            let pokeNameEl = document.createElement("h2");
            pokeNameEl.innerHTML = pokeName; 
            pokeDiv.append(pokeNameEl);  
            pokemonContainerEls[i].append(pokeDiv); 
            //pokemon type 
            let pokeTypeOne = pokemon.types[0].type.name;
            //var pokeTypeTwo = pokemon.types[1].type.name || null; 
            let pokeTypeEl = document.createElement("p");
            pokeTypeEl.innerHTML = "Type: " + pokeTypeOne;
            //pokeTypeEl.innerHTML = pokeTypeTwo ||null;
            pokeDiv.append(pokeTypeEl);
            pokemonContainerEls[i].append(pokeDiv);
            //pokemon move 
            let moveOne = pokemon.moves[Math.floor(Math.random() * 5)].move.name; 
            let moveTwo = pokemon.moves[Math.floor(Math.random() * 5)].move.name; 
            //let moveThree = pokemon.moves[Math.floor(Math.random() * 5)].move.name; 
            let pokeMoveEl = document.createElement("p");
            pokeMoveEl.innerHTML= "Moves: " + moveOne + " / " + moveTwo // " / " + moveThree;
            pokeDiv.append(pokeMoveEl);
            pokemonContainerEls[i].append(pokeDiv);
            //pokemon picture 
            let pokeNumber = pokemon.id; 
            let pokePicEl = document.createElement("img");
            pokePicEl.setAttribute("style", "width:150px;height:150px;");
            pokePicEl.srcset = "https://pokeres.bastionbot.org/images/pokemon/" + pokeNumber + ".png";
            pokeDiv.append(pokePicEl);
            pokemonContainerEls[i].append(pokeDiv);
        //}
}

var formSubmitHandler = function(event){
    event.preventDefault();

    var cityName = city.value.trim();
    
    if(cityName){
        getCity(cityName);
    }else{
        alert("this doesnt display anything");
    }
    
}

// had to call the city api to get the data key for the city then enter it into the get weather function
var getCity = function(city){
    
    var apiUrl = "http://dataservice.accuweather.com/locations/v1/search?apikey=8phV97GIATzlpDJK66fxWSKyzLgvNucC&q=" + city + "&language=en-ca&details=false";

    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                getWeather(data[0].Key);
            });
        }else{
            alert("City not found Error: " + response.statusText);
        }
    })
    .catch(function(error){
        alert("Unable to connect");
    })
};

// function uses the get hourly weather api from accuweather and uses city key to display weather
var getWeather = function(cityKey){

    var apiUrl = "http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/" + cityKey + "?apikey=8phV97GIATzlpDJK66fxWSKyzLgvNucC&metric=true";

    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayWeather(data);
            });
        }
    });
};

var displayWeather = function(data){
    var cityName = city.value.trim();
    var weatherIcon = data[0].WeatherIcon;
    var iconPhrase = data[0].IconPhrase.toUpperCase(); 
    var temp = data[0].Temperature.Value;

    displayWeatherEl.textContent = ""
    var cityNameDisplay = document.createElement("h2");
    cityNameDisplay.className = "subtitle"
    cityNameDisplay.textContent = cityName;

    displayWeatherEl.appendChild(cityNameDisplay);



    var tempDisplay = document.createElement("p");
    tempDisplay.textContent = "Temp: " + temp + "°C";

    displayWeatherEl.appendChild(tempDisplay);
    

    var phraseDisplay = document.createElement("p");
    phraseDisplay.textContent = iconPhrase;

    displayWeatherEl.appendChild(phraseDisplay);

    var typeDisplay = document.createElement("p");

    if(iconPhrase === "SUNNY" || iconPhrase === "MOSTLY SUNNY" || iconPhrase === "PARTLY SUNNY" || iconPhrase === "HOT" || iconPhrase === "CLEAR" || iconPhrase === "MOSTLY CLEAR") {
        getType("grass");
        getType("ground");
        getType("fire");
        typeDisplay.textContent = "GRASS, GROUND AND FIRE TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "INTERMITTENT CLOUDS" || iconPhrase === "PARTLY CLOUDY" || iconPhrase === "MOSTLY CLOUDY") {
        getType("normal");
        getType("rock");
        typeDisplay.textContent = "NORMAL AND ROCK TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "HAZY SUNSHINE" || iconPhrase === "HAZY MOONLIGHT"){
        getType("normal");
        getType("rock");
        getType("grass");
        getType("ground");
        getType("fire");
        typeDisplay.textContent = "NORMAL, ROCK, GRASS, GROUND AND FIRE TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "MOSTLY CLOUDY" || iconPhrase === "CLOUDY" || iconPhrase === "DREARY(OVERCAST)"){
        getType("fairy");
        getType("fighting");
        getType("poison");
        typeDisplay.textContent = "FAIRY, FIGHTING AND POISON TYPES!"
        displayWeatherEl.appendChild(typeDisplay);    
    } else if(iconPhrase === "FOG") {
        getType("ghost"); 
        getType("dark");
        typeDisplay.textContent = "GHOST AND DARK TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "SHOWERS" || iconPhrase === "T-STORMS" || iconPhrase === "RAIN") {
        getType("water");
        getType("electric");
        getType("bug");
        typeDisplay.textContent = "WATER, ELECTRIC AND BUG TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "MOSTLY CLOUDY W/ SHOWERS" || iconPhrase === "MOSTLY CLOUDY W/ T-STORMS") {
        getType("water");
        getType("electric");
        getType("bug");
        getType("fairy");
        getType("fighting");
        getType("poison");
        typeDisplay.textContent = "WATER, ELECTRIC, BUG, FAIRY, FIGHTING AND POISON TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "PARTLY SUNNY W/ SHOWERS" || iconPhrase === "PARTLY SUNNY W/ T-STORMS") {
        getType("water");
        getType("electric");
        getType("grass");
        getType("ground");
        typeDisplay.textContent = "WATER, ELECTRIC, GRASS AND GROUND TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "MOSTLY CLOUDY W/ T-STORMS" || iconPhrase === "PARTLY CLOUDY W/ SHOWERS" || iconPhrase === "PARTLY CLOUDY W/ T-STORMS"){
        getType("normal");
        getType("rock");
        getType("water");
        getType("electric");
        getType("bug");
        typeDisplay.textContent = "NORMAL, ROCK, WATER, ELECTRIC AND BUG TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "FLURRIES" || iconPhrase === "SNOW" || iconPhrase === "SLEET" || iconPhrase === "COLD") {
        getType("ice");
        getType("steel"); 
        typeDisplay.textContent = "ICE AND STEEL TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "MOSTLY CLOUDY W/ FLURRIES" || iconPhrase === "MOSTLY CLOUDY W/ SNOW") {
        getType("normal");
        getType("rock");
        getType("ice");
        getType("steel");
        typeDisplay.textContent = "NORMAL, ROCK, ICE AND STEEL TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "PARTLY SUNNY W/ FLURRIES") {
        getType("grass");
        getType("ground");
        getType("ice");
        getType("steel");
        typeDisplay.textContent = "GRASS, GROUND, ICE AND STEEL TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "ICE") {
        getType("steel");
        typeDisplay.textContent = "STEEL TYPE!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "FREEZING RAIN" || iconPhrase === "RAIN AND SNOW") {
        getType("water");
        getType("electric");
        getType("ice");
        getType("steel");
        typeDisplay.textContent = "WATER, ELECTRIC, ICE AND STEEL TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "WINDY") {
        getType("dragon"); 
        getType("flying");
        getType("psychic");
        typeDisplay.textContent = "DRAGON, FLYING AND PSYCHIC TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "MOSTLY CLOUDY W/ FLURRIES" || iconPhrase === "MOSYLY CLOUDY W/ SNOW") {
        getType("fairy");
        getType("fighting");
        getType("poison");
        getType("ice");
        getType("steel");
        typeDisplay.textContent = "FAIRY, FIGHTING, POISON, ICE AND STEEL TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);


let cardEl = $(".poke-card");
let card = {};
            
function getCardDetails(target) {
  let currentCard = $(target).closest(".poke-card");
  let info = $(currentCard).find(".poke-info");
  let image = $(currentCard).find(".poke-image");
  card = {
    currentCard,
    info,
    image
    };
            
    return card;
    }
            
    $(cardEl).on("mouseenter", (e) => {
        let card = getCardDetails(e.target);
        $(card.currentCard).css("transition", "none");
    });
            
    $(cardEl).on('mousemove', (e) => {
        let x = ((window.innerWidth / 2) - e.pageX) / 15;
        let y = ((window.innerHeight / 2) - e.pageY) / 15;
            
        $(card.currentCard).css("transform", `rotateY(${-x}deg) rotateX(${y}deg)`);
            
        $(card.info).css("transform", "translateZ(40px)")
        $(card.image).css("transform", "translateZ(40px) rotateZ(-2deg)")
    });
            
    $(cardEl).on("mouseleave", () => {
    $(card.currentCard).css("transition", "all .5s ease");
    $(card.currentCard).css("transform", "rotateY(0deg) rotateX(0deg)");
            
    $(card.info).css("transform", "translateZ(0px)");
    $(card.image).css("transform", "translateZ(0px) rotateZ(0deg)");
    card = {};
});

