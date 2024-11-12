import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!text) throw `تحتاج إلى وضع رابط لأي فيديو، منشور، صورة من تويتر`
  m.reply("انتظر قليلاً...")

  let res
  try {
    res = await fetch(`https://api.guruapi.tech/xdown?url=${text}`)
  } catch (error) {
    throw `حدث خطأ: ${error.message}`
  }

  let api_response = await res.json()

  if (!api_response || !api_response.media) {
    throw `لم يتم العثور على فيديو أو صورة، أو أن الرد من API غير صالح.`
  }

  const mediaArray = api_response.media

  for (const mediaData of mediaArray) {
    const mediaType = mediaData.type
    const mediaURL = mediaData.url

    let cap = `إليك ${mediaType === 'video' ? 'الفيديو' : 'الصورة'} المطلوبة`

    if (mediaType === 'video') {
      conn.sendFile(m.chat, mediaURL, 'x.mp4', cap, m)
    } else if (mediaType === 'image') {
      conn.sendFile(m.chat, mediaURL, 'x.jpg', cap, m)
    }
  }
}

handler.help = ['تويتر']
handler.tags = ['تنزيل']
handler.command = /^(تويتر|تنزيل-ت)$/i

export default handler