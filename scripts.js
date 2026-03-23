const icones = ["fa-html5", "fa-css3-alt", "fa-js", "fa-github", "fa-java"];

function stars() {
  let e = document.createElement("div");
  e.setAttribute("class", "star");

  let iconeAleatorio = icones[Math.floor(Math.random() * icones.length)];
  let size = Math.random() * 16 + 13;
  let duration = Math.random() * 5 + 7;

  e.style.left = Math.random() * (window.innerWidth - 100) + "px";
  e.style.fontSize = size + "px";
  e.style.animationDuration = duration + "s";

  let iconElement = document.createElement("i");
  iconElement.className = `fab ${iconeAleatorio}`;

  e.appendChild(iconElement);
  document.body.appendChild(e);

  setTimeout(() => e.remove(), duration * 800);
}

setInterval(() => stars(), 200);

const enviarWhats = (event) => {
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const mensagem = document.getElementById("mensagem").value;
  const telefone = "5541985232583";

  const texto = `Olá, me chamo ${nome}, ${mensagem}`;
  const msgFormatada = encodeURIComponent(texto);
  const url = `https://wa.me/${telefone}?text=${msgFormatada}`;

  window.open(url, "_blank");
};
