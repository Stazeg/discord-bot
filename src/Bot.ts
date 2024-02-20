import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import ready from './listeners/ready';
import interactionCreate from './listeners/interactionCreate';
import { loadHeroes } from './helpers/Heroes';
import { loadPlayers } from './helpers/Players';

console.log('Bot is starting...');

const token = process.env.DISCORD_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

(async () => {
    await loadHeroes();
    await loadPlayers();

    ready(client);
    interactionCreate(client);

    client.login(token);
})();
