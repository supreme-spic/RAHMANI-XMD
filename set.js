




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0FjalJXc2JsN2VFTWFyQUtQOW9CYURIdTEzVnBORHUxaGpwNG1kOFNrVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYTEzRmxhMTEwdVRoMWxoa09ab1l0YXpGUUZyTzIyUmgwWTRKajVvZTZBZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZTzVXMlM1dmJFUWtFbjRBV1h3d0xNVU5zSHg5enlBYkltSHVhYjVMZTNRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJcFRQcTFqMzJLbmEza041cDlPUkdvZS92WjVsdjVnSkFNSjBocFg5UkdBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktBaExERlJVeGFabVVma1RuYktEQVp2RExBQzlZaVFVbFhiMVZORWwzVnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdtcEhwTE5Qd3JYSy9nT0FPMkttUFVHVWxoU1FvZ2t0ZUdNMDZobkpsaFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS1BSZC8vNEVlUU5zdExkYUdncXdhOFIzMWY1MVZ3dkFhalJnR01JMVJsaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUlMNWpCZW1yYmlHaEFXSmwzbnY1Tng4RlJMZU5XV0tJWXM3bVIzRUdtST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik4reTZISUJKYUdybmRnQ0F3QnFUWnZyZ0trQ0RMWWNCVGpuaFU4TVRnL3JneG1pcEI0RVNieVJTbUFqdHNkSVpBYUIyajBFLzVDU3lxcHIyOHBnMmdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA4LCJhZHZTZWNyZXRLZXkiOiJRZWM0SklzSFZ6MzYvZnpicXBiT3dmUVl4RkFsdWFrOVAwQVlRU05OVjMwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc3ODg1ODI0NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwQjc5NDlCM0NBMkQ5MTQ2NEJDODIzQzJBQTAxN0E5MCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxMjkxMTQ3fV0sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJES0E0UUFMUSIsIm1lIjp7ImlkIjoiMjYzNzc4ODU4MjQ2OjgwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Isui4bWY4bWWyrPhtYnhtZDhtYkg4bacyrDhtYPLoiIsImxpZCI6Ijk2MDcwMzgyMTI1MDg0OjgwQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS3ZaamJBRUVQV3Bpc01HR0NrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoib2M4L1NtSk9JTEhsczZHWFc5c3dzWTVMRmhMSVV5WW9tOHVCeU4vei9oOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVVBMaFZBSGZ3QmJpdDE1c1hmNXdaUUJ4RXNVQXl0QWdKZ0h1R2EzU2lwQWZKZ3hMRTRCbUlGWFV0TnAxWitMZEh3aWE0T2N0YTZ0NXIyYXpTWXdMQXc9PSIsImRldmljZVNpZ25hdHVyZSI6InBrYTNJV1JPcnlyYVdyRzhjdWZScmlZVnFmMitpOXRjQXBieXFQa1ZxUTZ5TlFDWlpiVVJwQU1UZFdsc05oUFc2MmV0Q2trUXgvVzhkY21CSldMNmdRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzc4ODU4MjQ2OjgwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFIUFAwcGlUaUN4NWJPaGwxdmJNTEdPU3hZU3lGTW1LSnZMZ2NqZjgvNGYifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTI5MTEzOSwibGFzdFByb3BIYXNoIjoiMkc0QW11IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFKSWkifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " ",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
