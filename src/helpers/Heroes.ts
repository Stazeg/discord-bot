import { HeroesResponse, getHeroesData } from '../api/heroes';

enum Attributes {
    Agility = 'agi',
    Strength = 'str',
    Intelligence = 'int',
    Universal = 'all'
}

enum AttackTypes {
    Melee = 'Melee',
    Ranged = 'Ranged'
}

enum RoleNames {
    Carry = 'Carry',
    Escape = 'Escape',
    Nuker = 'Nuker',
    Initiator = 'Initiator',
    Durable = 'Durable',
    Disabler = 'Disabler',
    Support = 'Support',
    Pusher = 'Pusher'
}

type Role = {
    roleId: RoleNames;
    level: number;
};
  
type Language = {
    lore: string;
    hype: string;
};

type Stats = {
    enabled: boolean;
    heroUnlockOrder: number;
    team: boolean;
    cMEnabled: boolean;
    newPlayerEnabled: boolean;
    attackType: AttackTypes;
    startingArmor: number;
    startingMagicArmor: number;
    startingDamageMin: number;
    startingDamageMax: number;
    attackRate: number;
    attackAnimationPoint: number;
    attackAcquisitionRange: number;
    attackRange: number;
    primaryAttribute: Attributes;
    strengthBase: number;
    strengthGain: number;
    intelligenceBase: number;
    intelligenceGain: number;
    agilityBase: number;
    agilityGain: number;
    hpRegen: number;
    mpRegen: number;
    moveSpeed: number;
    moveTurnRate: number;
    hpBarOffset: number;
    visionDaytimeRange: number;
    visionNighttimeRange: number;
    complexity: number;
    primaryAttributeEnum: string;
};
  
export type Hero = {
    id: number;
    displayName: string;
    shortName: string;
    roles: Role[];
    language: Language;
    stats: Stats;
};

export const Heroes: Hero[] = [];

export const loadHeroes = async () => {
    const { constants: { heroes } } = await getHeroesData() as HeroesResponse;
    heroes.forEach((value) => Heroes.push(value));
    console.log('Heroes loaded!');
};
