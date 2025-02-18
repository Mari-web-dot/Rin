const packname = "💖 Anika Dm 💖"; // Define el nombre del pack

let handler = async (m, { usedPrefix, command }) => {
  let uptime = await process.uptime();
  let runtime = `╭───────💖
│ ✨ *${packname}* ✨
│  
│ ⏳ *Tiempo Activo:*  
│   💜 ${rTime(uptime)}
╰───────────────♡`;

  conn.reply(m.chat, runtime, m);
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
  var dDisplay = d > 0 ? `💖 ${d} ${d == 1 ? "día" : "días"}, ` : "";
  var hDisplay = h > 0 ? `💜 ${h} ${h == 1 ? "hora" : "horas"}, ` : "";
  var mDisplay = m > 0 ? `💙 ${m} ${m == 1 ? "minuto" : "minutos"}, ` : "";
  var sDisplay = s > 0 ? `💗 ${s} ${s == 1 ? "segundo" : "segundos"}` : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}
