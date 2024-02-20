import { PlayerData, getPlayersData } from '../api/players';
import PlayerConfigs from '../config/players.json';

export type Player = PlayerData & {
    name: string;
    discordId: string
}

export const Players: Player[] = [];

const getPlayersDataFromStratz = async () => {
    const limit = 5; // limit per one call to Stratz API

    const steamIds = PlayerConfigs.map(player => player.steamId);
    const steamIdsWithLimit = steamIds.reduce((resultArray, item, index) => { 
        const chunkIndex = Math.floor(index / limit);
      
        if(!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [];
        }
      
        resultArray[chunkIndex].push(item);
      
        return resultArray;
    }, [] as number[][]);

    const promises = steamIdsWithLimit.map((ids) => {
        return getPlayersData(ids);
    });

    const promisesData = await Promise.all(promises);
    const playersData = promisesData.map(data => data.players);
    return playersData.flat(1);
};

export const loadPlayers = async () => {
    const players = await getPlayersDataFromStratz();

    players.forEach(player => {
        const playerConfig = PlayerConfigs.find(
            playerConfig => player.steamAccount.id === playerConfig.steamId
        );

        if (!playerConfig) return;

        Players.push({
            ...player,
            name: playerConfig?.name,
            discordId: playerConfig?.discordId
        });
    });

    console.log('Players loaded!', Players);
};
