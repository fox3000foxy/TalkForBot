console.clear()
const Discord = require('discord.js'),
    fs = require('fs'),
    client = new Discord.Client();
let { setUsername, setPassword, setAvatarURL } = require('./modules/createEntry'),
    { sendMessage } = require('./modules/sendMessage'),
    { loginToUser } = require('./modules/loginToUser'),
    EntryTest = new Array(),
    Login = new Array();

client.on('ready', () => {
    console.log("Ready !")
    client.user.setActivity('bc!help', { type: 'WATCHING' });
})

client.on('message', async (message) => {
    let authId = message.author.id
    if (!message.content.startsWith("bc!") || message.author.bot) {
        return;
    }
    message.delete();
    let request = message.content.split("bc!")[1];
    EntryTest[authId] = EntryTest[authId] || {};
    console.log("request : ", { request });

    if (request.startsWith("pseudo")) {
        EntryTest[authId] = setUsername(EntryTest[authId], request.split(" ")[1]);
    }
    else if (request.startsWith("mdp")) {
        EntryTest[authId] = setPassword(EntryTest[authId], request.split(" ")[1]);
    }
    else if (request.startsWith("avatar")) {
        EntryTest[authId] = setAvatarURL(EntryTest[authId], request.split(" ")[1]);
    }
    else if (request.startsWith("finish")) {
        if (EntryTest[authId].username && EntryTest[authId].password && EntryTest[authId].avatarURL) {
            let data = fs.readFileSync('db.json', 'utf8')
            let dataJson = JSON.parse(data)
            dataJson.push(EntryTest[authId])
            fs.writeFile('db.json', JSON.stringify(dataJson), function (err) { })
        }
        else message.channel.send("User profile not completed")
    }
    else if (request.startsWith("help")) {
        message.channel.send(fs.readFileSync('help.txt', 'utf8'));
    }
    else if (request.startsWith("login")) {
        let data = fs.readFileSync('db.json', 'utf8');
        let dataJson = JSON.parse(data);
        Login[authId] = loginToUser(request.split("login ")[1].split(" "), dataJson);
        if (JSON.stringify(Login[authId]) == "{}") message.channel.send("Wrong username or password !");
    }
    else if (request.startsWith("disc")) {
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