let handler = async (m, { conn, args }) => {
  await conn.groupUpdateDescription(m.chat, `${args.join(' ')}`)
  m.reply('*✅ تم تغيير وصف المجموعة بنجاح*')
}
handler.help = ['Setdesc <text>']
handler.tags = ['group']
handler.command = /^وصف|setdesc$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler