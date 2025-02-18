export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (!m.isGroup || m.fromMe) return;  // Validamos si no es grupo o si es el bot quien envía el mensaje.

    let chat = global.db.data.chats[m.chat];  // Solo lo declaramos una vez
    let delet = m.key.participant;
    let bang = m.key.id;

    if (m.id.startsWith('3EB0') && m.id.length === 22 && chat.antiBot) {
        
        await conn.reply(m.chat, "H-hola... 🌸💖 ¡Perdón por molestar! 😔 ¡Me da mucha pena hacer esto! Pero parece que hay un bot en el grupo... 😢💖 ¡Lo siento mucho, de verdad! 😖💕 ¡No quiero causar problemas, solo quiero proteger el grupo! 💫✨ ¡Prometo que no lo haré más! 💖", null, rcanal);

        if (isBotAdmin) {
            // Ejecutamos la eliminación y la actualización en una sola secuencia
            await Promise.all([
                conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }}),
                conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            ]);
        }
    }
}
