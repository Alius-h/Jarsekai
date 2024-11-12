let war = global.maxwarn
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  if (!who) throw `✳️ يجب ذكر شخص ما\n\n📌 مثال : ${usedPrefix + command} @user`
  if (!(who in global.db.data.users)) throw `✳️ المستخدم غير موجود في قاعدة البيانات`
  let name = conn.getName(m.sender)
  let warn = global.db.data.users[who].warn
  if (warn < war) {
    global.db.data.users[who].warn += 1
    m.reply(
      `
⚠️ *تحذير للمستخدم* ⚠️

▢ *المشرف:* ${name}
▢ *المستخدم:* @${who.split`@`[0]}
▢ *عدد التحذيرات:* ${warn + 1}/${war}
▢ *السبب:* ${text}`,
      null,
      { mentions: [who] }
    )
    m.reply(
      `
⚠️ *تحذير* ⚠️
لقد تلقيت تحذيرًا من مشرف

▢ *عدد التحذيرات:* ${warn + 1}/${war} 
إذا حصلت على *${war}* تحذيرات سيتم طردك من المجموعة`,
      who
    )
  } else if (warn == war) {
    global.db.data.users[who].warn = 0
    m.reply(`⛔ تجاوز المستخدم *${war}* تحذيرات سيتم طرده`)
    await time(3000)
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
    m.reply(
      `♻️ تم طردك من المجموعة *${groupMetadata.subject}* لأنك حصلت على *${war}* تحذيرات`,
      who
    )
  }
}
handler.help = ['تحذيرات @user']
handler.tags = ['group']
handler.command = ['تحذيرات', 'التحذيرات']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

const time = async ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}