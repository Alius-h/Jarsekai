const الذهب_لكل_تحويل = 1
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^(dep|deposit)$/i, '')
  count = count
    ? /depall/i.test(count)
      ? Math.floor(global.db.data.users[m.sender].dirham / الذهب_لكل_تحويل)
      : parseInt(count)
    : args[0]
      ? parseInt(args[0])
      : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].dirham >= الذهب_لكل_تحويل * count) {
    global.db.data.users[m.sender].dirham -= الذهب_لكل_تحويل * count
    global.db.data.users[m.sender].bank += count
    conn.reply(m.chat, `لقد قمت بتحويل 🪙 ${count} من الذهب إلى حسابك البنكي`, m)
  } else
    conn.reply(
      m.chat,
      `🟥 *ليس لديك كمية كافية من الذهب في محفظتك لإتمام هذه المعاملة*`,
      m
    )
}
handler.help = ['ايداع']
handler.tags = ['اقتصاد']
handler.command = ['ايداع', 'dep', 'depall']

handler.disabled = false

export default handler