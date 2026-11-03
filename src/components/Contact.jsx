const contactChannels = [
  { label: "LinkedIn", href: "https://linkedin.com/in/pedro-lubacheski-5b80912b7" },
  { label: "GitHub", href: "https://github.com/pedrolubacheski" },
  { label: "WhatsApp", href: "https://wa.me/5541985232583" },
];

export default function Contact() {
  return (
    <section id="contato" className="contact-section">
      <div className="section-wrap contact-wrap">
        <div>
          <p className="eyebrow">Contato</p>
          <h2>Vamos construir uma<br /><em>boa solução.</em></h2>
        </div>
        <div className="contact-actions">
          <p>Aberto a oportunidades em suporte, tecnologia e engenharia de software. Pode me chamar diretamente.</p>
          <a className="contact-email" href="mailto:pedrolubacheski@hotmail.com">pedrolubacheski@hotmail.com <span>↗</span></a>
          <a className="contact-phone" href="tel:+5541985232583">(41) 9 8523-2583</a>
          <div className="social-links">
            {contactChannels.map(({ label, href }) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}
          </div>
        </div>
      </div>
    </section>
  );
}
