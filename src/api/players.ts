import { gql } from 'graphql-request';
import { getDataFromGraphQL } from '.';

type PlayersResponse = {
    players: PlayerData[];
};

type PlayerMatchCountResponse = {
    player: {
        matchCount: number;
    };
};

type SteamAccount = {
    id: number;
    name: string;
    avatar: string;
    profileUri: string;
    seasonRank: number;
};
  
type GuildMember = {
    guildId: number;
    joinDateTime: number;
    matchCount: number;
    winCount: number;
    imp: number;
};
  
type Activity = {
    activity: string;
};
  
export type PlayerData = {
    steamAccount: SteamAccount;
    matchCount: number;
    winCount: number;
    lastMatchDate: number;
    guildMember: GuildMember;
    activity: Activity;
};

export const getPlayerMatchCount = async (steamId: number) : Promise<PlayerMatchCountResponse> => {
    const query = `
    query($steamId: Long!) {
        player (steamAccountId: $steamId) {
            matchCount
        }
    }`;

    return getDataFromGraphQL(query, { steamId }) as Promise<PlayerMatchCountResponse>;
}

export const getPlayersData = async (steamIds: number[]) : Promise<PlayersResponse> => {
    const query = gql`
    query($steamIds: [Long]!) {
        players(steamAccountIds: $steamIds) {
            steamAccount {
                id
                name
                avatar
                profileUri
                seasonRank
            }
            matchCount
            winCount
            lastMatchDate
            guildMember {
                guildId
                joinDateTime
                matchCount
                winCount
                imp
            }
            activity {
                activity
            }
        }
    }`;

    return getDataFromGraphQL(query, { steamIds }) as Promise<PlayersResponse>;
};
