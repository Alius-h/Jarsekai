const xpperdirham = 600009
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^شراء/i, '')
  count = count
    ? /all/i.test(count)
      ? Math.floor(global.db.data.users[m.sender].exp / xpperdirham)
      : parseInt(count)
    : args[0]
      ? parseInt(args[0])
      : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].exp >= xpperdirham * count) {
    global.db.data.users[m.sender].exp -= xpperdirham * count
    global.db.data.users[m.sender].dirham += count
    conn.reply(
      m.chat,
      `
┌─「 *إيصال الشراء* 」
‣ *الكمية* : + ${count} 
‣ *المبلغ المستهلك* : -${xpperdirham * count} نقطة خبرة
└──────────────`,
      m
    )
  } else
    conn.reply(
      m.chat,
      `❎ عذرًا، ليس لديك ما يكفي من *نقاط الخبرة* لشراء *${count}* من الذهب\n\nيمكنك كسب *نقاط الخبرة* باستخدام الأوامر من قائمة *الألعاب والاقتصاد*`,
      m
    )
}
handler.help = ['شراء', 'شراء-الكل']
handler.tags = ['اقتصاد']
handler.command = ['شراء', 'شراء-الكل']

handler.disabled = false

export default handler