import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!text) throw `✳️ يجب عليك إدخال رابط لفيديو، منشور، ريل، أو صورة من إنستغرام`
  m.reply(wait)

  let res
  try {
    res = await fetch(`https://api.guruapi.tech/insta/v1/igdl?url=${text}`)
  } catch (error) {
    throw `⚠️ حدث خطأ: ${error.message}`
  }

  let api_response = await res.json()

  if (!api_response || !api_response.media) {
    throw `⚠️ لم يتم العثور على فيديو أو صورة أو استجابة غير صالحة من API.`
  }

  const mediaArray = api_response.media

  for (const mediaData of mediaArray) {
    const mediaType = mediaData.type
    const mediaURL = mediaData.url

    let cap = `إليك الـ ${mediaType.toUpperCase()} >,<`

    if (mediaType === 'video') {
      conn.sendFile(m.chat, mediaURL, 'instagram.mp4', cap, m)
    } else if (mediaType === 'photo') {
      conn.sendFile(m.chat, mediaURL, 'instagram.jpg', cap, m)
    }
  }
}

handler.help = ['إنستغرام', 'تحميل-إنستغرام']
handler.tags = ['downloader']
handler.command = /^(انستغرام|تحميل-إنستغرام|igdl|ig|insta)$/i

export default handler