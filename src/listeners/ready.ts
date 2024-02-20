import { Client, Events } from 'discord.js';
import { trackPlayersMatches } from '../trackers/matchesTracker';

export default (client: Client): void => {
    client.on(Events.ClientReady, async () => {
        if (!client.user || !client.application) {
            return;
        }
        trackPlayersMatches(client);

        client.user.setPresence({ activities: [{ name: 'Dota 2 с агентами' }], status: 'online' });

        console.log(`${client.user.username} is online`);
    });
};
