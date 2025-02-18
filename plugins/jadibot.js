const fs = require('fs');
const path = require('path');
const ws = require('ws');

let handler = async (m, { conn: _envio, command, usedPrefix, args }) => {
    const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command);
    const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command);
    const isCommand3 = /^(bots|sockets|socket)$/i.test(command);

    async function reportError(e) {
        await m.reply('❌ Ocurrió un error.');
        console.log(e);
    }

    switch (true) {
        case isCommand1:
            let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
            let uniqid = `${who.split`@`[0]}`;
            const sessionPath = `./${jadi}/${uniqid}`;

            if (!fs.existsSync(sessionPath)) {
                await conn.sendMessage(m.chat, { text: `⚠️ Usted no tiene una sesión activa.` }, { quoted: m });
                return;
            }
            if (global.conn?.user?.jid !== conn.user.jid) {
                return conn.sendMessage(
                    m.chat,
                    { text: `⚠️ Use este comando en el *Bot* principal.` },
                    { quoted: m }
                );
            } else {
                await conn.sendMessage(m.chat, { text: `✅ Tu sesión como *Sub-Bot* ha sido eliminada.` }, { quoted: m });
            }

            try {
                fs.rm(sessionPath, { recursive: true, force: true }, (err) => {
                    if (err) reportError(err);
                    else conn.sendMessage(m.chat, { text: `✅ Sesión cerrada y eliminada.` }, { quoted: m });
                });
            } catch (e) {
                reportError(e);
            }
            break;

        case isCommand2:
            if (global.conn?.user?.jid == conn.user.jid) {
                conn.reply(m.chat, `⚠️ No es posible detener el bot principal.`, m);
            } else {
                await conn.reply(m.chat, `✅ Bot desactivado.`, m);
                conn.ws.close();
            }
            break;

        case isCommand3:
            const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws?.socket?.readyState !== ws.CLOSED)])];

            function convertirMsADiasHorasMinutosSegundos(ms) {
                let segundos = Math.floor(ms / 1000);
                let minutos = Math.floor(segundos / 60);
                let horas = Math.floor(minutos / 60);
                let días = Math.floor(horas / 24);
                segundos %= 60;
                minutos %= 60;
                horas %= 24;
                return `${días ? días + " días, " : ""}${horas ? horas + " horas, " : ""}${minutos ? minutos + " minutos, " : ""}${segundos ? segundos + " segundos" : ""}`;
            }

            const message = users
                .map(
                    (v, index) =>
                        `• 「 ${index + 1} 」\n📎 Wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}estado\n👤 Usuario: ${
                            v.user.name || 'Sub-Bot'
                        }\n🕑 Online: ${v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : 'Desconocido'}`
                )
                .join('\n\n__________________________\n\n');

            const replyMessage = message.length === 0 ? `❌ No hay Sub-Bots activos por el momento.` : message;
            const totalUsers = users.length;
            const responseMessage = `📌 LISTA DE *SUB-BOTS* ACTIVOS\n\n👥 Usuarios conectados: ${totalUsers || '0'}\n\n${replyMessage.trim()}`;

            await _envio.sendMessage(m.chat, { text: responseMessage, mentions: _envio.parseMention(responseMessage) }, { quoted: m });
            break;
    }
};

handler.tags = ['serbot'];
handler.help = ['sockets', 'deletesesion', 'pausarai'];
handler.command = ['deletesesion', 'deletebot', 'deletesession', 'deletesesaion', 'stop', 'pausarai', 'pausarbot', 'bots', 'sockets', 'socket'];

module.exports = handler;
