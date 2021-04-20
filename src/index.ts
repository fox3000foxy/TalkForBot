

// TODO : tester le nombre de params pour chaque commande. Si nb incorrect, afficher help
import { Client, Message, TextChannel } from 'discord.js';
import * as fs from 'fs';
import { ICredentials } from './models/credentials';
import { IEntry } from './models/entry';
let client: Client = new Client();

import { sendMessage } from './sendMessage';
import { loginToUser } from './loginToUser';

let entryTest = new Array<IEntry>();
let login = new Array<ICredentials>();

//ESCAPE TOKENS
const ESCAPE_TOKEN = '!tfb ';
const USERNAME_TOKEN = 'un' || 'username';
const PASSWORD_TOKEN = 'pwd' || 'password';
const AVATAR_TOKEN = 'avatar' || 'avatarURL';
const COMPLETE_FORM_TOKEN = 'all'
const FINISH_TOKEN = 'finish';
const LOGGING_TOKEN = 'log' || 'logging';
const DISCONNECT_TOKEN = 'dsc' || 'disconnexion';
const HELP_TOKEN = 'help';
const WEBHOOK_TOKEN = 'wh';

//HELP MESSAGE
const MSG_CONTENT = `
\`\`\`html
Creation:
    • ${ESCAPE_TOKEN}${USERNAME_TOKEN} <username> for set the username to your bot
    • ${ESCAPE_TOKEN}${PASSWORD_TOKEN} <password> for secure your bot
    • ${ESCAPE_TOKEN}${AVATAR_TOKEN} <avatarURL> for set the avatar image of your bot
    • ${ESCAPE_TOKEN}${COMPLETE_FORM_TOKEN} <username> <password> <avatarURL> for complete-in-one the creation of bots
    • ${ESCAPE_TOKEN}${FINISH_TOKEN} for finish the creation of your bot
Connexion:
    • ${ESCAPE_TOKEN}${LOGGING_TOKEN} <username> <password> 
    • ${ESCAPE_TOKEN}<msg> for say as your bot
    • ${ESCAPE_TOKEN}${DISCONNECT_TOKEN} for disconnect your bot
Misc:
    • ${ESCAPE_TOKEN}${HELP_TOKEN} for this display help window
    • ${ESCAPE_TOKEN}${WEBHOOK_TOKEN} for set up the webhook, needed for send message as bot
\`\`\`
:flag_us: More information on \`https://github.com/fox3000foxy/TalkForBot/blob/feature/typescript/README.md\`
:flag_fr: Plus d'information sur \`https://github.com/fox3000foxy/TalkForBot/blob/feature/typescript/README-fr.md\`
`

client.on('ready', () => {
    console.log("Ready !")
    client.user.setActivity(`${ESCAPE_TOKEN}${HELP_TOKEN}`, { type: 'WATCHING' });
})

client.on('message', async (message: Message) => {
    let authId = message.author.id;
    if (!message.content.startsWith(`${ESCAPE_TOKEN}`) || message.author.bot) {
        return;
    }
    message.delete();
    let request = message.content.split(`${ESCAPE_TOKEN}`)[1];
    entryTest[authId] = entryTest[authId] || {};
    console.log("request : ", { request });

    if (request.startsWith(USERNAME_TOKEN)) {
        entryTest[authId].username = request.split(" ")[1];
    }
    else if (request.startsWith(PASSWORD_TOKEN)) {
        entryTest[authId].password = request.split(" ")[1];
    }
    else if (request.startsWith(AVATAR_TOKEN)) {
        entryTest[authId].avatarURL = request.split(" ")[1];
    }
    else if (request.startsWith(COMPLETE_FORM_TOKEN)) {
        // TODO : tester le nombre de params
        entryTest[authId] = {
            username: request.split(" ")[1],
            password: request.split(" ")[2],
            avatarURL: request.split(" ")[3],
        }
    }
    else if (request.startsWith(FINISH_TOKEN)) {
        let data = fs.readFileSync('./data/db.json', 'utf8');
        let dataJson = JSON.parse(data);
        if (entryTest[authId].username && entryTest[authId].password && entryTest[authId].avatarURL) {
            dataJson.push(entryTest[authId]);
            fs.writeFile('./data/db.json', JSON.stringify(dataJson), (err) => { });
            let credentials: ICredentials = {
                username: entryTest[authId].username,
                password: entryTest[authId].password
            }
            login[authId] = loginToUser(credentials, dataJson);
            if (login[authId] === undefined) message.channel.send("Error when try to login !");
        }
        else {
            message.channel.send("User profile not completed");
        }
    }
    else if (request.startsWith(HELP_TOKEN)) {
        message.channel.send(MSG_CONTENT);
    }
    else if (request.startsWith(LOGGING_TOKEN)) {
        let data = fs.readFileSync('./data/db.json', 'utf8');
        let dataJson = JSON.parse(data);
        let credentials: ICredentials = {
            username: request.split(`${LOGGING_TOKEN} `)[1].split(" ")[0],
            password: request.split(`${LOGGING_TOKEN} `)[1].split(" ")[1],
        }
        login[authId] = loginToUser(credentials, dataJson);
        console.log(login[authId])
        if (login[authId] === undefined) message.channel.send("Wrong username or password !");
    }
    else if (request.startsWith(DISCONNECT_TOKEN)) {
        login[authId] = undefined;
    }
    else if (request.startsWith(WEBHOOK_TOKEN)) {
        if (message.channel instanceof TextChannel) {
            message.channel.createWebhook('Simple Webhook', {
                avatar: 'https://i.imgur.com/wSTFkRM.png',
            });
        }
    }
    else if (login[authId]) {
        if (message.channel instanceof TextChannel) {
            sendMessage(login[authId], message.channel, request);
        }
    }
    else {
        message.channel.send("Not logged to any user");
    }
});

//CHANGE TOKEN TO YOUR BOT
client.login("ODI5MzQ5Nzc4NTA4MjE4Mzc5.YG22Kw." + "G9FnMiRBm8Av13hPpvB_xUPbzyA")
//Demo URL avatar : "https://preview.redd.it/08zhghwhnb731.png?auto=webp&s=19332b877d35dd954827a34e8d5318d0600aec8f"