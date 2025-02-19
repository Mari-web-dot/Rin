import { exec } from 'child_process';
import { performance } from 'perf_hooks';

let handler = async (m, { conn, rcanal, text }) => {
    let startTime = performance.now();

    try {
        // ⏳ Ejecutar 'neofetch' solo para medir la velocidad, sin mostrar detalles
        await execPromise(`neofetch --stdout`, { timeout: 10000 });

        // ⏱️ Medir la latencia
        let endTime = performance.now();
        let latency = (endTime - startTime).toFixed(4);

        // 🌸 URL personalizada si el usuario la proporciona
        let url = text || "https://qu.ax/wmgKA.jpg"; // Imagen por defecto

        // 🌸 Respuesta kawaii con nombre de bot y opción de menú
        let response = `
*┏━━━✦ ❀ ✦━━━┓*
*┃  💕 A-aquí tienes...*  
*┃  📡 Velocidad: ${latency} ms...*  
*┃  💖 Soy *Anika Dm*...*  
*┃  ✨ Quieres ver mi menú? Usa .menu*
*┗━━━✦ ❀ ✦━━━┛*
*﹕E-espero que esté bien... (>///<)*
        `;

        await conn.sendFile(m.chat, url, "latency.jpg", response, m, rcanal);
    } catch (error) {
        console.error(`Error ejecutando neofetch: ${error.message}`);

        if (error.message.includes("timed out")) {
            conn.reply(m.chat, `﹕⏳ U-uhm... t-tardó demasiado... l-lo siento... (///∇//)`, m, rcanal);
        } else {
            conn.reply(m.chat, `﹕💔 O-oh... hubo un error... (*///∇///*)`, m, rcanal);
        }
    }
};

// 🌸 Función para ejecutar comandos con promesas
function execPromise(command, { timeout } = {}) {
    return new Promise((resolve, reject) => {
        const process = exec(command, (error, stdout, stderr) => {
            if (error) return reject(new Error(stderr || error.message));
            resolve({ stdout, stderr });
        });

        if (timeout) {
            setTimeout(() => {
                process.kill();
                reject(new Error("timed out"));
            }, timeout);
        }
    });
}

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = ['ping'];
handler.register = true;

export default handler;
