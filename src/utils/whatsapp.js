/** Número de destino — troque se necessário */
const PHONE = "5541985232583";

/** Link direto para a conversa (com texto opcional) */
export function whatsappLink(text) {
  const base = `https://wa.me/${PHONE}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * Abre o WhatsApp com uma mensagem pré-preenchida.
 *
 * @param {string} name    - nome do remetente
 * @param {string} message - corpo da mensagem
 */
export function sendWhatsApp(name, message) {
  const text = `Olá, me chamo ${name}. ${message}`;
  window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
}
