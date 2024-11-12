import fetch from "node-fetch"
import fg from 'api-dylux'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `✳️ من فضلك أدخل رابط من Google Drive`

  m.react(rwait)

  try {
    let res = await fg.GDriveDl(args[0])
    await m.reply(`
≡ *تنزيل من جوجل درايف*

▢ *الاسم:* ${res.fileName}
▢ *الحجم:* ${res.fileSize}
▢ *النوع:* ${res.mimetype}`)

    conn.sendMessage(
      m.chat,
      { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype },
      { quoted: m }
    )
    m.react(done)
  } catch {
    m.reply('⚠️ حدث خطأ: تحقق من الرابط أو جرب رابطًا آخر.')
  }
}

handler.help = ['دريف', 'ج-دريف']
handler.tags = ['downloader', 'premium']
handler.command = ['دريف', 'ج-دريف']
handler.credit = true
handler.premium = true

export default handler