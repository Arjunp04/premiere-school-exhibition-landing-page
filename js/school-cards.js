(function () {
  "use strict";

  // School cards mobile slider — swipe + pagination dots

  const grid = document.getElementById("schoolCardsGrid");
  const dotsWrapper = document.querySelector(".cards__dots");

  if (!grid || !dotsWrapper) return;

  const dots = dotsWrapper.querySelectorAll(".cards__dot");
  const cards = grid.querySelectorAll(".cards__item");

  let currentSlide = 0;
  let isScrolling = false;

  function isMobileView() {
    return window.innerWidth <= 479;
  }

  function reducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // Highlight the correct dot
  function updateActiveDot(index) {
    if (index === currentSlide) return;

    dots[currentSlide]?.setAttribute("aria-selected", "false");
    dots[index]?.setAttribute("aria-selected", "true");
    currentSlide = index;
  }

  // Figure out which card is currently in view while user swipes
  function handleGridScroll() {
    if (!isMobileView() || isScrolling) return;

    isScrolling = true;

    setTimeout(() => {
      const cardWidth = cards[0]?.offsetWidth;
      if (!cardWidth) {
        isScrolling = false;
        return;
      }

      let newIndex = Math.round(grid.scrollLeft / cardWidth);
      newIndex = Math.min(Math.max(newIndex, 0), cards.length - 1);

      updateActiveDot(newIndex);
      isScrolling = false;
    }, 100);
  }

  // Clicking / tapping a dot scrolls to that card
  function goToSlide(index) {
    const targetCard = cards[index];
    if (!targetCard) return;

    targetCard.scrollIntoView({
      behavior: reducedMotion() ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });

    updateActiveDot(index);
  }

  // Wire up each dot — click + keyboard (Enter/Space)
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const index = Number(e.currentTarget.dataset.index);
      goToSlide(index);
    });

    dot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const index = Number(e.currentTarget.dataset.index);
        goToSlide(index);
      }
    });
  });

  grid.addEventListener("scroll", handleGridScroll, { passive: true });

  // Reset back to first slide if window is resized back to desktop
  window.addEventListener("resize", () => {
    if (!isMobileView()) {
      updateActiveDot(0);
      grid.scrollLeft = 0;
    }
  });
})();
