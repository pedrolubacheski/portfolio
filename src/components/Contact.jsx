import { useRef, useState } from "react";
import useReveal from "../hooks/useReveal";
import SplitText from "./ui/SplitText";
import Button from "./ui/Button";
import Arrow from "./ui/Arrow";
import { sendWhatsApp, whatsappLink } from "../utils/whatsapp";

const SOCIAL_LINKS = [
  { icon: "fa-github", label: "GitHub", handle: "pedrolubacheski", url: "https://github.com/pedrolubacheski" },
  { icon: "fa-linkedin", label: "LinkedIn", handle: "in/pedro-lubacheski", url: "https://linkedin.com/in/pedro-lubacheski-5b80912b7" },
  { icon: "fa-whatsapp", label: "WhatsApp", handle: "+55 41 98523-2583", url: whatsappLink() },
];

export default function Contact() {
  const headRef = useRef(null);
  const bodyRef = useRef(null);
  useReveal(headRef, 0.35);
  useReveal(bodyRef, 0.2);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      sendWhatsApp(name.trim(), message.trim());
      setStatus("sent");
      setName("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    }, 500);
  };

  const label =
    status === "sending"
      ? "Abrindo o WhatsApp…"
      : status === "sent"
        ? "Conversa aberta no WhatsApp"
        : "Enviar pelo WhatsApp";

  return (
    <section id="contato" className="section contact">
      <div className="container">
        <div ref={headRef} className="contact__head">
          <h2 className="contact__title">
            <SplitText text="Vamos" stagger={35} />
            <SplitText text="conversar?" stagger={35} delay={160} className="contact__title-2" />
          </h2>
        </div>

        <div ref={bodyRef} className="contact__grid">
          <div className="contact__aside">
            <p className="section-lead">
              Tem uma vaga, um processo para automatizar ou quer trocar uma ideia sobre IA?
              Escreva aqui e a mensagem chega direto no meu WhatsApp.
            </p>

            <ul className="socials">
              {SOCIAL_LINKS.map((s, i) => (
                <li key={s.label} style={{ "--i": i }}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="socials__link">
                    <i className={`fab ${s.icon}`} aria-hidden="true" />
                    <span className="socials__label">{s.label}</span>
                    <span className="socials__handle">{s.handle}</span>
                    <Arrow size={18} className="socials__arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <input
                id="contact-name"
                type="text"
                placeholder=" "
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                autoComplete="name"
                required
                aria-invalid={status === "error" && !name.trim()}
              />
              <label htmlFor="contact-name">Seu nome</label>
              <span className="field__line" aria-hidden="true" />
            </div>

            <div className="field">
              <textarea
                id="contact-message"
                placeholder=" "
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                required
                aria-invalid={status === "error" && !message.trim()}
              />
              <label htmlFor="contact-message">Sua mensagem</label>
              <span className="field__line" aria-hidden="true" />
            </div>

            <p className="form__error" role="alert">
              {status === "error" && "Preencha seu nome e a mensagem para continuar."}
            </p>

            <Button
              type="submit"
              className={`form__submit ${status === "sent" ? "is-sent" : ""}`}
              disabled={status === "sending"}
            >
              <i className={status === "sent" ? "fas fa-check" : "fab fa-whatsapp"} aria-hidden="true" />
              {label}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
