const {
  zokou
} = require(__dirname + "/../framework/zokou");
const {
  format
} = require(__dirname + "/../framework/mesfonctions");
const os = require('os');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
zokou({
  'nomCom': "menu1",
  'categorie': "Menu"
}, async (_0x160fc2, _0x219205, _0xe5791b) => {
  let {
    ms: _0xb19de,
    repondre: _0x41afad,
    prefixe: _0x14d418,
    nomAuteurMessage: _0x11cbde,
    mybotpic: _0xd7082a
  } = _0xe5791b;
  let {
    cm: _0x256458
  } = require(__dirname + "/../framework/zokou");
  let _0x199ed8 = {};
  let _0x15c89f = "public";
  if (s.MODE.toLowerCase() !== "yes") {
    _0x15c89f = "private";
  }
  _0x256458.map(_0x3a2d5b => {
    if (!_0x199ed8[_0x3a2d5b.categorie]) {
      _0x199ed8[_0x3a2d5b.categorie] = [];
    }
    _0x199ed8[_0x3a2d5b.categorie].push(_0x3a2d5b.nomCom);
  });
  moment.tz.setDefault("Africa/Dar Es Salam");
  const _0x4c271f = moment().hour();
  let _0x57980c = "🇹🇿Good morning";
  if (_0x4c271f >= 12 && _0x4c271f < 18) {
    _0x57980c = "🇹🇿Good Afternoon";
  } else {
    if (_0x4c271f >= 18) {
      _0x57980c = "🇹🇿Good everything";
    } else if (_0x4c271f >= 22 || _0x4c271f < 5) {
      _0x57980c = "🇹🇿Good night";
    }
  }
  ;
  moment.tz.setDefault("Etc/GMT");
  const _0x483331 = moment().format("DD/MM/YYYY");
  let _0x2b004d = "\n *Hello👏:* *" + _0x57980c + "*\n\n╭┈┈┈┈┈┈┈┈┈┈┈┈⊷\n┊▸ *ʙᴏᴛ ᴏᴡɴᴇʀ : ʀᴀʜᴍᴀɴɪ-xᴍᴅ*\n┊▸ *ᴘʀᴇғɪx :* [ " + s.PREFIXE + " ]\n┊▸ *ᴍᴏᴅᴇ :* " + _0x15c89f + "\n┊▸ *ᴅᴀᴛᴇ :* " + _0x483331 + "\n┊▸ *ᴘʟᴀᴛғᴏʀᴍ :* " + os.platform() + "\n┊▸ *ᴄᴏᴍᴍᴀɴᴅꜱ :* " + _0x256458.length + "\n┊▸ *ʀᴀᴍ :* " + format(os.totalmem() - os.freemem()) + '/' + format(os.totalmem()) + "\n╰┈┈┈┈┈┈┈┈┈┈┈⊷\n\n";
  let _0x3eb70a = "*𝐀𝐕𝐀𝐈𝐋𝐀𝐁𝐋𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒*";
  for (const _0x1a3082 in _0x199ed8) {
    _0x3eb70a += "\n*「 " + _0x1a3082 + " 」*\n╭┈┈┈┈┈┈┈┈┈┈┈⊷ ";
    for (const _0x410fe3 of _0x199ed8[_0x1a3082]) {
      _0x3eb70a += " \n┊▸ " + _0x410fe3;
    }
    _0x3eb70a += "\n╰┈┈┈┈┈┈┈┈┈┈┈⊷";
  }
  _0x3eb70a += "\n> Made By RAHMANI-XMD\n";
  try {
    await _0x219205.sendMessage(_0x160fc2, {
      'text': _0x2b004d + _0x3eb70a,
      'contextInfo': {
        'externalAdReply': {
          'title': "RAHMANI XMD",
          'body': "king Rahmani Xmd",
          'thumbnailUrl': "https://files.catbox.moe/aktbgo.jpg",
          'sourceUrl': "https://whatsapp.com/channel/0029VatokI45EjxufALmY32X",
          'mediaType': 0x1,
          'renderLargerThumbnail': true
        }
      }
    });
    await _0x219205.sendMessage(_0x160fc2, {
      'audio': {
        'url': "https://files.catbox.moe/4jedgr.mp3"
      },
      'mimetype': "audio/mp4",
      'ptt': true,
      'caption': "RAHMANI-XMD SONG",
      'contextInfo': {
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363353854480831@newsletter",
          'newsletterName': "RAHMANI XMD",
          'serverMessageId': -1
        },
        'forwardingScore': 0x3e7,
        'externalAdReply': {
          'body': "RAHMANI XMD",
          'thumbnailUrl': "https://files.catbox.moe/aktbgo.jpg",
          'sourceUrl': "https://whatsapp.com/channel/0029VatokI45EjxufALmY32X",
          'rendersmallThumbnail': false
        }
      }
    });
  } catch (_0x4819a5) {
    console.log("Error fetching data:", error);
    _0x41afad("❌ Error fetching repository data. Please try again later.");
  }
});
