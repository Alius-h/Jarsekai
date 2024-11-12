let handler = async (m, { conn, usedPrefix }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  conn.sendFile(
    m.chat,
    global.API('https://some-random-api.com', '/canvas/misc/blur', {
      avatar: await conn
        .profilePictureUrl(who, 'image')
        .catch(_ => 'https://api.shannmoderz.xyz/server/file/XyjKP6IA0VnyFZF.jpg'),
    }),
    'blurred-image.jpg',
    '*[ ✔ ]*',
    m
  )
}
handler.help = ['ضبابية']
handler.tags = ['maker']
handler.command = /^(ضبابية)$/i
export default handler