async function sendMessage(EntryTest, channel, request) {
    try {
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();
        await webhook.send(request, {
            username: EntryTest.username,
            avatarURL: EntryTest.avatarURL,
        });
    } catch (error) { console.error('Error trying to send: ', error); }
}

exports.sendMessage = sendMessage