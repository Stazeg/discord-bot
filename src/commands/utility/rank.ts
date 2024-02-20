import { CommandInteraction, Client, ApplicationCommandType, SlashCommandBuilder } from 'discord.js';
import Players from '../../config/players.json';
import { Medal } from '../../helpers/Medals';

export default {
    data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Provides information about player Dota 2 rank'),
    run: async (client: Client, interaction: CommandInteraction) => {
        const medal = await getMedal(interaction.user.id);
		await interaction.reply(medal);
    }
};

const getMedal = async (userId: string) => {
    const player = Players.find(value => value.discordId === userId);

    if (!player) {
        return `<@${userId}> isn't Dota player.`;
    }
    const url = `players/${player.steamId}`;
    const response = await fetch(`https://api.opendota.com/api/${url}`);
    const playerInfo = await response.json();

    const playerMedal = playerInfo?.rank_tier.toString();
    if (!playerMedal)
    {
        return `<@${userId}> is uncalibrated.`;
    }
    const actualMedal = Medal[playerMedal[0] - 1];
    const star = playerMedal[1];
    return `<@${userId}> is ${actualMedal}[${star}].`;
};
