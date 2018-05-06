const request = require('request');
const Discord = require("discord.js");
const fs = require("fs"); //var config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const bot = new Discord.Client();
const prefix = "$";
const botlogchannel = "406504806954565644";
const botmlogchannel = "409055298158985216";
const botbuglogchannel = "418642505509240836";
const boterrorchannel = "420955154695585792";
const botleavejoinchannel = "431829603741466634";
const botrejectionschannel = "432090416834412545";
const botowner = "264470521788366848";
const wfortunes = ["{user} keep you`r shoes out of door", "hey {user} show your swag", "be carefull {user} is here! -_-", "{user} make the party awesome", "Hi {user} Take guitar & enjoy party", "hehe {user} are slide hide your dishes", "let's go {user} for chicken dinner"];
const wimages = [`https://imgur.com/Z2fpFVi.png`, `https://imgur.com/G29egX4.png`, `https://imgur.com/LHdn5I8.png`, `https://imgur.com/GziAP26.png`, `https://imgur.com/GjI5Vpk.png`, `https://imgur.com/WqTnmM0.png`, `https://imgur.com/qknRCM7.png`];
const icwstaff = ["385099687465844736", "278587244443467777", "288961251973791744"];
const owmkey = process.env.KEY_WEATHER;
var Heroku = require('heroku.node');
var hbot = new Heroku({ email: 'pardeepsingh1236512365@gmail.com', api_key: 'Process.env.H_APIKEY' });
const { inspect } = require("util");
const firebase = require("firebase");
const Jimp = require("jimp");

const ord = number => { let or; const num = number.toString(); if (num.endsWith("1")) { or = "st"; } else if (num.endsWith("2")) { or = "nd"; } else if (num.endsWith("3")) { or = "rd"; } else { or = "th"; } return or; };

firebase.initializeApp({
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    databaseURL: process.env.FB_DATABASE_URL,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
});
firebase.auth().signInWithEmailAndPassword(process.env.FB_EMAIL, process.env.FB_PASSWORD);
const db = firebase.database();


bot.on("disconnect", function() {
    console.log("Bot disconnected");
    bot.channels.get(botlogchannel).send("bot disconnected");
    process.exit(1);
});

bot.login(process.env.BOTTOKEN).then(function() {
    console.log("Welcome Bot logged in");
    bot.channels.get(botlogchannel).send("bot logged in");
}).catch(console.log);
bot.on('guildMemberAdd', async(member) => {
    const wmstatus = (await db.ref(`servers/${member.guild.id}`).child('welcomeMstatus').once('value')).val();
    const wtextonoff = (await db.ref(`servers/${member.guild.id}`).child('wtextonoff').once('value')).val();
    const wimageonoff = (await db.ref(`servers/${member.guild.id}`).child('wimageonoff').once('value')).val();
    const wuinfoonoff = (await db.ref(`servers/${member.guild.id}`).child('wuinfoonoff').once('value')).val();
    const wm = (await db.ref(`servers/${member.guild.id}`).child('wmessage').once('value')).val();
    const wc = (await db.ref(`servers/${member.guild.id}`).child('wchannelid').once('value')).val();
    const fn = Math.floor(Math.random() * wfortunes.length);
    const fact = `${wfortunes[fn]}`;
    const fact2 = `${fact.replace('{user}', member.user.username)}`
    const rn = Math.floor(Math.random() * wimages.length);
    const images = `${wimages[rn]}`;
    const ms = bot.guilds.filter((guild) => guild.ownerID === member.user.id).filter((guild) => guild.memberCount > 200).map((guild) => guild.name);
    const mm = bot.guilds.filter((guild) => guild.ownerID === member.user.id).filter((guild) => guild.memberCount > 200).map((guild) => guild.memberCount)
    let nemoji = bot.emojis.get("439708397294714881")
    let time = member.joinedAt - member.user.createdAt;
    let d = Math.floor(time / 86400000);
    if (d === 0) {
        days = "";
    } else {
        days = d + " days ";
    }
    let h = Math.floor(time / 3600000 % 24);
    if (h === 0) {
        hours = "";
    } else {
        hours = h + " hours ";
    }
    let minutes = Math.floor((time % 3600000) / 60000) + " minutes";
    if (wmstatus === "on") {
        if (wc === null) return;
        if (wtextonoff === "on") {
            if (wm === null) {
                member.guild.channels.get(wc.toString()).send(`${member} welcome to ${member.guild.name} you are the ${member.guild.memberCount}${ord(member.guild.memberCount)} user`)
            } else {
                member.guild.channels.get(wc.toString()).send(wm.replace('{user}', member.toString()).replace('{members}', member.guild.memberCount));
            }
        }
        if (wimageonoff === "on") {
            let u = `you are the ${member.guild.memberCount}${ord(member.guild.memberCount)} user`;
            let s = member.guild.name;
            let img = member.user.displayAvatarURL;
            Jimp.read(`https://cloud.githubusercontent.com/assets/414918/11165709/051d10b0-8b0f-11e5-864a-20ef0bada8d6.png`).then(function(mask) {
                Jimp.read(img).then(function(image) {
                    Jimp.read(images).then(function(image2) {
                        Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(function(font) {
                            image2.print(font, 121, 57, s);
                            image2.print(font, 103, 79, u);
                            image2.print(font, 103, 57, "to");
                            image2.print(font, 11, 101, fact2)
                            image2.print(font, 103, 4, "Welcome");
                            Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(function(font) {
                                image2.print(font, 120, 56, s);
                                image2.print(font, 102, 56, "to")
                                image2.print(font, 10, 100, fact2)
                                image2.print(font, 102, 78, u);
                                image2.print(font, 102, 3, "Welcome");
                                Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function(font) {
                                    image2.print(font, 104, 20, member.user.tag);
                                    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(function(font) {
                                        image2.print(font, 102, 18, member.user.tag)
                                        image2.resize(400, 120);
                                        image.resize(90, 90);
                                        mask.resize(90, 90);
                                        image.mask(mask, 0, 0);
                                        image2.composite(image, 5, 5);
                                        image2.getBuffer(Jimp.MIME_PNG,
                                            (error, buffer) => { member.guild.channels.get(wc.toString()).send({ files: [{ name: 'welcome.png', attachment: buffer }] }); });
                                    });
                                });
                            });
                        });
                    });
                })
            });
        }
        if (wuinfoonoff === "on") {
            if (mm == 0) {} else {
                member.guild.channels.get(wc.toString()).send(`:crown: Owner of ${ms} server with ${mm} members`)
            }
            if (member.user.id === botowner) {
                member.guild.channels.get(wc.toString()).send(`:military_medal: Owner of ICW BOT`)
            }
            if (icwstaff.includes(member.user.id)) {
                member.guild.channels.get(wc.toString()).send(`:medal: Staff member of ICW`)
            }
            if (member.user.displayAvatarURL.slice(-4) === ".gif") {
                member.guild.channels.get(wc.toString()).send(nemoji + " nitro user")
            }
            if (member.user.bot === true) {
                if (time < 432000000) {
                    member.guild.channels.get(wc.toString()).send(":no_entry_sign: bot created " + `${days} ${hours} ${minutes}` + " ago")
                }
            }
        }
    } else { return }
})

bot.on('guildMemberRemove', async(member) => {
    const wc = (await db.ref(`servers/${member.guild.id}`).child('wchannelid').once('value')).val();
    const wmstatus = (await db.ref(`servers/${member.guild.id}`).child('welcomeMstatus').once('value')).val();
    const wleavetextonoff = (await db.ref(`servers/${member.guild.id}`).child('wleavetextonoff').once('value')).val();
    const lm = (await db.ref(`servers/${member.guild.id}`).child('lmessage').once('value')).val();
    if (wmstatus === "on") {
        if (wc === null) return;
        if (wleavetextonoff === "on") {
            if (lm === null) {
                member.guild.channels.get(wc.toString()).send(`${member.user.tag} is left the server now we are ${member.guild.memberCount} members`)
            } else {
                member.guild.channels.get(wc.toString()).send(lm.replace('{user}', member.user.tag.toString()).replace('{members}', member.guild.memberCount));
            }
        }
    } else { return }
});

bot.on("guildCreate", guild => { bot.channels.get(botleavejoinchannel).send(`New server joined: ${guild.name} (id: ${guild.id}). This server has ${guild.memberCount} members! and owner is ${guild.owner.user.username} now im in ${bot.guilds.size} servers`); });

bot.on('guildDelete', guild => {
    bot.channels.get(botleavejoinchannel).send(`Removed from ${guild.name} (id: ${guild.id}). and it was owned by ${guild.owner.user.username} (owner id: ${guild.owner.id}) now im in ${bot.guilds.size} servers`);
    firebase.database().ref('servers/' + guild.id).set({ guildname: guild.name, guilddeleted: true }).catch(function(err) { bot.channles.get(boterrorchannel).send(err + "\n\n\n"); });
});

bot.on("error", function(err) {
    bot.channels.get(boterrorchannel).send(err);
});
