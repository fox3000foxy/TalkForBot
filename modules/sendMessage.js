async function sendMessage(entryTest, channel, request) {
    try {
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();
        if (webhook){
          await webhook.send(request, {
              username: entryTest.username,
              avatarURL: entryTest.avatarURL,
          });
        }
    } catch (error) { 
      console.error('Error trying to send: ', error); 
    }
}

exports.sendMessage = sendMessage