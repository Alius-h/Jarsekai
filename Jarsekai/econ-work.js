import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command }) => {
  let earn = Math.floor(Math.random() * 2000)
  let time = global.db.data.users[m.sender].lastwork + 600000
  if (new Date() - global.db.data.users[m.sender].lastwork < 600000)
    throw `⏱️ لا يمكنك العمل مرة أخرى قبل ${msToTime(time - new Date())}`

  let anu = (await axios.get('https://raw.githubusercontent.com/Amrit9304/work/main/work.json'))
    .data
  let res = pickRandom(anu)
  global.db.data.users[m.sender].dirham += earn

  m.reply(`
‣ عملت كـ ${res.wrk} وجنيت ${earn} ذهب
`)
  global.db.data.users[m.sender].lastwork = new Date() * 1
}

handler.help = ['عمل']
handler.tags = ['اقتصاد']
handler.command = ['عمل', 'w']

handler.group = true

export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return minutes + ' دقيقة ' + seconds + ' ثانية'
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}