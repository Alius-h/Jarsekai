let ro = 300000
let handler = async (m, { conn, usedPrefix, command }) => {
  let time = global.db.data.users[m.sender].lastrob + 7200000
  if (new Date() - global.db.data.users[m.sender].lastrob < 7200000)
    throw `⏱️¡مهلا! انتظر *${msToTime(time - new Date())}* قبل أن تسرق مرة أخرى`
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  if (!who) throw `✳️ ضع علامة لشخص ما للسرقة`
  if (!(who in global.db.data.users)) throw `✳️ المستخدم غير موجود في قاعدة بياناتي`
  let users = global.db.data.users[who]
  let rob = Math.floor(Math.random() * ro)
  if (users.exp < rob)
    return m.reply(
      `🔖 @${who.split`@`[0]} لديه أقل من *${ro} XP*\nلا تسرق من الفقراء:`,
      null,
      { mentions: [who] }
    )
  global.db.data.users[m.sender].exp += rob
  global.db.data.users[who].exp -= rob

  m.reply(
    `
  ‣ سرقت *${rob} XP* من @${who.split`@`[0]}
  `,
    null,
    { mentions: [who] }
  )
  global.db.data.users[m.sender].lastrob = new Date() * 1
}

handler.help = ['سرقة']
handler.tags = ['اقتصاد']
handler.command = ['سرقة', 'سرقه']

export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return hours + ' ساعة(s) ' + minutes + ' دقيقة(s)'
}