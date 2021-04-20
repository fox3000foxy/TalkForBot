import { TextChannel } from 'discord.js';
import { IEntry } from './models/entry';

export async function sendMessage(entryTest: IEntry, channel: TextChannel, request: string) {
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
