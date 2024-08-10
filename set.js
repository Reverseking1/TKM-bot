const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkRycGhGVEpncXVzZjh5OGlqcVVOLzFNQVU1WFlZUFlmMUMrdW9UWDlFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRG95NEg1ZlBNSkp3RDFub2F4eldzK0tqKzIwSHhReldGODRlRERuTmV4MD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3QzFsYkw0WkJ4QmlJN0loSVdNbllablgzdGR1ZzlTb2FYZFZPS292KzBrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpZ3h2WTZxdWhnMWFsSEZoL2taYjZUU1pvUVNSTEsxd2h3ZDNTeG1uajM0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9JWEZLNjVZN09GYXgrQ2pvdjRneEtMdDBndU1wdVBzZFRNVU1YbU5FVmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVSKy9SZzRQZG44SGZDa1dMV1k5Tk0xSGcxR201ckthVlg1aWVVTTdJR1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME9ia0dkSTVkK3RScU9QcHFyOUVPS01rK1dtYmljUS92SnZ5b1pkYjNrOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSTBkVlhkR0plUVpGQU03OS9pUDIxNFB1cENlQjdzaXNCK2ZwNkFEc2pHaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InptdXVyM0pwSHFqciswbGZZVmpYYUFFdFduMHVrYjlGQVgrR01YcXpjRWdkMWY0cTV5d2tLem9IY1Z3YWswOU1wemlCdWcxeFJxL1hidUlsZlc5aUFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg1LCJhZHZTZWNyZXRLZXkiOiI3TEpJNmtxTVhRRW91Sys5WGw2SW1rbTVGbFRmWTZFbnhYOXNyODBLdHk4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJlc043ajVRQVNNcWkwTDc2ZkN4NjBnIiwicGhvbmVJZCI6IjczMDY4NjdkLTIzYzgtNGQ2MC05ZjhlLTNlMGNlZjkyYTMwNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0MzNSUlRtNWNsR0ZlTHJobDVndlFXTFA3Q0E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS2FlVzg1OWJoczJuTjdNQTVZOCtiNXZSMFRzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlFQTE5ZSlFQIiwibWUiOnsiaWQiOiIyMzMyNTc1MTQ1MDQ6NzNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0p6ZzRLUU9FSmJPMzdVR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkFUY3hJVmVEUDRZMTFIdlU1N2VTS0Q2Y0dCVzJpbHhtZ3A3dzhsL2FIMzA9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjVKVHlBUUpyeEpmOU8rVEE5dmg0dXRzRXBZWWRKeHN3YUxxVkd1VkYreEtlaUk2Zm0rQzgvZUtLSWJheGJiQnNTMWtWVnZmTnY1TDhLTVJEMUFVY0FBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJaUEgwNmVEZW5JMVhnK2txRjVtKzlWempMWkoyRUxpaERaKzZ5SG5PRjFFS2xnRUFRWXN2MHhuekgwYi9UbllGdkxzR2N2Y0JRNENhTGdQMXBTdWNEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzI1NzUxNDUwNDo3M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRRTNNU0ZYZ3orR05kUjcxT2Uza2lnK25CZ1Z0b3BjWm9LZThQSmYyaDk5In19XSwicGxhdGZvcm0iOiJpcGhvbmUiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjMzMjgyOTAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSzE1In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
