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

  if (!(who in global.db.data.users)) throw `✳️ المستخدم غير موجود في قاعدة بياناتي`

  var wealth = 'مفلس 😭'
  if (`${user.bank}` <= 3000) {
    wealth = 'مفلس 😭'
  } else if (`${user.bank}` <= 6000) {
    wealth = 'فقير 😢'
  } else if (`${user.bank}` <= 100000) {
    wealth = 'متوسط 💸'
  } else if (`${user.bank}` <= 1000000) {
    wealth = 'غني 💸💰'
  } else if (`${user.bank}` <= 10000000) {
    wealth = 'مليونير 🤑'
  } else if (`${user.bank}` <= 1000000000) {
    wealth = 'متعدد الملايين 🤑'
  } else if (`${user.bank}` <= 10000000000) {
    wealth = 'ملياردير 🤑🤑'
  }

  conn.reply(
    m.chat,
    `🏦 *البنك | ${username}*

*🪙 الذهب* : ${user.bank}

*الثروة :* ${wealth}

`,
    m,
    { mentions: [who] }
  )
}
handler.help = ['بنك']
handler.tags = ['economy']
handler.command = ['بنك', 'خزنة']

export default handler