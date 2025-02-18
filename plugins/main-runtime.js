const packname = "🌸 𝑨𝒏𝒊𝒌𝒂 𝑫𝒎 🌸"; // Nombre elegante del bot  
const image1 = "https://qu.ax/iKouo.jpeg"; // Imagen cuando lleva poco tiempo activo  
const image2 = "https://qu.ax/SQnJQ.jpg"; // Imagen cuando lleva más de un día  

let handler = async (m, { conn }) => {  
  let uptime = await process.uptime();  
  let uptimeText = rTime(uptime);  
  let imageUrl = uptime >= 86400 ? image2 : image1; // Si el bot lleva más de un día, cambia la imagen  

  let runtimeMessage = `  
  ╭───────────🌸  
  │ *Ah...* ¿M-me estabas buscando...?  
  │ 𝑨𝒏𝒊𝒌𝒂 sigue aquí...    
  │  
  │ ⏳ *Tiempo activo:*  
  │   🕰️ ${uptimeText}  
  │  
  │ N-no sé si es mucho...  
  │ P-pero estoy tratando de hacer un buen trabajo...  
  ╰───────────🌸  
  `;  

  // Enviar imagen con el mensaje decorado  
  conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: runtimeMessage }, { quoted: m });  
};  

handler.help = ['runtime'];  
handler.tags = ['main'];  
handler.command = ['runtime', 'uptime'];  

export default handler;  

// Función para calcular el tiempo activo  
function rTime(seconds) {  
  seconds = Number(seconds);  
  var d = Math.floor(seconds / (3600 * 24));  
  var h = Math.floor((seconds % (3600 * 24)) / 3600);  
  var m = Math.floor((seconds % 3600) / 60);  
  var s = Math.floor(seconds % 60);  
  var dDisplay = d > 0 ? `🌷 ${d} ${d == 1 ? "día" : "días"}, ` : "";  
  var hDisplay = h > 0 ? `✨ ${h} ${h == 1 ? "hora" : "horas"}, ` : "";  
  var mDisplay = m > 0 ? `🍃 ${m} ${m == 1 ? "minuto" : "minutos"}, ` : "";  
  var sDisplay = s > 0 ? `💠 ${s} ${s == 1 ? "segundo" : "segundos"}` : "";  
  return dDisplay + hDisplay + mDisplay + sDisplay;  
}
