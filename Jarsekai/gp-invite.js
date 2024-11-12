let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!text)
    throw `✳️ أدخل الرقم الذي ترغب في إرسال دعوة المجموعة له\n\n📌 مثال :\n*${usedPrefix + command}*2126xxxxxxx`
  if (text.includes('+')) throw `أدخل الرقم بدون *+*`
  if (isNaN(text)) throw ' 📌 أدخل الأرقام فقط بدون رمز الدولة وبدون مسافات'
  let group = m.chat
  let link = 'https://chat.whatsapp.com/' + (await conn.groupInviteCode(group))

  await conn.reply(
    text + '@s.whatsapp.net',
    `≡ *دعوة للانضمام إلى المجموعة*\n\nقام أحد الأعضاء بدعوتك للانضمام إلى هذه المجموعة\n\n${link}`,
    m,
    { mentions: [m.sender] }
  )
  m.reply(`✅ تم إرسال رابط الدعوة إلى المستخدم`)
}
handler.help = ['دعوة <2126xxx>']
handler.tags = ['group']
handler.command = ['invite', 'دعوة']
handler.group = true
handler.admin = false
handler.botAdmin = true

export default handler