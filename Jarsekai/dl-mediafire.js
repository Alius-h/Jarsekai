import fetch from 'node-fetch'
import { mediafiredl } from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command, isOwner, isPrems }) => {
  var limit
  if ((isOwner || isPrems)) limit = 1200
  else limit = 100

  if (!args[0] && m.quoted && m.quoted.text) {
    args[0] = m.quoted.text;
  }

  if (!args[0] && !m.quoted) throw `✳️ يجب إدخال رابط ميديافاير بجانب الأمر`
  if (!args[0].match(/mediafire/gi)) throw `❎ الرابط غير صحيح`

  m.react(rwait)
  let full = /f$/i.test(command)
  let u = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
  let ss = await (await fetch(`https://image.thum.io/get/fullpage/${u}`)).buffer()
  let res = await mediafiredl(args[0])
  let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
  let isLimit = (isPrems || isOwner ? limit : limit) * 1012 < filesize
  let caption = `
≡ *ميديافاير*

▢ *الاسم:* ${filename}
▢ *الحجم:* ${filesizeH}
▢ *الامتداد:* ${ext}
▢ *تم الرفع:* ${aploud}
${isLimit ? `\n▢ الملف يتجاوز حد التنزيل *+${limit} MB*\nقم بالترقية إلى البريميوم لتحميل الملفات الأكبر من *900 MB*` : ''} 
`.trim()

  await conn.sendFile(m.chat, ss, 'ssweb.png', caption, m)
  
  if (!isLimit) await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })
  m.react(done)
}

handler.help = ['ميديافاير <url>']
handler.tags = ['downloader']
handler.command = ['ميديافاير','ميدياف'] 
handler.credit = false
handler.premium = false

export default handler