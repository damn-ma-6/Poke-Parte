let active = $(".active");
let images = $(".img");

images.on("click", changePicture);

function changePicture(event) {
    if (event.target.closest(".img")){
        let target = event.target;
        let activeSrc = active.attr("src");
        active.attr("src", target.src);
        target.src = activeSrc;

        target.classList.add("fade-in");
        active.addClass("fade-in");

        setTimeout( () => {
            removeFadeIn(target, active);
        }, 500);
    };
    
};

function removeFadeIn(x, y) {
    x.classList.remove("fade-in");
    y.removeClass("fade-in");
};


let cardEl = $(".active");
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
};

$(cardEl).on("mouseenter", (e) => {
    let card = getCardDetails(e.target);
    $(card.currentCard).css("transition", "none");
});

$(cardEl).on('mousemove', (e) => {
    let center = {
        x: (e.target.offsetWidth)/2,
        y: (e.target.offsetHeight)/2
    };

    let mouse = {
        x: e.offsetX,
        y: e.offsetY
    }

    let x = (center.x - mouse.x) / 40;
    let y = (center.y - mouse.y) / 40;

    (x > 5) && (x = 5 + (x-5)/10);
    (x < -5) && (x = -5 - (x + 5)/10);
    (y > 5) && (y = 5 + (y-5)/10);
    (y < -5) && (y = -5 - (y + 5)/10)

    $(card.currentCard).css("transform", `rotateY(${-x}deg) rotateX(${y}deg)`);

    $(card.info).css("transform", "translateZ(40px)")
    $(card.image).css("transition", "transform .5s")
    $(card.image).css("transform", "translateZ(60px)")
});

$(cardEl).on("mouseleave", () => {
    $(card.currentCard).css("transition", "all .5s ease");
    $(card.currentCard).css("transform", "rotateY(0deg) rotateX(0deg)");

    $(card.info).css("transform", "translateZ(0px)");
    $(card.image).css("transform", "translateZ(0px) rotateZ(0deg)");
    card = {};
});

// function to download image as jpeg when button is clicked using html2canvas library

$("#download-jpeg").on("click", function() {
    window.scrollTo(0,0);
    
    html2canvas(document.getElementById("image-area"), {height: window.outerHeight + window.innerHeight,
        windowHeight: window.outerHeight + window.innerHeight,      width: window.outerWidth + window.innerWidth,
        windowWidth: window.outerWidth + window.innerWidth, scrollY: -window.scrollY, scrollX: -window.scrollX, allowTaint: true, useCORS: true}).then(canvas => {
        onrendered: document.body.appendChild(canvas);
        var a = document.createElement("a");
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL("image/jpeg", 0.9).replace("image/jpeg", "image/octet-stream");
        a.download = "roster.jpeg";
        a.click();
        // clean up the canvas after
        document.body.removeChild(canvas);
      }
)});

var pokemonContainerEls = document.querySelectorAll(".poke-card");

//get pokemon name from local storage 
var pokeStorage = localStorage.getItem("pokemon"); 
var pokeParsed = JSON.parse(pokeStorage);
//get pokemon type from local storage 
var typeStorage = localStorage.getItem("types");
var typeParsed = JSON.parse(typeStorage); 
//get pokemon moves from local storage 
var moveStorage = localStorage.getItem("moves"); 
var movesParsed = JSON.parse(moveStorage);
//get username from local storage at 0 index 
var userNameEl = document.querySelector("#user-name");
var userValue = localStorage.getItem("uservalue");
var userParsed = JSON.parse(userValue);
userNameEl.textContent = "USERNAME: " + userParsed[0];
//get trainer id from local storage at 0 index 
var trainerIdEl = document.querySelector("#trainer-id");
var trainerValue = localStorage.getItem("idvalue");
var trainerParsed = JSON.parse(trainerValue);
trainerIdEl.innerHTML = "TRAINER ID: " + trainerParsed[0];
//get city name from local storage at 0 index 
var cityNameEl = document.querySelector("#city-name-two"); 
var cityValue = localStorage.getItem("cityName");
var cityParsed = JSON.parse(cityValue);
cityNameEl.textContent = "CITY: " + cityParsed; 
//get weather conditions from local storage at 0 index. 
var weatherEl = document.querySelector("#weather-conditions")
var weatherValue = localStorage.getItem("conditions");
var weatherParsed = JSON.parse(weatherValue); 
weatherEl.innerHTML = "CONDTIONS: " + weatherParsed[0]; 


for (var i=0; i<pokemonContainerEls.length; i++) {
    pokemonContainerEls[i].innerHTML = ""; //empty content
    let pokeDiv = document.createElement("div"); //create div
    pokeDiv.classList = "poke-info"; 
    var getPokemon = function(pokemon, i) {
        var apiURL = "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/"; 
        fetch(apiURL).then(function(response) {
             if (response.ok) { 
                response.json().then(function(pokemon) {
                    //pokemon picture 
                    let pokeNumber = pokemon.id; 
                    let pokePicEl = document.createElement("img");
                    pokePicEl.classList = "poke-image";
                    //pokePicEl.setAttribute("style", "width:auto;height:auto;");
                    pokePicEl.srcset = "https://pokeres.bastionbot.org/images/pokemon/" + pokeNumber + ".png";
                    pokeDiv.append(pokePicEl);
                    pokemonContainerEls[i].append(pokeDiv);
                }); 
            }
        })
    };

    //pokemon name 
    getPokemon(pokeParsed[i]); 
    let pokeName = pokeParsed[i]; 
    let pokeNameEl = document.createElement("h2");
    pokeNameEl.innerHTML = pokeName; 
    pokeDiv.append(pokeNameEl);  
    pokemonContainerEls[i].append(pokeDiv); 
    //pokemon type 
    let pokeType = typeParsed[i];
    let pokeTypeEl = document.createElement("h3");
    pokeTypeEl.innerHTML = pokeType; 
    pokeDiv.append(pokeTypeEl); 
    pokemonContainerEls[i].append(pokeDiv);
    //pokemon move 
    let moveOne = movesParsed[i]; 
    let pokeMoveEl = document.createElement("h4");
    pokeMoveEl.innerHTML = moveOne; 
    pokeDiv.append(pokeMoveEl);
    pokemonContainerEls[i].append(pokeDiv);

}; 

)});
