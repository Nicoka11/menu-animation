import gsap from "gsap";
import paper from "paper";
import { lerp } from "./utils.js";

// Small Cursor
let clientX = -100;
let clientY = -100;
const innerCursor = document.querySelector(".cursor--small");

const initCursor = () => {
  document.addEventListener("mousemove", (e) => {
    clientX = e.clientX;
    clientY = e.clientY;
  });
  const render = () => {
    gsap.set(innerCursor, { x: clientX, y: clientY });
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

initCursor();

// Cursor Circle
let lastX = 0;
let lastY = 0;
let isStuck = false;
let showCursor = false;
let group, stuckX, stuckY, fillOuterCursor;
let currentTarget;

const initCanvas = () => {
  const canvas = document.querySelector(".cursor--canvas");
  const shapeBounds = {
    width: 75,
    height: 75,
  };

  paper.setup(canvas);
  const strokeColor = "hsl(274°, 23%, 67%, 0.5)";
  const strokeWidth = 2;
  const segments = 8;
  const radius = 15;

  const polygon = new paper.Path.RegularPolygon(
    new paper.Point(0, 0),
    segments,
    radius
  );
  polygon.strokeColor = strokeColor;
  polygon.strokeWidth = strokeWidth;
  polygon.smooth();
  group = new paper.Group([polygon]);
  group.applyMatrix = false;

  paper.view.onFrame = (e) => {
    // For button
    if (!isStuck) {
      lastX = lerp(lastX, clientX, 0.1);
      lastY = lerp(lastY, clientY, 0.1);
      group.position = new paper.Point(lastX, lastY);
    } else if (isStuck) {
      lastX = lerp(lastX, stuckX, 0.2);
      lastY = lerp(lastY, stuckY, 0.2);
      group.position = new paper.Point(lastX, lastY);
    }

    if (
      isStuck &&
      polygon.bounds.width < shapeBounds.width &&
      currentTarget.classList.contains("nav__link")
    ) {
      polygon.scale(5);
      polygon.strokeWidth = strokeWidth * 2
    } else if (
      isStuck &&
      polygon.bounds.width < shapeBounds.width &&
      currentTarget.classList.contains("nav__button")
    ) {
      polygon.scale(1.1);
    } else if (!isStuck && polygon.bounds.width > radius * 2) {
      polygon.scale(0.9);
      polygon.strokeWidth = strokeWidth
    }

    // For nav list
    if (!isStuck) {
      lastX = lerp(lastX, clientX, 0.1);
      lastY = lerp(lastY, clientY, 0.1);
      group.position = new paper.Point(lastX, lastY);
    }
  };
};

initCanvas();

function initHovers() {
  const handlerMouseEnter = (e) => {
    currentTarget = e.target;
    const navItem = e.currentTarget;
    const navItemBox = navItem.getBoundingClientRect();
    if (currentTarget.classList.contains("nav__link")) {
      stuckX = Math.round(navItemBox.left);
      stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
    } else {
      stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
      stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
    }
    isStuck = true;
  };

  const handlerMouseLeave = () => {
    isStuck = false;
  };

  const linkItems = document.querySelectorAll(".nav__button");
  linkItems.forEach((item) => {
    item.addEventListener("mouseenter", handlerMouseEnter);
    item.addEventListener("mouseleave", handlerMouseLeave);
  });

  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach((item) => {
    item.addEventListener("mouseenter", handlerMouseEnter);
    item.addEventListener("mouseleave", handlerMouseLeave);
  });
}

initHovers();