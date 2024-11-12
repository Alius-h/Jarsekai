const المجاني = 30000000
const المميز = 5000

let handler = async (m, { conn, isPrems }) => {
  let time = global.db.data.users[m.sender].lastclaim + 86400000
  if (new Date() - global.db.data.users[m.sender].lastclaim < 86400000)
    throw `لقد قمت بالفعل بالمطالبة بالذهب اليومي مؤخرًا. يمكنك المطالبة مرة أخرى بعد *${msToTime(time - new Date())}* `
  
  global.db.data.users[m.sender].dirham += isPrems ? المميز : المجاني
  m.reply(`🎉 *تمت إضافة ${isPrems ? المميز : المجاني} من الذهب إلى محفظتك*`)
  global.db.data.users[m.sender].lastclaim = new Date() * 1
}

handler.help = ['يومي']
handler.tags = ['اقتصاد']
handler.command = ['يومي']

export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return hours + ' ساعات ' + minutes + ' دقائق '
}