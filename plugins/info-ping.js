import { exec } from 'child_process';
import { performance } from 'perf_hooks';
import fs from 'fs';

// 🌸 Handler principal con un estilo más tímido y ordenado
let handler = async (m, { conn, rcanal }) => {
    let startTime = performance.now();

    try {
        // ⏳ Ejecutar 'neofetch' con un tiempo de espera
        const { stdout, stderr } = await execPromise(`neofetch --stdout`, { timeout: 5000 });

        if (stderr) throw new Error(`neofetch stderr: ${stderr}`);

        let systemInfo = stdout.toString("utf-8").replace(/Memory:/, "Ram:");

        // ⏱️ Medir la latencia
        let endTime = performance.now();
        let latency = (endTime - startTime).toFixed(4);

        // 📄 Guardar la latencia en un archivo
        logLatency(latency);

        // 🌸 Mensaje decorado y organizado
        let response = `
*┏━━━✦ ❀ ✦━━━┓*
*┃  💕 A-aquí tienes...*  
*┃  📡 Velocidad: ${latency} ms...*  
*┃  💻 T-tu sistema... u-umm...*  
*┃  ✨ ${systemInfo}*  
*┗━━━✦ ❀ ✦━━━┛*
*﹕¡E-espero que te sirva! (>///<)*
        `;

        conn.reply(m.chat, response, m, rcanal);
    } catch (error) {
        console.error(`Error ejecutando neofetch: ${error.message}`);
        conn.reply(m.chat, `﹕💔 L-lo siento... a-algo salió mal... (*///∇///*)`, m, rcanal);
    }
};

// 🌸 Función para ejecutar comandos en la terminal con promesas
function execPromise(command, { timeout } = {}) {
    return new Promise((resolve, reject) => {
        const process = exec(command, (error, stdout, stderr) => {
            if (error) return reject({ error, stderr });
            resolve({ stdout, stderr });
        });

        if (timeout) {
            setTimeout(() => {
                process.kill();
                reject(new Error('﹕⏳ A-ah... e-esperé demasiado... l-lo siento... (///∇//)'));
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

// 🌸 Configuración del handler
handler.help = ['ping'];
handler.tags = ['info'];
handler.command = ['ping'];
handler.register = true;

export default handler;
