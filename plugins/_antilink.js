let linkRegex = /chat\.whatsapp\.com\/([A-Za-z0-9]{20,24})/i;
let linkRegex1 = /whatsapp\.com\/channel\/([A-Za-z0-9]{20,24})/i;

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, participants }) {
    if (!m.isGroup) return;
    if (isAdmin || isOwner || m.fromMe || isROwner) return;

    let chat = global.db.data.chats[m.chat];
    let delet = m.key.participant;
    let bang = m.key.id;
    const user = `@${m.sender.split('@')[0]}`;
    const groupAdmins = participants.filter(p => p.admin);
    const listAdmin = groupAdmins.map((v, i) => `*» `${{i + 1}. @}$`{v.id.split('@')[0]}*`).join('\n');
    let bot = global.db.data.settings[this.user.jid] || {};

    // Verificar si el mensaje contiene un enlace de grupo o canal
    const isGroupLink = linkRegex.exec(m.text) || linkRegex1.exec(m.text);
    const grupo = 'https://chat.whatsapp.com';

    console.log("Mensaje recibido:", m.text); // Depuración: Ver el mensaje recibido
    console.log("Enlace detectado:", isGroupLink); // Depuración: Ver si se detectó un enlace

    if (isAdmin && chat.antiLink && m.text.includes(grupo)) {
        return m.reply(`✦ El antilink está activo pero te salvaste por ser admin.`);
    }

    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
            if (m.text.includes(linkThisGroup)) return;
        }

        await conn.sendMessage(m.chat, {
            text: `*「 ENLACE DETECTADO 」*\n\n《✧》${user} Rompiste las reglas del Grupo serás eliminado...`,
            mentions: [m.sender]
        }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });

        if (!isBotAdmin) {
            return conn.sendMessage(m.chat, {
                text: `✦ El antilink está activo pero no puedo eliminarte porque no soy admin.`,
                mentions: [...groupAdmins.map(v => v.id)]
            }, { quoted: m });
        }

        if (isBotAdmin) {
            await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
            let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            if (responseb[0].status === "404") return;
        }
    }

    return;
}
