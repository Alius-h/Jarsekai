let handler = async (m, { conn, participants, groupMetadata, args }) => {
  const pp =
    (await conn.profilePictureUrl(m.chat, 'image').catch(_ => null)) || './Assets/fire.jpg'
  const groupAdmins = participants.filter(p => p.admin)
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n▢ ')
  const owner =
    groupMetadata.owner ||
    groupAdmins.find(p => p.admin === 'superadmin')?.id ||
    m.chat.split`-`[0] + '@s.whatsapp.net'

  let text = `
≡ *مديرو المجموعة* _${groupMetadata.subject}_

┌─⊷ *المديرون*
▢ ${listAdmin}
└───────────
`.trim()
  conn.sendFile(m.chat, pp, 'staff.png', text, m, false, {
    mentions: [...groupAdmins.map(v => v.id), owner],
  })
}
handler.help = ['ادمن']
handler.tags = ['group']
handler.command = ['ادمن', 'admins']
handler.group = true
export default handler