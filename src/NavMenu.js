import gsap from "gsap";
import Splitting from "splitting";

Splitting();
const stateNav = {
  isOpen: false,
};

const navBg = document.querySelector(".nav__bg");
const navButton = document.querySelector(".nav__button");
const navMenuLink = document.querySelector(".nav__list");
const navMenuLinks = [...document.querySelectorAll(".nav__link")];
const navMenuText = [
  ...document.querySelectorAll(".nav__link--text > .word > .char"),
];

navMenuText.forEach(function (el) {
  el.style.display = "inline-block";
  el.style.opacity = "0";
  el.style.transform = "translateY(-120%)";
});

const tlNavMenuAnimation = gsap.timeline({ paused: true });
tlNavMenuAnimation.to(navMenuLink, { display: "inline-block" });
tlNavMenuAnimation.staggerTo(
  navMenuText,
  0.6,
  {
    y: "0",
    opacity: 1,
    ease: "power3.out",
  },
  0.015
).to(navMenuLink, {pointerEvents: 'auto'})

function handleSwitchNav() {
  if (!stateNav.isOpen) {
    tlNavMenuAnimation.play();
    gsap.to(navBg, { x: 0, duration: 0.9, ease: "power3.out" });
  } else {
    gsap.to(navBg, {
      x: "-100%",
      duration: 0.9,
      ease: "power3.in",
      delay: 0.5,
    });
    tlNavMenuAnimation.reverse();
  }
  navButton.style.transform = `rotate(${stateNav.isOpen ? "180deg" : "0deg"})`;
  stateNav.isOpen = !stateNav.isOpen;
}

// Nav button animations
navButton.addEventListener("mouseenter", () => {
  navButton.style.transform = `rotate(${!stateNav.isOpen ? "165deg" : "20deg"})`;
});
navButton.addEventListener("mouseleave", () => {
  navButton.style.transform = `rotate(${!stateNav.isOpen ? "180deg" : "0deg"})`;
});

// Nav Toggle
navButton.addEventListener("click", handleSwitchNav);

// Nav links hover animation
navMenuLink.addEventListener("mouseover", (e) => {
  const target = e.target.closest(".nav__link");
  if (!target) return;
  const allNavs = navMenuLinks.filter((item) => {
    return item.textContent !== target.textContent;
  });
  gsap.to(target, { color: "#FFFFFF" });
  allNavs.forEach((item) => {
    gsap.to(item, {
      x: "-15px",
      opacity: "0.2",
    });
  });
});
navMenuLink.addEventListener("mouseout", (e) => {
  navMenuLinks.forEach((item) => {
    gsap.to(item, {
      x: "0px",
      opacity: "1",
      color: "#d8d2dd",
    });
  });
});

navMenuLinks.forEach((navLink) => {
  navLink.addEventListener("click", handleSwitchNav)
})