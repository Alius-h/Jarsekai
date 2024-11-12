let { downloadContentFromMessage } = await import('@whiskeysockets/baileys');

var handler = async (m, { conn }) => {
  if (!/viewOnce/.test(m.quoted?.mtype)) throw '✳️❇️ ليست رسالة مشاهدة مرة واحدة';
  let mtype = Object.keys(m.quoted.message)[0];
  let buffer = await m.quoted.download();
  let caption = m.quoted.message[mtype].caption || '';
  conn.sendMessage(m.chat, { [mtype.replace(/Message/, '')]: buffer, caption }, { quoted: m });
}

handler.help = ['عرض'];
handler.tags = ['tools'];
handler.command = ['اعرض', 'اعرضي'];
handler.register = true
handler.premium = false

export default handler;