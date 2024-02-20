import { CommandInteraction, Client, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Players } from '../../helpers/Players';
import { getMatchData, getPlayerMatchId } from '../../api/matches';
import { buildMatchMessage } from '../../helpers/buildMatchMessage';

export default {
    data: new SlashCommandBuilder()
		.setName('last')
		.setDescription('Provides information about player last Dota 2 match'),
    run: async (client: Client, interaction: CommandInteraction) => {
        await interaction.deferReply({ ephemeral: true });

        const player = Players.find(value => value.discordId === interaction.user.id);
        if (!player) return;

        const matchId = await getPlayerMatchId(player?.steamAccount.id);
        const match = await getMatchData(matchId);
        const embeds = await buildMatchMessage(match);
        const embedsToSend = embeds.filter(embed => embed !== undefined) as EmbedBuilder[];
        await interaction.deleteReply();
        if (embeds) {
            interaction.channel?.send({ embeds: embedsToSend });
        }
    }
};
