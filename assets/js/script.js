var mainContainerEl = document.querySelector(".poke-cards");
var pokemonContainerEl = document.querySelectorAll(".poke-card");
//var pokeNameEl = document.querySelectorAll(".poke-name");
//var pokeTypeEl = document.querySelectorAll(".poke-type");
//var pokeImageEl = document.querySelectorAll(".poke-image");
//var pokePicEl = document.querySelectorAll(".poke-pic");
//var pokeMoveEl = document.querySelectorAll(".poke-move");

//if weather is sunny, mostly sunny, partly sunny 
    //grass(3), ground(3) and fire(4)

//if weather is intermittent clouds
    //normal(5), rock(5) 

//if hazy sunshine 
    //normal(2), rock(2), grass(2), ground(2) and fire(2)

//if mostly cloudy, cloudy, dreary(overcast)
    //fairy(3), fighting(3), poison(4)

//if foggy 
    //ghost(5), dark(5) 

//if showers
    //water(3), electric(3), bug(4)

//if mostly cloudy w/ showers
    //water(2), electric(2), bug(1), fairy(3), fighting(1), poison(1)

//if partly sunny w/ showers 
    //water(2), electric(2), bug(2), grass(2), ground(2)

//if t-storms
    // water(3), electric(4), bug(3)

//if mostly cloudy with t-storms 
    //normal(2), rock(2), water(2), electric(2), bug(2)

//if partly sunny with t-storms 
    //grass(2), ground(2), water(2), electric(2), bug(2)

//if rain
    //water(2), steel(2), electric(3), bug(3) 

//if flurries, snow, sleet 
    //ice(5), steel(5) 

//if mostly cloudy w/ flurries
    //normal(2), rock(3), ice(3), steel(2) 

//if partly sunny w/ flurries
    //grass(1), ground(3), ice(3), steel(3)

//if mostly cloudy w/ snow
    //normal(2), rock(3), ice(3), steel(2) 

//if ice 
    //ice(10) 

//if freezing rain, rain and snow 
    //water(2), electric(2), ice(2), steel(4) 

//if hot, clear, mostly clear 
    //grass(2), ground(3), fire(5) 

//if cold
    //ice(5), steel(5)

//if windy
    // dragon(2), flying(6), psychic(2)

//if partly cloudy, intermittent clouds, mostly cloudy
    // normal(5), rock(5)

//if hazy moonlight
    //normal(2), rock(2), grass(2), ground(2), fire(2) 

//if partly cloudy w/ showers 
    //normal(2), rock(2), water(2), electric(2), bug(2) 

//if mostly cloudy w/ showers, mostly cloudy w/ t-storms
    //fairy(2), fighting(1), poison(1), water(2), electric(1), bug(3)

//if partly cloudy w/ t-storms 
    //normal(2), rock(2), water(2), electric(2), bug(2)

//if mostly cloudy w/ flurries, mostly cloudy w/ snow
    //fairy(2), fighting(2), poison(2), ice(2), steel(2) 



// this variable will pull the city from the search bar
var city = document.querySelector("#city-name");
var userFormEl = document.querySelector("#user-form");
var displayWeatherEl = document.querySelector("#display-weather");

var getType = function (type) { 
    var apiURL = "https://pokeapi.co/api/v2/type/"+ type + "/";
    fetch(apiURL).then(function(response) {
        if (response.ok){
            var pokeType = []; 
            response.json().then(function(data) {
                console.log(data);
                console.log(pokeType);
                for (var i=0; i<pokemonContainerEl.length; i++) {
                 pokeType.push(data.pokemon[Math.floor(Math.random() * 12)].pokemon.name);
                 getPokemon(pokeType[i]); 
                }
            })  
        }
    }) 

    var getPokemon = function(pokemon) {
        //format the PokeAPI data 
        var apiURL = "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/"; 
        //make a request to the URL(404 ERROR and network connectivity)
        fetch(apiURL).then(function(response) {
            //request for data was successful 
            if (response.ok) { //"ok" - when the HTTP request status code is something in the 200s - ok = true 404 error
                response.json().then(function(pokemon) {
                    console.log(pokemon);
                    var pokemonContainerEls = document.querySelectorAll(".poke-card");   
                    for (var i=0; i<pokemonContainerEls.length; i++) { 
                        pokemonContainerEls[i].innerHTML= ""; //empty content
                        let pokeDiv = document.createElement("div"); //create div
                        pokeDiv.className = ("poke-info"); //add class to div 
                        //pokemon name 
                        let pokeName = pokemon.name; 
                        let pokeNameEl = document.createElement("h2"); 
                        pokeNameEl.innerHTML = pokeName; 
                        pokeDiv.append(pokeNameEl);  
                        pokemonContainerEls[i].append(pokeDiv); 
                        //pokemon type 
                        let pokeTypeOne = pokemon.types[0].type.name;
                        let pokeTypeEl = document.createElement("p");
                        pokeTypeEl.innerHTML = "Type: " + pokeTypeOne;
                        pokeDiv.append(pokeTypeEl);
                        pokemonContainerEls[i].append(pokeDiv);
                        //pokemon move 
                        let moveOne = pokemon.moves[Math.floor(Math.random() * 5)].move.name; 
                        let moveTwo = pokemon.moves[Math.floor(Math.random() * 5)].move.name; 
                        let moveThree = pokemon.moves[Math.floor(Math.random() * 5)].move.name; 
                        let pokeMoveEl = document.createElement("p");
                        pokeMoveEl.innerHTML= "Moves: " + moveOne + " / " + moveTwo + " / " + moveThree;
                        pokeDiv.append(pokeMoveEl);
                        pokemonContainerEls[i].append(pokeDiv);
                        //pokemon picture 
                        let pokeNumber = pokemon.id; 
                        let pokePicEl = document.createElement("img");
                        pokePicEl.setAttribute("style", "width:200px;height:200px;margin:50px;");
                        pokePicEl.srcset = "https://pokeres.bastionbot.org/images/pokemon/" + pokeNumber + ".png";
                        pokeDiv.append(pokePicEl);
                        pokemonContainerEls[i].append(pokeDiv);
                    } 
                }); 
            }
        })
    };
};

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

    if(iconPhrase === "SUNNY" || iconPhrase === "MOSTLY SUNNY" || iconPhrase === "PARTLY SUNNY" || iconPhrase === "HOT" || iconPhrase === "CLEAR" || iconPhrase === "MOSTLY CLEAR") {
        getType("grass");
        getType("ground");
        getType("fire");
    } else if(iconPhrase === "INTERMITTENT CLOUDS" || iconPhrase === "PARTLY CLOUDY" || iconPhrase === "MOSTLY CLOUDY") {
        getType("normal");
        getType("rock");
    } else if(iconPhrase === "HAZY SUNSHINE" || iconPhrase === "HAZY MOONLIGHT"){
        getType("normal");
        getType("rock");
        getType("grass");
        getType("ground");
        getType("fire");
    } else if(iconPhrase === "MOSTLY CLOUDY" || iconPhrase === "CLOUDY" || iconPhrase === "DREARY(OVERCAST)"){
        getType("fairy");
        getType("fighting");
        getType("poison");
    } else if(iconPhrase === "FOG") {
        getType("ghost"); 
        getType("dark");
    } else if(iconPhrase === "SHOWERS" || iconPhrase === "T-STORMS" || iconPhrase === "RAIN") {
        getType("water");
        getType("electric");
        getType("bug");
    } else if(iconPhrase === "MOSTLY CLOUDY W/ SHOWERS" || iconPhrase === "MOSTLY CLOUDY W/ T-STORMS") {
        getType("water");
        getType("electric");
        getType("bug");
        getType("fairy");
        getType("fighting");
        getType("poison");
    } else if(iconPhrase === "PARTLY SUNNY W/ SHOWERS" || iconPhrase === "PARTLY SUNNY W/ T-STORMS") {
        getType("water");
        getType("electric");
        getType("grass");
        getType("ground");
    } else if(iconPhrase === "MOSTLY CLOUDY W/ T-STORMS" || iconPhrase === "PARTLY CLOUDY W/ SHOWERS" || iconPhrase === "PARTLY CLOUDY W/ T-STORMS"){
        getType("normal");
        getType("rock");
        getType("water");
        getType("electric");
        getType("bug");
    } else if(iconPhrase === "FLURRIES" || iconPhrase === "SNOW" || iconPhrase === "SLEET" || iconPhrase === "COLD") {
        getType("ice");
        getType("steel"); 
    } else if(iconPhrase === "MOSTLY CLOUDY W/ FLURRIES" || iconPhrase === "MOSTLY CLOUDY W/ SNOW") {
        getType("normal");
        getType("rock");
        getType("ice");
        getType("steel");
    } else if(iconPhrase === "PARTLY SUNNY W/ FLURRIES") {
        getType("grass");
        getType("ground");
        getType("ice");
        getType("steel");
    } else if(iconPhrase === "ICE") {
        getType("steel");
    } else if(iconPhrase === "FREEZING RAIN" || iconPhrase === "RAIN AND SNOW") {
        getType("water");
        getType("electric");
        getType("ice");
        getType("steel");
    } else if(iconPhrase === "WINDY") {
        getType("dragon"); 
        getType("flying");
        getType("psychic");
    } else if(iconPhrase === "MOSTLY CLOUDY W/ FLURRIES" || iconPhrase === "MOSYLY CLOUDY W/ SNOW") {
        getType("fairy");
        getType("fighting");
        getType("poison");
        getType("ice");
        getType("steel");
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


