let cardEl = $(".poke-card");
let card = {};

function getCardDetails(e) {
  let currentCard = $(e).closest(".poke-card");
  let infoEl = $(currentCard).find(".poke-info");
  let imageEl = $(currentCard).find(".poke-image");
  card = {
    currentCard,
    infoEl,
    imageEl
  };

  return card;
}

$(cardEl).on('mousemove', (e) => {
  let x = ((window.innerWidth / 2) - e.pageX) / 15;
  let y = ((window.innerHeight / 2) - e.pageY) / 15;

  $(card.currentCard).css("transform", `rotateY(${-x}deg) rotateX(${y}deg)`);

  $(card.infoEl).css("transform", "translateZ(40px)")
  $(card.imageEl).css("transform", "translateZ(40px) rotateZ(-2deg)")
});

$(cardEl).on("mouseenter", (e) => {
  let card = getCardDetails(e.target);
  $(card.currentCard).css("transition", "none");
});

$(cardEl).on("mouseleave", (e) => {
  $(card.currentCard).css("transition", "all .5s ease");
  $(card.currentCard).css("transform", "rotateY(0deg) rotateX(0deg)");

  $(card.infoEl).css("transform", "translateZ(0px)");
  $(card.imageEl).css("transform", "translateZ(0px) rotateZ(0deg)");
});




