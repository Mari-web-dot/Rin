const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { text }) => {
    if (!text) return m.reply('😖 E-eh... por favor, dime qué quieres buscar en Wikipedia...');

    try {
        const link = await axios.get(`https://es.wikipedia.org/wiki/${encodeURIComponent(text)}`);
        const $ = cheerio.load(link.data);
        let wik = $('#firstHeading').text().trim();
        let resulw = $('#mw-content-text > div.mw-parser-output').find('p').first().text().trim();

        if (!wik || !resulw) throw new Error('Sin resultados.');

        m.reply(`📖 *Wikipedia*\n\n🔍 *Buscado:* ${wik}\n\nU-umm... esto es lo que encontré... espero que te sirva... 😳\n\n${resulw}`);
    } catch (e) {
        m.reply('🥺 L-lo siento... no pude encontrar nada o hubo un error...');
        console.error(e);
    }
};

handler.help = ['wikipedia'];
handler.tags = ['tools'];
handler.command = ['wiki', 'wikipedia'];

module.exports = handler;
