async function sendMessage(message) {
    const channel = message.channel;
    try {
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();
        if (message.mentions) {
            let user = message.mentions.users.first()
            if (!message.author.bot && message.mentions.users.first().bot) {
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
}

exports.sendMessage = sendMessage