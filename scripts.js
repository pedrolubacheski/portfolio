const icones = ["fa-html5", "fa-css3-alt", "fa-js", "fa-github", "fa-java"];

function stars() {
  let e = document.createElement("div");
  e.setAttribute("class", "star");

  let iconeAleatorio = icones[Math.floor(Math.random() * icones.length)];
  let size = Math.random() * 12 + 8;
  let duration = Math.random() * 3 + 2;

  e.style.left = Math.random() * window.innerWidth + "px";
  e.style.fontSize = size + "px";
  e.style.animationDuration = duration + "s";

  let iconElement = document.createElement("i");
  iconElement.className = `fab ${iconeAleatorio}`;

  e.appendChild(iconElement);
  document.body.appendChild(e);

  setTimeout(() => e.remove(), duration * 1000);
}

setInterval(() => stars(), 200);
