import { translate } from '@vitalets/google-translate-api'
import { Anime } from '@shineiichijo/marika'

const client = new Anime()

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) return m.reply(`*[❗] الرجاء إدخال اسم الأنمي للبحث عنه.*`)
  try {
    // تحويل النص من العربية إلى الإنجليزية
    let translatedText = await translate(text, { to: 'en', autoCorrect: true })
    let anime = await client.searchAnime(translatedText.text)
    let result = anime.data[0]
    
    // ترجمة البيانات إلى العربية
    let resultes = await translate(`${result.background}`, { to: 'ar', autoCorrect: true })
    let resultes2 = await translate(`${result.synopsis}`, { to: 'ar', autoCorrect: true })
    
    // تنسيق البيانات
    let AnimeInfo = `
🎀 • *العنوان:* ${result.title}
🎋 • *النوع:* ${result.type}
📈 • *الحالة:* ${result.status.toUpperCase().replace(/\_/g, ' ')}
🍥 • *عدد الحلقات:* ${result.episodes}
🎈 • *المدة:* ${result.duration}
✨ • *مبني على:* ${result.source.toUpperCase()}
💫 • *تم الإصدار:* ${result.aired.from}
🎗 • *انتهى:* ${result.aired.to}
🎐 • *الشعبية:* ${result.popularity}
🎏 • *المفضلات:* ${result.favorites}
🎇 • *التقييم:* ${result.rating}
🏅 • *الترتيب:* ${result.rank}
♦ • *المقطع الدعائي:* ${result.trailer.url}
🌐 • *الرابط:* ${result.url}
🎆 • *الخلفية:* ${resultes.text}
❄ • *الملخص:* ${resultes2.text}`

    // إرسال الصورة والبيانات
    conn.sendFile(m.chat, result.images.jpg.image_url, 'error.jpg', AnimeInfo, m)
  } catch {
    throw `*[❗] حدث خطأ، يرجى المحاولة مرة أخرى.*`
  }
}

handler.help = ['انمي']
handler.tags = ['anime']
handler.command = /^(انمي|animeinfo)$/i
export default handler