let handler = async (m, { conn, args, usedPrefix, command }) => {
  // تحديد الحالة بناءً على الأمر
  let isClose = {
    فتح: 'not_announcement', // الحالة لتفعيل الإعلانات
    غلق: 'announcement',     // الحالة لتعطيل الإعلانات
  }[command] // يتم استخدام الأمر المباشر كمدخل هنا

  if (isClose === undefined)
    throw `
*✳️ اختر خيارًا صحيحًا:*
  *▢ ${usedPrefix + command} غلق*
  *▢ ${usedPrefix + command} فتح*
`.trim()

  // تحديث إعدادات المجموعة
  await conn.groupSettingUpdate(m.chat, isClose)
}

handler.help = ['غلق', 'فتح']
handler.tags = ['group']
handler.command = ['غلق', 'فتح']
handler.admin = true
handler.botAdmin = true

export default handler