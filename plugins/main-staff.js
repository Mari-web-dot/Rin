let handler = async (m, { conn, command, usedPrefix }) => {
let img = './src/catalogo.jpg'
let staff = `🌹 *EQUIPO DE AYUDANTES* 🌹
👑 *Dueño* ${creador},
✨ *Bot:* ${botname}
💜 *Versión:* ${vs}
📚 *Libreria:* ${libreria} ${baileys}

🌸 *Creador:*

 Neykoor💜
☄️ *Rol:* Creador
${creador},


🌃 *Colaboradores:*

Por el momento no hay



await conn.sendFile(m.chat, img, 'yuki.jpg', staff.trim(), fkontak, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
/*externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: packname,
body: dev,
mediaType: 1,
sourceUrl: channel,
thumbnailUrl: icono
}}*/
}
}, { mentions: m.sender })
m.react(emoji)

}
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
