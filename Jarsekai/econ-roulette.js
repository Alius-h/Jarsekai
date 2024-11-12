let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let amount = parseInt(args[0])
  let color = args[1]?.toLowerCase()
  if (args.length < 2)
    throw `✳️ طريقة الاستخدام: ${usedPrefix + command} <المبلغ> <اللون>\n\nمثال: ${usedPrefix + command} 500 أحمر`
  let colores = ['أحمر', 'أسود']
  let colour = colores[Math.floor(Math.random() * colores.length)]
  let user = global.db.data.users[m.sender]
  if (isNaN(amount) || amount < 500) throw `✳️ الحد الأدنى للرهان هو 500 ذهب`
  if (!colores.includes(color)) throw '✳️ يجب عليك تحديد لون صحيح: أحمر أو أسود'
  if (user.dirham < amount) throw '✳️ ليس لديك ما يكفي من الذهب!'
  if (amount > 100000) throw `🟥 *لا يمكنك الرهان بأكثر من 100000 ذهب*`
  let result = ''
  if (colour == color) {
    result = `${colour == 'أحمر' ? 'الكرة توقفت عند 🔴' : 'الكرة توقفت عند ⚫'} \n\nلقد فزت بـ ${amount * 2} ذهب`
    user.dirham += amount * 2
  } else {
    result = `${colour == 'أحمر' ? 'الكرة توقفت عند 🔴' : 'الكرة توقفت عند ⚫'} \n\nلقد خسرت ${amount} ذهب`
    user.dirham -= amount
  }
  m.reply(result)
}

handler.help = ['روليت <المبلغ> <اللون(أحمر/أسود)>']
handler.tags = ['اقتصاد']
handler.command = ['روليت2', 'rt']

handler.group = true

export default handler