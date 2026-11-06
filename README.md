<div align="center">

# ⚡ Pedro Lubacheski — Portfólio

### Suporte de TI | IA Aplicada

[![Portfolio](https://img.shields.io/badge/🌐_Ver_Portfólio-8b5cf6?style=for-the-badge)](https://pedrolubacheski.github.io/portfolio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/pedro-lubacheski-5b80912b7)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pedrolubacheski)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/5541985232583)

</div>

---

## 📋 Sobre o Projeto

Portfólio pessoal desenvolvido com **React + Vite**, com identidade visual própria (azul-meia-noite, lavanda e amarelo-girassol), tipografia variável e um sistema de animações feito **sem bibliotecas de animação** — só React, Canvas, CSS e APIs nativas do navegador.

---

## ✨ Funcionalidades

- ⏳ **Preloader** — contador 0 → 100 enquanto as fontes carregam, seguido de uma cortina em duas camadas
- 🧲 **Campo de pontos interativo** — malha em `<canvas>` que foge do cursor, acende perto dele e solta uma onda a cada clique
- 🔠 **Nome com fonte variável** — as letras mudam de peso e largura conforme o mouse se aproxima (eixos `wght` e `wdth` da Bricolage Grotesque)
- 🖱️ **Cursor personalizado** — ponto + anel com inércia, que cresce em links e vira etiqueta ("Abrir", "Código") nas prévias
- 🧲 **Botões magnéticos** — puxados pelo cursor, com preenchimento circular e texto que rola no hover
- 🎞️ **Faixa de tecnologias** — velocidade e inclinação reagem à força da rolagem, e o sentido inverte ao rolar para cima
- 📖 **Texto que acende com a rolagem** — o parágrafo do "Sobre" ilumina palavra por palavra
- 🗂️ **Projetos empilhados** — cartões fixos que se sobrepõem; o anterior encolhe e escurece
- 🖥️ **Prévias em vídeo** — GIFs convertidos para MP4 (de ~39 MB para ~1 MB), tocando só quando visíveis, com inclinação 3D e brilho seguindo o mouse
- 📍 **Navbar inteligente** — pílula que desliza até a seção ativa, some ao rolar para baixo e volta ao subir; menu mobile em tela cheia
- 💬 **Formulário → WhatsApp** — rótulos flutuantes, validação e mensagem pronta no WhatsApp
- ♿ **Acessível** — respeita "reduzir movimento" do sistema, link para pular ao conteúdo, foco visível e textos completos para leitores de tela
- 📱 **Responsivo** — layout pensado para celular, tablet e desktop

---

## 🛠️ Tecnologias

| Tecnologia                   | Uso                                                       |
| ---------------------------- | --------------------------------------------------------- |
| **React 18**                 | Componentização, hooks e estado                           |
| **Vite 6**                   | Bundler e servidor de desenvolvimento                     |
| **Canvas 2D**                | Campo de pontos interativo do Hero                        |
| **IntersectionObserver**     | Revelações ao rolar e pausa de vídeos/animações fora da tela |
| **requestAnimationFrame**    | Cursor, faixa de tecnologias, cartões empilhados          |
| **Fontsource**               | Bricolage Grotesque, Geist e Geist Mono hospedadas no próprio site |
| **Font Awesome 6**           | Ícones de marcas                                          |

---

## 📁 Estrutura do Projeto

```
portfolio/
├── public/
│   ├── img/                    # Foto e imagens
│   └── video/                  # Prévias MP4 + posters dos projetos
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx      # Botão magnético
│   │   │   ├── SplitText.jsx   # Texto quebrado em letras/palavras animadas
│   │   │   └── Arrow.jsx       # Ícone de link externo
│   │   ├── Preloader.jsx       # Contador + cortina de abertura
│   │   ├── Cursor.jsx          # Cursor personalizado
│   │   ├── ScrollProgress.jsx  # Barra de progresso da rolagem
│   │   ├── Navbar.jsx          # Navegação com indicador deslizante
│   │   ├── Hero.jsx            # Nome gigante, badge e chamadas
│   │   ├── DotField.jsx        # Malha de pontos em canvas
│   │   ├── RotatingWords.jsx   # Troca de palavras do Hero
│   │   ├── Marquee.jsx         # Faixa de tecnologias
│   │   ├── About.jsx           # Sobre, fatos e stack
│   │   ├── ScrollText.jsx      # Parágrafo que acende com a rolagem
│   │   ├── Projects.jsx        # Pilha de projetos
│   │   ├── ProjectCard.jsx     # Cartão de projeto com prévia
│   │   ├── Contact.jsx         # Formulário → WhatsApp e redes
│   │   └── Footer.jsx          # Rodapé com horário local
│   ├── hooks/
│   │   ├── useReveal.js        # Adiciona "in-view" ao entrar na tela
│   │   └── useMagnetic.js      # Efeito magnético
│   ├── utils/
│   │   ├── motion.js           # clamp, lerp, reduzir movimento, caminhos
│   │   └── whatsapp.js         # Links e envio pelo WhatsApp
│   ├── data/
│   │   └── projects.js         # Dados dos projetos
│   ├── styles/
│   │   └── globals.css         # Tokens, componentes e animações
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

### Adicionando um projeto

Coloque o vídeo em `public/video/` e adicione um objeto em `src/data/projects.js`. Para converter um GIF em MP4:

```bash
ffmpeg -i projeto.gif -movflags +faststart -pix_fmt yuv420p -vf "scale=1280:-2,fps=30" -c:v libx264 -crf 26 -an projeto.mp4
```

---

## 🚀 Como rodar localmente

````bash
# 1. Clone o repositório
git clone https://github.com/pedrolubacheski/portfolio.git
cd portfolio

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

### Build para produção

```bash
npm run build    # Gera a pasta dist/
npm run preview  # Prévia do build localmente
````

---

## 🐋 Como rodar por Docker

### Tenha docker instalado

### Rode dentro do powershell:

```
docker run -d -p 8080:80 pedrolubacheski/portfolio-docker:latest

Acesse no navegador localhost:8080
```

---

## 📬 Contato

- 💬 **WhatsApp:** [+55 41 98523-2583](https://wa.me/5541985232583)
- 💼 **LinkedIn:** [linkedin.com/in/pedro-lubacheski-5b80912b7](https://linkedin.com/in/pedro-lubacheski-5b80912b7)
- 🐙 **GitHub:** [github.com/pedrolubacheski](https://github.com/pedrolubacheski)

---

<div align="center">

Feito com ❤️ por **Pedro Lubacheski**

</div>
