const packname = "🌸 Anika-Bot 🌸"; // Nombre con estilo japonés
const imageUrl = "https://qu.ax/UchKC.jpg"; // URL de la imagen

let handler = async (m, { usedPrefix, command, conn }) => {
  let uptime = await process.uptime();
  let runtime = `┏━✦ *${packname}* ✦━┓
┃  
┃ ⏳ *Tiempo Activo:*  
┃   𓆩🌸𓆪 ${rTime(uptime)}
┃  
┗━✦ 𝑷𝒓𝒐𝒕𝒆𝒄𝒄𝒊𝒐́𝒏 & 𝑭𝒖𝒆𝒓𝒛𝒂 ✦━┛`;

  // Enviar imagen junto con el mensaje
  conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: runtime }, { quoted: m });
};

handler.help = ['runtime'];
handler.tags = ['main'];
handler.command = ['runtime', 'uptime'];

export default handler;

// Corrección de inicialización de la fecha
const dd = new Date();
dd.setHours(dd.getHours() + 1); // Agrega 1 hora
const time = dd.toLocaleString('es-ES', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
});

function rTime(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? `🌸 ${d} ${d == 1 ? "día" : "días"}, ` : "";
  var hDisplay = h > 0 ? `✨ ${h} ${h == 1 ? "hora" : "horas"}, ` : "";
  var mDisplay = m > 0 ? `🌿 ${m} ${m == 1 ? "minuto" : "minutos"}, ` : "";
  var sDisplay = s > 0 ? `💠 ${s} ${s == 1 ? "segundo" : "segundos"}` : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}
