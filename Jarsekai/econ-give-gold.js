const petik = '```'
const items = ['dirham', 'exp']
let confirmation = {}

async function handler(m, { conn, args, usedPrefix, command }) {
  if (confirmation[m.sender]) return m.reply('أنت تقوم بتحويل بالفعل')
  let user = global.db.data.users[m.sender]
  const item = items.filter(v => v in user && typeof user[v] == 'number')
  let lol = `✳️ الاستخدام الصحيح للأمر:
*${usedPrefix + command}* dirham [الكمية] [@المستخدم]

📌 مثال: 
*${usedPrefix + command}* dirham 1000 @${m.sender.split('@')[0]}
`.trim()
  const type = (args[0] || '').toLowerCase()
  if (!item.includes(type)) return conn.reply(m.chat, lol, m, { mentions: [m.sender] })
  const count =
    Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, isNumber(args[1]) ? parseInt(args[1]) : 1)) * 1
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : args[2]
        ? args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net'
        : ''
  if (!who) return m.reply('✳️ يرجى تحديد المستخدم')
  if (!(who in global.db.data.users)) return m.reply(`✳️ المستخدم غير موجود في قاعدة البيانات`)
  if (user[type] * 1 < count) return m.reply(`✳️ الرصيد غير كافٍ لإتمام التحويل`)
  let confirm = `
    هل أنت متأكد أنك تريد تحويل *${count}* إلى *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* ؟

- لديك *60 ثانية* للرد
قم بالرد بـ ${petik}نعم${petik} أو ${petik}لا${petik}
`.trim()

  m.reply(confirm, null, { mentions: [who] })
  confirmation[m.sender] = {
    sender: m.sender,
    to: who,
    message: m,
    type,
    count,
    timeout: setTimeout(
      () => (m.reply('⏳ انتهى الوقت'), delete confirmation[m.sender]),
      60 * 1000
    ),
  }
}

handler.before = async m => {
  if (m.isBaileys) return
  if (!(m.sender in confirmation)) return
  if (!m.text) return
  let { timeout, sender, message, to, type, count } = confirmation[m.sender]
  if (m.id === message.id) return
  let user = global.db.data.users[sender]
  let _user = global.db.data.users[to]
  if (/لا/g.test(m.text.toLowerCase())) {
    clearTimeout(timeout)
    delete confirmation[sender]
    return m.reply('✅ تم إلغاء التحويل')
  }
  if (/نعم/g.test(m.text.toLowerCase())) {
    let previous = user[type] * 1
    let _previous = _user[type] * 1
    user[type] -= count * 1
    _user[type] += count * 1
    if (previous > user[type] * 1 && _previous < _user[type] * 1)
      m.reply(
        `تمت العملية بنجاح ✅ \n\n*${count}* تم تحويلها إلى @${(to || '').replace(/@s\.whatsapp\.net/g, '')}`,
        null,
        { mentions: [to] }
      )
    else {
      user[type] = previous
      _user[type] = _previous
      m.reply(
        `❎ فشل التحويل *${count}* ${type} إلى *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`,
        null,
        { mentions: [to] }
      )
    }
    clearTimeout(timeout)
    delete confirmation[sender]
  }
}

handler.help = ['give'].map(v => v + ' dirham [الكمية] [@التاغ]')
handler.tags = ['economy']
handler.command = ['payxp', 'تحويل', 'give']

handler.disabled = false

export default handler

function isNumber(x) {
  return !isNaN(x)
}