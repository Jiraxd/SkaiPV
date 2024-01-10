import { GivesStat } from "@/models/givesStat";
import { PlayerStats } from "@/models/playerStats";
import { ConvertNBTToJson } from "./NBTData";
import { PET_STATS } from "@/constants/pet-stats";
import { IStringIndex } from "@/components/PetsDisplay";
import { getPetLevel } from "./PetUtils";
import { PET_ITEMS } from "@/constants/pets";
import { GetSkillLvl } from "./getSkillLevel";

export async function CalculateStats(playerData:any, skillData:any){
    let array: PlayerStats[] = [
    ];
        const equipDataEncoded = playerData["inventory"]["equipment_contents"]["data"];
        const armorDataEncoded = playerData["inventory"]["inv_armor"]["data"];
      
    const armorValue = await ConvertNBTToJson(armorDataEncoded);
    const armorreversed = armorValue.reverse();
    let armorek: any[] = armorreversed.filter((x) => x["tag"] != null);
    const equipValue = await ConvertNBTToJson(equipDataEncoded);
    const equipreversed = equipValue.reverse();
    let equipment: any[] = equipreversed.filter((x) => x["tag"] != null);
    const activePet = (playerData["pets_data"]["pets"] as []).find((x) => x["active"] === true);
    let petstats = null;
    if(activePet){
    const pet = new (PET_STATS as IStringIndex)[activePet["type"]](
        activePet["tier"],
        getPetLevel(activePet["exp"], activePet["tier"], 100),
        null,
        playerData
      );
      petstats = pet?.stats;
      if (pet) {
        if (activePet["heldItem"]) {
          const petitem = PET_ITEMS.find(
            (item) => item.id === activePet["heldItem"]
          );

          if (petitem) {
            for (const stat in petitem.stats) {
              (petstats as IStringIndex)[stat] ??= 0;

              (petstats as IStringIndex)[stat] += (
                petitem.stats as IStringIndex
              )[stat];
            }

            for (const stat in petitem.statsPerLevel) {
              (petstats as IStringIndex)[stat] ??= 0;

              (petstats as IStringIndex)[stat] +=
                (petitem.statsPerLevel as IStringIndex)[stat] * pet.level.level;
            }

            for (const stat in petitem.multStats) {
              (petstats as IStringIndex)[stat] ??= 0;
              (petstats as IStringIndex)[stat] *= (
                petitem.multStats as IStringIndex
              )[stat];
            }

            if (petitem.multAllStats) {
              for (const stat in petstats) {
                (petstats as IStringIndex)[stat] *= petitem.multAllStats;
              }
            }
          }
        }
    }
    }
    const encodedInv =
      playerData["inventory"]["bag_contents"]["talisman_bag"]["data"];
      let accsPlayer = [];
      if (encodedInv != undefined) {
        const invContent = await ConvertNBTToJson(encodedInv);
        accsPlayer = await invContent.filter((acc) => acc["tag"] != null);
      }
    array.push(calculateHealth(playerData, armorek, equipment, petstats, accsPlayer, skillData));
    return array;

}
const getStatFromItems = (  playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any,
  stat:string
) => {
let statValue = 0;
let givesStats:GivesStat[] = [];
let armorGives = 0;
(armorData as []).forEach((armor) => {
  const line = (armor["tag"]["display"]["Lore"] as []).find((item) => (item as string).includes(stat + ": "));
  if(line){
      const parsedValue = getHealth(line);
      if(parsedValue > 0){
        statValue += parsedValue;
      armorGives += parsedValue;
     
      }
  }
});
if(armorGives > 0)
givesStats.push(new GivesStat("Armor", armorGives));
let equipGives = 0;
  (equipData as []).forEach((equip) => {
    const line = (equip["tag"]["display"]["Lore"] as []).find((item) => (item as string).includes(stat + ": "));
    if(line){
        const parsedValue = getHealth(line);
        if(parsedValue > 0){
          statValue += parsedValue;
        equipGives += parsedValue;
        }
    }
  });
  if(equipGives > 0)
  givesStats.push(new GivesStat("Equipment", equipGives));
  const petstat = (petStats as IStringIndex)["health"];
  if(petstat != null){
    statValue += petstat;
    givesStats.push(new GivesStat("Pet", petstat));
  }
  let accessoriesValue = 0;
  (accsData as []).forEach((equip) => {
    const line = (equip["tag"]["display"]["Lore"] as []).find((item) => (item as string).includes(stat + ": "));
    if(line){
        const parsedValue = getHealth(line);
        if(parsedValue > 0){
        statValue += parsedValue;
        accessoriesValue += parsedValue;
        
        }
    }
  });
  if(accessoriesValue > 0)
  givesStats.push(new GivesStat("Accessories", accessoriesValue));
  const powerHealth = playerData["accessory_bag_storage"]["tuning"]["slot_0"][stat.toLowerCase()];
  if(powerHealth > 0){
  statValue += powerHealth;
  givesStats.push(new GivesStat("Accs Power", powerHealth));
}
return [statValue, givesStats];
}
const calculateHealth = (
  playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any,
  skillData: any
): PlayerStats => {
const stats = getStatFromItems(playerData, armorData,equipData,petStats, accsData, "Health");
let healthValue = stats[0] as number;
const givesStats = stats[1] as GivesStat[];
 
const bestiaryClaimed = parseInt(playerData["bestiary"]["milestone"]["last_claimed_milestone"]);
if(bestiaryClaimed)
  if(bestiaryClaimed > 0)
  {
    healthValue += bestiaryClaimed * 2;
    givesStats.push(new GivesStat("Bestiary Milestones", bestiaryClaimed));
  }

const slayerStats = getSlayerHealth(playerData);
healthValue += slayerStats as number;
givesStats.push(new GivesStat("Slayers", slayerStats));

const skillStats = getSkillHealth(playerData, skillData);
healthValue += skillStats;
givesStats.push(new GivesStat("Skills", skillStats));
// upgrady
// sb level
// chip, operator, carrots

  let playerStats: PlayerStats = new PlayerStats("Health", healthValue, givesStats);
  return playerStats;
}

function getHealth(line:string):number{
    const regex = /\s*\+\d+\s*/;
    const match = (line as string).match(regex);
    if(match){
    const value = match.toString();
    const parsedValue = parseInt(value);
    return parsedValue;
    }
    else{
        return 0;
    }
}

function getSkillHealth(playerData:any, skillData:any){
const farmingLvl = GetSkillLvl(playerData, "FARMING", skillData);
const fishingLvl = GetSkillLvl(playerData, "FISHING", skillData);
const lvls = [farmingLvl, fishingLvl];
let health = 0;
lvls.forEach((lvl) => {
if(lvl >= 14){
health += 14 * 2;
if(lvl >= 19){
  health += 5 * 3;
  if(lvl >= 25){
    health += 6 * 4;
    health += lvl - 25 * 5;
  }
  else health += lvl - 19 * 4;
}
else health += lvl - 14 * 3;
}
else health += lvl * 2;
});
return health;
}

function getSlayerHealth(playerData: any){
  let healthValue = 0;
  const blazeArray = Object.keys(playerData["slayer"]["slayer_bosses"]["blaze"]["claimed_levels"]);
  const blazeSlayerLvl = blazeArray.length > 1 ? parseInt(blazeArray[blazeArray.length - 1].charAt(blazeArray[blazeArray.length - 1].length)) : 0;
  switch(blazeSlayerLvl){
    case 1:
      healthValue += 3;
    break;
    case 2:
      healthValue += 3;
    break;
    case 3:
      healthValue += 7;;
    break;
    case 4:
      healthValue += 7;
    break;
    case 5:
      healthValue += 12;
    break;
    case 6:
      healthValue += 12;;
    break;
    case 7:
      healthValue += 18;
    break;
    case 8:
      healthValue += 18;
    break;
    case 9:
      healthValue += 25;
    break;
  }
  const enderArray = Object.keys(playerData["slayer"]["slayer_bosses"]["enderman"]["claimed_levels"]);
  const enderLvl = enderArray.length > 1 ? parseInt(enderArray[enderArray.length - 1].charAt(enderArray[enderArray.length - 1].length)) : 0;
  switch(enderLvl){
    case 1:
      healthValue += 1;
    break;
    case 2:
      healthValue += 1;
    break;
    case 3:
      healthValue += 3;
    break;
    case 4:
      healthValue += 3;
    break;
    case 5:
      healthValue += 6;
    break;
    case 6:
      healthValue += 6;
    break;
    case 7:
      healthValue += 10;
    break;
    case 8:
      healthValue += 10;
    break;
    case 9:
      healthValue += 15;
    break;
  }
  const wolfArray = Object.keys(playerData["slayer"]["slayer_bosses"]["wolf"]["claimed_levels"]);
  const wolfLvl = wolfArray.length > 1 ? parseInt(wolfArray[wolfArray.length - 1].charAt(wolfArray[wolfArray.length - 1].length)) : 0;
  switch(wolfLvl){
    case 1:
      healthValue += 0;
    break;
    case 2:
      healthValue += 2;;
    break;
    case 3:
      healthValue += 2;
    break;
    case 4:
      healthValue += 4;
    break;
    case 5:
      healthValue += 4;
    break;
    case 6:
      healthValue += 7;
    break;
    case 7:
      healthValue += 7;
    break;
    case 8:
      healthValue += 7;
    break;
    case 9:
      healthValue += 12;
    break;
  }
  const zombieArray = Object.keys(playerData["slayer"]["slayer_bosses"]["zombie"]["claimed_levels"]);
  const zombieLvl = zombieArray.length > 1 ? parseInt(zombieArray[zombieArray.length - 1].charAt(zombieArray[zombieArray.length - 1].length)) : 0;
  switch(zombieLvl){
    case 1:
      healthValue += 2;
    break;
    case 2:
      healthValue += 4;
    break;
    case 3:
      healthValue += 7;
    break;
    case 4:
      healthValue += 10;
    break;
    case 5:
      healthValue += 14;
    break;
    case 6:
      healthValue += 18;
    break;
    case 7:
      healthValue += 23;
    break;
    case 8:
      healthValue += 28;
    break;
    case 9:
      healthValue += 34;
    break;
  }
  return healthValue;
}