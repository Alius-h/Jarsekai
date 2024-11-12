import axios from "axios";
import cheerio from "cheerio";

let handler = async (m, { conn, usedPrefix, args, command, text }) =>{
  if (!text) throw `تحتاج إلى وضع رابط لأي فيديو، منشور، أو صورة من تيك توك`
try {
m.reply("انتظر قليلاً...")
let { media, status, isSlide, title } = await tiktok(text);
if (status !== 200) throw 'حدث خطأ';
let no = 1
if (isSlide) {
for (let res of media) {
conn.sendFile(m.chat, res, '', `صورة - ${no++}`, m)
await conn.delay(500)
}
} else {
conn.sendFile(m.chat, media.no_wm, '', `\`${text.title}: ${title}\``, m)
}

} catch (e) {
throw e
}
}

handler.help = ['تيكتوك','تيك']
handler.tags = ['تنزيل']
handler.command = /^(تيك|تيكتوك|تيك-توك)$/i

export default handler

async function tiktok(urls) {

    const url = 'https://tiktokio.com/api/v1/tk-htmx';
  const { data: pref } = await axios.get('https://tiktokio.com/id/');
const $$ = cheerio.load(pref);
const prefixx = $$('input[name="prefix"]').attr('value');

    const data = new URLSearchParams({
        prefix: prefixx,
        vid: urls
    });
    const config = {
        headers: {
            'HX-Request': 'true',
            'HX-Trigger': 'search-btn',
            'HX-Target': 'tiktok-parse-result',
            'HX-Current-URL': 'https://tiktokio.com/id/',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    try {

        let {
            data: res
        } = await axios.post(url, data, config);
        let $ = cheerio.load(res);
        const urls = [];
        let media;

        const links = {
            creator: 'tio',
            status: 200,
            isSlide: false,
            title: $('h2').text(),
            media: media
        };

        $('.download-item img').each((index, element) => {
            const url = $(element).attr('src');
            urls.push(url);
            links.isSlide = true;
        });

        if (urls.length === 0) {
            media = {};
            $('div.tk-down-link').each(function(index, element) {
                const linkType = $(this).find('a').text().trim();
                const url = $(this).find('a').attr('href');

                if (linkType === 'تنزيل بعلامة مائية') {
                    media['watermark'] = url;
                } else if (linkType === 'تنزيل صوت mp3') {
                    media['mp3'] = url;
                } else if (linkType === 'تنزيل بدون علامة مائية') {
                    media['no_wm'] = url;
                } else if (linkType === 'تنزيل بدون علامة مائية (جودة عالية)') {
                    media.hd = url;
                }
            });
        } else {
            media = urls;
        }

        links.media = media;

        return links
    } catch (e) {
        return {
            status: 404,
            msg: e
        }
    }
}