let handler = async (m, { conn, command, usedPrefix }) => {
    let colaboradores = [
        { nombre: "Neykoor💜", rol: "Propietario", numero: "wa.me/5216631079388" },
        { nombre: "Colaborador 1", rol: "Desarrollador", numero: "wa.me/521XXXXXXXXXX" },
        { nombre: "Colaborador 2", rol: "Tester", numero: "wa.me/521XXXXXXXXXX" }
    ];

    let listaColaboradores = colaboradores.map(col => `• *${col.nombre}* \n    🎭 *Rol:* ${col.rol}\n    📱 *Número:* ${col.numero}`).join("\n\n");

    let staff = `U-umm... h-hola...  
    E-estos son las personas especiales que ayudan a que yo... e-emm... funcione bien~ 💜  
   
    🤖 *Mi nombre:* ${global.botname}  
    🌟 *Versión:* ${global.vs}  
    📈 *Uhm... usuarios activos:* ${Object.keys(global.db.data.users).length} (¡G-gracias por usarme!)  
   
    A-ah, ellos son mis senpais...  
   
    👑 *M-mi propietario:*  
    ${listaColaboradores}  
   
    S-si necesitas ayuda... p-puedes visitar nuestro grupito... e-es este... >//<  
    🔗 *Grupo de soporte:*  
    ${global.grupoSoporte || "N-no disponible... g-gomen... >///<"}  
    `;

    await conn.sendFile(m.chat, icons, 'yaemori.jpg', staff.trim(), fkontak, true, {
        contextInfo: {
            'forwardingScore': 200,
            'isForwarded': false,
            externalAdReply: {
                showAdAttribution: true,
                renderLargerThumbnail: false,
                title: `U-umm... Staff Oficial 💜`,
                body: `G-gracias por confiar en mí >///<`,
                mediaType: 1,
                sourceUrl: redes,
                thumbnailUrl: icono
            }
        }
    }, { mentions: m.sender });

    m.react(emoji);
}

handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
