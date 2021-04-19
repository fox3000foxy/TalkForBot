//console.clear()
const Discord = require('discord.js'),
    fs = require('fs'),
    client = new Discord.Client();
let { setUsername, setPassword, setAvatarURL } = require('./modules/createEntry'),
    { sendMessage } = require('./modules/sendMessage'),
    { loginToUser } = require('./modules/loginToUser'),
    EntryTest = new Array(),
    Login = new Array();

//ESCAPE TOKENS
const ESCAPE_TOKEN = 'bc!';
const USERNAME_TOKEN = 'un' || 'username';
const PASSWORD_TOKEN = 'pwd' || 'password';
const AVATAR_TOKEN = 'avatar' || 'avatarURL';
const FINISH_TOKEN = 'finish';
const LOGGING_TOKEN = 'log' || 'logging';
const DISCONNECT_TOKEN = 'dsc' || 'disconnexion';
const HELP_TOKEN = 'help';

//HELP MESSAGE
const MSG_CONTENT = `\`\`\`Creation:
    • ${ESCAPE_TOKEN}${USERNAME_TOKEN} <username> for set the username to your bot
    • ${ESCAPE_TOKEN}${PASSWORD_TOKEN} <password> for secure your bot
    • ${ESCAPE_TOKEN}${AVATAR_TOKEN} <avatarURL> for set the avatar image of your bot
    • ${ESCAPE_TOKEN}${FINISH_TOKEN} for finish the creation of your bot
Connexion:
    • ${ESCAPE_TOKEN}${LOGGING_TOKEN} <username> <password> 
    • ${ESCAPE_TOKEN}<msg> for say as your bot
    • ${ESCAPE_TOKEN}${DISCONNECT_TOKEN} for disconnect your bot
Misc:
    • ${ESCAPE_TOKEN}${HELP_TOKEN}

\`\`\`
:flag_us: More information on \`https://github.com/fox3000foxy/TalkForBot/blob/master/README.md\`
:flag_fr: Plus d'information sur \`https://github.com/fox3000foxy/TalkForBot/blob/master/README-fr.md\`
`

client.on('ready', () => {
    console.log("Ready !")
    client.user.setActivity(`${ESCAPE_TOKEN}${HELP_TOKEN}`, { type: 'WATCHING' });
})

client.on('message', async (message) => {
    let authId = message.author.id;
    if (!message.content.startsWith(`${ESCAPE_TOKEN}`) || message.author.bot) {
        return;
    }
    message.delete();
    let request = message.content.split(`${ESCAPE_TOKEN}`)[1];
    EntryTest[authId] = EntryTest[authId] || {};
    console.log("request : ", { request });

    if (request.startsWith(USERNAME_TOKEN)) {
        EntryTest[authId] = setUsername(EntryTest[authId], request.split(" ")[1]);
    }
    else if (request.startsWith(PASSWORD_TOKEN)) {
        EntryTest[authId] = setPassword(EntryTest[authId], request.split(" ")[1]);
    }
    else if (request.startsWith(AVATAR_TOKEN)) {
        EntryTest[authId] = setAvatarURL(EntryTest[authId], request.split(" ")[1]);
    }
    else if (request.startsWith(FINISH_TOKEN)) {
        if (EntryTest[authId].username && EntryTest[authId].password && EntryTest[authId].avatarURL) {
            let data = fs.readFileSync('./data/db.json', 'utf8');
            let dataJson = JSON.parse(data);
            dataJson.push(EntryTest[authId]);
            fs.writeFile('./data/db.json', JSON.stringify(dataJson), (err) => { });
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
        Login[authId] = loginToUser(request.split(`${LOGGING_TOKEN} `)[1].split(" "), dataJson);
        if (JSON.stringify(Login[authId]) == "{}") message.channel.send("Wrong username or password !");
    }
    else if (request.startsWith(DISCONNECT_TOKEN)) {
        Login[authId] = {};
    }
    else if (Login[authId] && JSON.stringify(Login[authId]) != "{}") {
        sendMessage(Login[authId], message.channel, request);
    }
    else {
        message.channel.send("Not logged to any user");
    }
});

client.login("ODI5MzQ5Nzc4NTA4MjE4Mzc5.YG22Kw." + "G9FnMiRBm8Av13hPpvB_xUPbzyA")
//Demo URL avatar : "https://preview.redd.it/08zhghwhnb731.png?auto=webp&s=19332b877d35dd954827a34e8d5318d0600aec8f"