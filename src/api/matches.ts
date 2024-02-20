import { getDataFromGraphQL } from '.';

type SteamAccount = {
    id: number;
    name: string;
};
  
export type MatchPlayerData = {
    matchId: number;
    playerSlot: number;
    steamAccount: SteamAccount;
    isRadiant: boolean;
    isVictory: boolean;
    heroId: number;
    gameVersionId: number;
    kills: number;
    deaths: number;
    assists: number;
    leaverStatus: string;
    numLastHits: number;
    numDenies: number;
    goldPerMinute: number;
    networth: number;
    experiencePerMinute: number;
    level: number;
    gold: number;
    goldSpent: number;
    heroDamage: number;
    towerDamage: number;
    heroHealing: number;
    partyId: number;
    isRandom: boolean;
    lane: string;
    position: string;
    streakPrediction: null;
    intentionalFeeding: boolean;
    role: string;
    roleBasic: string;
    imp: number;
    award: string;
    item0Id: number;
    item1Id: number | null;
    item2Id: number;
    item3Id: number;
    item4Id: number;
    item5Id: number;
    backpack0Id: number | null;
    backpack1Id: number;
    backpack2Id: number;
    neutral0Id: number;
    behavior: number;
    invisibleSeconds: number;
    dotaPlusHeroXp: number;
};

export enum LobbyTypes {
    UNRANKED = 'UNRANKED',
    PRACTICE = 'PRACTICE',
    TOURNAMENT = 'TOURNAMENT',
    TUTORIAL = 'TUTORIAL',
    COOP_VS_BOTS = 'COOP_VS_BOTS',
    TEAM_MATCH = 'TEAM_MATCH',
    SOLO_QUEUE = 'SOLO_QUEUE',
    RANKED = 'RANKED',
    SOLO_MID = 'SOLO_MID',
    BATTLE_CUP = 'BATTLE_CUP',
    EVENT = 'EVENT',
    DIRE_TIDE = 'DIRE_TIDE'
};
  
export type Match = {
    id: number;
    startDateTime: number;
    endDateTime: number;
    durationSeconds: number;
    lobbyType: LobbyTypes;
    gameMode: string;
    averageRank: null;
    averageImp: number;
    parsedDateTime: number;
    direKills: number[];
    radiantKills: number[];
    players: MatchPlayerData[];
};

export const getPlayerMatchId = async (steamId: number) : Promise<number> => {
    const query = `
    query($steamId: Long!) {
        player(steamAccountId: $steamId) {
            matches (request:{ take: 1 }) {
                id
            }
        }
    }`;

    const data = await getDataFromGraphQL(query, { steamId }) as { player: { matches: [ { id: number } ] } };
    console.log(data);
    return data.player.matches[0].id;
}

export const getMatchData = async (matchId: number) : Promise<Match> => {
    const query = `
    query($matchId: Long!) {
        match(id: $matchId) {
            id
            startDateTime
            endDateTime
            durationSeconds
            lobbyType
            gameMode
            averageRank
            averageImp
            parsedDateTime
            radiantKills
            direKills
            players {
                matchId
                playerSlot
                steamAccount {
                    id
                    name
                }
                isRadiant
                isVictory
                heroId
                kills
                deaths
                assists
                leaverStatus
                numLastHits
                numDenies
                goldPerMinute
                networth
                experiencePerMinute
                level
                gold
                goldSpent
                heroDamage
                towerDamage
                heroHealing
                partyId
                isRandom
                lane
                position
                streakPrediction
                intentionalFeeding
                role
                roleBasic
                imp
                award
                item0Id
                item1Id
                item2Id
                item3Id
                item4Id
                item5Id
                backpack0Id
                backpack1Id
                backpack2Id
                neutral0Id
                behavior
                invisibleSeconds
                dotaPlusHeroXp
            }
        }
    }`;

    const data = await getDataFromGraphQL(query, { matchId }) as { match: Match };
    return data.match;
};
