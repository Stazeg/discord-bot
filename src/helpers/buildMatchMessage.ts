import { EmbedBuilder } from 'discord.js';
import { Player, Players } from '../helpers/Players';
import { Heroes } from '../helpers/Heroes';
import { LobbyTypes, Match, MatchPlayerData } from '../api/matches';

const getMatchDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;
    return `🕓 ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

const getScore = (players: MatchPlayerData[]) => {
    const radiantScore = players.filter(player => player.isRadiant).reduce((a,b) => a + b.kills, 0);
    const direScore = players.filter(player => !player.isRadiant).reduce((a,b) => a + b.kills, 0);
    return `🟢 **${radiantScore}:${direScore}** 🔴`;
};

export const buildMatchMessage = async (match: Match) => {
    const players = Players.filter(
        player => !!match.players.find(
            (matchPlayer) => matchPlayer.steamAccount.id === player.steamAccount.id
        )
    );

    if (players.length > 1) {
        const embeds = await Promise.all(
            players.map(player => buildEmbed(match, player))
        );

        const matchEmbed = await buildMatchEmbed(match, players);
        embeds.unshift(matchEmbed);

        return embeds;
    }

    const embed = await buildEmbedForOnePlayer(match, players[0]);

    return [embed];
};

const buildMatchEmbed = async (match: Match, players: Player[]) => {
    const playerInMatch = match.players.find(value => value.steamAccount.id === players[0].steamAccount.id);
    const isWin = playerInMatch?.isVictory;
    const isRanked = Object.values(LobbyTypes).indexOf(match.lobbyType) === 5
        || Object.values(LobbyTypes).indexOf(match.lobbyType) === 6
        || Object.values(LobbyTypes).indexOf(match.lobbyType) === 7;

    const statusEmoji = isWin ? '<a:clapclap:1034805483577552916>' : '<:s1:526402922594959380><:s2:526402922570055680>';

    const title = `One Rune ${isWin ? 'win' : 'lost'} a ${isRanked ? 'ranked' : 'normal'} game ${statusEmoji}`;

    const embed = new EmbedBuilder()
        .setColor(isWin ? 0x92A525 : 0xC23C2A)
        .setTitle(title)
        .setURL(`https://www.dotabuff.com/matches/${match.id}`)
        .addFields(
            { name: 'Duration', value: getMatchDuration(match.durationSeconds), inline: true },
            { name: 'Score', value: getScore(match.players), inline: true },
        )
        //.setImage(`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${playerHeroImageName}.png`)
        //.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
        .setTimestamp(match.startDateTime * 1000)

    return embed;
};

const buildEmbedForOnePlayer = async (match: Match, player: Player) => {
    const playerInMatch = match?.players.find(value => value.steamAccount.id === player.steamAccount.id);
    if (!playerInMatch) return;
    const playerHero = Heroes.find(hero => hero.id === playerInMatch.heroId);
    const playerHeroImageName = playerHero?.shortName;

    const isWin = playerInMatch?.isVictory;
    const isRanked = Object.values(LobbyTypes).indexOf(match.lobbyType) === 5
        || Object.values(LobbyTypes).indexOf(match.lobbyType) === 6
        || Object.values(LobbyTypes).indexOf(match.lobbyType) === 7;

    const damageMessage = `${playerInMatch?.heroDamage} ${
        playerInMatch?.heroDamage > 5000
            ? '<:woah:405832523952685057>'
            : '<:monkaS:405832521574645781>'
    }`;

    const embed = new EmbedBuilder()
        .setColor(isWin ? 0x92A525 : 0xC23C2A)
        .setTitle(`${player.name} ${isWin ? 'win' : 'lost'} a ${isRanked ? 'ranked' : 'normal'} game`)
        .setURL(`https://www.dotabuff.com/matches/${match.id}`)
        .setAuthor({ name: `${player.name}`, iconURL: `${player.steamAccount.avatar}`, url: `${player.steamAccount.profileUri}` })
        .setThumbnail(`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${playerHeroImageName}.png`)
        .addFields(
            { name: 'Duration', value: getMatchDuration(match.durationSeconds), inline: true },
            { name: 'Score', value: getScore(match.players), inline: true },
            { name: '\n', value: '\n' },
            { name: 'Hero', value: `${playerHero?.displayName}`, inline: true },
            { name: '\n', value: '\n' },
            { name: 'KDA', value: `${playerInMatch.kills}/${playerInMatch.deaths}/${playerInMatch.assists}`, inline: true },
            { name: 'Damage', value: damageMessage, inline: true }
        )
        //.setImage(`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${playerHeroImageName}.png`)
        .setTimestamp(match.startDateTime * 1000)

    return embed;
};

const buildEmbed = async (match: Match, player: Player) => {
    const playerInMatch = match?.players.find(value => value.steamAccount.id === player.steamAccount.id);
    if (!playerInMatch) return;
    const playerHero = Heroes.find(hero => hero.id === playerInMatch.heroId);
    const playerHeroImageName = playerHero?.shortName;

    const isWin = playerInMatch.isVictory;

    const damageMessage = `${playerInMatch.heroDamage} ${
        playerInMatch.heroDamage > 5000
            ? '<:woah:405832523952685057>'
            : '<:monkaS:405832521574645781>'
    }`;

    const embed = new EmbedBuilder()
        .setColor(isWin ? 0x92A525 : 0xC23C2A)
        .setAuthor({ name: `${player.name}`, iconURL: `${player.steamAccount.avatar}`, url: `${player.steamAccount.profileUri}` })
        .setThumbnail(`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${playerHeroImageName}.png`)
        .addFields(
            { name: 'Hero', value: `${playerHero?.displayName}`, inline: true },
            { name: '\n', value: '\n' },
            { name: 'KDA', value: `${playerInMatch.kills}/${playerInMatch.deaths}/${playerInMatch.assists}`, inline: true },
            { name: 'Damage', value: damageMessage, inline: true }
        )
        //.setImage(`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${playerHeroImageName}.png`)
        //.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    return embed;
};