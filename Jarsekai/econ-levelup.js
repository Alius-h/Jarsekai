import { canLevelUp, xpRange } from '../lib/levelling.js';

let handler = async (m, { conn }) => {
  let name = conn.getName(m.sender);
  let pp = await conn
    .profilePictureUrl(m.sender, 'image')
    .catch(_ => 'https://api.shannmoderz.xyz/server/file/XyjKP6IA0VnyFZF.jpg');
  let user = global.db.data.users[m.sender];
  let background = 'https://api.shannmoderz.xyz/server/file/XyjKP6IA0VnyFZF.jpg'; // Fixed background URL

  if (!user) {
    return m.reply("User data not found. Please register first.");
  }

  global.multiplier = global.multiplier || 1;

  let initialLevel = user.level;

  while (canLevelUp(user.level, user.exp, global.multiplier)) {
    user.level += 1;

    // تحديث الدور بناءً على المستوى الجديد
    const newRole = global.rpg.role(user.level);
    if (newRole) user.role = newRole.name;
  }

  if (user.level > initialLevel) {
    let str = `
┌─⊷ *LEVEL UP*
▢ Previous level : *${initialLevel}*
▢ Current level : *${user.level}*
▢ Role : *${user.role}*
└──────────────

Congratulations, ${name}! You've advanced multiple levels to reach level ${user.level} and now hold the role of "${user.role}"! 🎉 Keep going to see what’s next! 🌟
`.trim();

    try {
      let img = `https://api.shannmoderz.xyz/server/file/XyjKP6IA0VnyFZF.jpg?avatar=${encodeURIComponent(pp)}`;
      await conn.sendFile(m.chat, img, 'levelup.jpg', str, m);
    } catch (e) {
      m.reply(str);
    }
  } else {
    let { min, xp, max } = xpRange(user.level, global.multiplier);
    let txt = `
┌───⊷ *LEVEL*
▢ Number : *${name}*
▢ Level : *${user.level}*
▢ XP : *${user.exp - min}/${xp}*
▢ Role : *${user.role}*
└──────────────

Hey there, ${name}! You're not ready to level up just yet. You need *${max - user.exp}* more XP to level up! 🚀
`.trim();

    try {
      let imgg = `https://api.shannmoderz.xyz/server/file/XyjKP6IA0VnyFZF.jpg?name=${encodeURIComponent(name)}&currxp=${user.exp - min}&needxp=${xp}&level=${user.level}&rank=${encodeURIComponent(user.role)}&avatar=${encodeURIComponent(pp)}&background=${encodeURIComponent(background)}`;
      await conn.sendFile(m.chat, imgg, 'level.jpg', txt, m);
    } catch (e) {
      m.reply(txt);
    }
  }
}

handler.help = ['levelup'];
handler.tags = ['economy'];
handler.command = ['lvl', 'levelup', 'level'];

export default handler;