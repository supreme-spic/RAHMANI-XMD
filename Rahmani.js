'use strict';

var __createBinding = this && this.__createBinding || (Object.create ? function (_0x3351a5, _0x3e8df1, _0x578307, _0x37a14) {
  if (_0x37a14 === undefined) {
    _0x37a14 = _0x578307;
  }
  var _0x3bedbc = Object.getOwnPropertyDescriptor(_0x3e8df1, _0x578307);
  if (!_0x3bedbc || ("get" in _0x3bedbc ? !_0x3e8df1.__esModule : _0x3bedbc.writable || _0x3bedbc.configurable)) {
    _0x3bedbc = {
      'enumerable': true,
      'get': function () {
        return _0x3e8df1[_0x578307];
      }
    };
  }
  Object.defineProperty(_0x3351a5, _0x37a14, _0x3bedbc);
} : function (_0x15bf6c, _0x589440, _0x5bd6fa, _0x15185a) {
  if (_0x15185a === undefined) {
    _0x15185a = _0x5bd6fa;
  }
  _0x15bf6c[_0x15185a] = _0x589440[_0x5bd6fa];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x9fcdee, _0x6e03fe) {
  Object.defineProperty(_0x9fcdee, "default", {
    'enumerable': true,
    'value': _0x6e03fe
  });
} : function (_0x2f999d, _0x503d93) {
  _0x2f999d["default"] = _0x503d93;
});
var __importStar = this && this.__importStar || function (_0xea5bab) {
  if (_0xea5bab && _0xea5bab.__esModule) {
    return _0xea5bab;
  }
  var _0x249655 = {};
  if (_0xea5bab != null) {
    for (var _0x1ff307 in _0xea5bab) if (_0x1ff307 !== "default" && Object.prototype.hasOwnProperty.call(_0xea5bab, _0x1ff307)) {
      __createBinding(_0x249655, _0xea5bab, _0x1ff307);
    }
  }
  __setModuleDefault(_0x249655, _0xea5bab);
  return _0x249655;
};
var __importDefault = this && this.__importDefault || function (_0x844a5e) {
  return _0x844a5e && _0x844a5e.__esModule ? _0x844a5e : {
    'default': _0x844a5e
  };
};
Object.defineProperty(exports, '__esModule', {
  'value': true
});
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require('@whiskeysockets/baileys/lib/Utils/logger'));
const logger = logger_1["default"].child({});
logger.level = 'silent';
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
let fs = require('fs-extra');
let path = require('path');
const FileType = require("file-type");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  verifierEtatJid,
  recupererActionJid
} = require("./bdd/antilien");
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./bdd/antibot");
let evt = require(__dirname + '/framework/zokou');
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./bdd/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("./bdd/banGroup");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("./bdd/onlyAdmin");
let {
  reagir
} = require(__dirname + "/framework/app");
var session = conf.session.replace(/Zokou-MD-WHATSAPP-BOT;;;=>/g, '');
const prefixe = conf.PREFIXE;
const express = require("express");
const app = express();
const PORT = process.env.PORT || 0xbb8;
app.use(express["static"](path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
});
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + "/scan/creds.json")) {
      console.log("connexion en cour ...");
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/scan/creds.json") && session != "zokk") {
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    }
  } catch (_0x1a7014) {
    console.log("Session Invalid " + _0x1a7014);
    return;
  }
}
authentification();
0x0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': "silent",
    'stream': "store"
  })
});
setTimeout(() => {
  async function _0x103be2() {
    0x0;
    const {
      version: _0x36bbf7,
      isLatest: _0x43e106
    } = await baileys_1.fetchLatestBaileysVersion();
    0x0;
    const {
      state: _0x5074ec,
      saveCreds: _0x49e45b
    } = await baileys_1.useMultiFileAuthState(__dirname + "/scan");
    0x0;
    const _0x2046f3 = {
      'version': _0x36bbf7,
      'logger': pino({
        'level': "silent"
      }),
      'browser': ["Bmw-Md", 'safari', "1.0.0"],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x5074ec.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x5074ec.keys, logger)
      },
      'getMessage': async _0x2ad97d => {
        if (store) {
          const _0x231561 = await store.loadMessage(_0x2ad97d.remoteJid, _0x2ad97d.id, undefined);
          return _0x231561.message || undefined;
        }
        return {
          'conversation': "An Error Occurred, Repeat Command!"
        };
      }
    };
    0x0;
    const _0x2707a9 = baileys_1["default"](_0x2046f3);
    store.bind(_0x2707a9.ev);
    const _0xfea5de = new Map();
    function _0x455d47(_0x4b5209) {
      const _0x2f2958 = Date.now();
      if (!_0xfea5de.has(_0x4b5209)) {
        _0xfea5de.set(_0x4b5209, _0x2f2958);
        return false;
      }
      const _0x3cb01a = _0xfea5de.get(_0x4b5209);
      if (_0x2f2958 - _0x3cb01a < 0xbb8) {
        return true;
      }
      _0xfea5de.set(_0x4b5209, _0x2f2958);
      return false;
    }
    const _0x33727f = new Map();
    async function _0x1f5f20(_0x49ebea, _0x5279d1) {
      if (_0x33727f.has(_0x5279d1)) {
        return _0x33727f.get(_0x5279d1);
      }
      try {
        const _0x5db7a8 = await _0x49ebea.groupMetadata(_0x5279d1);
        _0x33727f.set(_0x5279d1, _0x5db7a8);
        setTimeout(() => _0x33727f['delete'](_0x5279d1), 0xea60);
        return _0x5db7a8;
      } catch (_0x18a8d1) {
        if (_0x18a8d1.message.includes("rate-overlimit")) {
          await new Promise(_0x1493a4 => setTimeout(_0x1493a4, 0x1388));
        }
        return null;
      }
    }
    process.on("uncaughtException", _0x46d1f1 => {});
    process.on("unhandledRejection", _0x2ee871 => {});
    _0x2707a9.ev.on("messages.upsert", async _0x30ca93 => {
      const {
        messages: _0x33adb1
      } = _0x30ca93;
      if (!_0x33adb1 || _0x33adb1.length === 0x0) {
        return;
      }
      for (const _0x4225cf of _0x33adb1) {
        if (!_0x4225cf.message) {
          continue;
        }
        const _0x5d3be6 = _0x4225cf.key.remoteJid;
        if (_0x455d47(_0x5d3be6)) {
          continue;
        }
      }
    });
    _0x2707a9.ev.on("groups.update", async _0x1e22e9 => {
      for (const _0xbb7d2d of _0x1e22e9) {
        const {
          id: _0x48ea82
        } = _0xbb7d2d;
        if (!_0x48ea82.endsWith('@g.us')) {
          continue;
        }
        await _0x1f5f20(_0x2707a9, _0x48ea82);
      }
    });
    _0x2707a9.ev.on("messages.upsert", async _0x194ca7 => {
      if (conf.ANTIDELETE1 === "yes") {
        const {
          messages: _0x11928f
        } = _0x194ca7;
        const _0x3d6d75 = _0x11928f[0x0];
        if (!_0x3d6d75.message) {
          return;
        }
        const _0x1e7937 = _0x3d6d75.key;
        const _0x1e1778 = _0x1e7937.remoteJid;
        if (!store.chats[_0x1e1778]) {
          store.chats[_0x1e1778] = [];
        }
        store.chats[_0x1e1778].push(_0x3d6d75);
        if (_0x3d6d75.message.protocolMessage && _0x3d6d75.message.protocolMessage.type === 0x0) {
          const _0x1efc1b = _0x3d6d75.message.protocolMessage.key;
          const _0x5ab494 = store.chats[_0x1e1778];
          const _0x3e6102 = _0x5ab494.find(_0x32dc4f => _0x32dc4f.key.id === _0x1efc1b.id);
          if (_0x3e6102) {
            try {
              const _0x1e3f19 = _0x3e6102.key.participant || _0x3e6102.key.remoteJid;
              const _0x52ecc5 = "*💫 This message was deleted by @" + _0x1e3f19.split('@')[0x0] + '*';
              const _0x42ec05 = conf.NUMERO_OWNER + "@s.whatsapp.net";
              if (_0x3e6102.message.conversation) {
                await _0x2707a9.sendMessage(_0x42ec05, {
                  'text': _0x52ecc5 + "\nDeleted message: " + _0x3e6102.message.conversation,
                  'mentions': [_0x1e3f19]
                });
              } else {
                if (_0x3e6102.message.imageMessage) {
                  const _0x21911b = _0x3e6102.message.imageMessage.caption || '';
                  const _0x4e197c = await _0x2707a9.downloadAndSaveMediaMessage(_0x3e6102.message.imageMessage);
                  await _0x2707a9.sendMessage(_0x42ec05, {
                    'image': {
                      'url': _0x4e197c
                    },
                    'caption': _0x52ecc5 + "\n" + _0x21911b,
                    'mentions': [_0x1e3f19]
                  });
                } else {
                  if (_0x3e6102.message.videoMessage) {
                    const _0x5a6048 = _0x3e6102.message.videoMessage.caption || '';
                    const _0x55994c = await _0x2707a9.downloadAndSaveMediaMessage(_0x3e6102.message.videoMessage);
                    await _0x2707a9.sendMessage(_0x42ec05, {
                      'video': {
                        'url': _0x55994c
                      },
                      'caption': _0x52ecc5 + "\n" + _0x5a6048,
                      'mentions': [_0x1e3f19]
                    });
                  } else {
                    if (_0x3e6102.message.audioMessage) {
                      const _0x1a304e = await _0x2707a9.downloadAndSaveMediaMessage(_0x3e6102.message.audioMessage);
                      await _0x2707a9.sendMessage(_0x42ec05, {
                        'audio': {
                          'url': _0x1a304e
                        },
                        'ptt': true,
                        'caption': _0x52ecc5,
                        'mentions': [_0x1e3f19]
                      });
                    } else {
                      if (_0x3e6102.message.stickerMessage) {
                        const _0x269b65 = await _0x2707a9.downloadAndSaveMediaMessage(_0x3e6102.message.stickerMessage);
                        await _0x2707a9.sendMessage(_0x42ec05, {
                          'sticker': {
                            'url': _0x269b65
                          },
                          'caption': _0x52ecc5,
                          'mentions': [_0x1e3f19]
                        });
                      }
                    }
                  }
                }
              }
            } catch (_0x387bee) {
              console.error("Error handling deleted message:", _0x387bee);
            }
          }
        }
      }
    });
    const _0x481c96 = _0x838c5 => new Promise(_0x3536ad => setTimeout(_0x3536ad, _0x838c5));
    let _0x339ebe = 0x0;
    if (conf.AUTO_REACT_STATUS === "yes") {
      console.log("AUTO_REACT_STATUS is enabled. Listening for status updates...");
      _0x2707a9.ev.on("messages.upsert", async _0x5176b7 => {
        const {
          messages: _0x3593eb
        } = _0x5176b7;
        for (const _0x443db0 of _0x3593eb) {
          if (_0x443db0.key && _0x443db0.key.remoteJid === "status@broadcast") {
            console.log("Detected status update from:", _0x443db0.key.remoteJid);
            const _0x1f4f2a = Date.now();
            if (_0x1f4f2a - _0x339ebe < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x30ee49 = _0x2707a9.user && _0x2707a9.user.id ? _0x2707a9.user.id.split(':')[0x0] + "@s.whatsapp.net" : null;
            if (!_0x30ee49) {
              console.log("Bot's user ID not available. Skipping reaction.");
              continue;
            }
            await _0x2707a9.sendMessage(_0x443db0.key.remoteJid, {
              'react': {
                'key': _0x443db0.key,
                'text': '💫'
              }
            }, {
              'statusJidList': [_0x443db0.key.participant, _0x30ee49]
            });
            _0x339ebe = Date.now();
            console.log("Successfully reacted to status update by " + _0x443db0.key.remoteJid);
            await _0x481c96(0x7d0);
          }
        }
      });
    }
    const _0x4f3814 = {
      'hello': ['👋', '🙂', '😊', '🙋‍♂️', "🙋‍♀️"],
      'hi': ['👋', '🙂', '😁', "🙋‍♂️", '🙋‍♀️'],
      "good morning": ['🌅', '🌞', '☀️', '🌻', '🌼'],
      "good night": ['🌙', '🌜', '⭐', '🌛', '💫'],
      'bye': ['👋', '😢', "👋🏻", '🥲', "🚶‍♂️", "🚶‍♀️"],
      "see you": ['👋', '😊', "👋🏻", '✌️', "🚶‍♂️"],
      'bro': ["🤜🤛", '👊', '💥', '🥊', '👑'],
      'sister': ['👭', "💁‍♀️", '🌸', '💖', "🙋‍♀️"],
      'buddy': ['🤗', '👯‍♂️', "👯‍♀️", "🤜🤛", '🤝'],
      'niaje': ['👋', '😄', '💥', '🔥', '🕺', '💃'],
      'ibrahim': ['😎', '💯', '🔥', '🚀', '👑'],
      'adams': ['🔥', '💥', '👑', '💯', '😎'],
      'thanks': ['🙏', '😊', '💖', '❤️', '💐'],
      "thank you": ['🙏', '😊', '🙌', '💖', '💝'],
      'love': ['❤️', '💖', '💘', '😍', '😘', '💍', '💑'],
      "miss you": ['😢', '💔', '😔', '😭', '💖'],
      'sorry': ['😔', '🙏', '😓', '💔', '🥺'],
      'apologies': ['😔', '💔', '🙏', '😞', "🙇‍♂️", "🙇‍♀️"],
      'congratulations': ['🎉', '🎊', '🏆', '🎁', '👏'],
      "well done": ['👏', '💪', '🎉', "🎖️", '👍'],
      "good job": ['👏', '💯', '👍', '🌟', '🎉'],
      'happy': ['😁', '😊', '🎉', '🎊', '💃', '🕺'],
      'sad': ['😢', '😭', '😞', '💔', '😓'],
      'angry': ['😡', '🤬', '😤', '💢', '😾'],
      'excited': ['🤩', '🎉', '😆', '🤗', '🥳'],
      'surprised': ['😲', '😳', '😯', '😮', '😲'],
      'help': ['🆘', '❓', '🙏', '💡', "👨‍💻", '👩‍💻'],
      'how': ['❓', '🤔', '😕', '😳', '🧐'],
      'what': ['❓', '🤷‍♂️', "🤷‍♀️", '😕', '😲'],
      'where': ['❓', '🌍', "🗺️", "🏙️", '🌎'],
      'party': ['🎉', '🥳', '🍾', '🍻', '🎤', '💃', '🕺'],
      'fun': ['🤣', '😂', '🥳', '🎉', '🎮', '🎲'],
      'hangout': ['🍕', '🍔', '🍻', '🎮', '🍿', '😆'],
      'good': ['👍', '👌', '😊', '💯', '🌟'],
      'awesome': ['🔥', '🚀', '🤩', '👏', '💥'],
      'cool': ['😎', '👌', '🎮', '🎸', '💥'],
      'boring': ['😴', '🥱', '🙄', '😑', '🤐'],
      'tired': ['😴', '🥱', '😌', '💤', '🛌'],
      'bot': ['🤖', '💻', '⚙️', '🧠', '🔧'],
      'robot': ['🤖', '⚙️', '💻', '🔋', '🤓'],
      "cool bot": ['🤖', '😎', '🤘', '💥', '🎮'],
      "love you": ['❤️', '💖', '😘', '💋', '💑'],
      "thank you bot": ['🙏', '🤖', '😊', '💖', '💐'],
      "good night bot": ['🌙', '🌛', '⭐', '💤', '😴'],
      'laughter': ['😂', '🤣', '😆', '😄', '🤪'],
      'crying': ['😢', '😭', '😿', '😓', '💔'],
      'john': ['👑', '🔥', '💥', '😎', '💯'],
      'mike': ['💪', '🏆', '🔥', '💥', '🚀'],
      'lisa': ['💖', '👑', '🌸', '😍', '🌺'],
      'emily': ['💖', '💃', '👑', '🎉', '🎀'],
      'happy': ['😁', '😄', '😊', '🙌', '🎉', '🥳', '💃', '🕺', '🔥'],
      'excited': ['🤩', '🎉', '🥳', '🎊', '😆', '🤗', '💥', '🚀'],
      'love': ['❤️', '💖', '💘', '💝', '😍', '😘', '💍', '💑', '🌹'],
      'grateful': ['🙏', '💐', '🥰', '❤️', '😊'],
      'thankful': ['🙏', '💖', '💐', '🤗', '😇'],
      'sad': ['😢', '😭', '😞', '💔', '😔', '😓', '😖'],
      'angry': ['😡', '😠', '🤬', '💢', '👊', '💥', '⚡'],
      'frustrated': ['😤', '😩', '🤯', '😑', '🌀'],
      'bored': ['😴', '🥱', '🙄', '😑', '😒'],
      'surprised': ['😲', '😳', '😮', '😯', '😲', '🙀'],
      'shocked': ['😱', '😳', '😯', '💥', '🤯'],
      'wow': ['😲', '😱', '🤩', '🤯', '💥', '🚀'],
      'crying': ['😭', '😢', '💔', '😞', '😓'],
      "miss you": ['😭', '💔', '😔', '😢', '❤️'],
      'lonely': ['😔', '😭', '😢', '💔', '🙁'],
      'help': ['🆘', '❓', '🤔', "🙋‍♂️", "🙋‍♀️", '💡'],
      "need assistance": ['🆘', "💁‍♂️", "💁‍♀️", '❓', '🙏'],
      'sorry': ['😔', '🙏', '💔', '😓', '🥺', "🙇‍♂️", "🙇‍♀️"],
      'apology': ['😔', '😞', '🙏', '💔', "🙇‍♂️", "🙇‍♀️"],
      "good job": ['👏', '💯', '🎉', '🌟', '👍', '👏'],
      "well done": ['👏', '🎉', "🎖️", '💪', '🔥', '🏆'],
      "you can do it": ['💪', '🔥', '💯', '🚀', '🌟'],
      'congratulations': ['🎉', '🏆', '🎊', '🎁', '👏', '🍾'],
      'cheers': ['🥂', '🍻', '🍾', '🍷', '🥳', '🎉'],
      'goodbye': ['👋', '😢', '💔', "👋🏻", "🚶‍♂️", "🚶‍♀️"],
      'bye': ['👋', "👋🏻", '🥲', "🚶‍♂️", "🚶‍♀️"],
      "see you": ['👋', "👋🏻", '🤗', '✌️', "🙋‍♂️", "🙋‍♀️"],
      'hello': ['👋', '🙂', '😊', '🙋‍♂️', "🙋‍♀️"],
      'hi': ['👋', '🙂', '😁', '🙋‍♂️', "🙋‍♀️"],
      'party': ['🎉', '🥳', '🎤', '💃', '🕺', '🍻', '🎶'],
      'fun': ['🎮', '🎲', '🤣', '🎉', '🃏'],
      'play': ['🎮', '🏀', '⚽', '🎾', '🎱', '🎲', '🏆'],
      'work': ['💻', "🖥️", '💼', '📅', '📝'],
      'school': ['📚', '🏫', '🎒', '👨‍🏫', "👩‍🏫"],
      'study': ['📖', '📝', '💡', '📚', '🎓'],
      'summer': ['🌞', "🏖️", '🌴', '🍉', '🌻'],
      'winter': ['❄️', '☃️', '🎿', '🔥', '⛄'],
      'autumn': ['🍁', '🍂', '🎃', '🍂', '🍁'],
      'spring': ['🌸', '🌼', '🌷', '🌱', '🌺'],
      'birthday': ['🎂', '🎉', '🎁', '🎈', '🎊'],
      'anniversary': ['💍', '🎉', '🎁', '🎈', '💑'],
      'robot': ['🤖', '⚙️', '🔧', '🤖', '🧠'],
      'bot': ['🤖', '🧠', '⚙️', '💻', '🖥️'],
      'thanks': ['🙏', '💖', '😊', '❤️', '💐'],
      "good luck": ['🍀', '🍀', '💯', '🍀', '🎯'],
      'john': ['👑', '🔥', '💥', '😎', '💯'],
      'mike': ['💪', '🏆', '🔥', '💥', '🚀'],
      'lisa': ['💖', '👑', '🌸', '😍', '🌺'],
      'emily': ['💖', '💃', '👑', '🎉', '🎀'],
      'food': ['🍕', '🍔', '🍟', '🍲', '🍣', '🍩'],
      'drink': ['🍺', '🍷', '🥂', '🍾', '🥤'],
      'coffee': ['☕', '🥤', '🍵', '🥶'],
      'tea': ['🍵', '🫖', '🍂', '🍃'],
      'excited': ['🤩', '🎉', '🥳', '💥', '🚀', '😆', '😜'],
      'nervous': ['😬', '😰', '🤞', '🧠', '👐'],
      'confused': ['🤔', '😕', '🧐', '😵', '🤷‍♂️', "🤷‍♀️"],
      'embarrassed': ['😳', '😳', '🙈', '😳', '😬', '😅'],
      'hopeful': ['🤞', '🌠', '🙏', '🌈', '💫'],
      'shy': ['😊', '😳', '🙈', '🫣', '🫶'],
      'family': ["👨‍👩‍👧‍👦", '👩‍👧', "👩‍👧‍👦", "👨‍👩‍👧", '💏', '👨‍👨‍👧‍👦', "👩‍👩‍👧‍👦"],
      'friends': ["👯‍♂️", "👯‍♀️", '🤗', '🫶', '💫', '🤝'],
      'relationship': ['💑', '❤️', '💍', '🥰', '💏', '💌'],
      'couple': ['👩‍❤️‍👨', '👨‍❤️‍👨', "👩‍❤️‍👩", '💍', '💑', '💏'],
      "best friend": ['🤗', '💖', "👯‍♀️", "👯‍♂️", '🙌'],
      "love you": ['❤️', '😘', '💖', '💘', '💓', '💗'],
      'vacation': ["🏖️", '🌴', '✈️', '🌊', "🛳️", "🏞️", "🏕️"],
      'beach': ['🏖️', '🌊', "🏄‍♀️", '🩴', "🏖️", '🌴', '🦀'],
      "road trip": ['🚗', '🚙', "🛣️", '🌄', '🌟'],
      'mountain': ["🏞️", '⛰️', '🏔️', '🌄', "🏕️", '🌲'],
      'city': ["🏙️", '🌆', '🗽', '🌇', '🚖', '🏙️'],
      'exploration': ['🌍', '🧭', '🌎', '🌍', '🧳', '📍', '⛵'],
      'morning': ['🌅', '☀️', '🌞', '🌄', '🌻', "🕶️"],
      'afternoon': ['🌞', "🌤️", '⛅', '🌻', '🌇'],
      'night': ['🌙', '🌛', '🌜', '⭐', '🌚', '💫'],
      'evening': ['🌙', '🌛', '🌇', '🌓', '💫'],
      'goodnight': ['🌙', '😴', '💤', '🌜', '🛌', '🌛', '✨'],
      'productivity': ['💻', '📊', '📝', '💼', '📅', '📈'],
      'office': ["🖥️", '💼', "🗂️", '📅', "🖋️"],
      'workout': ['🏋️‍♀️', '💪', "🏃‍♂️", "🏃‍♀️", '🤸‍♀️', '🚴‍♀️', "🏋️‍♂️"],
      "study hard": ['📚', '📝', '📖', '💡', '💼'],
      'focus': ['🔍', '🎯', '💻', '🧠', '🤓'],
      'food': ['🍕', '🍔', '🍟', '🍖', '🍖', '🥗', '🍣', '🍲'],
      'drink': ['🍹', '🥤', '🍷', '🍾', '🍸', '🍺', '🥂', '☕'],
      'coffee': ['☕', '🧃', '🍵', '🥤', '🍫'],
      'cake': ['🍰', '🎂', '🍩', '🍪', '🍫', '🧁'],
      "ice cream": ['🍦', '🍧', '🍨', '🍪'],
      'cat': ['🐱', '😺', '🐈', '🐾'],
      'dog': ['🐶', '🐕', '🐩', "🐕‍🦺", '🐾'],
      'bird': ['🐦', '🦉', '🦅', '🐦'],
      'fish': ['🐟', '🐠', '🐡', '🐡', '🐙'],
      'rabbit': ['🐰', '🐇', '🐹', '🐾'],
      'lion': ['🦁', '🐯', '🐅', '🐆'],
      'bear': ['🐻', '🐨', '🐼', "🐻‍❄️"],
      'elephant': ['🐘', '🐘'],
      'sun': ['☀️', '🌞', '🌄', '🌅', '🌞'],
      'rain': ["🌧️", '☔', '🌈', '🌦️', "🌧️"],
      'snow': ['❄️', '⛄', '🌨️', "🌬️", '❄️'],
      'wind': ['💨', "🌬️", "🌪️", '🌬️'],
      'earth': ['🌍', '🌏', '🌎', '🌍', '🌱', '🌳'],
      'phone': ['📱', '☎️', '📞', '📲', '📡'],
      'computer': ['💻', '🖥️', '⌨️', '🖱️', "🖥️"],
      'internet': ['🌐', '💻', '📶', '📡', '🔌'],
      'software': ['💻', "🖥️", '🧑‍💻', "🖱️", '💡'],
      'star': ['⭐', '🌟', '✨', '🌠', '💫'],
      'light': ['💡', '🔦', '✨', '🌟', '🔆'],
      'money': ['💵', '💰', '💸', '💳', '💶'],
      'victory': ['✌️', '🏆', '🎉', "🎖️", '🎊'],
      'gift': ['🎁', '🎀', '🎉', '🎁'],
      'fire': ['🔥', '💥', '🌋', '🔥', '💣'],
      'music': ['🎵', '🎶', '🎧', '🎤', '🎸', '🎹'],
      'sports': ['⚽', '🏀', '🏈', '🎾', "🏋️‍♂️", '🏃‍♀️', '🏆', '🥇'],
      'games': ['🎮', "🕹️", '🎲', '🎯', '🧩'],
      'art': ['🎨', "🖌️", "🖼️", '🎭', "🖍️"],
      'photography': ['📷', '📸', '📸', "🖼️", '🎥'],
      'reading': ['📚', '📖', '📚', '📰'],
      'craft': ['🧵', '🪡', '✂️', '🪢', '🧶'],
      'hello': ['👋', '🙂', '😊'],
      'hey': ['👋', '🙂', '😊'],
      'hi': ['👋', '🙂', '😊'],
      'bye': ['👋', '😢', '👋'],
      'goodbye': ['👋', '😢', "🙋‍♂️"],
      'thanks': ['🙏', '😊', '🌹'],
      "thank you": ['🙏', '😊', '🌸'],
      'welcome': ['😊', '😄', '🌷'],
      'congrats': ['🎉', '👏', '🥳'],
      'congratulations': ['🎉', '👏', '🥳'],
      "good job": ['👏', '👍', '🙌'],
      'great': ['👍', '💪', '😄'],
      'cool': ['😎', '🤙', '🔥'],
      'ok': ['👌', '👍', '✅'],
      'love': ['❤️', '💕', '💖'],
      'like': ['👍', '❤️', '👌'],
      'happy': ['😊', '😁', '🙂'],
      'joy': ['😁', '😆', '😂'],
      'laugh': ['😂', '🤣', '😁'],
      'sad': ['😢', '😭', '☹️'],
      'cry': ['😭', '😢', '😿'],
      'angry': ['😡', '😠', '💢'],
      'mad': ['😠', '😡', '😤'],
      'shocked': ['😲', '😱', '😮'],
      'scared': ['😱', '😨', '😧'],
      'sleep': ['😴', '💤', '😌'],
      'bored': ['😐', '😑', '🙄'],
      'excited': ['🤩', '🥳', '🎉'],
      'party': ['🥳', '🎉', '🍾'],
      'kiss': ['😘', '💋', '😍'],
      'hug': ['🤗', '❤️', '💕'],
      'peace': ['✌️', "🕊️", '✌️'],
      'pizza': ['🍕', '🥖', '🍟'],
      'coffee': ['☕', '🥤', '🍵'],
      'water': ['💧', '💦', '🌊'],
      'wine': ['🍷', '🍸', '🍾'],
      'hello': ['👋', '🙂', '😊', '😃', '😄'],
      'hey': ['👋', '😊', '🙋', '😄', '😁'],
      'hi': ['👋', '😀', '😁', '😃', '🙂'],
      'bye': ['👋', '😢', "🙋‍♂️", '😞', '😔'],
      'goodbye': ['👋', '😢', "🙋‍♀️", '😔', '😭'],
      'thanks': ['🙏', '😊', '🌹', '🤲', '🤗'],
      "thank you": ['🙏', '💐', '🤲', '🥰', '😌'],
      'welcome': ['😊', '😄', '🌸', '🙂', '💖'],
      'congrats': ['🎉', '👏', '🥳', '💐', '🎊'],
      'congratulations': ['🎉', '👏', '🥳', '🎊', '🍾'],
      "good job": ['👏', '👍', '🙌', '💪', '🤩'],
      'great': ['👍', '💪', '😄', '🔥', '✨'],
      'cool': ['😎', '🤙', '🔥', '👌', '🆒'],
      'ok': ['👌', '👍', '✅', '😌', '🤞'],
      'love': ['❤️', '💕', '💖', '💗', '😍'],
      'like': ['👍', '❤️', '👌', '😌', '💓'],
      'happy': ['😊', '😁', '🙂', '😃', '😄'],
      'joy': ['😁', '😆', '😂', '😊', '🤗'],
      'laugh': ['😂', '🤣', '😁', '😹', '😄'],
      'sad': ['😢', '😭', '☹️', '😞', '😔'],
      'cry': ['😭', '😢', '😿', '💧', '😩'],
      'angry': ['😡', '😠', '💢', '😤', '🤬'],
      'mad': ['😠', '😡', '😤', '💢', '😒'],
      'shocked': ['😲', '😱', '😮', '😯', '😧'],
      'scared': ['😱', '😨', '😧', '😰', '😳'],
      'sleep': ['😴', '💤', '😌', '😪', '🛌'],
      'bored': ['😐', '😑', '🙄', '😒', '🤦'],
      'excited': ['🤩', '🥳', '🎉', '😄', '✨'],
      'party': ['🥳', '🎉', '🎊', '🍾', '🎈'],
      'kiss': ['😘', '💋', '😍', '💖', '💏'],
      'hug': ['🤗', '❤️', '💕', '💞', '😊'],
      'peace': ['✌️', "🕊️", '🤞', '💫', '☮️'],
      'pizza': ['🍕', '🥖', '🍟', '🍔', '🍝'],
      'burger': ['🍔', '🍟', '🥓', '🥪', '🌭'],
      'fries': ['🍟', '🍔', '🥤', '🍿', '🧂'],
      'coffee': ['☕', '🥤', '🍵', '🫖', '🥄'],
      'tea': ['🍵', '☕', '🫖', '🥄', '🍪'],
      'cake': ['🍰', '🎂', '🧁', '🍩', '🍫'],
      'donut': ['🍩', '🍪', '🍰', '🧁', '🍫'],
      "ice cream": ['🍦', '🍨', '🍧', '🍧', '🍫'],
      'cookie': ['🍪', '🍩', '🍰', '🧁', '🍫'],
      'chocolate': ['🍫', '🍬', '🍰', '🍦', '🍭'],
      'popcorn': ['🍿', '🥤', '🍫', '🎬', '🍩'],
      'soda': ['🥤', '🍾', '🍹', '🍷', '🍸'],
      'water': ['💧', '💦', '🌊', '🚰', '🥤'],
      'wine': ['🍷', '🍾', '🥂', '🍹', '🍸'],
      'beer': ['🍺', '🍻', '🥂', '🍹', '🍾'],
      'cheers': ['🥂', '🍻', '🍾', '🎉', '🎊'],
      'sun': ['🌞', '☀️', '🌅', '🌄', '🌻'],
      'moon': ['🌜', '🌙', '🌚', '🌝', '🌛'],
      'star': ['🌟', '⭐', '✨', '💫', '🌠'],
      'cloud': ['☁️', "🌥️", "🌤️", '⛅', '🌧️'],
      'rain': ["🌧️", '☔', '💧', '💦', '🌂'],
      'thunder': ['⚡', '⛈️', '🌩️', "🌪️", '⚠️'],
      'fire': ['🔥', '⚡', '🌋', '🔥', '💥'],
      'flower': ['🌸', '🌺', '🌷', '💐', '🌹'],
      'tree': ['🌳', '🌲', '🌴', '🎄', '🌱'],
      'leaves': ['🍃', '🍂', '🍁', '🌿', '🌾'],
      'snow': ['❄️', '⛄', "🌨️", '🌬️', '☃️'],
      'wind': ['💨', "🌬️", '🍃', '⛅', "🌪️"],
      'rainbow': ['🌈', "🌤️", '☀️', '✨', '💧'],
      'ocean': ['🌊', '💦', '🚤', '⛵', "🏄‍♂️"],
      'dog': ['🐶', '🐕', '🐾', '🐩', '🦮'],
      'cat': ['🐱', '😺', '😸', '🐾', '🦁'],
      'lion': ['🦁', '🐯', '🐱', '🐾', '🐅'],
      'tiger': ['🐯', '🐅', '🦁', '🐆', '🐾'],
      'bear': ['🐻', '🐨', '🐼', '🧸', '🐾'],
      'rabbit': ['🐰', '🐇', '🐾', '🐹', '🐭'],
      'panda': ['🐼', '🐻', '🐾', '🐨', '🍃'],
      'monkey': ['🐒', '🐵', '🙊', '🙉', '🙈'],
      'fox': ['🦊', '🐺', '🐾', '🐶', '🦮'],
      'bird': ['🐦', '🐧', '🦅', '🦢', '🦜'],
      'fish': ['🐟', '🐠', '🐡', '🐬', '🐳'],
      'whale': ['🐋', '🐳', '🌊', '🐟', '🐠'],
      'dolphin': ['🐬', '🐟', '🐠', '🐳', '🌊'],
      'unicorn': ['🦄', '✨', '🌈', '🌸', '💫'],
      'bee': ['🐝', '🍯', '🌻', '💐', '🐞'],
      'butterfly': ['🦋', '🌸', '💐', '🌷', '🌼'],
      'phoenix': ['🦅', '🔥', '✨', '🌄', '🔥'],
      'wolf': ['🐺', '🌕', '🐾', '🌲', '🌌'],
      'mouse': ['🐭', '🐁', '🧀', '🐾', '🐀'],
      'cow': ['🐮', '🐄', '🐂', '🌾', '🍀'],
      'pig': ['🐷', '🐽', '🐖', '🐾', '🐗'],
      'horse': ['🐴', '🏇', '🐎', '🌄', "🏞️"],
      'sheep': ['🐑', '🐏', '🌾', '🐾', '🐐'],
      'soccer': ['⚽', '🥅', "🏟️", '🎉', '👏'],
      'basketball': ['🏀', "⛹️‍♂️", '🏆', '🎉', '🥇'],
      'tennis': ['🎾', '🏸', '🥇', '🏅', '💪'],
      'baseball': ['⚾', '🏟️', '🏆', '🎉', '👏'],
      'football': ['🏈', '🎉', "🏟️", '🏆', '🥅'],
      'golf': ['⛳', '🏌️‍♂️', "🏌️‍♀️", '🎉', '🏆'],
      'bowling': ['🎳', '🏅', '🎉', '🏆', '👏'],
      'running': ['🏃‍♂️', "🏃‍♀️", '👟', '🏅', '🔥'],
      'swimming': ["🏊‍♂️", '🏊‍♀️', '🌊', '🏆', '👏'],
      'cycling': ["🚴‍♂️", "🚴‍♀️", '🏅', '🔥', "🏞️"],
      'yoga': ['🧘', '🌸', '💪', '✨', '😌'],
      'dancing': ['💃', '🕺', '🎶', '🥳', '🎉'],
      'singing': ['🎤', '🎶', '🎙️', '🎉', '🎵'],
      'guitar': ['🎸', '🎶', '🎼', '🎵', '🎉'],
      'piano': ['🎹', '🎶', '🎼', '🎵', '🎉'],
      'money': ['💸', '💰', '💵', '💳', '🤑'],
      'fire': ['🔥', '💥', '⚡', '🎇', '✨'],
      'rocket': ['🚀', '🌌', '🛸', '🛰️', '✨'],
      'bomb': ['💣', '🔥', '⚡', '😱', '💥'],
      'computer': ['💻', "🖥️", '📱', '⌨️', "🖱️"],
      'phone': ['📱', '📲', '☎️', '📞', '📳'],
      'camera': ['📷', '📸', '🎥', '📹', "🎞️"],
      'book': ['📚', '📖', '✏️', '📘', '📕'],
      'light': ['💡', '✨', '🔦', '🌟', '🌞'],
      'music': ['🎶', '🎵', '🎼', '🎸', '🎧'],
      'star': ['🌟', '⭐', '✨', '🌠', '💫'],
      'gift': ['🎁', '💝', '🎉', '🎊', '🎈'],
      'car': ['🚗', '🚘', '🚙', '🚕', "🛣️"],
      'train': ['🚆', '🚄', '🚅', '🚞', '🚂'],
      'plane': ['✈️', '🛫', '🛬', "🛩️", '🚁'],
      'boat': ['⛵', "🛥️", '🚤', '🚢', '🌊'],
      'city': ["🏙️", '🌆', '🌇', '🏢', '🌃'],
      'beach': ['🏖️', '🌴', '🌊', '☀️', "🏄‍♂️"],
      'mountain': ['🏔️', '⛰️', '🗻', '🌄', '🌞'],
      'forest': ['🌲', '🌳', '🍃', "🏞️", '🐾'],
      'desert': ["🏜️", '🌵', '🐪', '🌞', '🏖️'],
      'hotel': ['🏨', '🏩', "🛏️", '🛎️', '🏢'],
      'restaurant': ["🍽️", '🍴', '🥂', '🍷', '🍾'],
      'brave': ["🦸‍♂️", "🦸‍♀️", '💪', '🔥', '👊'],
      'shy': ['😳', '☺️', '🙈', '😊', '😌'],
      'surprised': ['😲', '😮', '😧', '😯', '🤯'],
      'bored': ['😐', '😑', '😶', '🙄', '😒'],
      'sleepy': ['😴', '💤', '😪', '😌', '🛌'],
      'determined': ['💪', '🔥', '😤', '👊', '🏆'],
      'birthday': ['🎂', '🎉', '🎈', '🎊', '🍰'],
      'christmas': ['🎄', '🎅', '🤶', '🎁', '⛄'],
      "new year": ['🎉', '🎊', '🎇', '🍾', '✨'],
      'easter': ['🐰', '🐣', '🌷', '🥚', '🌸'],
      'halloween': ['🎃', '👻', "🕸️", "🕷️", '👹'],
      'valentine': ['💘', '❤️', '💌', '💕', '🌹'],
      'wedding': ['💍', '👰', '🤵', '🎩', '💒']
    };
    const _0x5670bf = ['😎', '🔥', '💥', '💯', '✨', '🌟', '🌈', '⚡', '💎', '🌀', '👑', '🎉', '🎊', '🦄', '👽', '🛸', '🚀', '🦋', '💫', '🍀', '🎶', '🎧', '🎸', '🎤', '🏆', '🏅', '🌍', '🌎', '🌏', '🎮', '🎲', '💪', "🏋️", '🥇', '👟', '🏃', '🚴', '🚶', '🏄', '⛷️', "🕶️", '🧳', '🍿', '🍿', '🥂', '🍻', '🍷', '🍸', '🥃', '🍾', '🎯', '⏳', '🎁', '🎈', '🎨', '🌻', '🌸', '🌺', '🌹', '🌼', '🌞', '🌝', '🌜', '🌙', '🌚', '🍀', '🌱', '🍃', '🍂', '🌾', '🐉', '🐍', '🦓', '🦄', '🦋', '🦧', '🦘', '🦨', '🦡', '🐉', '🐅', '🐆', '🐓', '🐢', '🐊', '🐠', '🐟', '🐡', '🦑', '🐙', '🦀', '🐬', '🦕', '🦖', '🐾', '🐕', '🐈', '🐇', '🐾', '🐁', '🐀', "🐿️"];
    const _0x1f1ac6 = _0x83428a => {
      const _0x3972da = _0x83428a.split(/\s+/);
      for (const _0x55a61e of _0x3972da) {
        const _0xf5bedd = _0x248b57(_0x55a61e.toLowerCase());
        if (_0xf5bedd) {
          return _0xf5bedd;
        }
      }
      return _0x5670bf[Math.floor(Math.random() * _0x5670bf.length)];
    };
    const _0x248b57 = _0x3b33fa => {
      const _0x187c3d = _0x4f3814[_0x3b33fa.toLowerCase()];
      if (_0x187c3d && _0x187c3d.length > 0x0) {
        return _0x187c3d[Math.floor(Math.random() * _0x187c3d.length)];
      }
      return null;
    };
    if (conf.AUTO_REACT === 'yes') {
      console.log("AUTO_REACT is enabled. Listening for regular messages...");
      _0x2707a9.ev.on("messages.upsert", async _0x313a68 => {
        const {
          messages: _0x47d924
        } = _0x313a68;
        for (const _0x222aa5 of _0x47d924) {
          if (_0x222aa5.key && _0x222aa5.key.remoteJid) {
            const _0x3b2492 = Date.now();
            if (_0x3b2492 - _0x339ebe < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x3c6761 = _0x222aa5?.['message']?.["conversation"] || '';
            const _0x153387 = _0x1f1ac6(_0x3c6761) || _0x5670bf[Math.floor(Math.random() * _0x5670bf.length)];
            if (_0x153387) {
              await _0x2707a9.sendMessage(_0x222aa5.key.remoteJid, {
                'react': {
                  'text': _0x153387,
                  'key': _0x222aa5.key
                }
              }).then(() => {
                _0x339ebe = Date.now();
                console.log("Successfully reacted with '" + _0x153387 + "' to message by " + _0x222aa5.key.remoteJid);
              })["catch"](_0x2c9800 => {
                console.error("Failed to send reaction:", _0x2c9800);
              });
            }
            await _0x481c96(0x7d0);
          }
        }
      });
    }
    _0x2707a9.ev.on("messages.upsert", async _0x185853 => {
      const {
        messages: _0x58b419
      } = _0x185853;
      const _0x51bc04 = _0x58b419[0x0];
      if (!_0x51bc04.message) {
        return;
      }
      const _0x57f247 = _0x51bc04.message.conversation || _0x51bc04.message.extendedTextMessage?.['text'] || '';
      const _0xecad98 = _0x51bc04.key.remoteJid;
      if (_0x57f247.slice(0x1).toLowerCase() === 'vcf') {
        if (!_0xecad98.endsWith('@g.us')) {
          await _0x2707a9.sendMessage(_0xecad98, {
            'text': "❌ This command only works in groups.\n\n🚀 Rahmani_Md"
          });
          return;
        }
        await createAndSendGroupVCard(_0xecad98, "Rahmani Md family", _0x2707a9);
      }
    });
    _0x2707a9.ev.on("call", async _0x49205e => {
      if (conf.ANTICALL === 'yes') {
        const _0x126c43 = _0x49205e[0x0].id;
        const _0x509fd1 = _0x49205e[0x0].from;
        await _0x2707a9.rejectCall(_0x126c43, _0x509fd1);
        setTimeout(async () => {
          await _0x2707a9.sendMessage(_0x509fd1, {
            'text': "🚫 *Call Rejected❗* .  \n⚠️ My owner is unavailable at the moment.😊"
          });
        }, 0x3e8);
      }
    });
    _0x2707a9.ev.on("messages.upsert", async _0x12cf22 => {
      const {
        messages: _0x160d46
      } = _0x12cf22;
      const _0x5498c3 = _0x160d46[0x0];
      if (!_0x5498c3.message) {
        return;
      }
      const _0x28c31b = _0x340dcb => {
        if (!_0x340dcb) {
          return _0x340dcb;
        }
        if (/:\d+@/gi.test(_0x340dcb)) {
          0x0;
          let _0x195ffa = baileys_1.jidDecode(_0x340dcb) || {};
          return _0x195ffa.user && _0x195ffa.server && _0x195ffa.user + '@' + _0x195ffa.server || _0x340dcb;
        } else {
          return _0x340dcb;
        }
      };
      0x0;
      var _0x46944f = baileys_1.getContentType(_0x5498c3.message);
      var _0x5adf6f = _0x46944f == 'conversation' ? _0x5498c3.message.conversation : _0x46944f == "imageMessage" ? _0x5498c3.message.imageMessage?.["caption"] : _0x46944f == "videoMessage" ? _0x5498c3.message.videoMessage?.["caption"] : _0x46944f == "extendedTextMessage" ? _0x5498c3.message?.["extendedTextMessage"]?.["text"] : _0x46944f == "buttonsResponseMessage" ? _0x5498c3?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] : _0x46944f == "listResponseMessage" ? _0x5498c3.message?.['listResponseMessage']?.["singleSelectReply"]?.["selectedRowId"] : _0x46944f == "messageContextInfo" ? _0x5498c3?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] || _0x5498c3.message?.['listResponseMessage']?.["singleSelectReply"]?.["selectedRowId"] || _0x5498c3.text : '';
      var _0x40ccff = _0x5498c3.key.remoteJid;
      var _0x20a8e1 = _0x28c31b(_0x2707a9.user.id);
      var _0x13661a = _0x20a8e1.split('@')[0x0];
      const _0x4746e4 = _0x40ccff?.["endsWith"]("@g.us");
      var _0x402f04 = _0x4746e4 ? await _0x2707a9.groupMetadata(_0x40ccff) : '';
      var _0x54454a = _0x4746e4 ? _0x402f04.subject : '';
      var _0x55427a = _0x5498c3.message.extendedTextMessage?.['contextInfo']?.["quotedMessage"];
      var _0x184881 = _0x28c31b(_0x5498c3.message?.["extendedTextMessage"]?.["contextInfo"]?.["participant"]);
      var _0x109da2 = _0x4746e4 ? _0x5498c3.key.participant ? _0x5498c3.key.participant : _0x5498c3.participant : _0x40ccff;
      if (_0x5498c3.key.fromMe) {
        _0x109da2 = _0x20a8e1;
      }
      var _0x55072e = _0x4746e4 ? _0x5498c3.key.participant : '';
      const {
        getAllSudoNumbers: _0x276992
      } = require("./bdd/sudo");
      const _0x10e24f = _0x5498c3.pushName;
      const _0x394b4e = await _0x276992();
      const _0x2608af = [_0x13661a, "255693629079", '255693629079', "255693629079", '255693629079', conf.NUMERO_OWNER].map(_0x43239f => _0x43239f.replace(/[^0-9]/g) + "@s.whatsapp.net");
      const _0x40671c = _0x2608af.concat(_0x394b4e);
      const _0x103fa5 = _0x40671c.includes(_0x109da2);
      var _0x486309 = ["255693629079", '255693629079', "255693629079", '255693629079'].map(_0x535bd5 => _0x535bd5.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x109da2);
      function _0x429cb9(_0x2db698) {
        _0x2707a9.sendMessage(_0x40ccff, {
          'text': _0x2db698
        }, {
          'quoted': _0x5498c3
        });
      }
      console.log("\t💫RAHMANI-XMD ACTIVE💫");
      console.log("=========== written message===========");
      if (_0x4746e4) {
        console.log("message provenant du groupe : " + _0x54454a);
      }
      console.log("message envoyé par : [" + _0x10e24f + " : " + _0x109da2.split("@s.whatsapp.net")[0x0] + " ]");
      console.log("type de message : " + _0x46944f);
      console.log("------ contenu du message ------");
      console.log(_0x5adf6f);
      function _0x32e790(_0x1b0180) {
        let _0x470de7 = [];
        for (_0x12cf22 of _0x1b0180) {
          if (_0x12cf22.admin == null) {
            continue;
          }
          _0x470de7.push(_0x12cf22.id);
        }
        return _0x470de7;
      }
      var _0x1f8f11 = conf.ETAT;
      if (_0x1f8f11 == 0x1) {
        await _0x2707a9.sendPresenceUpdate("available", _0x40ccff);
      } else {
        if (_0x1f8f11 == 0x2) {
          await _0x2707a9.sendPresenceUpdate('composing', _0x40ccff);
        } else if (_0x1f8f11 == 0x3) {
          await _0x2707a9.sendPresenceUpdate("recording", _0x40ccff);
        } else {
          await _0x2707a9.sendPresenceUpdate("unavailable", _0x40ccff);
        }
      }
      const _0x452032 = _0x4746e4 ? await _0x402f04.participants : '';
      let _0x12f813 = _0x4746e4 ? _0x32e790(_0x452032) : '';
      const _0x2f44f8 = _0x4746e4 ? _0x12f813.includes(_0x109da2) : false;
      var _0x28f543 = _0x4746e4 ? _0x12f813.includes(_0x20a8e1) : false;
      const _0x1b3275 = _0x5adf6f ? _0x5adf6f.trim().split(/ +/).slice(0x1) : null;
      const _0x35ab1f = _0x5adf6f ? _0x5adf6f.startsWith(prefixe) : false;
      const _0x390418 = _0x35ab1f ? _0x5adf6f.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x39d9eb = conf.URL.split(',');
      function _0x43beb4() {
        const _0xe701cf = Math.floor(Math.random() * _0x39d9eb.length);
        const _0x5babe1 = _0x39d9eb[_0xe701cf];
        return _0x5babe1;
      }
      var _0x3f1019 = {
        'superUser': _0x103fa5,
        'dev': _0x486309,
        'verifGroupe': _0x4746e4,
        'mbre': _0x452032,
        'membreGroupe': _0x55072e,
        'verifAdmin': _0x2f44f8,
        'infosGroupe': _0x402f04,
        'nomGroupe': _0x54454a,
        'auteurMessage': _0x109da2,
        'nomAuteurMessage': _0x10e24f,
        'idBot': _0x20a8e1,
        'verifZokouAdmin': _0x28f543,
        'prefixe': prefixe,
        'arg': _0x1b3275,
        'repondre': _0x429cb9,
        'mtype': _0x46944f,
        'groupeAdmin': _0x32e790,
        'msgRepondu': _0x55427a,
        'auteurMsgRepondu': _0x184881,
        'ms': _0x5498c3,
        'mybotpic': _0x43beb4
      };
      if (conf.AUTO_READ === "yes") {
        _0x2707a9.ev.on('messages.upsert', async _0x15ad8f => {
          const {
            messages: _0xc9fdde
          } = _0x15ad8f;
          for (const _0x2f8558 of _0xc9fdde) {
            if (!_0x2f8558.key.fromMe) {
              await _0x2707a9.readMessages([_0x2f8558.key]);
            }
          }
        });
      }
      if (_0x5498c3.key && _0x5498c3.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === 'yes') {
        await _0x2707a9.readMessages([_0x5498c3.key]);
      }
      if (_0x5498c3.key && _0x5498c3.key.remoteJid === 'status@broadcast' && conf.AUTO_DOWNLOAD_STATUS === "yes") {
        if (_0x5498c3.message.extendedTextMessage) {
          var _0x5573e9 = _0x5498c3.message.extendedTextMessage.text;
          await _0x2707a9.sendMessage(_0x20a8e1, {
            'text': _0x5573e9
          }, {
            'quoted': _0x5498c3
          });
        } else {
          if (_0x5498c3.message.imageMessage) {
            var _0x1168e1 = _0x5498c3.message.imageMessage.caption;
            var _0x254a6f = await _0x2707a9.downloadAndSaveMediaMessage(_0x5498c3.message.imageMessage);
            await _0x2707a9.sendMessage(_0x20a8e1, {
              'image': {
                'url': _0x254a6f
              },
              'caption': _0x1168e1
            }, {
              'quoted': _0x5498c3
            });
          } else {
            if (_0x5498c3.message.videoMessage) {
              var _0x1168e1 = _0x5498c3.message.videoMessage.caption;
              var _0x540f90 = await _0x2707a9.downloadAndSaveMediaMessage(_0x5498c3.message.videoMessage);
              await _0x2707a9.sendMessage(_0x20a8e1, {
                'video': {
                  'url': _0x540f90
                },
                'caption': _0x1168e1
              }, {
                'quoted': _0x5498c3
              });
            }
          }
        }
      }
      if (!_0x486309 && _0x40ccff == '120363158701337904@g.us') {
        return;
      }
      if (_0x5adf6f && _0x109da2.endsWith("s.whatsapp.net")) {
        const {
          ajouterOuMettreAJourUserData: _0x17c9cb
        } = require('./bdd/level');
        try {
          await _0x17c9cb(_0x109da2);
        } catch (_0x4f37e6) {
          console.error(_0x4f37e6);
        }
      }
      try {
        if (_0x5498c3.message[_0x46944f].contextInfo.mentionedJid && (_0x5498c3.message[_0x46944f].contextInfo.mentionedJid.includes(_0x20a8e1) || _0x5498c3.message[_0x46944f].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + "@s.whatsapp.net"))) {
          if (_0x40ccff == '120363158701337904@g.us') {
            return;
          }
          ;
          if (_0x103fa5) {
            console.log("hummm");
            return;
          }
          let _0x442cb1 = require("./bdd/mention");
          let _0x39c616 = await _0x442cb1.recupererToutesLesValeurs();
          let _0x3d3989 = _0x39c616[0x0];
          if (_0x3d3989.status === "non") {
            console.log("mention pas actifs");
            return;
          }
          let _0xb6524b;
          if (_0x3d3989.type.toLocaleLowerCase() === "image") {
            _0xb6524b = {
              'image': {
                'url': _0x3d3989.url
              },
              'caption': _0x3d3989.message
            };
          } else {
            if (_0x3d3989.type.toLocaleLowerCase() === "video") {
              _0xb6524b = {
                'video': {
                  'url': _0x3d3989.url
                },
                'caption': _0x3d3989.message
              };
            } else {
              if (_0x3d3989.type.toLocaleLowerCase() === "sticker") {
                let _0x1afbc1 = new Sticker(_0x3d3989.url, {
                  'pack': conf.NOM_OWNER,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': '12345',
                  'quality': 0x46,
                  'background': "transparent"
                });
                const _0x381bab = await _0x1afbc1.toBuffer();
                _0xb6524b = {
                  'sticker': _0x381bab
                };
              } else if (_0x3d3989.type.toLocaleLowerCase() === "audio") {
                _0xb6524b = {
                  'audio': {
                    'url': _0x3d3989.url
                  },
                  'mimetype': "audio/mp4"
                };
              }
            }
          }
          _0x2707a9.sendMessage(_0x40ccff, _0xb6524b, {
            'quoted': _0x5498c3
          });
        }
      } catch (_0x345d6f) {}
      try {
        const _0x4dc0d2 = await verifierEtatJid(_0x40ccff);
        if (_0x5adf6f.includes("https://") && _0x4746e4 && _0x4dc0d2) {
          console.log("lien detecté");
          var _0x3b318b = _0x4746e4 ? _0x12f813.includes(_0x20a8e1) : false;
          if (_0x103fa5 || _0x2f44f8 || !_0x3b318b) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x16c995 = {
            'remoteJid': _0x40ccff,
            'fromMe': false,
            'id': _0x5498c3.key.id,
            'participant': _0x109da2
          };
          var _0x38a211 = "lien detected, \n";
          var _0xa586c = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "Zoou-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0xa586c.toFile("st1.webp");
          var _0x1a73ae = await recupererActionJid(_0x40ccff);
          if (_0x1a73ae === "remove") {
            _0x38a211 += "message deleted \n @" + _0x109da2.split('@')[0x0] + " removed from group.";
            await _0x2707a9.sendMessage(_0x40ccff, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x2707a9.sendMessage(_0x40ccff, {
              'text': _0x38a211,
              'mentions': [_0x109da2]
            }, {
              'quoted': _0x5498c3
            });
            try {
              await _0x2707a9.groupParticipantsUpdate(_0x40ccff, [_0x109da2], "remove");
            } catch (_0x293fd8) {
              console.log("antiien ") + _0x293fd8;
            }
            await _0x2707a9.sendMessage(_0x40ccff, {
              'delete': _0x16c995
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x1a73ae === 'delete') {
              _0x38a211 += "message deleted \n @" + _0x109da2.split('@')[0x0] + " avoid sending link.";
              await _0x2707a9.sendMessage(_0x40ccff, {
                'text': _0x38a211,
                'mentions': [_0x109da2]
              }, {
                'quoted': _0x5498c3
              });
              await _0x2707a9.sendMessage(_0x40ccff, {
                'delete': _0x16c995
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x1a73ae === 'warn') {
                const {
                  getWarnCountByJID: _0x52b53c,
                  ajouterUtilisateurAvecWarnCount: _0x53054d
                } = require("./bdd/warn");
                let _0x28cc93 = await _0x52b53c(_0x109da2);
                let _0x49a55a = conf.WARN_COUNT;
                if (_0x28cc93 >= _0x49a55a) {
                  var _0x3e28c1 = "link detected , you will be remove because of reaching warn-limit";
                  await _0x2707a9.sendMessage(_0x40ccff, {
                    'text': _0x3e28c1,
                    'mentions': [_0x109da2]
                  }, {
                    'quoted': _0x5498c3
                  });
                  await _0x2707a9.groupParticipantsUpdate(_0x40ccff, [_0x109da2], "remove");
                  await _0x2707a9.sendMessage(_0x40ccff, {
                    'delete': _0x16c995
                  });
                } else {
                  var _0x2073ee = _0x49a55a - _0x28cc93;
                  var _0x56a065 = "Link detected , your warn_count was upgrade ;\n rest : " + _0x2073ee + " ";
                  await _0x53054d(_0x109da2);
                  await _0x2707a9.sendMessage(_0x40ccff, {
                    'text': _0x56a065,
                    'mentions': [_0x109da2]
                  }, {
                    'quoted': _0x5498c3
                  });
                  await _0x2707a9.sendMessage(_0x40ccff, {
                    'delete': _0x16c995
                  });
                }
              }
            }
          }
        }
      } catch (_0x379eb1) {
        console.log("bdd err " + _0x379eb1);
      }
      try {
        const _0x3d12f2 = _0x5498c3.key?.['id']?.['startsWith']("BAES") && _0x5498c3.key?.['id']?.["length"] === 0x10;
        const _0x465a15 = _0x5498c3.key?.['id']?.['startsWith']("BAE5") && _0x5498c3.key?.['id']?.["length"] === 0x10;
        if (_0x3d12f2 || _0x465a15) {
          if (_0x46944f === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0x53dab6 = await atbverifierEtatJid(_0x40ccff);
          if (!_0x53dab6) {
            return;
          }
          ;
          if (_0x2f44f8 || _0x109da2 === _0x20a8e1) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x4e539e = {
            'remoteJid': _0x40ccff,
            'fromMe': false,
            'id': _0x5498c3.key.id,
            'participant': _0x109da2
          };
          var _0x38a211 = "bot detected, \n";
          var _0xa586c = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "Zoou-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0xa586c.toFile("st1.webp");
          var _0x1a73ae = await atbrecupererActionJid(_0x40ccff);
          if (_0x1a73ae === "remove") {
            _0x38a211 += "message deleted \n @" + _0x109da2.split('@')[0x0] + " removed from group.";
            await _0x2707a9.sendMessage(_0x40ccff, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x2707a9.sendMessage(_0x40ccff, {
              'text': _0x38a211,
              'mentions': [_0x109da2]
            }, {
              'quoted': _0x5498c3
            });
            try {
              await _0x2707a9.groupParticipantsUpdate(_0x40ccff, [_0x109da2], "remove");
            } catch (_0x2e2385) {
              console.log("antibot ") + _0x2e2385;
            }
            await _0x2707a9.sendMessage(_0x40ccff, {
              'delete': _0x4e539e
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x1a73ae === 'delete') {
              _0x38a211 += "message delete \n @" + _0x109da2.split('@')[0x0] + " Avoid sending link.";
              await _0x2707a9.sendMessage(_0x40ccff, {
                'text': _0x38a211,
                'mentions': [_0x109da2]
              }, {
                'quoted': _0x5498c3
              });
              await _0x2707a9.sendMessage(_0x40ccff, {
                'delete': _0x4e539e
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x1a73ae === "warn") {
                const {
                  getWarnCountByJID: _0x175d34,
                  ajouterUtilisateurAvecWarnCount: _0x5bc154
                } = require('./bdd/warn');
                let _0x8e9b8e = await _0x175d34(_0x109da2);
                let _0x4c2c0b = conf.WARN_COUNT;
                if (_0x8e9b8e >= _0x4c2c0b) {
                  var _0x3e28c1 = "bot detected ;you will be remove because of reaching warn-limit";
                  await _0x2707a9.sendMessage(_0x40ccff, {
                    'text': _0x3e28c1,
                    'mentions': [_0x109da2]
                  }, {
                    'quoted': _0x5498c3
                  });
                  await _0x2707a9.groupParticipantsUpdate(_0x40ccff, [_0x109da2], "remove");
                  await _0x2707a9.sendMessage(_0x40ccff, {
                    'delete': _0x4e539e
                  });
                } else {
                  var _0x2073ee = _0x4c2c0b - _0x8e9b8e;
                  var _0x56a065 = "bot detected , your warn_count was upgrade ;\n rest : " + _0x2073ee + " ";
                  await _0x5bc154(_0x109da2);
                  await _0x2707a9.sendMessage(_0x40ccff, {
                    'text': _0x56a065,
                    'mentions': [_0x109da2]
                  }, {
                    'quoted': _0x5498c3
                  });
                  await _0x2707a9.sendMessage(_0x40ccff, {
                    'delete': _0x4e539e
                  });
                }
              }
            }
          }
        }
      } catch (_0x27fcd9) {
        console.log(".... " + _0x27fcd9);
      }
      if (_0x35ab1f) {
        const _0x2b7dd6 = evt.cm.find(_0x2cb74d => _0x2cb74d.nomCom === _0x390418);
        if (_0x2b7dd6) {
          try {
            if (conf.MODE.toLocaleLowerCase() != "yes" && !_0x103fa5) {
              return;
            }
            if (!_0x103fa5 && _0x40ccff === _0x109da2 && conf.PM_PERMIT === "yes") {
              _0x429cb9("You don't have acces to commands here");
              return;
            }
            if (!_0x103fa5 && _0x4746e4) {
              let _0x58e5fb = await isGroupBanned(_0x40ccff);
              if (_0x58e5fb) {
                return;
              }
            }
            if (!_0x2f44f8 && _0x4746e4) {
              let _0x3260e9 = await isGroupOnlyAdmin(_0x40ccff);
              if (_0x3260e9) {
                return;
              }
            }
            if (!_0x103fa5) {
              let _0x547c6b = await isUserBanned(_0x109da2);
              if (_0x547c6b) {
                _0x429cb9("You are banned from bot commands");
                return;
              }
            }
            reagir(_0x40ccff, _0x2707a9, _0x5498c3, _0x2b7dd6.reaction);
            _0x2b7dd6.fonction(_0x40ccff, _0x2707a9, _0x3f1019);
          } catch (_0x5f4905) {
            console.log("😡😡 " + _0x5f4905);
            _0x2707a9.sendMessage(_0x40ccff, {
              'text': "😡😡 " + _0x5f4905
            }, {
              'quoted': _0x5498c3
            });
          }
        }
      }
    });
    const {
      recupevents: _0x212b78
    } = require("./bdd/welcome");
    _0x2707a9.ev.on('group-participants.update', async _0x429b29 => {
      console.log(_0x429b29);
      let _0x5e16ff;
      try {
        _0x5e16ff = await _0x2707a9.profilePictureUrl(_0x429b29.id, "image");
      } catch {
        _0x5e16ff = '';
      }
      try {
        const _0xb44f27 = await _0x2707a9.groupMetadata(_0x429b29.id);
        if (_0x429b29.action == 'add' && (await _0x212b78(_0x429b29.id, 'welcome')) == 'on') {
          let _0xf5d440 = "*RAHMANI-XMD WELCOME MESSAGE*";
          let _0x40ba4f = _0x429b29.participants;
          for (let _0x18e763 of _0x40ba4f) {
            _0xf5d440 += " \n❒ *Hey* 🖐️ @" + _0x18e763.split('@')[0x0] + " WELCOME TO OUR GROUP. \n\n";
          }
          _0xf5d440 += "❒ *READ THE GROUP DESCRIPTION TO AVOID GETTING REMOVED BY RAHMANI-XMD.* ";
          _0x2707a9.sendMessage(_0x429b29.id, {
            'image': {
              'url': _0x5e16ff
            },
            'caption': _0xf5d440,
            'mentions': _0x40ba4f
          });
        } else {
          if (_0x429b29.action == "remove" && (await _0x212b78(_0x429b29.id, "goodbye")) == 'on') {
            let _0x1bbc48 = "one or somes member(s) left group;\n";
            let _0x1d9370 = _0x429b29.participants;
            for (let _0x272df2 of _0x1d9370) {
              _0x1bbc48 += '@' + _0x272df2.split('@')[0x0] + "\n";
            }
            _0x2707a9.sendMessage(_0x429b29.id, {
              'text': _0x1bbc48,
              'mentions': _0x1d9370
            });
          } else {
            if (_0x429b29.action == "promote" && (await _0x212b78(_0x429b29.id, "antipromote")) == 'on') {
              if (_0x429b29.author == _0xb44f27.owner || _0x429b29.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x429b29.author == decodeJid(_0x2707a9.user.id) || _0x429b29.author == _0x429b29.participants[0x0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x2707a9.groupParticipantsUpdate(_0x429b29.id, [_0x429b29.author, _0x429b29.participants[0x0]], 'demote');
              _0x2707a9.sendMessage(_0x429b29.id, {
                'text': '@' + _0x429b29.author.split('@')[0x0] + " has violated the anti-promotion rule, therefore both " + _0x429b29.author.split('@')[0x0] + " and @" + _0x429b29.participants[0x0].split('@')[0x0] + " have been removed from administrative rights.",
                'mentions': [_0x429b29.author, _0x429b29.participants[0x0]]
              });
            } else {
              if (_0x429b29.action == 'demote' && (await _0x212b78(_0x429b29.id, "antidemote")) == 'on') {
                if (_0x429b29.author == _0xb44f27.owner || _0x429b29.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || _0x429b29.author == decodeJid(_0x2707a9.user.id) || _0x429b29.author == _0x429b29.participants[0x0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0x2707a9.groupParticipantsUpdate(_0x429b29.id, [_0x429b29.author], "demote");
                await _0x2707a9.groupParticipantsUpdate(_0x429b29.id, [_0x429b29.participants[0x0]], "promote");
                _0x2707a9.sendMessage(_0x429b29.id, {
                  'text': '@' + _0x429b29.author.split('@')[0x0] + " has violated the anti-demotion rule by removing @" + _0x429b29.participants[0x0].split('@')[0x0] + ". Consequently, he has been stripped of administrative rights.",
                  'mentions': [_0x429b29.author, _0x429b29.participants[0x0]]
                });
              }
            }
          }
        }
      } catch (_0x14d7ab) {
        console.error(_0x14d7ab);
      }
    });
    async function _0x439d6e() {
      const _0x45bdb4 = require("node-cron");
      const {
        getCron: _0x580e72
      } = require('./bdd/cron');
      let _0x37414e = await _0x580e72();
      console.log(_0x37414e);
      if (_0x37414e.length > 0x0) {
        for (let _0x1699ac = 0x0; _0x1699ac < _0x37414e.length; _0x1699ac++) {
          if (_0x37414e[_0x1699ac].mute_at != null) {
            let _0x49ad1b = _0x37414e[_0x1699ac].mute_at.split(':');
            console.log("etablissement d'un automute pour " + _0x37414e[_0x1699ac].group_id + " a " + _0x49ad1b[0x0] + " H " + _0x49ad1b[0x1]);
            _0x45bdb4.schedule(_0x49ad1b[0x1] + " " + _0x49ad1b[0x0] + " * * *", async () => {
              await _0x2707a9.groupSettingUpdate(_0x37414e[_0x1699ac].group_id, 'announcement');
              _0x2707a9.sendMessage(_0x37414e[_0x1699ac].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Hello, it's time to close the group; sayonara."
              });
            }, {
              'timezone': "Africa/Nairobi"
            });
          }
          if (_0x37414e[_0x1699ac].unmute_at != null) {
            let _0x23ab8e = _0x37414e[_0x1699ac].unmute_at.split(':');
            console.log("etablissement d'un autounmute pour " + _0x23ab8e[0x0] + " H " + _0x23ab8e[0x1] + " ");
            _0x45bdb4.schedule(_0x23ab8e[0x1] + " " + _0x23ab8e[0x0] + " * * *", async () => {
              await _0x2707a9.groupSettingUpdate(_0x37414e[_0x1699ac].group_id, 'not_announcement');
              _0x2707a9.sendMessage(_0x37414e[_0x1699ac].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Good morning; It's time to open the group."
              });
            }, {
              'timezone': "Africa/Nairobi"
            });
          }
        }
      } else {
        console.log("Les crons n'ont pas été activés");
      }
      return;
    }
    _0x2707a9.ev.on("contacts.upsert", async _0x4cd6f9 => {
      const _0x4dff73 = _0x2945c6 => {
        for (const _0x51fc45 of _0x2945c6) {
          if (store.contacts[_0x51fc45.id]) {
            Object.assign(store.contacts[_0x51fc45.id], _0x51fc45);
          } else {
            store.contacts[_0x51fc45.id] = _0x51fc45;
          }
        }
        return;
      };
      _0x4dff73(_0x4cd6f9);
    });
    _0x2707a9.ev.on("connection.update", async _0x1f8d45 => {
      const {
        lastDisconnect: _0x449c57,
        connection: _0x477bc8
      } = _0x1f8d45;
      if (_0x477bc8 === "connecting") {
        console.log(" Charlies is connecting...");
      } else {
        if (_0x477bc8 === "open") {
          console.log("✅ Rahmani Connected to WhatsApp! ☺️");
          console.log('--');
          0x0;
          await baileys_1.delay(0xc8);
          console.log("------");
          0x0;
          await baileys_1.delay(0x12c);
          console.log('------------------/-----');
          console.log("Rahmani is Online 🕸\n\n");
          console.log("Loading Rahmani Commands ...\n");
          fs.readdirSync(__dirname + "/commandes").forEach(_0x3c0245 => {
            if (path.extname(_0x3c0245).toLowerCase() == '.js') {
              try {
                require(__dirname + "/commandes/" + _0x3c0245);
                console.log(_0x3c0245 + " Installed Successfully✔️");
              } catch (_0x116c18) {
                console.log(_0x3c0245 + " could not be installed due to : " + _0x116c18);
              }
              0x0;
              baileys_1.delay(0x12c);
            }
          });
          0x0;
          baileys_1.delay(0x2bc);
          var _0x59d797;
          if (conf.MODE.toLocaleLowerCase() === "yes") {
            _0x59d797 = "public";
          } else if (conf.MODE.toLocaleLowerCase() === 'no') {
            _0x59d797 = "private";
          } else {
            _0x59d797 = "undefined";
          }
          console.log("Commands Installation Completed ✅");
          await _0x439d6e();
          if (conf.DP.toLowerCase() === "yes") {
            let _0x33c258 = " ⁠⁠⁠⁠\n╭─────────────━┈⊷ \n│🤖 *𝙱𝙾𝚃 𝙸𝚂 𝙲𝙾𝙽𝙽𝙴𝙲𝚃𝙴𝙳*🤖\n╰─────────────━┈⊷\n│💫 ᴘʀᴇғɪx: *[ " + prefixe + " ]*\n│⭕ ᴍᴏᴅᴇ: *" + _0x59d797 + "*\n│💢 *𝙱𝙾𝚃 𝙽𝙰𝙼𝙴* 𝚁𝙰𝙷𝙼𝙰𝙽𝙸-𝚇𝙼𝙳\n╰─────────────━┈⊷\n\n*Follow our Channel For Updates*\n> https://whatsapp.com/channel/0029VatokI45EjxufALmY32X\n                \n                \n                 ";
            await _0x2707a9.sendMessage(_0x2707a9.user.id, {
              'text': _0x33c258
            });
          }
        } else {
          if (_0x477bc8 == "close") {
            let _0x51faa8 = new boom_1.Boom(_0x449c57?.["error"])?.["output"]["statusCode"];
            if (_0x51faa8 === baileys_1.DisconnectReason.badSession) {
              console.log("Session id error, rescan again...");
            } else {
              if (_0x51faa8 === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! connexion fermée, reconnexion en cours ...");
                _0x103be2();
              } else {
                if (_0x51faa8 === baileys_1.DisconnectReason.connectionLost) {
                  console.log("connection error 😞 ,,, trying to reconnect... ");
                  _0x103be2();
                } else {
                  if (_0x51faa8 === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                    console.log("connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!");
                  } else {
                    if (_0x51faa8 === baileys_1.DisconnectReason.loggedOut) {
                      console.log("vous êtes déconnecté,,, veuillez rescanner le code qr svp");
                    } else {
                      if (_0x51faa8 === baileys_1.DisconnectReason.restartRequired) {
                        console.log("redémarrage en cours ▶️");
                        _0x103be2();
                      } else {
                        console.log("redemarrage sur le coup de l'erreur  ", _0x51faa8);
                        const {
                          exec: _0x3053e1
                        } = require("child_process");
                        _0x3053e1("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            console.log("hum " + _0x477bc8);
            _0x103be2();
          }
        }
      }
    });
    _0x2707a9.ev.on("creds.update", _0x49e45b);
    _0x2707a9.downloadAndSaveMediaMessage = async (_0x21dc7a, _0x39521c = '', _0x3ded33 = true) => {
      let _0x47c4ad = _0x21dc7a.msg ? _0x21dc7a.msg : _0x21dc7a;
      let _0x4dd650 = (_0x21dc7a.msg || _0x21dc7a).mimetype || '';
      let _0x1525a5 = _0x21dc7a.mtype ? _0x21dc7a.mtype.replace(/Message/gi, '') : _0x4dd650.split('/')[0x0];
      0x0;
      const _0x5316af = await baileys_1.downloadContentFromMessage(_0x47c4ad, _0x1525a5);
      let _0x1bbe31 = Buffer.from([]);
      for await (const _0x10f37a of _0x5316af) {
        _0x1bbe31 = Buffer.concat([_0x1bbe31, _0x10f37a]);
      }
      let _0x2e19e7 = await FileType.fromBuffer(_0x1bbe31);
      let _0x2bc281 = './' + _0x39521c + '.' + _0x2e19e7.ext;
      await fs.writeFileSync(_0x2bc281, _0x1bbe31);
      return _0x2bc281;
    };
    _0x2707a9.awaitForMessage = async (_0x367dd5 = {}) => {
      return new Promise((_0x26a3a0, _0x490edd) => {
        if (typeof _0x367dd5 !== 'object') {
          _0x490edd(new Error("Options must be an object"));
        }
        if (typeof _0x367dd5.sender !== "string") {
          _0x490edd(new Error("Sender must be a string"));
        }
        if (typeof _0x367dd5.chatJid !== 'string') {
          _0x490edd(new Error("ChatJid must be a string"));
        }
        if (_0x367dd5.timeout && typeof _0x367dd5.timeout !== "number") {
          _0x490edd(new Error("Timeout must be a number"));
        }
        if (_0x367dd5.filter && typeof _0x367dd5.filter !== "function") {
          _0x490edd(new Error("Filter must be a function"));
        }
        const _0x472612 = _0x367dd5?.["timeout"] || undefined;
        const _0x70b7d7 = _0x367dd5?.["filter"] || (() => true);
        let _0x5c00e4 = undefined;
        let _0x8ced51 = _0x350253 => {
          let {
            type: _0x1da013,
            messages: _0x24f6d1
          } = _0x350253;
          if (_0x1da013 == "notify") {
            for (let _0x1ddb4e of _0x24f6d1) {
              const _0x4e2dc7 = _0x1ddb4e.key.fromMe;
              const _0x12b0da = _0x1ddb4e.key.remoteJid;
              const _0x5a3d27 = _0x12b0da.endsWith("@g.us");
              const _0x212b8b = _0x12b0da == 'status@broadcast';
              const _0x30cf30 = _0x4e2dc7 ? _0x2707a9.user.id.replace(/:.*@/g, '@') : _0x5a3d27 || _0x212b8b ? _0x1ddb4e.key.participant.replace(/:.*@/g, '@') : _0x12b0da;
              if (_0x30cf30 == _0x367dd5.sender && _0x12b0da == _0x367dd5.chatJid && _0x70b7d7(_0x1ddb4e)) {
                _0x2707a9.ev.off('messages.upsert', _0x8ced51);
                clearTimeout(_0x5c00e4);
                _0x26a3a0(_0x1ddb4e);
              }
            }
          }
        };
        _0x2707a9.ev.on('messages.upsert', _0x8ced51);
        if (_0x472612) {
          _0x5c00e4 = setTimeout(() => {
            _0x2707a9.ev.off("messages.upsert", _0x8ced51);
            _0x490edd(new Error('Timeout'));
          }, _0x472612);
        }
      });
    };
    return _0x2707a9;
  }
  let _0x294044 = require.resolve(__filename);
  fs.watchFile(_0x294044, () => {
    fs.unwatchFile(_0x294044);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x294044];
    require(_0x294044);
  });
  _0x103be2();
}, 0x1388);