/**
 * Projetos exibidos no portfólio.
 * - video/poster: prévia leve em MP4 (gerada a partir dos GIFs antigos)
 * - image: usada quando não há vídeo
 * - tint/accent: cores do cartão, tiradas da identidade de cada projeto
 */
const projects = [
  {
    id: "diario-de-bordo",
    title: "Diário de Bordo",
    kind: "Sistema interno feito com IA",
    description:
      "Sistema que idealizei e desenvolvi com apoio de IA na MX Soluções para registrar as ocorrências operacionais do dia, como falta de funcionários e rompimentos. Tem linha do tempo por horário, filtros por usuário e categoria, histórico de diários e exportação em PDF para os gestores. Também cuido dos testes, das correções e das novas funcionalidades.",
    images: [
      { src: "img/diario-de-bordo-1.jpg", alt: "lista de diários passados com a quantidade de atividades por dia" },
      { src: "img/diario-de-bordo-2.jpg", alt: "linha do tempo do dia com filtros por usuário e categoria" },
    ],
    label: "Diário de Bordo · MX Soluções",
    note: "Uso interno da MX Soluções, sem link público.",
    tags: ["IA", "React", "Relatórios em PDF", "Uso real"],
    tint: "#2a2b33",
    accent: "#F5A623",
  },
  {
    id: "girassol",
    title: "Girassol Terapias",
    kind: "Landing page feita com apoio de IA",
    description:
      "Site para um espaço de terapias, desenvolvido com apoio de IA em React e TailwindCSS. Organização por seções, navegação suave e layout responsivo pensado para quem acessa pelo celular.",
    video: "video/girassolterapias.mp4",
    poster: "video/girassolterapias.jpg",
    url: "https://pedrolubacheski.github.io/girassol-terapias-landim/",
    tags: ["IA", "React", "TailwindCSS", "Responsivo"],
    tint: "#4a3512",
    accent: "#F1BF4C",
  },
  {
    id: "crud",
    title: "Fullstack User CRUD",
    kind: "Aplicação fullstack",
    description:
      "Gerenciamento de usuários com criação, listagem, edição e exclusão. Front-end em React consumindo uma API REST em Node.js e Express, com dados persistidos no MongoDB via Prisma.",
    image: "img/fullstackusercrud.png",
    url: "https://github.com/pedrolubacheski/fullstack-user-crud",
    tags: ["React", "Node.js", "Express", "Prisma", "MongoDB", "API REST"],
    tint: "#14393d",
    accent: "#53C7C7",
  },
  {
    id: "spotify",
    title: "Spotify UI Clone",
    kind: "Clone de interface",
    description:
      "Recriação da interface do Spotify com conteúdo renderizado dinamicamente via JavaScript e atenção ao detalhe em espaçamentos, tipografia e estados de hover.",
    video: "video/spotifycloneui.mp4",
    poster: "video/spotifycloneui.jpg",
    url: "https://pedrolubacheski.github.io/Music-Clone-UI/",
    tags: ["HTML", "CSS", "JavaScript", "DOM"],
    tint: "#0f3320",
    accent: "#1ED760",
  },
  {
    id: "drink",
    title: "Interactive Drink Slider",
    kind: "Interface interativa",
    description:
      "Slider de produtos com troca de sabores, transições de cor e animações em CSS controladas por JavaScript e manipulação do DOM.",
    video: "video/projetorefri.mp4",
    poster: "video/projetorefri.jpg",
    url: "https://pedrolubacheski.github.io/InteractiveDrinkSliderUI/",
    tags: ["HTML", "CSS", "JavaScript", "Animações"],
    tint: "#4a1620",
    accent: "#FF5A6A",
  },
  {
    id: "coffee",
    title: "Coffee Landing Page",
    kind: "Landing page",
    description:
      "Landing page de cafeteria com cardápio, avaliações e contato. Layout responsivo com Flexbox e Grid e foco total na experiência de quem visita.",
    video: "video/coffeelandinpage.mp4",
    poster: "video/coffeelandinpage.jpg",
    url: "https://pedrolubacheski.github.io/coffee-landing-page/",
    tags: ["HTML", "CSS", "Flexbox", "Grid"],
    tint: "#3a2614",
    accent: "#D9A066",
  },
];

export default projects;
