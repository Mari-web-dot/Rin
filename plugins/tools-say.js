let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args.length) {
        return conn.sendMessage(m.chat, { 
            text: `*U-Um...* parece que olvidaste escribir algo~\n\n☁️ *Así se usa:* \n➤ *${usedPrefix + command} [texto]*\n\n✨ Ejemplo:\n*${usedPrefix + command} Hola... ¿me extrañaste?* (>//<)`, 
        });
    }

    let message = args.join(' ');
    let invisibleChar = '\u200B';
    let finalMessage = invisibleChar + message;

    let mentions = [...message.matchAll(/@(\d+)/g)].map(v => v[1] + '@s.whatsapp.net');
    if (mentions.length) {
        conn.sendMessage(m.chat, { text: finalMessage, mentions });
    } else {
        conn.sendMessage(m.chat, { text: finalMessage });
    }
};
handler.command = ['say', 'decir'];
handler.tag = ['tools'];
handler.group = true;

export default handler;
