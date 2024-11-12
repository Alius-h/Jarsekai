let رهانات_الروليت = {} // كائن لتخزين جميع الرهانات
let نتيجة_الروليت = {} // كائن لتخزين النتيجة

const handler = async (m, { conn, args, usedPrefix, command }) => {
  /*if (global.db.data.users[m.sender].level < 5) {
        return conn.reply(m.chat, 'يجب أن تكون على الأقل في المستوى 5 لاستخدام هذا الأمر.', m);
    }*/

  const حساب_الروليت = (chatId, conn) => {
    let who = m.quoted
      ? m.quoted.sender
      : m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.fromMe
          ? conn.user.jid
          : m.sender
    let username = conn.getName(who)
    if (!(who in global.db.data.users)) throw `✳️ المستخدم غير موجود في قاعدة البيانات`

    if (رهانات_الروليت[chatId] && رهانات_الروليت[chatId].length > 0) {
      let الألوان = ['أحمر', 'أسود']
      let color = الألوان[Math.floor(Math.random() * الألوان.length)]

      let الفائزون = []
      let رسالة_النتيجة = `الكرة توقفت على اللون ${color}\n\n🎉 الفائزون 🎉\n\n`

      for (let bet of رهانات_الروليت[chatId]) {
        let result = ''
        if (color === bet.color) {
          result = `@${bet.user.split('@')[0]} فاز بـ ${bet.amount}`
          global.db.data.users[bet.user].dirham += bet.amount
          الفائزون.push(result)
        } else {
          result = `@${bet.user.split('@')[0]} خسر ${bet.amount}`
          global.db.data.users[bet.user].dirham -= bet.amount
        }
      }

      رسالة_النتيجة += الفائزون.join('\n')
      if (الفائزون.length === 0) {
        رسالة_النتيجة += 'لا يوجد فائزين'
      }

      نتيجة_الروليت[chatId] = رسالة_النتيجة
      delete رهانات_الروليت[chatId]

      conn.reply(m.chat, رسالة_النتيجة, m, { mentions: [who] })
    }
  }

  const تشغيل_الروليت = (chatId, conn) => {
    const delay = 10 * 1000 // 10 ثوانٍ

    setTimeout(() => {
      حساب_الروليت(chatId, conn)
    }, delay)
  }

  const رهان_الروليت = (user, chatId, amount, color) => {
    let الألوان = ['أحمر', 'أسود']
    if (isNaN(amount) || amount < 500) {
      throw `✳️ الحد الأدنى للرهان هو 500 ذهب`
    }
    if (!الألوان.includes(color)) {
      throw '✳️ يجب تحديد لون صحيح: أحمر أو أسود'
    }
    if (users.dirham < amount) {
      throw '✳️ ليس لديك ما يكفي من الذهب!'
    }
    if (amount > 100000) {
      throw `🟥 لا يمكنك الرهان بأكثر من 100000 ذهب`
    }

    if (!رهانات_الروليت[chatId]) {
      رهانات_الروليت[chatId] = []
    }
    رهانات_الروليت[chatId].push({ user, amount, color })
    return `✅ تم وضع رهانك بقيمة ${amount} ذهب على اللون ${color}!`
  }

  let amount = parseInt(args[0])
  let color = args[1]?.toLowerCase()
  if (args.length < 2) {
    throw `✳️ طريقة الاستخدام: ${usedPrefix + command} <المبلغ> <اللون>\n\n مثال: ${usedPrefix + command} 500 أحمر`
  }

  let users = global.db.data.users[m.sender]
  let response = رهان_الروليت(m.sender, m.chat, amount, color)

  m.reply(response)
  تشغيل_الروليت(m.chat, conn)
}

handler.help = ['رهان <المبلغ> <اللون(أحمر/أسود)>']
handler.tags = ['اقتصاد']
handler.command = ['روليت']

handler.group = true

export default handler