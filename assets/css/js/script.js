let cardEl = $(".poke-card");
let infoEl = $(".poke-info");
let imageEl = $(".poke-image");

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