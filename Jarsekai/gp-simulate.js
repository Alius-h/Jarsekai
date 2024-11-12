let handler = async (m, { conn, usedPrefix, command, args: [event], text }) => {
  let chat = global.db.data.chats[m.chat]
  if (!chat.welcome)
    throw `✳️ لاستخدام هذا الأمر يجب تفعيل الترحيب باستخدام *${usedPrefix}on* welcome`
  let te = `
  ┌─⊷ *الأحداث*
  ▢ ترحيب
  ▢ وداع
  ▢ ترقية
  ▢ تنزيل
  └───────────
  
  📌 مثال:
  
  *${usedPrefix + command}* ترحيب @مستخدم`

  if (!event) return await m.reply(te)

  let mentions = text.replace(event, '').trimStart()
  let who = mentions ? conn.parseMention(mentions) : []
  let part = who.length ? who : [m.sender]
  let act = false
  m.reply(`✅ محاكاة ${event}...`)
  switch (event.toLowerCase()) {
    case 'add':
    case 'ترحيب':
    case 'invite':
    case 'welcome':
      act = 'add'
      break
    case 'bye':
    case 'وداع':
    case 'leave':
    case 'remove':
      act = 'remove'
      break

    case 'promote':
    case 'ترقية':
      act = 'promote'
      break

    case 'demote':
    case 'تنزيل':
      act = 'demote'
      break

    default:
      throw te
  }
  if (act)
    return conn.participantsUpdate({
      id: m.chat,
      participants: part,
      action: act,
    })
}
handler.help = ['محاكاة <الحدث> @مستخدم']
handler.tags = ['مجموعة']
handler.command = ['محاكاة', 'محاكاه']
handler.admin = true
handler.group = true

export default handler