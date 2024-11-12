let handler = async (m, { conn }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  conn.sendFile(
    m.chat,
    global.API('https://some-random-api.com', '/canvas/misc/simpcard', {
      avatar: await conn
        .profilePictureUrl(who, 'image')
        .catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
    }),
    'error.png',
    '*بطــاقة الخــروف الخــاصة بــك 😂😂*\n*انت اكث من يستحقها صدقني 😂😂😂*',
    m
  )
}
handler.help = ['simpcard']
handler.tags = ['maker']
handler.command = /^(خروف)$/i
export default handler
