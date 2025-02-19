import { exec } from 'child_process';
import { performance } from 'perf_hooks';
import fs from 'fs';

let handler = async (m, { conn, rcanal }) => {
    let startTime = performance.now();

    try {
        // ⏳ Ejecutar 'neofetch' solo para medir la velocidad, sin mostrar detalles
        await execPromise(`neofetch --stdout`, { timeout: 10000 });

        // ⏱️ Medir la latencia
        let endTime = performance.now();
        let latency = (endTime - startTime).toFixed(4);

        // 📄 Guardar la latencia
        logLatency(latency);

        // 🌸 Respuesta kawaii sin información del dispositivo
        let response = `
*┏━━━✦ ❀ ✦━━━┓*
*┃  💕 A-aquí tienes...*  
*┃  📡 Velocidad: ${latency} ms...*  
*┗━━━✦ ❀ ✦━━━┛*
*﹕E-espero que esté bien... (>///<)*
        `;

        conn.reply(m.chat, response, m, rcanal);
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

// 🌸 Función para registrar la latencia en un archivo
function logLatency(latency) {
    const logMessage = `💖 Latencia: ${latency} ms - ${new Date().toISOString()}\n`;
    fs.appendFile('latency.log', logMessage, (err) => {
        if (err) console.error('﹕💔 O-oh no... n-no pude guardar esto... (｡•́︿•̀｡)', err);
    });
}

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = ['ping'];
handler.register = true;

export default handler;
