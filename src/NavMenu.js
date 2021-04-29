import gsap from "gsap";
import Splitting from "splitting";

Splitting();
const stateNav = {
  isOpen: false,
};

const navBg = document.querySelector('.nav__bg')
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

const timeline = gsap.timeline({ paused: true });
timeline.to(navMenuLink, { display: "inline-block" });
timeline.staggerTo(
  navMenuText,
  0.5,
  {
    y: "0",
    opacity: 1,
    ease: "power3.out",
  },
  0.03
);

function handleSwitchNav() {
  if (!stateNav.isOpen) {
    timeline.play();
    gsap.to(navBg, {x: 0, duration: .9, ease: "power3.out"})
    gsap.to(navButton, { rotation: "0deg", ease: "power3", duration: 0.2 });
    gsap.to
  } else if (stateNav.isOpen) {
    gsap.to(navBg, {x: '-100%', duration: .9, delay: .45, ease: "power3.in"})
    timeline.reverse();
    gsap.to(navButton, { rotation: "180deg", ease: "power3", duration: 0.2 });
  }
  stateNav.isOpen = !stateNav.isOpen;
}

navButton.addEventListener("click", handleSwitchNav);

navMenuLink.addEventListener("mouseover", (e) => {
  const target = e.target.closest(".nav__link");
  if (!target) return;
  const allNavs = navMenuLinks.filter((item) => {
    return item.dataset.name !== target.dataset.name;
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
