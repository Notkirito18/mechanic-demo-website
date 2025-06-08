// * fixing scroll
$(window).on("load", function () {
  jQuery("#all").click();
  return false;
});

$(document).ready(function () {
  //*fixing header to stick top
  // $("#header_wrapper").scrollToFixed();
  // if ($("#navbarContent ul li:first-child").hasClass("active")) {
  //   $("#navbarContent").css("background", "none");
  // }

  $("#navUl").onePageNav({
    currentClass: "active",
    changeHash: false,
    scrollSpeed: 400,
    scrollThreshold: 0.2,
    filter: "",
    easing: "swing",
    begin: function () {},
    end: function () {},
  });

  //*function to keep track of opening and closing toggler
  switchToggler = () => {
    let isOpening = $(".navbar-toggler").attr("isOpening");
    isOpening = isOpening === "true";
    $(".navbar-toggler").attr("isOpening", (!isOpening).toString());
  };

  //* Collapse the navbar when any link is clicked
  $("#navUl li a").on("click", function () {
    if ($(".navbar-toggler").is(":visible")) {
      $(".navbar-toggler").click();
      switchToggler();
    }
  });

  $("#navUl li a:not(.dropdown-toggle)").on("click", function () {
    if ($(".navbar-toggler").is(":visible")) {
      $(".navbar-toggler").click();
    }
  });

  //*reduce hero margin top when navbar is open
  $(".navbar-toggler").on("click", function () {
    let isOpening = $(this).attr("isOpening");
    isOpening = isOpening === "true";
    if (isOpening) {
      $("#home").css({
        "margin-top": "0px",
      });
    } else {
      $("#home").css({
        "margin-top": "90px",
      });
    }
    switchToggler();
  });
});

$(function () {
  const $carouselInner = $("#servicesCarousel .carousel-inner");
  const $indicators = $("#servicesCarousel .carousel-indicators");
  const $cards = $(".services-section .card").parent(); // the col-* wrappers

  function rebuildCarousel() {
    const isMobile = window.innerWidth < 768;
    const groupSize = isMobile ? 1 : 3;

    // Clear out existing slides & indicators
    $carouselInner.empty();
    $indicators.empty();

    // Re-group cards
    for (let i = 0; i < $cards.length; i += groupSize) {
      const $slideCards = $cards.slice(i, i + groupSize);
      const slideIndex = i / groupSize;

      // Create the .carousel-item
      const $item = $(
        '<div class="carousel-item"><div class="row"></div></div>'
      );
      if (slideIndex === 0) $item.addClass("active");

      // Append the cards into this slide
      $slideCards.each(function () {
        $item.find(".row").append($(this));
      });

      $carouselInner.append($item);

      // Create an indicator button
      const $btn = $(`
        <button type="button"
                data-bs-target="#servicesCarousel"
                data-bs-slide-to="${slideIndex}"
                aria-label="Slide ${slideIndex + 1}">
        </button>`);
      if (slideIndex === 0) {
        $btn.addClass("active").attr("aria-current", "true");
      }
      $indicators.append($btn);
    }
  }

  // Initial build
  rebuildCarousel();

  // Rebuild on resize (debounced)
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(rebuildCarousel, 150);
  });
});

//* fix services carousel to show 3 cards on desktop and 1 on mobile
$(function () {
  const $carouselInner = $("#servicesCarousel .carousel-inner");
  const $indicators = $("#servicesCarousel .carousel-indicators");
  const $cards = $(".services-section .card").parent(); // the col-* wrappers

  function rebuildCarousel() {
    const isMobile = window.innerWidth < 768;
    const groupSize = isMobile ? 1 : 3;

    // Clear out existing slides & indicators
    $carouselInner.empty();
    $indicators.empty();

    // Re-group cards
    for (let i = 0; i < $cards.length; i += groupSize) {
      const $slideCards = $cards.slice(i, i + groupSize);
      const slideIndex = i / groupSize;

      // Create the .carousel-item
      const $item = $(
        '<div class="carousel-item"><div class="row"></div></div>'
      );
      if (slideIndex === 0) $item.addClass("active");

      // Append the cards into this slide
      $slideCards.each(function () {
        $item.find(".row").append($(this));
      });

      $carouselInner.append($item);

      // Create an indicator button
      const $btn = $(`
        <button type="button"
                data-bs-target="#servicesCarousel"
                data-bs-slide-to="${slideIndex}"
                aria-label="Slide ${slideIndex + 1}">
        </button>`);
      if (slideIndex === 0) {
        $btn.addClass("active").attr("aria-current", "true");
      }
      $indicators.append($btn);
    }
  }

  // Initial build
  rebuildCarousel();

  // Rebuild on resize (debounced)
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(rebuildCarousel, 150);
  });
});
