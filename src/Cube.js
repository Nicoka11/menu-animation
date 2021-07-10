import Utils from "./Utils.js";
import gsap from "gsap";

// DOM Elements
const cube = document.querySelector(".cube__sized");
let cubeX = 30;
let cubeY = 30;

let cubeLastX = 0;
let cubeLastY = 0;

function updateCubeSize() {
  document.addEventListener("mousemove", (e) => {
    cubeX = Math.abs(
      Utils.rangeMap(e.clientX, 0, window.innerWidth, 0, 100) - 50
    );
    cubeY = Math.abs(
      Utils.rangeMap(e.clientY, 0, window.innerHeight, 0, 100) - 50
    );

    cubeLastX = Utils.lerp(cubeLastX, cubeX, 0.3)
    cubeLastY = Utils.lerp(cubeLastY, cubeY, 0.3)

    gsap.to(cube, { width: `${cubeLastX}vw`, height: `${cubeLastY}vh` , ease:'Power3.ease'});
  });
}

updateCubeSize();