<div align="center">

# ⚡ Pedro Lubacheski — Portfólio

### Engenheiro de Software | Dev Frontend | Amante de UI/UX

[![Portfolio](https://img.shields.io/badge/🌐_Ver_Portfólio-8b5cf6?style=for-the-badge)](https://pedrolubacheski.github.io/portfolio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/pedrolubacheski)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pedrolubacheski)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/5541985232583)

</div>

---

## 📋 Sobre o Projeto

Portfólio pessoal desenvolvido com **React + Vite**, com visual **cyberpunk** e foco em performance, UI/UX moderno e boas práticas de desenvolvimento frontend.

Refatorado do zero a partir de uma versão anterior em HTML/CSS/JS puro, com arquitetura escalável baseada em componentes reutilizáveis, hooks customizados e separação clara de responsabilidades.

---

## ✨ Funcionalidades

- 🎨 **Visual Cyberpunk** — cores neon (roxo, pink, ciano), fundo escuro com efeitos de glow
- 🪟 **Glassmorphism** — cards com backdrop-filter blur e bordas translúcidas
- ⌨️ **Efeito Typewriter** — animação de digitação no título da Hero section
- 🌠 **Ícones flutuantes** — ícones de tecnologias caindo em loop no background
- 📜 **Scroll Reveal** — seções animam com fade + slide ao entrar na viewport
- 📊 **Skill Bars animadas** — barras de habilidades que preenchem ao fazer scroll
- 🟢 **Badge de disponibilidade** — indicador em tempo real de status
- 📱 **Totalmente responsivo** — mobile-first, menu hambúrguer no mobile
- 💬 **Formulário → WhatsApp** — mensagem enviada diretamente pelo WhatsApp Web
- ♿ **Acessibilidade** — atributos `aria-label`, navegação por teclado nos cards

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| **React 18** | Componentização e gerenciamento de estado |
| **Vite 6** | Bundler e dev server ultra-rápido |
| **CSS Modules / globals.css** | Estilização com variáveis, keyframes e utilitários |
| **IntersectionObserver API** | Scroll reveal nativo, sem dependência externa |
| **Font Awesome 6** | Ícones das tecnologias e UI |
| **Google Fonts** | Orbitron · Rajdhani · JetBrains Mono |

---

## 📁 Estrutura do Projeto

```
portfolio/
├── public/
│   └── img/                    # Imagens e GIFs dos projetos
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navegação fixa com glassmorphism
│   │   ├── Hero.jsx            # Seção inicial com typewriter e foto
│   │   ├── About.jsx           # Sobre mim com skill bars
│   │   ├── Projects.jsx        # Grid de projetos
│   │   ├── ProjectCard.jsx     # Card reutilizável de projeto
│   │   ├── Contact.jsx         # Formulário de contato → WhatsApp
│   │   ├── FloatingIcons.jsx   # Ícones animados no background
│   │   └── Footer.jsx          # Rodapé com scroll-to-top
│   ├── hooks/
│   │   ├── useTypewriter.js    # Hook do efeito de digitação
│   │   └── useReveal.js        # Hook do scroll reveal
│   ├── utils/
│   │   └── whatsapp.js         # Função de envio via WhatsApp
│   ├── data/
│   │   └── projects.js         # Dados dos projetos
│   ├── styles/
│   │   └── globals.css         # Estilos globais e keyframes
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Como rodar localmente

```bash
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
```

---

## 📬 Contato

- 💬 **WhatsApp:** [+55 41 98523-2583](https://wa.me/5541985232583)
- 💼 **LinkedIn:** [linkedin.com/in/pedrolubacheski](https://linkedin.com/in/pedrolubacheski)
- 🐙 **GitHub:** [github.com/pedrolubacheski](https://github.com/pedrolubacheski)

---

<div align="center">

Feito com ❤️ por **Pedro Lubacheski**

</div>
