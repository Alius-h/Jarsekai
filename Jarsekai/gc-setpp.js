let handler = async (m, { conn, args }) => {
  if (!m.quoted) throw '*✳️ قم بالرد على الصورة لتغييرها*'
  let media = await m.quoted.download()
  await conn.updateProfilePicture(m.chat, media)
  m.reply('*✅ تم تغيير صورة المجموعة بنجاح*')
}
handler.help = ['تغير', 'تغيرصورة']
handler.tags = ['group']
handler.command = /^(تغير|تغيرصورة)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler