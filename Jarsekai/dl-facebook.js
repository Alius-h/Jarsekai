import fetch from "node-fetch"
import fg from "api-dylux"

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `✳️ من فضلك أرسل رابط فيديو من فيسبوك\n\n📌 المثال :\n*${usedPrefix + command}* رابط فيسبوك هنا`
  }

  const urlRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
  if (!urlRegex.test(args[0])) {
    throw '⚠️ من فضلك قدم رابط صحيح.'
  }

  m.react(wait)

  try {
    const result = await fg.fbdl(args[0])
    const tex = `
⊱ ─── {* FIRE MD 🔥*} ─── ⊰
↳ *عنوان الفيديو:* ${result.title}
⊱ ────── {⋆🎉⋆} ────── ⊰`

    const response = await fetch(result.videoUrl)
    const arrayBuffer = await response.arrayBuffer()
    const videoBuffer = Buffer.from(arrayBuffer)

    conn.sendFile(m.chat, videoBuffer, 'fb.mp4', tex, m)
    m.react(done)
  } catch (error) {
    console.log(error)
    m.reply('⚠️ حدث خطأ أثناء معالجة الطلب. حاول مرة أخرى لاحقًا.')
  }
}

handler.help = ['فيسبوك <url>']
handler.tags = ['downloader']
handler.command = /^((فيسبوك|fb)(downloder|dl)?)$/i
handler.diamond = false

export default handler