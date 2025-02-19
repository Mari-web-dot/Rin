import { exec } from 'child_process';
import { performance } from 'perf_hooks';

let handler = async (m, { conn, rcanal }) => {
    // Medir el tiempo antes de ejecutar el comando
    let startTime = performance.now();

    exec(`neofetch --stdout`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing neofetch: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`neofetch stderr: ${stderr}`);
            return;
        }

        let child = stdout.toString("utf-8");
        let ssd = child.replace(/Memory:/, "Ram:");

        // Medir el tiempo después de ejecutar el comando
        let endTime = performance.now();
        let latensi = endTime - startTime;

        conn.reply(m.chat, `*Pong* 🏓 ${latensi.toFixed(4)} ms`, m, rcanal);
    });
}

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = ['ping'];
handler.register = true;

export default handler;
