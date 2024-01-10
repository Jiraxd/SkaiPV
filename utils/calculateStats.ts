import { GivesStat } from "@/models/givesStat";
import { PlayerStats } from "@/models/playerStats";
import { ConvertNBTToJson } from "./NBTData";
import { PET_STATS } from "@/constants/pet-stats";
import { IStringIndex } from "@/components/PetsDisplay";
import { getPetLevel } from "./PetUtils";
import { PET_ITEMS } from "@/constants/pets";

export async function CalculateStats(playerData: any){
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
    array.push(calculateHealth(playerData, armorek, equipment, petstats, accsPlayer));
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
  accsData: any
): PlayerStats => {
const stats = getStatFromItems(playerData, armorData,equipData,petStats, accsData, "Health");
const healthValue = stats[0];
const givesStats = stats[1];
 


// bestiary
// potiony
// skilly
// upgrady
// sb level

  let playerStats: PlayerStats = new PlayerStats("Health", (healthValue as number), givesStats as GivesStat[]);
  console.log(playerStats);
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