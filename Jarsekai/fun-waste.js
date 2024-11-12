let handler = async (m, { conn }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender

  let name = conn.getName(who)
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Guru.jpg')
  
  conn.sendFile(
    m.chat,
    global.API('https://some-random-api.com', '/canvas/overlay/wasted', {
      avatar: pp,
    }),
    'waste.png',
    `*أوه! لقد انتهيت يا :* ${name}\n\nخسرت`,
    m
  )
}

handler.help = ['خسارة @user']
handler.tags = ['fun']
handler.command = ['خسارة','خساره']

export default handler