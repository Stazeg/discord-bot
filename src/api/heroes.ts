import { Hero } from '../helpers/Heroes';
import { getDataFromGraphQL } from '.';

export type HeroesResponse = {
    constants: {
        heroes: Hero[]
    };
};

export const getHeroesData = async () => {
    const query = `
    {
        constants {
            heroes {
                id
                displayName
                shortName
                roles {
                    roleId
                    level
                }
                language {
                    lore
                    hype
                }
                stats {
                    enabled
                    heroUnlockOrder
                    team
                    cMEnabled
                    newPlayerEnabled
                    attackType
                    startingArmor
                    startingMagicArmor
                    startingDamageMin
                    startingDamageMax
                    attackRate
                    attackAnimationPoint
                    attackAcquisitionRange
                    attackRange
                    primaryAttribute
                    strengthBase
                    strengthGain
                    intelligenceBase
                    intelligenceGain
                    agilityBase
                    agilityGain
                    hpRegen
                    mpRegen
                    moveSpeed
                    moveTurnRate
                    hpBarOffset
                    visionDaytimeRange
                    visionNighttimeRange
                    complexity
                    primaryAttributeEnum
                }
            } 
        }
    }`;

    return getDataFromGraphQL(query);
};
