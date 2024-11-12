let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  /*if (global.db.data.users[m.sender].level < 5) {
    return conn.reply(m.chat, 'يجب أن يكون مستواك 5 على الأقل لاستخدام هذا الأمر.', m);
  }*/

  let fa = `🟥 *يرجى تحديد كمية الذهب للمراهنة*

*مثال:*
${usedPrefix + command} 1000`.trim()
  if (!args[0]) throw fa
  if (isNaN(args[0])) throw fa

  let users = global.db.data.users[m.sender]
  let dirham = users.dirham
  let amount =
    (args[0] && number(parseInt(args[0]))
      ? Math.max(parseInt(args[0]), 1)
      : /all/i.test(args[0])
        ? Math.floor(parseInt(users.dirham))
        : 1) * 1

  let time = users.lastcf + 90000
  if (new Date() - users.lastcf < 90000)
    throw `يمكنك اللعب مرة أخرى بعد ${msToTime(time - new Date())}`
  if (amount < 100) throw `🟥 *لا يمكنك المراهنة بأقل من 100 من الذهب*`
  if (users.dirham < amount)
    throw `🟥 *ليس لديك ما يكفي من المال لهذه المراهنة.*\n*لديك حالياً ${dirham} من الذهب فقط.*`
  if (users.chicken < 1) {
    throw `🟥 *ليس لديك أي دجاج للمراهنة* \nاستخدم الأمر ${usedPrefix}شراء-دجاجة`
  }

  let botScore = Math.ceil(Math.random() * 35) * 1 // عشوائي للنقاط للبوت
  let playerScore = Math.floor(Math.random() * 101) * 1 // عشوائي للنقاط للمستخدم
  let status = `ماتت دجاجتك 🪦`

  if (botScore < playerScore) {
    users.dirham += amount * 1
    status = `فازت دجاجتك الصغيرة بالمعركة، وجعلتك أغنى بـ 🪙 ${amount * 2} من الذهب! 🐥`
  } else {
    users.dirham -= amount * 1
    users.chicken -= 1
    users.lastcf = new Date() * 1
  }

  let result = `${status}`.trim()

  m.reply(result)
}

handler.help = ['مصارعة-الدجاج <المبلغ>']
handler.tags = ['اقتصاد']
handler.command = ['مصارعة-الدجاج', 'م-د']

handler.group = true

export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = hours < 10 ? '' + hours : hours
  minutes = minutes < 10 ? '' + minutes : minutes
  seconds = seconds < 10 ? '' + seconds : seconds

  return minutes + ' دقيقة ' + seconds + ' ثانية'
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

function number(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}