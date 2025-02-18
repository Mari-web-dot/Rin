const packname = "YourPackName"; // Define packname or replace with a string

let handler = async (m, { usedPrefix, command }) => {
  let uptime = await process.uptime();
  let runtime = `${packname}

✰ Tiempo activo: ${rTime(uptime)}`;

  // Assuming conn and m are defined elsewhere in your code
  conn.reply(m.chat, runtime, m);
};

handler.help = ['runtime'];
handler.tags = ['main'];
handler.command = ['runtime', 'uptime'];

export default handler;

// Correct the Date initialization
const dd = new Date();
dd.setHours(dd.getHours() + 1); // Add 1 hour
const time = dd.toLocaleString('en-US', {
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
  var dDisplay = d > 0 ? d + (d == 1 ? " dia, " : " Dias, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " Horas, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " Minutos, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " Segundos") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}
