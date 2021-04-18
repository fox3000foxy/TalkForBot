const Discord = require('discord.js'),
      fs = require('fs'),
      client = new Discord.Client();
let data = fs.readFileSync('db.json', 'utf8'),
    { setUsername } = require('./modules/createEntry')
    console.log(setUsername({},"fifa"))
    dataJson = JSON.parse(data)
console.log(dataJson)

//dataJson.push({"script":"hi too"})
//console.log(dataJson)
//fs.writeFile('db.json', JSON.stringify(dataJson), function (err) {});

client.on('message', async (message) => {
	const channel = message.channel;
	try {
		const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.first();
		if (message.mentions){
		let user = message.mentions.users.first()
		if(!message.author.bot && message.mentions.users.first().bot){
			await webhook.send(message.content.split(">")[1], {
				username: user.username,
				avatarURL: client.users.cache.get(user.id).avatarURL(),
			});
			await message.delete()
		}
}
	} catch (error) {
		console.error('Error trying to send: ', error);
	}
});

client.login("ODI5MzQ5Nzc4NTA4MjE4Mzc5.YG22Kw."+"G9FnMiRBm8Av13hPpvB_xUPbzyA")
