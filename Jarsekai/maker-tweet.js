let handler = async (m, { conn, text }) => {
  if (!text) throw 'لا توجد نصوص'

  const avatar = await conn
    .profilePictureUrl(m.sender, 'image')
    .catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
  const displayName = conn.getName(m.sender)
  const username = m.sender.split('@')[0]
  const replies = '69' // استبدل بالقيمة المطلوبة
  const retweets = '69' // استبدل بالقيمة المطلوبة
  const theme = 'dark' // استبدل بالقيمة المطلوبة

  const url = `https://some-random-api.com/canvas/misc/tweet?displayname=${encodeURIComponent(displayName)}&username=${encodeURIComponent(username)}&avatar=${encodeURIComponent(avatar)}&comment=${encodeURIComponent(text)}&replies=${encodeURIComponent(replies)}&retweets=${encodeURIComponent(retweets)}&theme=${encodeURIComponent(theme)}`

  conn.sendFile(m.chat, url, 'tweet.png', '*شكرًا على التغريدة*', m)
}

handler.help = ['تغريدة <نص التغريدة>']
handler.tags = ['maker']
handler.command = /^(تغريدة|تغريده)$/i

export default handler