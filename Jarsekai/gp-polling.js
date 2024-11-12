let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  // تقسيم النص باستخدام الرمز '|'
  let a = text.split('|').slice(1)
  if (!a[1]) throw 'التنسيق:\n' + usedPrefix + command + ' السؤال|الخيار الأول|الخيار الثاني'
  if (a[12]) throw 'عدد الخيارات كبير جدًا، التنسيق:\n' + usedPrefix + command + ' السؤال|الخيار الأول|الخيار الثاني'
  // التحقق من تكرار الخيارات في الاستطلاع
  if (checkDuplicate(a)) throw 'هناك تكرار في الخيارات!'
  let cap = '*طلب استطلاع من* ' + m.name + '\n*السؤال:* ' + text.split('|')[0]

  const pollMessage = {
    name: cap,
    values: a,
    multiselect: false,
    selectableCount: 1,
  }

  await conn.sendMessage(m.chat, {
    poll: pollMessage,
  })
}

handler.help = ['استطلاع السؤال|الخيار|الخيار']
handler.tags = ['group']
handler.command = /^استطلاع$/i

export default handler

// دالة للتحقق من تكرار العناصر في المصفوفة
function checkDuplicate(arr) {
  return new Set(arr).size !== arr.length
}