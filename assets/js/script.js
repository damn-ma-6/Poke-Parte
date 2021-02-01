//updated 

var mainContainerEl = document.querySelector(".poke-cards");
var pokemonContainerEl = document.querySelectorAll(".poke-card");
// this variable will pull the city from the search bar
var city = document.querySelector("#city-name");
var userFormEl = document.querySelector("#user-form");
var displayWeatherEl = document.querySelector("#display-weather");
//empty array for returned pokemon 
var pokeType = [];  
//empty array for duplicate pokemon
let uniquePokeType = [];
//random number, will get pokemon from divs - random number beetween 1 and 29 
function getRandomNumber(min, max) {
    return Math.ceil(Math.random() * (max-min) +1) + min;
};

//get pokemon type, called by weather conditions. 
var getType = function (type) { 
    var apiURL = "https://pokeapi.co/api/v2/type/"+ type + "/";
    fetch(apiURL).then(function(response) {
        if (response.ok){
            response.json().then(function(data) {
                for (var i=0; i<pokemonContainerEl.length; i++) {
                    pokeType.push(data.pokemon[getRandomNumber(1,29)].pokemon.name);
                    
                    pokeType.forEach((c) => {
                        if (!uniquePokeType.includes(c)) {
                            uniquePokeType.push(c); 
                        }
                    }); 
                 getPokemon(uniquePokeType[getRandomNumber(1,29)], i);
                }
            })
        }
    }) 
};


//get pokemon moves and type - called by getType 
var getPokemon = function(pokemon, i) {
    var apiURL = "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/"; 
    fetch(apiURL).then(function(response) {
         if (response.ok) { 
            response.json().then(function(pokemon) {
            displayPokemon(pokemon, i);
            }); 
        }
    })
};

//display pokemon moves, type and picture - called by getPokemon 
var displayPokemon = function(pokemon, i) { 
    let pokemonContainerEls = document.querySelectorAll(".poke-card");  
    
    pokemonContainerEls[i].innerHTML = ""; //empty content
    //pokemon name 
    let pokeInfoEl = document.createElement("div");
    pokeInfoEl.classList.add("poke-info");
    let pokeName = pokemon.name; 
    let pokeNameEl = document.createElement("h2");
    pokeNameEl.innerHTML = pokeName; 
    pokeInfoEl.appendChild(pokeNameEl);
    //pokemon type 
    let pokeTypeOne = pokemon.types[0].type.name;  
    let pokeTypeEl = document.createElement("h3"); 
    pokeTypeEl.innerHTML = "Type: " + pokeTypeOne;  
    pokeInfoEl.append(pokeTypeEl);
    pokemonContainerEls[i].append(pokeInfoEl);
    //pokemon move 
    let moveOne = pokemon.moves[Math.floor(Math.random() * 5)].move.name; 
    let moveTwo = pokemon.moves[Math.floor(Math.random() * 5)].move.name; 
    let pokeMoveEl = document.createElement("h4");
    pokeMoveEl.innerHTML= "Moves: " + moveOne + " / " + moveTwo;
    pokeInfoEl.append(pokeMoveEl);
    pokemonContainerEls[i].append(pokeInfoEl);
    //pokemon picture 

    let pokeImgEl = document.createElement("div");
    pokeImgEl.classList.add("poke-image");
    let pokeNumber = pokemon.id; 
    let pokePicEl = document.createElement("img");
    pokePicEl.setAttribute("style", "width:150px;height:150px;");
    pokePicEl.src = "https://pokeres.bastionbot.org/images/pokemon/" + pokeNumber + ".png";
    
    pokeImgEl.append(pokePicEl);
    pokemonContainerEls[i].append(pokeImgEl)
}


var formSubmitHandler = function(event){
    event.preventDefault();
    localStorage.clear();

    var cityName = city.value.trim();
    
    if(cityName){
        getCity(cityName);
    }
    
}

$(".user-location").on("click", getLocation);

function getLocation() {
    if (navigator.geolocation) {
        $("#city-name").val("Locating...");
        navigator.geolocation.getCurrentPosition(showPosition, error);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(`latitude: ${lat}, longitude: ${lon}`);
    let apiUrl = 
        `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=8phV97GIATzlpDJK66fxWSKyzLgvNucC&q=${lat},${lon}&language=en-ca&details=false`;
    fetch(apiUrl).then(response => {
        if(response.ok) {
            response.json().then(data => {
                $("#city-name").val("");
                let cityName = data.LocalizedName;
                getCity(cityName);
            })
        } else {
            alert("something went wrong!");
        }
    }) 
    .catch(error => {
        $("#city-name")
        console.log(error);
    })
}

function error() {
    $("#city-name").val("");
    alert('Unable to get your location');
}

// had to call the city api to get the data key for the city then enter it into the get weather function
var getCity = function(city){
    
    var apiUrl = "https://dataservice.accuweather.com/locations/v1/search?apikey=8phV97GIATzlpDJK66fxWSKyzLgvNucC&q=" + city + "&language=en-ca&details=false";

    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                let cityName = data[0].LocalizedName;
                getWeather(data[0].Key, cityName);
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
var getWeather = function(cityKey, cityName){
    // let ctname = cityName;

    var apiUrl = "https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/" + cityKey + "?apikey=8phV97GIATzlpDJK66fxWSKyzLgvNucC&metric=true";

    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayWeather(data, cityName);
                console.log(cityName);
            });
        }
    }) ;
}

//empty arrays for city names and conditions 
var cityStorage = [];
var conditions = [];

//empty arrays for city names and conditions 
var cityStorage = [];
var conditions = [];

var displayWeather = function(data){
    var cityName = city.value.toUpperCase().trim();
    cityStorage = JSON.parse(localStorage.getItem("city")) || []; //save city name to array 
    cityStorage.unshift(cityName); // push to beginning of array 
    localStorage.setItem("cityName", JSON.stringify(cityName));

    //var weatherIcon = data[0].WeatherIcon;
    var iconPhrase = data[0].IconPhrase.toUpperCase().trim(); 
    conditions = JSON.parse(localStorage.getItem("conditions")) || []; //save conditions to array 
    conditions.unshift(iconPhrase); // push to beginning of array 
    localStorage.setItem("conditions", JSON.stringify(conditions));

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
        getType("poison");
        typeDisplay.textContent = "NORMAL, ROCK AND POISON TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "HAZY SUNSHINE" || iconPhrase === "HAZY MOONLIGHT"){
        getType("rock");
        getType("ground");
        getType("fire");
        typeDisplay.textContent = "ROCK, GROUND AND FIRE TYPES!"
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
        getType("electric");
        typeDisplay.textContent = "GHOST, DARK AND ELECTRIC TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "SHOWERS" || iconPhrase === "T-STORMS" || iconPhrase === "RAIN") {
        getType("water");
        getType("electric");
        getType("bug");
        typeDisplay.textContent = "WATER, ELECTRIC AND BUG TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "MOSTLY CLOUDY W/ SHOWERS" || iconPhrase === "MOSTLY CLOUDY W/ T-STORMS") {
        getType("water");
        getType("bug");
        getType("fairy");
        typeDisplay.textContent = "WATER, BUG AND FAIRY TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "PARTLY SUNNY W/ SHOWERS" || iconPhrase === "PARTLY SUNNY W/ T-STORMS") {
        getType("water");
        getType("electric");
        getType("ground");
        typeDisplay.textContent = "WATER, ELECTRIC AND GROUND TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "MOSTLY CLOUDY W/ T-STORMS" || iconPhrase === "PARTLY CLOUDY W/ SHOWERS" || iconPhrase === "PARTLY CLOUDY W/ T-STORMS"){
        getType("water");
        getType("electric");
        getType("bug");
        typeDisplay.textContent = "WATER, ELECTRIC AND BUG TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "FLURRIES" || iconPhrase === "SNOW" || iconPhrase === "SLEET" || iconPhrase === "COLD") {
        getType("ice");
        getType("steel"); 
        getType("rock");
        typeDisplay.textContent = "ICE, STEEL AND ROCK TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "MOSTLY CLOUDY W/ FLURRIES" || iconPhrase === "MOSTLY CLOUDY W/ SNOW") {
        getType("normal");
        getType("ice");
        getType("steel");
        typeDisplay.textContent = "NORMAL, ICE AND STEEL TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "PARTLY SUNNY W/ FLURRIES") {
        getType("ground");
        getType("ice");
        getType("steel");
        typeDisplay.textContent = "GROUND, ICE AND STEEL TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "ICE") {
        getType("steel");
        getType("ice");
        getType("dragon"); 
        typeDisplay.textContent = "STEEL, ICE AND DRAGON TYPE!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "FREEZING RAIN" || iconPhrase === "RAIN AND SNOW") {
        getType("water");
        getType("electric");
        getType("ice");
        typeDisplay.textContent = "WATER, ELECTRIC AND ICE TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "WINDY") {
        getType("dragon"); 
        getType("flying");
        getType("psychic");
        typeDisplay.textContent = "DRAGON, FLYING AND PSYCHIC TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    } else if(iconPhrase === "MOSTLY CLOUDY W/ FLURRIES" || iconPhrase === "MOSTLY CLOUDY W/ SNOW") {
        getType("fairy");
        getType("fighting");
        getType("poison");
        typeDisplay.textContent = "FAIRY, FIGHTING AND POISON TYPES!"
        displayWeatherEl.appendChild(typeDisplay);
    }
};
// var choosePokemon = function(){
//     document.selectQuery(".poke-card").addEventListener('click', function(event){
//         // push pokemon to array
//         //push array to local storage

//     });

// };

var pokeStorage = [];


for(var i = 0; i < pokemonContainerEl.length; i++){
    pokemonContainerEl[i].addEventListener("click", function(){
        var pokeName = this.getElementsByTagName("h2")[0].textContent;
        console.log(pokeName);
        
        pokeStorage = JSON.parse(localStorage.getItem("pokemon")) || [];
        pokeStorage.push(pokeName);

        alert(pokeName);

        localStorage.setItem("pokemon", JSON.stringify(pokeStorage));

    });
}


//empty arrays to store pokemon info 
var pokeStorage = [];
var typeStorage = [];
var moveStorage = [];
//save 5 pokemon names, types and moves to localStorage
for(var i = 0; i < pokemonContainerEl.length; i++){
    pokemonContainerEl[i].addEventListener("click", function(){
        var pokeName = this.getElementsByTagName("h2")[0].textContent;
        pokeStorage = JSON.parse(localStorage.getItem("pokemon")) || [];
        pokeStorage.push(pokeName);
        localStorage.setItem("pokemon", JSON.stringify(pokeStorage));

        var pokeType = this.getElementsByTagName("h3")[0].textContent;
        typeStorage = JSON.parse(localStorage.getItem("types")) || [];
        typeStorage.push(pokeType);
        localStorage.setItem("types", JSON.stringify(typeStorage)); 

        var pokeMove = this.getElementsByTagName("h4")[0].textContent; 
        moveStorage = JSON.parse(localStorage.getItem("moves")) || [];
        moveStorage.push(pokeMove);
        localStorage.setItem("moves", JSON.stringify(moveStorage)); 
        $(this).addClass("selectedpoke");
    });
}

//empty arrays to store pokemon info 
var pokeStorage = [];
var typeStorage = [];
var moveStorage = [];
//save 5 pokemon names, types and moves to localStorage
for(var i = 0; i < pokemonContainerEl.length; i++){
    pokemonContainerEl[i].addEventListener("click", function(){
        var pokeName = this.getElementsByTagName("h2")[0].textContent;
        pokeStorage = JSON.parse(localStorage.getItem("pokemon")) || [];
        pokeStorage.push(pokeName);
        localStorage.setItem("pokemon", JSON.stringify(pokeStorage));

        var pokeType = this.getElementsByTagName("h3")[0].textContent;
        typeStorage = JSON.parse(localStorage.getItem("types")) || [];
        typeStorage.push(pokeType);
        localStorage.setItem("types", JSON.stringify(typeStorage)); 

        var pokeMove = this.getElementsByTagName("h4")[0].textContent; 
        moveStorage = JSON.parse(localStorage.getItem("moves")) || [];
        moveStorage.push(pokeMove);
        localStorage.setItem("moves", JSON.stringify(moveStorage)); 
        $(this).addClass("selectedpoke");
    });
}

userFormEl.addEventListener("submit", formSubmitHandler);

// save user name and trainer id 
// opens 2nd page on submit button 
var userName = [];
var userId = []; 
var submitButton = document.querySelector("#submitbutton"); 
submitButton.addEventListener("click", function () {
    var username = document.querySelector("#username"); 
    var uservalue = username.value.trim();  
    userName = JSON.parse(localStorage.getItem("uservalue")) || []; 
    userName.unshift(uservalue);
    localStorage.setItem("uservalue", JSON.stringify(userName)); 

    var userid = document.querySelector("#userID"); 
    var idvalue = userid.value.trim(); 
    userId = JSON.parse(localStorage.getItem("idvalue")) || []; 
    userId.unshift(idvalue);
    localStorage.setItem("idvalue", JSON.stringify(userId));

    document.location.href = "./index2.html"
}); 

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
    $(card.info).css("transform", "translateZ(40px)");
    $(card.info).css("perspective", "300px")
    $(card.image).css("transition", "transform .5s");
    $(card.image).css("transform", "translateZ(60px)");
});
            
$(cardEl).on("mouseleave", () => {
    $(card.currentCard).css("transition", "all .5s ease");
    $(card.currentCard).css("transform", "rotateY(0deg) rotateX(0deg)");
            
    $(card.info).css("transform", "translateZ(0px)");
    $(card.image).css("transform", "translateZ(0px) rotateZ(0deg)");
    card = {};
});

