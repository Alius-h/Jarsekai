import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!args[0]) {
    throw `✳️ من فضلك أدخل اسم مستخدم إنستغرام\n\n📌مثال: ${usedPrefix + command} asli_guru69`;
  }
  
  try {
    let response = await fetch(`https://www.guruapi.tech/api/igstalk?username=${args[0]}`);
    
    if (!response.ok) {
      throw new Error('فشل في جلب البيانات من API');
    }

    let res = await response.json();

    let te = `
┌──「 *استعلام عن الحساب* 」
▢ *🔖الاسم:* ${res.name} 
▢ *🔖اسم المستخدم:* ${res.username}
▢ *👥المتابعون:* ${res.followers}
▢ *🫂المتابعة:* ${res.following}
▢ *📌السيرة الذاتية:* ${res.biography}
▢ *🏝️المنشورات:* ${res.posts}
▢ *🔗 الرابط:* https://instagram.com/${res.username.replace(/^@/, '')}
└────────────`;

    await conn.sendFile(m.chat, res.profile_picture, 'profile_picture.png', te, m);

  } catch (error) {
    console.error(error);
    throw '⚠️ حدث خطأ أثناء جلب بيانات حساب إنستغرام. يرجى المحاولة لاحقًا.';
  }
};

handler.help = ['استعلام', 'حساب-انستغرام'];
handler.tags = ['downloader'];
handler.command = ['استعلام', 'حساب-انستغرام'];

export default handler;