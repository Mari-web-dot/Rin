let handler = async (m, { conn, command, usedPrefix }) => {
    let staff = `✨ *EQUIPO DE AYUDANTES*
    🤖 *Bot:* ${global.botname}
    🌟 *Versión:* ${global.vs}

    👑 *Propietario:*

    • Destroy
    🤴 *Rol:* Propietario
    📱 *Número:* wa.me/5216631079388

    🚀  *Colaboradores:*`

    await conn.sendFile(m.chat, icons, 'yaemori.jpg', staff.trim(), fkontak, true, {
        contextInfo: {
            'forwardingScore': 200,
            'isForwarded': false,
            externalAdReply: {
                showAdAttribution: true,
                renderLargerThumbnail: false,
                title: `Developers 👑`,  // Aquí se reemplaza el emoji
                body: `✨ Staff Oficial`,
                mediaType: 1,
                sourceUrl: redes,
                thumbnailUrl: icono
            }
        }
    }, { mentions: m.sender })
    m.react(emoji)
}

handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
