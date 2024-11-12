const xpperdirham = 1
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^(withdraw|سحب)/i, '')
  count = count
    ? /all/i.test(count)
      ? Math.floor(global.db.data.users[m.sender].bank / xpperdirham)
      : parseInt(count)
    : args[0]
      ? parseInt(args[0])
      : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].bank >= xpperdirham * count) {
    global.db.data.users[m.sender].bank -= xpperdirham * count
    global.db.data.users[m.sender].dirham += count
    conn.reply(m.chat, `تم تحويل 🪙 ${count} ذهب إلى محفظتك`, m)
  } else
    conn.reply(
      m.chat,
      `🟥 *ليس لديك كمية كافية من الذهب في البنك لإتمام هذه المعاملة*`,
      m
    )
}

handler.help = ['سحب']
handler.tags = ['اقتصاد']
handler.command = ['سحب', 'سحب-الكل', 'سحب الكل', 'سحب كلي', 'سحب']

handler.disabled = false

export default handler