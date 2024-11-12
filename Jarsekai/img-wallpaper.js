import fetch from 'node-fetch';

async function translateText(text, targetLang = 'en') {
  const translationApiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  
  try {
    const response = await fetch(translationApiUrl);
    const data = await response.json();
    return data[0][0][0];  // استخراج الترجمة من الرد
  } catch (error) {
    console.error("خطأ في الترجمة:", error);
    return text;  // إذا فشلت الترجمة، نستخدم النص الأصلي
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*مثال للاستخدام: ${usedPrefix + command} ناروتو*`;

  // ترجمة النص إلى الإنجليزية
  const translatedText = await translateText(text);

  const apiUrl = `https://weeb-api.vercel.app/wallpaper?query=${encodeURIComponent(translatedText)}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw `خطأ في جلب الخلفية: ${response.status} ${response.statusText}`;
    }

    const imageUrls = await response.json();

    if (imageUrls.length === 0) {
      throw `لم يتم العثور على خلفيات لـ: ${text}`;
    }

    // اختيار صورتين عشوائيتين من المصفوفة
    const randomIndexes = getRandomIndexes(imageUrls.length, 2);
    const randomImages = randomIndexes.map(index => imageUrls[index]);

    for (const imageUrl of randomImages) {
      const imageResponse = await fetch(imageUrl);

      if (!imageResponse.ok) {
        throw `خطأ في جلب الصورة: ${imageResponse.status} ${imageResponse.statusText}`;
      }

      // استخدام 'buffer()' للحصول على بيانات الصورة كـ buffer
      const buffer = await imageResponse.buffer();

      conn.sendFile(m.chat, buffer, 'خلفية.jpg', `*${text}*`, m);
    }
  } catch (error) {
    throw `خطأ: ${error}`;
  }
}

// وظيفة لتوليد فهارس عشوائية
function getRandomIndexes(max, count) {
  const indexes = [];
  while (indexes.length < count) {
    const randomIndex = Math.floor(Math.random() * max);
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex);
    }
  }
  return indexes;
}

handler.help = [''].map(v => 'خلفية' + v + ' <بحث>');
handler.tags = ['تنزيل'];
handler.command = /^(خلفيه|خلفية|خلفيات)$/i;

export default handler;