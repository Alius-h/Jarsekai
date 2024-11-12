import axios from 'axios'

let handler = async (m, { conn, text }) => {
  if (!text) throw '✳️ ماذا تريدني أن أبحث عنه في YouTube؟'

  try {
    const query = encodeURIComponent(text)
    const response = await axios.get(`https://weeb-api.vercel.app/ytsearch?query=${query}`)
    const results = response.data

    if (results.length === 0) {
      throw 'لم يتم العثور على نتائج للبحث المطلوب.'
    }

    const firstResult = results[0]

    const message = `
乂 *العنوان:* ${firstResult.title}
乂 *الرابط:* ${firstResult.url}
乂 *المدة:* ${firstResult.timestamp}
乂 *تاريخ النشر:* ${firstResult.ago}
乂 *المشاهدات:* ${firstResult.views}
    `

    conn.sendFile(m.chat, firstResult.thumbnail, 'yts.jpeg', message, m)
  } catch (error) {
    console.error(error)
    throw 'حدث خطأ أثناء البحث عن فيديوهات YouTube.'
  }
}

handler.help = ['بحثيوتيوب']
handler.tags = ['تنزيل']
handler.command = ['بحثيوتيوب', 'بحث']

export default handler