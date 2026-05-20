/** Número de destino — troque se necessário */
const PHONE = '5541985232583'

/**
 * Abre o WhatsApp Web com uma mensagem pré-preenchida.
 *
 * @param {string} name    - nome do remetente
 * @param {string} message - corpo da mensagem
 */
export function sendWhatsApp(name, message) {
  const text = `Olá, me chamo ${name}, ${message}`
  const url  = `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
