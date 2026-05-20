import { useRef, useState } from "react";
import useReveal from "../hooks/useReveal";
import { sendWhatsApp } from "../utils/whatsapp";

const SOCIAL_LINKS = [
  {
    icon: "fa-github",
    label: "GitHub",
    url: "https://github.com/pedrolubacheski",
  },
  {
    icon: "fa-linkedin",
    label: "LinkedIn",
    url: "https://linkedin.com/in/pedrolubacheski",
  },
  {
    icon: "fa-whatsapp",
    label: "WhatsApp",
    url: "https://wa.me/5541985232583",
  },
];

function SocialLink({ icon, label, url }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: hovered ? "#a78bfa" : "#475569",
        textDecoration: "none",
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 600,
        fontSize: "0.95rem",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "color 0.3s, transform 0.3s",
      }}
    >
      <i
        className={`fab ${icon}`}
        style={{ fontSize: "1.3rem" }}
        aria-hidden="true"
      />
      {label}
    </a>
  );
}

export default function Contact() {
  const headerRef = useRef(null);
  const cardRef = useRef(null);

  useReveal(headerRef);
  useReveal(cardRef);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);

    setTimeout(() => {
      sendWhatsApp(name.trim(), message.trim());
      setSent(true);
      setLoading(false);
      setName("");
      setMessage("");

      setTimeout(() => setSent(false), 4000);
    }, 400);
  };

  return (
    <section
      id="contato"
      style={{ padding: "8rem 2rem", position: "relative", zIndex: 1 }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 500,
          height: 300,
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
        <div
          ref={headerRef}
          className="reveal"
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <p className="section-label">{"// contact.send()"}</p>
          <h2 className="section-title neon-text">Entre em Contato</h2>
          <div className="section-divider" />
          <p
            style={{
              color: "#475569",
              fontSize: "1.05rem",
              marginTop: "1.2rem",
            }}
          >
            Tem um projeto em mente? Vamos conversar!
          </p>
        </div>

        <div
          ref={cardRef}
          className="glass-card reveal"
          style={{ padding: "2.8rem" }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: "1.6rem" }}>
              <label
                htmlFor="contact-name"
                style={{
                  display: "block",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.78rem",
                  color: "#8b5cf6",
                  marginBottom: "0.5rem",
                }}
              >
                {"> nome"}
              </label>
              <input
                id="contact-name"
                type="text"
                className="field"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <label
                htmlFor="contact-message"
                style={{
                  display: "block",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.78rem",
                  color: "#8b5cf6",
                  marginBottom: "0.5rem",
                }}
              >
                {"> mensagem"}
              </label>
              <textarea
                id="contact-message"
                className="field"
                placeholder="Sua mensagem..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={{ resize: "vertical", minHeight: 120 }}
              />
            </div>

            <button
              type="submit"
              className="btn-glow"
              disabled={loading || sent}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {sent ? (
                <>
                  <i className="fas fa-check" aria-hidden="true" />
                  Mensagem enviada!
                </>
              ) : loading ? (
                <>
                  <i className="fas fa-spinner fa-spin" aria-hidden="true" />
                  Abrindo WhatsApp...
                </>
              ) : (
                <>
                  <i
                    className="fab fa-whatsapp"
                    style={{ fontSize: "1.2rem" }}
                    aria-hidden="true"
                  />
                  Enviar via WhatsApp
                </>
              )}
            </button>
          </form>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginTop: "3rem",
            flexWrap: "wrap",
          }}
        >
          {SOCIAL_LINKS.map((link) => (
            <SocialLink key={link.label} {...link} />
          ))}
        </div>
      </div>
    </section>
  );
}
