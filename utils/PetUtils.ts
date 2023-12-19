import { PET_STATS } from "@/constants/pet-stats";

const PET_RARITY_OFFSET = [
    { name: "common", value: 0 },
    { name: "uncommon", value: 6 },
    { name: "rare", value: 11 },
    { name: "epic", value: 16 },
    { name: "legendary", value: 20 },
    { name: "mythic", value: 20 }
];

  
const PET_LEVELS = [
    100, 110, 120, 130, 145, 160, 175, 190, 210, 230, 250, 275, 300, 330, 360, 400, 440, 490, 540, 600, 660, 730, 800,
    880, 960, 1050, 1150, 1260, 1380, 1510, 1650, 1800, 1960, 2130, 2310, 2500, 2700, 2920, 3160, 3420, 3700, 4000, 4350,
    4750, 5200, 5700, 6300, 7000, 7800, 8700, 9700, 10800, 12000, 13300, 14700, 16200, 17800, 19500, 21300, 23200, 25200,
    27400, 29800, 32400, 35200, 38200, 41400, 44800, 48400, 52200, 56200, 60400, 64800, 69400, 74200, 79200, 84700, 90700,
    97200, 104200, 111700, 119700, 128200, 137200, 146700, 156700, 167700, 179700, 192700, 206700, 221700, 237700, 254700,
    272700, 291700, 311700, 333700, 357700, 383700, 411700, 441700, 476700, 516700, 561700, 611700, 666700, 726700,
    791700, 861700, 936700, 1016700, 1101700, 1191700, 1286700, 1386700, 1496700, 1616700, 1746700, 1886700, 0, 5555,
    1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700,
    1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700,
    1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700,
    1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700,
    1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700,
    1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700,
    1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700,
    1886700, 1886700, 1886700, 1886700, 1886700, 1886700, 1886700,
  ];

export function getPetLevel(petExp: number, offsetRarity: string, maxLevel: number) {
    const rarityOffset = PET_RARITY_OFFSET.find(f => f.name === offsetRarity.toLowerCase())?.value || 0;
    const levels = PET_LEVELS.slice(rarityOffset, rarityOffset + maxLevel - 1);
  
    const xpMaxLevel = levels.reduce((a:any, b:any) => a + b, 0);
    let xpTotal = 0;
    let level = 1;
  
    let xpForNext = Infinity;
  
    for (let i = 0; i < maxLevel; i++) {
      xpTotal += levels[i];
  
      if (xpTotal > petExp) {
        xpTotal -= levels[i];
        break;
      } else {
        level++;
      }
    }
  
    let xpCurrent = Math.floor(petExp - xpTotal);
    let progress;
  
    if (level < maxLevel) {
      xpForNext = Math.ceil(levels[level - 1]);
      progress = Math.max(0, Math.min(xpCurrent / xpForNext, 1));
    } else {
      level = maxLevel;
      xpCurrent = petExp - levels[maxLevel - 1];
      xpForNext = 0;
      progress = 1;
    }
  
    return {
      level,
      xpCurrent,
      xpForNext,
      progress,
      xpMaxLevel,
    };
  }

 export function createPetInstance(activePet:any, profileData:any) {
    let petInstance;
  
    switch (activePet["type"]) {
      case "AMMONITE":
        petInstance = new PET_STATS.AMMONITE(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "ARMADILLO":
        petInstance = new PET_STATS.ARMADILLO(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "BABY_YETI":
        petInstance = new PET_STATS.BABY_YETI(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "BAL":
        petInstance = new PET_STATS.BAL(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "BAT":
        petInstance = new PET_STATS.BAT(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "BEE":
        petInstance = new PET_STATS.BEE(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "BINGO":
        petInstance = new PET_STATS.BINGO(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "BLACK_CAT":
        petInstance = new PET_STATS.BLACK_CAT(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "BLAZE":
        petInstance = new PET_STATS.BLAZE(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "BLUE_WHALE":
        petInstance = new PET_STATS.BLUE_WHALE(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "CHICKEN":
        petInstance = new PET_STATS.CHICKEN(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "DOLPHIN":
        petInstance = new PET_STATS.DOLPHIN(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "DROPLET_WISP":
        petInstance = new PET_STATS.DROPLET_WISP(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "FROST_WISP":
        petInstance = new PET_STATS.FROST_WISP(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "GLACIAL_WISP":
        petInstance = new PET_STATS.GLACIAL_WISP(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "SUBZERO_WISP":
        petInstance = new PET_STATS.SUBZERO_WISP(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "EERIE":
        petInstance = new PET_STATS.EERIE(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "ELEPHANT":
        petInstance = new PET_STATS.ELEPHANT(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "ENDER_DRAGON":
        petInstance = new PET_STATS.ENDER_DRAGON(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "ENDERMAN":
        petInstance = new PET_STATS.ENDERMAN(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "ENDERMITE":
        petInstance = new PET_STATS.ENDERMITE(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "FLYING_FISH":
        petInstance = new PET_STATS.FLYING_FISH(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "GHOUL":
        petInstance = new PET_STATS.GHOUL(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "GIRAFFE":
        petInstance = new PET_STATS.GIRAFFE(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "GOLDEN_DRAGON":
        petInstance = new PET_STATS.GOLDEN_DRAGON(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "GOLEM":
        petInstance = new PET_STATS.GOLEM(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "GRANDMA_WOLF":
        petInstance = new PET_STATS.GRANDMA_WOLF(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "GRIFFIN":
        petInstance = new PET_STATS.GRIFFIN(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "GUARDIAN":
        petInstance = new PET_STATS.GUARDIAN(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "HORSE":
        petInstance = new PET_STATS.HORSE(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "HOUND":
        petInstance = new PET_STATS.HOUND(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "JELLYFISH":
        petInstance = new PET_STATS.JELLYFISH(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "JERRY":
        petInstance = new PET_STATS.JERRY(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "KUUDRA":
        petInstance = new PET_STATS.KUUDRA(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "LION":
        petInstance = new PET_STATS.LION(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "MAGMA_CUBE":
        petInstance = new PET_STATS.MAGMA_CUBE(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "MEGALODON":
        petInstance = new PET_STATS.MEGALODON(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "MITHRIL_GOLEM":
        petInstance = new PET_STATS.MITHRIL_GOLEM(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "MONKEY":
        petInstance = new PET_STATS.MONKEY(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "FRACTURED_MONTEZUMA_SOUL":
        petInstance = new PET_STATS.FRACTURED_MONTEZUMA_SOUL(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "MOOSHROOM_COW":
        petInstance = new PET_STATS.MOOSHROOM_COW(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "OCELOT":
        petInstance = new PET_STATS.OCELOT(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "PARROT":
        petInstance = new PET_STATS.PARROT(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "PHOENIX":
        petInstance = new PET_STATS.PHOENIX(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "PIG":
        petInstance = new PET_STATS.PIG(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "PIGMAN":
        petInstance = new PET_STATS.PIGMAN(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "RABBIT":
        petInstance = new PET_STATS.RABBIT(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "RAT":
        petInstance = new PET_STATS.RAT(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "REINDEER":
        petInstance = new PET_STATS.REINDEER(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "RIFT_FERRET":
        petInstance = new PET_STATS.RIFT_FERRET(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "ROCK":
        petInstance = new PET_STATS.ROCK(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "SCATHA":
        petInstance = new PET_STATS.SCATHA(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "SHEEP":
        petInstance = new PET_STATS.SHEEP(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
      case "SILVERFISH":
        petInstance = new PET_STATS.SILVERFISH(
          activePet["tier"],
          getPetLevel(activePet["exp"], activePet["tier"], 100),
          null,
          profileData
        );
        break;
  
        case "SLUG":
            petInstance = new PET_STATS.SLUG(
              activePet["tier"],
              getPetLevel(activePet["exp"], activePet["tier"], 100),
              null,
              profileData
            );
            break;
      
          case "SKELETON_HORSE":
            petInstance = new PET_STATS.SKELETON_HORSE(
              activePet["tier"],
              getPetLevel(activePet["exp"], activePet["tier"], 100),
              null,
              profileData
            );
            break;
      
          case "SKELETON":
            petInstance = new PET_STATS.SKELETON(
              activePet["tier"],
              getPetLevel(activePet["exp"], activePet["tier"], 100),
              null,
              profileData
            );
            break;
      
          case "SNAIL":
            petInstance = new PET_STATS.SNAIL(
              activePet["tier"],
              getPetLevel(activePet["exp"], activePet["tier"], 100),
              null,
              profileData
            );
            break;
      
          case "SNOWMAN":
            petInstance = new PET_STATS.SNOWMAN(
              activePet["tier"],
              getPetLevel(activePet["exp"], activePet["tier"], 100),
              null,
              profileData
            );
            break;
      
          case "SPIDER":
            petInstance = new PET_STATS.SPIDER(
              activePet["tier"],
              getPetLevel(activePet["exp"], activePet["tier"], 100),
              null,
              profileData
            );
            break;
      
          case "SPIRIT":
            petInstance = new PET_STATS.SPIRIT(
              activePet["tier"],
              getPetLevel(activePet["exp"], activePet["tier"], 100),
              null,
              profileData
            );
            break;
      
          case "SQUID":
            petInstance = new PET_STATS.SQUID(
              activePet["tier"],
              getPetLevel(activePet["exp"], activePet["tier"], 100),
              null,
              profileData
            );
            break;
      
          case "TARANTULA":
            petInstance = new PET_STATS.TARANTULA(
              activePet["tier"],
              getPetLevel(activePet["exp"], activePet["tier"], 100),
              null,
              profileData
            );
            break;
      
          case "TIGER":
            petInstance = new PET_STATS.TIGER(
              activePet["tier"],
              getPetLevel(activePet["exp"], activePet["tier"], 100),
              null,
              profileData
            );
            break;
      
          case "TURTLE":
            petInstance = new PET_STATS.TURTLE(
              activePet["tier"],
              getPetLevel(activePet["exp"], activePet["tier"], 100),
              null,
              profileData
            );
            break;
      
          case "WITHER_SKELETON":
            petInstance = new PET_STATS.WITHER_SKELETON(
              activePet["tier"],
              getPetLevel(activePet["exp"], activePet["tier"], 100),
              null,
              profileData
            );
            break;
      
          case "ZOMBIE":
            petInstance = new PET_STATS.ZOMBIE(
              activePet["tier"],
              getPetLevel(activePet["exp"], activePet["tier"], 100),
              null,
              profileData
            );
            break;
      
          default:
            // Handle unknown pet types or provide a default case
            console.error("Unknown pet type:", activePet["type"]);
            break;
        }
      
        return petInstance;
      }
      
  
  