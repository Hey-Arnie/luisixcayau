tsParticles.load("tsparticles", {
  fullScreen: { enable: true, zIndex: -1 },
  particles: {
    number: { value: 40 },
    color: { value: ["#b799ff", "#98e3ff"] },
    shape: { type: "circle" },
    opacity: { value: 0.4 },
    size: { value: { min: 2, max: 4 } },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      straight: false,
      outModes: "out",
    },
  },
  background: {
    color: "#0b0b14",
  },
});

const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");
let width, height, particles;

function initCanvas() {
  width = (canvas.width = window.innerWidth);
  height = (canvas.height = document.getElementById("profesional").offsetHeight);
  particles = [];

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.5, 0, 2 * Math.PI);
    ctx.fillStyle = "#00ffff";
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      let p2 = particles[j];
      let dx = p.x - p2.x;
      let dy = p.y - p2.y;
      let dist = dx * dx + dy * dy;

      if (dist < 3000) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = "rgba(0,255,255,0.1)";
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}

window.addEventListener("resize", initCanvas);
window.addEventListener("load", () => {
  initCanvas();
  draw();
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

const menuIcon = document.querySelector(".menu-icon");
const menuToggle = document.querySelector(".menu-toggle");
menuIcon.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
});

