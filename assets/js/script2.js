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