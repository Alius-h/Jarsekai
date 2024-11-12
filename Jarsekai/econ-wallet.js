let handler = async (m, { conn, usedPrefix }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  let user = global.db.data.users[who]

  let username = conn.getName(who)
  if (!(who in global.db.data.users)) throw `🟨 المستخدم غير موجود في قاعدة البيانات`
  conn.reply(
    m.chat,
    `👛 *المحفظة | ${username}*

🪙 *الذهب* : ${user.dirham}
`,
    m,
    { mentions: [who] }
  )
}

handler.help = ['محفظة']
handler.tags = ['اقتصاد']
handler.command = ['محفظة', 'ذهب']

export default handler