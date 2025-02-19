import { exec } from 'child_process';
import { performance } from 'perf_hooks';
import fs from 'fs';

let handler = async (m, { conn, rcanal }) => {
    let startTime = performance.now();

    try {
        // 🌸 Verificar si 'neofetch' está instalado antes de ejecutarlo
        await checkNeofetch();

        // ⏳ Ejecutar 'neofetch' con un tiempo de espera más largo
        const { stdout } = await execPromise(`neofetch --stdout`, { timeout: 10000 });

        let systemInfo = stdout.toString("utf-8").replace(/Memory:/, "Ram:");

        // ⏱️ Medir la latencia
        let endTime = performance.now();
        let latency = (endTime - startTime).toFixed(4);

        // 📄 Guardar la latencia
        logLatency(latency);

        // 🌸 Respuesta kawaii y organizada
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

        // 💔 Si el error fue por timeout
        if (error.message.includes("timed out")) {
            conn.reply(m.chat, `﹕⏳ U-uhm... t-tardó demasiado... l-lo siento... (///∇//)`, m, rcanal);
        } else {
            conn.reply(m.chat, `﹕💔 O-oh... hubo un error... (*///∇///*)`, m, rcanal);
        }
    }
};

// 🌸 Función para verificar si 'neofetch' está instalado
async function checkNeofetch() {
    return new Promise((resolve, reject) => {
        exec('command -v neofetch', (error, stdout) => {
            if (error || !stdout) {
                reject(new Error("Neofetch no está instalado."));
            } else {
                resolve();
            }
        });
    });
}

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
