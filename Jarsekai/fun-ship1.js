let toM = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata }) {
  let ps = groupMetadata.participants.map(v => v.id)
  let a = m.sender
  let b
  do b = ps.getRandom()
  while (b === a)

  // قائمة الرسائل الترفيهية
  const messages = [
    `${toM(a)} ❤️ ${toM(b)}\nمبروك عليكم الزواج! 😆💍 نتمنى لكم حياة مليئة بالضحك والمقالب 🤪🎉`,
    `${toM(a)} 💘 ${toM(b)}\nألف مبروك! يا ترى مين راح يتحمل الثاني؟ 😜🤣`,
    `${toM(a)} 💖 ${toM(b)}\nالزواج بينكم رسمي الآن! جهزوا أنفسكم للحياة الزوجية المليئة بالمفاجآت 😂💫`,
    `${toM(a)} ❤️ ${toM(b)}\nيا ترى مين أول واحد بيبدأ المقالب؟ 😆👀 ألف مبروك!`,
    `${toM(a)} ❤️ ${toM(b)}\nشراكة للأبد، ولا مزيد من الحرية 😂🍾!`,
    `${toM(a)} 💞 ${toM(b)}\nأخيرا لقيتوا بعضكم! يا ترى الزواج هذا راح يصمد؟ 🤭💍`
  ]
  
  // اختيار رسالة عشوائية
  let message = messages[Math.floor(Math.random() * messages.length)]

  m.reply(message, null, {
    mentions: [a, b],
  })
}

handler.help = ['زواج']
handler.tags = ['fun']
handler.command = ['زوجني']

handler.group = true

export default handler