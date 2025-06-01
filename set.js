const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUR1WWpEb1pCOEZMVW9FTGMrUWk1S3JWZnZEM2xWVlpISFVQVklsdzczTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMGNoVVVHVHBMbjZrYmlDbnNubXFLRjI4MFdpNkhYSExzc05hSWFCWWozOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDTXBUNFY5SnNRUXlGUEhYYk9xNW5adlozTGpLSkFISU1HYnRxMXR0OEhBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTYXR0MXNiVjVtamNFRDBMY1ZiNEJIeFpjOFVWdzl6RUJzMWFBMVZ3eUdBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndGWTVzZzRiV0J1QW43cUV1Zkh4djJvamVxSmZXQkNCZWhQWGthbGdIR2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikt0WmZacXBadlI4Tmd4SGc2NVBiZk1rWmJxUUgwZk5OY0N0Nld0UUllUTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME16MnlqY0NBRW1qZU5mWDhPV1VzM291OTdJbmRWSzVPaXBUajVkeEQxWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEV5WHdod1F3U2FyTnV1T21Dd2NSZU1rK09yaWU4b0lkTWJwUENUemExbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikc1b2U3MU9uaWZJM2g4TGdlSGh2T3p1OGdIb2UvZWtYQklzTjlXd3N5UXdUakp3V3o2N1V5KzF3cUtDSXN3QUcxTU40azZFb2hkVGk2S1NzUjVQRWpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMzLCJhZHZTZWNyZXRLZXkiOiIyalZxdEprNXZvelAvdXhqSSsrNjRwM2lMeHczS1RHMWJMUlRENzY5OFU4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzIsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMiwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJwZEVqRDB5U1NwZXFNa1NUak50eDJ3IiwicGhvbmVJZCI6IjJmNjEzM2FhLTY4NDgtNGU4YS04MmExLWI1MGIwOGZmYjhlNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVcHRZSE9QWFFweVVTMlhtM0F6OWwzKzNVc0k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWlA0dllxVHVTRkFTOWZzWHlyZmFFZnBKRk5jPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik1ZRkVOM0pFIiwibWUiOnsiaWQiOiIyNTQ3NTg0NDMxMTE6NzVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09QWXpzZ0VFS1hyaDhFR0dCWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IldHQTlYUEJxSGVzY2l3NDNHTnEyOXU4U2VYM1hDUTdqYWlwVkk2Tm9HWHM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkNCRXByL3dqUnZGOXAwSUhHbEpWMDVUZWNrWDFDMHNPVVArMDlxRXpteHRsekJ2dG5BR2FjYlJ5cEdhTVBtRTdCdkw5TUFkK3o5QXQrRm9aenV2M0NBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJsTmFCZEVMbWlmMEpnM3ltUkJVYVVwVW9CZWFhZE40Y0VueWZWTWNRRVlhbndEbFNVbmNMUFNYNXgxRzJUUXJjbW9HcGp0aVdtT1VWT0ZQbDBZR2Fpdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1ODQ0MzExMTo3NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWaGdQVnp3YWgzckhJc09OeGphdHZidkVubDkxd2tPNDJvcVZTT2phQmw3In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3MDU2MDUxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURoUSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "🦂★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫𓃵",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "🦂★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'RAHMAN MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/h0Sw13b/file-1285.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
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
