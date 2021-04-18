const Discord = require('discord.js'),
      fs = require('fs'),
      client = new Discord.Client();
let data = fs.readFileSync('db.json', 'utf8'),
    { setUsername, setPassword, setAvatarURL } = require('./modules/createEntry'),
    { sendMessage } = require('./modules/sendMessage')

let EntryTest = {};
EntryTest = setUsername(EntryTest,"fifa")
EntryTest = setPassword(EntryTest,"fifa")
EntryTest = setAvatarURL(EntryTest,"fifa")

dataJson = JSON.parse(data)
dataJson.push(EntryTest)
console.log(dataJson)
//fs.writeFile('db.json', JSON.stringify(dataJson), function (err) {});

client.on('message', async (message) => {
});

client.login("ODI5MzQ5Nzc4NTA4MjE4Mzc5.YG22Kw."+"G9FnMiRBm8Av13hPpvB_xUPbzyA")
