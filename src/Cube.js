import Utils from "./Utils.js";
import gsap from "gsap";

// DOM Elements
const cube = document.querySelector(".cube__sized");
let cubeX = 30;
let cubeY = 30;

function updateCubeSize() {
  document.addEventListener("mousemove", (e) => {
    cubeX = Math.abs(
      Utils.rangeMap(e.clientX, 0, window.innerWidth, 0, 100) - 50
    );
    cubeY = Math.abs(
      Utils.rangeMap(e.clientY, 0, window.innerHeight, 0, 100) - 50
    );

    gsap.set(cube, { width: `${cubeX}vw`, height: `${cubeY}vh` });
  });
}

updateCubeSize();
