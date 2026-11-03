import { publicAsset } from "../utils/assets";

const projects = [
  {
    title: "Espaço Girassol",
    type: "Landing page",
    image: publicAsset("img/girassolterapias.gif"),
    url: "https://pedrolubacheski.github.io/girassol-terapias-landim/",
    description: "Landing page responsiva para um centro de terapias, construída em React e Tailwind CSS, com navegação por âncoras e rolagem suave.",
    tags: ["React", "Tailwind CSS"],
  },
  {
    title: "Coffee Landing Page",
    type: "Interface web",
    image: publicAsset("img/coffeelandinpage.gif"),
    url: "https://pedrolubacheski.github.io/coffee-landing-page/",
    description: "Página responsiva desenvolvida em HTML e CSS, estruturada com Flexbox e Grid.",
    tags: ["HTML", "CSS", "Flexbox", "Grid"],
  },
  {
    title: "Interactive Drink Slider UI",
    type: "Estudo de interface",
    image: publicAsset("img/projetorefri.gif"),
    url: "https://pedrolubacheski.github.io/InteractiveDrinkSliderUI/",
    description: "Interface de estudo com slider dinâmico, transições e manipulação de DOM em JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Spotify UI Clone",
    type: "Estudo de interface",
    image: publicAsset("img/spotifycloneui.gif"),
    url: "https://pedrolubacheski.github.io/Music-Clone-UI/",
    description: "Clone de interface de aplicação real para estudo de layout e interação com HTML, CSS e JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Fullstack User CRUD",
    type: "Aplicação fullstack",
    image: publicAsset("img/fullstackusercrud.png"),
    url: "https://github.com/pedrolubacheski/fullstack-user-crud",
    description: "Aplicação para gerenciamento de usuários, com foco em organização de dados e operações de CRUD.",
    tags: ["React", "Node.js", "MongoDB"],
  },
];

export default projects;
