const handler = async (m, { conn, text }) => {
    const [nomor, pesan, jumlah] = text.split('|');

    if (!nomor) return conn.reply(m.chat, `🌸 Oh no... ¡Parece que olvidaste ingresar un número!`, m);

    if (!pesan) return conn.reply(m.chat, `💌 Umm... creo que olvidaste el mensaje. Inténtalo así:\n\n> ✨ #spamwa numero|texto|cantidad`, m);

    if (jumlah && isNaN(jumlah)) return conn.reply(m.chat, `🙈 Oh... la cantidad debe ser un número, ¿sí?`, m);

    const fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net';
    const fixedJumlah = jumlah ? jumlah * 1 : 10;

    if (fixedJumlah > 999) return conn.reply(m.chat, `😖 Uy... es demasiado grande, ¿puedes intentar con menos?`, m);

    await conn.reply(m.chat, `🎀 E-esto... ¡El spam se envió con éxito! Espero que no sea molestia...`, m);
    for (let i = fixedJumlah; i > 1; i--) {
        if (i !== 0) conn.reply(fixedNumber, pesan.trim(), null);
    }
};

handler.help = ['spamwa <numero>|<mensaje>|<cantidad>'];
handler.tags = ['tools'];
handler.command = ['spam', 'spamwa'];
handler.premium = true;

export default handler;
