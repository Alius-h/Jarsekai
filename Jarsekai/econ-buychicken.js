let handler = async (m, { conn, command, args, usedPrefix }) => {
  let user = global.db.data.users[m.sender]

  if (user.chicken > 0) return m.reply('❗ لديك بالفعل دجاجة')
  if (user.credit < 500)
    return m.reply(`🟥 *ليس لديك كمية كافية من الذهب في محفظتك لشراء دجاجة*`)

  user.dirham -= 1000
  user.chicken += 1
  m.reply(
    `🎉 لقد اشتريت دجاجة بنجاح للقتال! استخدم الأمر ${usedPrefix}مصارعة-الدجاج <المبلغ>`
  )
}

handler.help = ['شراءدجاجة']
handler.tags = ['اقتصاد']
handler.command = ['شراء-دجاجة', 'شراءدجاجة']

handler.group = true

export default handler