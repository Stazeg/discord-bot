import { CommandInteraction, Client, EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } from 'discord.js';
import { Players } from '../../helpers/Players';
import { Heroes } from '../../helpers/Heroes';
import { Medal } from '../../helpers/Medals';

export default {
    data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Provides information about player Dota 2 dotabuff profile')
        .addUserOption(option =>
            option.setName('nickname')
                .setDescription('Discord nickname of player')),
    run: async (client: Client, interaction: CommandInteraction) => {
        const target = interaction.options.getUser('nickname');
        const info = await getInfo(target?.id || interaction.user.id);
        await interaction.reply(info);
    }
};

const getPlayerHeroesData = async (steamId: number) => {
    const url = `players/${steamId}/heroes`;
    const response = await fetch(`https://api.opendota.com/api/${url}`);
    return response.json();
};

const getPlayerRankingsData = async (steamId: number) => {
    const url = `players/${steamId}/rankings`;
    const response = await fetch(`https://api.opendota.com/api/${url}`);
    return response.json();
};

const getInfo = async (userId: string) => {
    const player = Players.find(value => value.discordId === userId);

    if (!player) {
        return `<@${userId}> isn't Dota player.`;
    }
    
    const rankings = await getPlayerRankingsData(player.steamAccount.id);
    const playerHeroes = await getPlayerHeroesData(player.steamAccount.id);

    const topHero = Heroes.find(hero => hero.id === rankings[0]?.hero_id);
    const topHeroImageName = topHero?.shortName;

    const mostPlayedHero = Heroes.find(hero => hero.id === playerHeroes[0]?.hero_id);

    const winRate = (player.winCount / player.matchCount * 100).toFixed(2);

    const playerMedal = player.steamAccount.seasonRank.toString();
    const actualMedal = Medal[+playerMedal[0] - 1];
    const star = playerMedal[1];

    const attachment = new AttachmentBuilder(`src\\images\\medals\\SeasonalRank${playerMedal[0]}-${playerMedal[1]}.png`, { name: `SeasonalRank${playerMedal[0]}-${playerMedal[1]}.png` })

    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${player.name}'s Stratz`)
        .setURL(`https://stratz.com/players/${player.steamAccount.id}`)
        .setAuthor({ name: `${player.name}`, iconURL: `${player.steamAccount.avatar}`, url: `${player.steamAccount.profileUri}` })
        .setThumbnail(`attachment://${attachment.name}`)
        .addFields(
            { name: 'Rank', value: `${actualMedal}[${star}]`, inline: true },
            { name: 'Winrate', value: `${winRate}%`, inline: true },
            { name: '\n', value: '\n' },
            { name: 'Best hero', value: `${topHero?.displayName}`, inline: true },
            { name: 'Most played hero', value: `${mostPlayedHero?.displayName}`, inline: true }
        )
        .setImage(`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${topHeroImageName}.png`)
        .setTimestamp()
        // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    return { embeds: [embed], files: [attachment] };
};
