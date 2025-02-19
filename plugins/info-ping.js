import { exec } from 'child_process';
import { performance } from 'perf_hooks';
import fs from 'fs';

let handler = async (m, { conn, rcanal }) => {
    // Medir el tiempo antes de ejecutar el comando
    let startTime = performance.now();

    try {
        // Ejecutar el comando neofetch con un tiempo de espera
        const { stdout, stderr } = await execPromise(`neofetch --stdout`, { timeout: 5000 });

        if (stderr) {
            throw new Error(`neofetch stderr: ${stderr}`);
        }

        let child = stdout.toString("utf-8");
        let ssd = child.replace(/Memory:/, "Ram:");

        // Medir el tiempo después de ejecutar el comando
        let endTime = performance.now();
        let latensi = endTime - startTime;

        // Registrar la latencia en un archivo
        logLatency(latensi);

        // Enviar la respuesta con la latencia medida
        conn.reply(m.chat, `*Su velocidad es de* 🏓 `${{latensi.toFixed(4)} ms\n\n}$`{ssd}`, m, rcanal);
    } catch (error) {
        console.error(`Error executing neofetch: ${error.message}`);
        conn.reply(m.chat, `*Error* 🚫 Hubo un problema al ejecutar neofetch.`, m, rcanal);
    }
};

// Función para promisificar exec con tiempo de espera
function execPromise(command, { timeout } = {}) {
    return new Promise((resolve, reject) => {
        const process = exec(command, (error, stdout, stderr) => {
            if (error) {
                return reject({ error, stderr });
            }
            resolve({ stdout, stderr });
        });

        if (timeout) {
            setTimeout(() => {
                process.kill();
                reject(new Error('Command timed out'));
            }, timeout);
        }
    });
}

// Función para registrar la latencia en un archivo
function logLatency(latency) {
    const logMessage = `Latency: `${{latency.toFixed(4)} ms at}$`{new Date().toISOString()}\n`;
    fs.appendFile('latency.log', logMessage, (err) => {
        if (err) {
            console.error('Error writing to latency log:', err);
        }
    });
}

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = ['ping'];
handler.register = true;

export default handler;
