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




