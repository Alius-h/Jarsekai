let handler = async (m, { conn, args, groupMetadata }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  if (!who) throw `✳️ يرجى الإشارة إلى الشخص أو منشنه`
  if (!(who in global.db.data.users)) throw `✳️ المستخدم غير موجود في قاعدة البيانات`
  let warn = global.db.data.users[who].warn
  if (warn > 0) {
    global.db.data.users[who].warn -= 1
    m.reply(`⚠️ *إزالة تحذير*
         
▢ التحذيرات: *-1*
▢ إجمالي التحذيرات: *${warn - 1}*`)
    m.reply(`✳️ قام مشرف بتخفيض تحذيرك، الآن لديك *${warn - 1}*`, who)
  } else if (warn == 0) {
    m.reply('✳️ المستخدم ليس لديه تحذيرات')
  }
}
handler.help = ['-تحذير @user']
handler.tags = ['group']
handler.command = ['-تحذير', '-🟨']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler