import { delay } from "@whiskeysockets/baileys";

const handler = async (m, { args, usedPrefix, command, conn }) => {
  const fa = `
*[❗] الرجاء إدخال الكمية التي ترغب في المراهنة عليها*

*📌 مثال:*
*${usedPrefix + command} 100*`.trim();
  if (!args[0] || isNaN(args[0]) || parseInt(args[0]) <= 0) throw fa;
  
  const apuesta = parseInt(args[0]);
  const users = global.db.data.users[m.sender];
  const time = users.lastslot + 10000;
  if (new Date() - users.lastslot < 10000) throw `*⏳ انتظر ${msToTime(time - new Date())} للمراهنة مرة أخرى*`;
  if (apuesta < 100) throw '*[❗] الحد الأدنى للمراهنة هو 100 XP*';
  if (users.exp < apuesta) {
    throw `*[❗] لا تملك XP كافية للمراهنة بهذا المبلغ، العب ألعاباً أخرى أو تفاعل مع البوت لكسب المزيد من XP*`;
  }

  const emojis = ['❤️‍🔥', '🔥', '💥'];
  const getRandomEmojis = () => {
    const x = Array.from({ length: 3 }, () => emojis[Math.floor(Math.random() * emojis.length)]);
    const y = Array.from({ length: 3 }, () => emojis[Math.floor(Math.random() * emojis.length)]);
    const z = Array.from({ length: 3 }, () => emojis[Math.floor(Math.random() * emojis.length)]);
    return { x, y, z };
  };

  const initialText = '🎰 | *السلوت* \n────────\n';
  let { key } = await conn.sendMessage(m.chat, { text: initialText }, { quoted: m });

  const animateSlots = async () => {
    for (let i = 0; i < 5; i++) {
      const { x, y, z } = getRandomEmojis();
      const animationText = `
🎰 | *السلوت* 
────────
${x[0]} : ${y[0]} : ${z[0]}
${x[1]} : ${y[1]} : ${z[1]}
${x[2]} : ${y[2]} : ${z[2]}
────────`;
      await conn.sendMessage(m.chat, { text: animationText, edit: key }, { quoted: m });
      await delay(300);
    }
  };

  await animateSlots();

  const { x, y, z } = getRandomEmojis();
  let end;
  if (x[0] === y[0] && y[0] === z[0]) {
    end = `*ربحت! 🎁 +${apuesta + apuesta} XP*`;
    users.exp += apuesta;
  } else if (x[0] === y[0] || x[0] === z[0] || y[0] === z[0]) {
    end = `*🔮 كدت أن تفوز! حاول مرة أخرى*\n*خذ +10 XP*`;
    users.exp += 10;
  } else {
    end = `*❌ خسرت -${apuesta} XP*`;
    users.exp -= apuesta;
  }

  users.lastslot = Date.now();
  const finalResult = `
🎰 | *السلوت* 
────────
${x[0]} : ${y[0]} : ${z[0]}
${x[1]} : ${y[1]} : ${z[1]}
${x[2]} : ${y[2]} : ${z[2]}
────────
🎰 | ${end}`;
  await conn.sendMessage(m.chat, { text: finalResult, edit: key }, { quoted: m });
};

handler.help = ['رهان <مراهنة>'];
handler.tags = ['game'];
handler.group = true;
handler.register = true;
handler.command = ['رهان'];
export default handler;

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return minutes + ' دقيقة ' + seconds + ' ثانية ';
}