var pokemonContainerEl = document.querySelectorAll(".poke-card");
var pokeNameEl = document.querySelectorAll(".poke-name");
var pokeTypeEl = document.querySelectorAll(".poke-type");
var pokeImageEl = document.querySelectorAll(".poke-image");
var pokePicEl = document.querySelectorAll(".poke-pic");
var pokeMoveEl = document.querySelectorAll(".poke-move");

// this variable will pull the city from the search bar
var city = document.querySelector("#city-name");
var userFormEl = document.querySelector("#user-form");
var displayWeatherEl = document.querySelector("#display-weather");

var pokeCardsEl = document.querySelector(".poke-cards")

// to display poke cards


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

var getType = function (type) { 
    var apiURL = "https://pokeapi.co/api/v2/type/"+ type + "/";
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                
                var pokeType = []; 
                // for (var i=0; i<pokemonContainerEl.length; i++) {
                //     pokeType.push(data.pokemon[Math.floor(Math.random() * 10)].pokemon.name);
                    
                //     getPokemon(pokeType[i]);
                // }

                getPokemon()
            })
        }
    })
};

getType("dragon");



var getPokemon = function(pokemon) {
    //format the PokeAPI data 
    var apiURL = "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/"; 
    //make a request to the URL(404 ERROR and network connectivity)
    fetch(apiURL).then(function(response) {
        //request for data was successful 
        if (response.ok) { //"ok" - when the HTTP request status code is something in the 200s - ok = true 404 error
            response.json().then(function(pokemon) {
                    
                    displayPokemon(pokemon);
                    //pokemonImage(pokemon);    
            });
        } 
    })
};

//display Pokemon name, type and moves


var displayPokemon = function(pokemon) {

        var pokeName = pokemon.name;
        var pokeNumber = pokemon.id; 
        
        pokeCards.textContent = "";

        var thePokeCard = document.creatElement("div");
        thePokeCard.className = "poke-info";

        pokeCardsEl.appendChild(thePokeCards);

        var pokemonImg = document.createElement("#img");
        pokemonImg.src = "https://pokeres.bastionbot.org/images/pokemon/" + pokeNumber + ".png";

        pokeCardsEl.appendChild(pokemonImg);
    
        // pokeNameEl[i].textContent = pokeName;

        // pokeTypeEl[i].textContent = pokeTypeOne;

        // var moveOne = pokemon.moves[Math.floor(Math.random() * 5)].move.name; 
        // var moveTwo = pokemon.moves[Math.floor(Math.random() * 5)].move.name; 
        // var moveThree = pokemon.moves[Math.floor(Math.random() * 5)].move.name; 

        // pokeMoveEl[i].textContent= moveOne + " / " + moveTwo + " / " + moveThree;
        
        
        // pokePicEl[i].setAttribute("style", "width:200px;height:200px;");
        // pokePicEl[i].srcset = "https://pokeres.bastionbot.org/images/pokemon/" + pokeNumber + ".png";
    
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
    var iconPhrase = data[0].IconPhrase;
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

};

userFormEl.addEventListener("submit", formSubmitHandler);

// //display Pokemon image
// var pokemonImage = function (pokemon) {
//     var pokeNumber = pokemon.id; 
//     console.log(pokemon.id);
//     //var pokeImage = document.createElement("img");
//     var i = pokePicEl.length; 
//     while (i--) {
//         pokePicEl[i].setAttribute("style", "width:200px;height:200px;");
//         pokePicEl[i].srcset = "https://pokeres.bastionbot.org/images/pokemon/" + pokeNumber + ".png";
//     }
//     //pokeImageEl.append(pokeImage);
// }


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


getPokemon();

