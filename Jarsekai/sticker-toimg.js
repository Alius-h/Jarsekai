import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, usedPrefix, command }) => {
  const notStickerMessage = `✳️ رد على ملصق باستخدام الأمر: \n\n *${usedPrefix + command}*`
  if (!m.quoted) throw notStickerMessage
  const q = m.quoted || m
  let mime = q.mediaType || ''
  if (!/sticker/.test(mime)) throw notStickerMessage
  let media = await q.download()
  let out = (await webp2png(media).catch(_ => null)) || Buffer.alloc(0)
  await conn.sendFile(m.chat, out, 'out.png', '*✅ هنا الصورة*', m)
}

handler.help = ['لصورة <ملصق>']
handler.tags = ['sticker']
handler.command = ['لصورة', 'لصوره']

export default handler