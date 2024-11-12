let handler = async (m, { conn, command, text, usedPrefix, participants }) => {
  if (!text) throw '✳️ من فضلك قم بذكر الشخص الذي تريد معرفة شخصيته'
  
  const mentionedUser =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : args[2]
        ? args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net'
        : ''
  
  const userChar = [
    'قائد',
    'كريم',
    'عصبي',
    'واثق جداً',
    'مطيع',
    'طيب',
    'مغرم',
    'لطيف',
    'صبور',
    'منحرف',
    'رائع',
    'مساعد',
    'ذكي',
    'جذاب',
    'وسيم',
    'أنيق',
    'ظريف',
  ]
  
  const userCharacterSelection = userChar[Math.floor(Math.random() * userChar.length)]
  
  let message = `🔍 شخصية @${mentionedUser.split('@')[0]} هي *${userCharacterSelection}* 🔥⚡`

  conn.sendMessage(m.chat, { text: message, mentions: [mentionedUser] }, { quoted: m })
}
handler.help = ['شخصية @tag']
handler.tags = ['fun']
handler.command = /^(شخصية|شخصيه)/i

export default handler