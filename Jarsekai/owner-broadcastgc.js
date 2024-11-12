let handler = async (m, { conn, isROwner, text }) => {
  const delay = time => new Promise(res => setTimeout(res, time))
  let getGroups = await conn.groupFetchAllParticipating()
  let groups = Object.entries(getGroups)
    .slice(0)
    .map(entry => entry[1])
  let anu = groups.map(v => v.id)
  var pesan = m.quoted && m.quoted.text ? m.quoted.text : text
  if (!pesan) throw '*✳️ أدخل الرسالة التي تريد نشرها*'
  for (let i of anu) {
    await delay(500)
    conn
      .relayMessage(
        i,
        {
          liveLocationMessage: {
            degreesLatitude: 35.685506276233525,
            degreesLongitude: 139.75270667105852,
            accuracyInMeters: 0,
            degreesClockwiseFromMagneticNorth: 2,
            caption: '[تنبيه]\n\n' + pesan + '\n\nهذه رسالة رسمية',
            sequenceNumber: 2,
            timeOffset: 3,
            contextInfo: m,
          },
        },
        {}
      )
      .catch(_ => _)
  }
  m.reply(
    `*✅ تم إرسال الرسالة إلى ${anu.length} مجموعة/مجموعات*\n\n*ملاحظة: قد لا يتم إرسال الرسالة إلى جميع المجموعات بسبب بعض المشاكل التقنية، نعتذر عن ذلك*`
  )
}
handler.help = ['نشر'].map(v => v + ' <text>')
handler.tags = ['owner']
handler.command = /^(نشر)$/i
handler.owner = true

export default handler