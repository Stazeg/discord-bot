import { Client, EmbedBuilder, TextBasedChannel } from 'discord.js';
import { Player, Players } from '../helpers/Players';
import { getPlayerMatchCount } from '../api/players';
import { getMatchData, getPlayerMatchId } from '../api/matches';
import { buildMatchMessage } from '../helpers/buildMatchMessage';

const minutes = 5;
const interval = minutes * 60 * 1000;

const newMatchTracker = async (client: Client) => {
    const matchIdToPlayersMapping: Record<string, Array<Player>> = {};
    const channel = await client.channels.cache.get(process.env.TRACKER_CHANNEL_ID) as TextBasedChannel;

    for (const player of Players) {
        const currentMatches = await getPlayerMatchCount(player.steamAccount.id);

        if (currentMatches.player.matchCount !== player.matchCount) {
            player.matchCount = currentMatches.player.matchCount;

            const matchId = await getPlayerMatchId(player.steamAccount.id);
            if (!matchIdToPlayersMapping[matchId]) {
                matchIdToPlayersMapping[matchId] = [player];
            } else {
                matchIdToPlayersMapping[matchId].push(player);
            }
        }
    }

    console.log('New matches:', matchIdToPlayersMapping);

    Object.entries(matchIdToPlayersMapping).forEach(async ([matchId, _players]) => {
        const match = await getMatchData(+matchId);
        const embeds = await buildMatchMessage(match);
        const embedsToSend = embeds.filter(embed => embed !== undefined) as EmbedBuilder[];
        channel?.send({ embeds: embedsToSend });
    });
};

export const trackPlayersMatches = (client: Client) => {
    Players.forEach(async player => {
        console.log(`${player.name} total matches: ${player.matchCount}`);
    });

    setInterval(newMatchTracker, interval, client);
};
