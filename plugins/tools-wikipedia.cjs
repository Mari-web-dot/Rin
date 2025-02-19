const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { text }) => {
    if (!text) return m.reply('😖 E-eh... por favor, dime qué quieres buscar en Wikipedia...');

    try {
        const response = await axios.get(`https://es.wikipedia.org/wiki/${encodeURIComponent(text)}`);
        const $ = cheerio.load(response.data);

        let title = $('#firstHeading').text().trim();
        let firstParagraph = $('#mw-content-text > div.mw-parser-output p').filter((i, el) => $(el).text().trim() !== '').first().text().trim();

        if (!title || !firstParagraph) {
            throw new Error('Sin resultados.');
        }

        m.reply(`📖 *Wikipedia*\n\n🔍 *Buscado:* ${title}\n\nU-umm... esto es lo que encontré... espero que te sirva... 😳\n\n${firstParagraph}`);
    } catch (error) {
        console.error('Error al buscar en Wikipedia:', error);
        m.reply('🥺 L-lo siento... no pude encontrar nada o hubo un error...');
    }
};

handler.help = ['wikipedia'];
handler.tags = ['tools'];
handler.command = ['wiki', 'wikipedia'];

module.exports = handler;
