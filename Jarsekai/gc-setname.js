let handler = async (m, { conn, args, text }) => {
  if (!text) throw `*✳️ يجب إدخال الاسم الذي تريد تعيينه كاسم جديد للمجموعة*`
  try {
    let text = args.join` `
    if (!args || !args[0]) {
    } else {
      conn.groupUpdateSubject(m.chat, text)
    }
  } catch (e) {
    throw '*⚠️ عذرًا حدث خطأ، الاسم لا يمكن أن يتجاوز 25 حرفًا*'
  }
}
handler.help = ['setname <text>']
handler.tags = ['group']
handler.command = /^(اسم)$/i
handler.group = true
handler.admin = true
export default handler