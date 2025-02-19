import FormData from "form-data"; import Jimp from "jimp";

const handler = async (m, { conn, usedPrefix, command }) => { try { let q = m.quoted ? m.quoted : m; let mime = (q.msg || q).mimetype || q.mediaType || "";

if (!mime) return m.reply("🥺 E-eto... ¿podrías responder con una imagen para mejorarla en *HD*? Por favor... 🙈");
if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`😣 Lo siento mucho, pero el formato del archivo (${mime}) no es compatible... podrías enviarme una imagen diferente, por favor? 🥺`);

conn.reply(m.chat, "✨ D-déjame intentarlo... Estoy mejorando la calidad de la imagen, dame un momento... ⏳", m, {
  contextInfo: {
    externalAdReply: {
      mediaUrl: null,
      mediaType: 1,
      showAdAttribution: true,
      title: packname,
      body: wm,
      previewType: 0,
      thumbnail: icons,
      sourceUrl: channel,
    },
  },
});

let img = await q.download?.();
let pr = await remini(img, "enhance");

conn.sendMessage(m.chat, { image: pr }, { quoted: fkontak });

} catch { return m.reply("💔 A-ah... ocurrió un error... Lo siento mucho... 😖"); } };

handler.help = ["remini", "hd", "enhance"]; handler.tags = ["tools"]; handler.group = true; handler.register = true; handler.command = ["remini", "hd", "enhance"];

export default handler;

async function remini(imageData, operation) { return new Promise(async (resolve, reject) => { const availableOperations = ["enhance", "recolor", "dehaze"]; if (!availableOperations.includes(operation)) { operation = availableOperations[0]; }

const baseUrl = `https://inferenceengine.vyro.ai/${operation}.vyro`;
const formData = new FormData();
formData.append("image", Buffer.from(imageData), {
  filename: "enhance_image_body.jpg",
  contentType: "image/jpeg",
});
formData.append("model_version", 1, {
  "Content-Transfer-Encoding": "binary",
  contentType: "multipart/form-data; charset=utf-8",
});

formData.submit(
  {
    url: baseUrl,
    host: "inferenceengine.vyro.ai",
    path: `/${operation}`,
    protocol: "https:",
    headers: {
      "User-Agent": "okhttp/4.9.3",
      Connection: "Keep-Alive",
      "Accept-Encoding": "gzip",
    },
  },
  function (err, res) {
    if (err) reject(err);
    const chunks = [];
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
    res.on("end", function () {
      resolve(Buffer.concat(chunks));
    });
    res.on("error", function (err) {
      reject(err);
    });
  }
);

}); }

