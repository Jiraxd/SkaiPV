import { GivesStat } from "@/models/givesStat";
import { PlayerStats } from "@/models/playerStats";
import { ConvertNBTToJson } from "./NBTData";
import { PET_STATS } from "@/constants/pet-stats";
import { IStringIndex } from "@/components/PetsDisplay";
import { getPetLevel } from "./PetUtils";
import { PET_ITEMS } from "@/constants/pets";
import { GetSkillLvl } from "./getSkillLevel";

export async function CalculateStats(playerData: any, skillData: any) {
  let array: PlayerStats[] = [
  ];
  if(playerData["inventory"] == null) return "disabled";
  if(playerData["inventory"] == undefined) return "disabled";
  
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
  let petName = "";
  if (activePet) {
    const pet = new (PET_STATS as IStringIndex)[activePet["type"]](
      activePet["tier"],
      getPetLevel(activePet["exp"], activePet["tier"], 100),
      null,
      playerData
    );
    petName = activePet["type"];
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
  let petscore: number = 0;
  const uniquePets: string[] = [];
  const petlistFinished: any[] = (playerData["pets_data"]["pets"] as []);

  if(petlistFinished){
    if(petlistFinished.length > 0){
  petlistFinished.forEach((p) => {
    if (!uniquePets.includes(p["type"])) uniquePets.push(p);
  });
  uniquePets.forEach((p: any) => {
    const pet = new (PET_STATS as IStringIndex)[p["type"]](
      p["tier"],
      getPetLevel(p["exp"], p["tier"], 100),
      null,
      playerData
    );
    if (pet["level"]["level"] === 100) petscore++;
    if (p["tier"] === "COMMON") petscore++;
    else if (p["tier"] === "UNCOMMON") petscore = petscore + 2;
    else if (p["tier"] === "RARE") petscore = petscore + 3;
    else if (p["tier"] === "EPIC") petscore = petscore + 4;
    else if (p["tier"] === "LEGENDARY") petscore = petscore + 5;
    else if (p["tier"] === "MYTHIC") petscore = petscore + 6;
  });
}
}
  array.push(calculateHealth(playerData, armorek, equipment, petstats, accsPlayer, skillData));
  array.push(calculateDefense(playerData, armorek, equipment, petstats, accsPlayer, skillData));
  array.push(calculateSpeed(playerData, armorek, equipment, petstats, accsPlayer, skillData, petName));
  array.push(calculateStrength(playerData, armorek, equipment, petstats, accsPlayer, skillData));
  array.push(calculateInt(playerData, armorek, equipment, petstats, accsPlayer, skillData));
  array.push(calculateCritChance(playerData, armorek, equipment, petstats, accsPlayer, skillData));
  array.push(calculateCritDamage(playerData, armorek, equipment, petstats, accsPlayer, skillData));
  array.push(calculateAttackSpeed(playerData, armorek, equipment, petstats, accsPlayer));
  array.push(calculateMagicFind(playerData, armorek, equipment, petstats, accsPlayer, petscore));
  array.push(calculatePetLuck(playerData, armorek, equipment, petstats, accsPlayer, skillData));
  array.push(calculateScChance(playerData, armorek, equipment, petstats, accsPlayer, skillData));
  array.push(calculateFishingSpeed(playerData, armorek, equipment, petstats, accsPlayer));
 array.push(calculateTrueDefense(playerData, armorek, equipment, petstats, accsPlayer));
  array.push(calculateFerocity(playerData, armorek, equipment, petstats, accsPlayer));
  console.log(array);
  return array;

}
const calculateFerocity = (
  playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any
): PlayerStats => {
  const stats = getStatFromItems(playerData, armorData, equipData, petStats, accsData, "Ferocity");
  let statValue = (stats[0] as number);
  const givesStats = stats[1] as GivesStat[];
  const playerStats: PlayerStats = new PlayerStats("Ferocity", statValue, givesStats);
  return playerStats;
}
const calculateTrueDefense = (
  playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any
): PlayerStats => {
  const stats = getStatFromItems(playerData, armorData, equipData, petStats, accsData, "True Defense");
  let statValue = (stats[0] as number);
  const givesStats = stats[1] as GivesStat[];
const slayerGives = getSlayerTrueDef(playerData);
if(slayerGives > 0){
  statValue += slayerGives;
  givesStats.push(new GivesStat("Slayer", slayerGives));
}
let PotionLevel = 0;
  const Pot = (playerData["player_data"]["active_effects"] as []).find((f) => f["effect"] === "true_defense");
  if(Pot){
    PotionLevel = Pot["level"];
  }
  if(PotionLevel != 0){
    const potionAdd = PotionToTrueDef[PotionLevel - 1];
    statValue += potionAdd;
    givesStats.push(new GivesStat("Potion", potionAdd));
  }
  const playerStats: PlayerStats = new PlayerStats("True Defense", statValue, givesStats);
  return playerStats;
}
const calculateFishingSpeed = (
  playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any
): PlayerStats => {
  const stats = getStatFromItems(playerData, armorData, equipData, petStats, accsData, "Fishing Speed");
  let statValue = (stats[0] as number);
  const givesStats = stats[1] as GivesStat[];
  const playerStats: PlayerStats = new PlayerStats("Fishing Speed", statValue, givesStats);
  return playerStats;
}
const calculateScChance = (
  playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any,
  skillData: any
): PlayerStats => {
  const stats = getStatFromItems(playerData, armorData, equipData, petStats, accsData, "Sea Creature Chance");
  let statValue = (stats[0] as number);
  const givesStats = stats[1] as GivesStat[];
  statValue += 20;
  givesStats.push(new GivesStat("Base Value", 20));
  const playerStats: PlayerStats = new PlayerStats("SC Chance", statValue, givesStats);
  return playerStats;
}
const calculatePetLuck = (
  playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any,
  skillData: any
): PlayerStats => {
  const stats = getStatFromItems(playerData, armorData, equipData, petStats, accsData, "Pet Luck");
  let statValue = (stats[0] as number);
  const givesStats = stats[1] as GivesStat[];
  const lvl = GetSkillLvl(playerData, "TAMING", skillData);
  statValue += lvl;
  givesStats.push(new GivesStat("Skills", lvl));
  let PotionLevel = 0;
  const Pot = (playerData["player_data"]["active_effects"] as []).find((f) => f["effect"] === "pet_luck");
  if(Pot){
    PotionLevel = Pot["level"];
  }
  if(PotionLevel != 0){
    const potionAdd = PotionToPetLuck[PotionLevel - 1];
    statValue += potionAdd;
    givesStats.push(new GivesStat("Potion", potionAdd));
  }
  const playerStats: PlayerStats = new PlayerStats("Pet Luck", statValue, givesStats);
  return playerStats;
}
const calculateMagicFind = (
  playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any,
  petscore:any
): PlayerStats => {
  const stats = getStatFromItems(playerData, armorData, equipData, petStats, accsData, "Magic Find");
  let statValue = (stats[0] as number);
  const givesStats = stats[1] as GivesStat[];
  let bonusmf = 0;
  if (petscore >= 10 && petscore < 25) bonusmf = 1;
  else if (petscore >= 25 && petscore < 50) bonusmf = 2;
  else if (petscore >= 50 && petscore < 75) bonusmf = 3;
  else if (petscore >= 50 && petscore < 100) bonusmf = 4;
  else if (petscore >= 75 && petscore < 130) bonusmf = 5;
  else if (petscore >= 100 && petscore < 175) bonusmf = 6;
  else if (petscore >= 130 && petscore < 225) bonusmf = 7;
  else if (petscore >= 175 && petscore < 275) bonusmf = 8;
  else if (petscore >= 225 && petscore < 325) bonusmf = 9;
  else if (petscore >= 325) bonusmf = 10;
  if(bonusmf > 0){
    statValue += bonusmf;
    givesStats.push(new GivesStat("Pet Score", bonusmf));
  }
  let PotionLevel = 0;
  const Pot = (playerData["player_data"]["active_effects"] as []).find((f) => f["effect"] === "magic_find");
  if(Pot){
    PotionLevel = Pot["level"];
  }
  if(PotionLevel != 0){
    const potionAdd = PotionToMagicFind[PotionLevel - 1];
    statValue += potionAdd;
    givesStats.push(new GivesStat("Potion", potionAdd));
  }
  const playerStats: PlayerStats = new PlayerStats("Magic Find", statValue, givesStats);
  return playerStats;
}
const calculateAttackSpeed = (
  playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any
): PlayerStats => {
  const stats = getStatFromItems(playerData, armorData, equipData, petStats, accsData, "Bonus Attack Speed");
  let statValue = (stats[0] as number);
  const givesStats = stats[1] as GivesStat[];
  const playerStats: PlayerStats = new PlayerStats("Attack Speed", statValue, givesStats);
  return playerStats;
}

const calculateCritDamage = (
  playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any,
  skillData: any
): PlayerStats => {
  const stats = getStatFromItems(playerData, armorData, equipData, petStats, accsData, "Crit Damage");
  let statValue = (stats[0] as number);
  const givesStats = stats[1] as GivesStat[];
  statValue += 50;
  givesStats.push(new GivesStat("Base Value", 50));
  const slayerStats = getSlayerCritDmg(playerData);
  if(slayerStats > 0){
    statValue += slayerStats;
    givesStats.push(new GivesStat("Slayers", slayerStats));
  }
  let PotionLevel = 0;
  const Pot = (playerData["player_data"]["active_effects"] as []).find((f) => f["effect"] === "critical");
  if(Pot){
    PotionLevel = Pot["level"];
  }
  if(PotionLevel != 0){
    const potionAdd = PotionToCritDmg[PotionLevel - 1];
    statValue += potionAdd;
    givesStats.push(new GivesStat("Potion", potionAdd));
  }
  const playerStats: PlayerStats = new PlayerStats("Crit Damage", statValue, givesStats);
  return playerStats;
}

const calculateCritChance = (
  playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any,
  skillData: any
): PlayerStats => {
  const stats = getStatFromItems(playerData, armorData, equipData, petStats, accsData, "Crit Chance");
  let statValue = (stats[0] as number);
  const givesStats = stats[1] as GivesStat[];
  statValue += 30;
  givesStats.push(new GivesStat("Base Value", 30));
  const lvl = GetSkillLvl(playerData, "COMBAT", skillData);
  statValue += lvl * 0.5;
  givesStats.push(new GivesStat("Skills", lvl * 0.5));
  const regex = /[^\d]/g;
  const spdierArray = Object.keys(playerData["slayer"]["slayer_bosses"]["spider"]["claimed_levels"]);
  const spiderLvl = spdierArray.length > 1 ? parseInt(spdierArray[spdierArray.length - 1].replace(regex, "")) : 0;
  if(spiderLvl >= 7){
    statValue += 1;
    givesStats.push(new GivesStat("Slayers", 1));
  }
  let PotionLevel = 0;
  const Pot = (playerData["player_data"]["active_effects"] as []).find((f) => f["effect"] === "critical");
  if(Pot){
    PotionLevel = Pot["level"];
  }
  if(PotionLevel != 0){
    const potionAdd = PotionToCritChance[PotionLevel - 1];
    statValue += potionAdd;
    givesStats.push(new GivesStat("Potion", potionAdd));
  }
  const playerStats: PlayerStats = new PlayerStats("Crit Chance", statValue, givesStats);
  return playerStats;
}



const calculateInt = (
  playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any,
  skillData: any
): PlayerStats => {
  const stats = getStatFromItems(playerData, armorData, equipData, petStats, accsData, "Intelligence");
  let statValue = (stats[0] as number);
  const givesStats = stats[1] as GivesStat[];
  const intUpgrade = playerData["player_data"]["perks"]["permanent_intelligence"]
  if (intUpgrade) {
    statValue += intUpgrade;
    givesStats.push(new GivesStat("Perks", intUpgrade));
  }
  const skillValue = getSkillInt(playerData, skillData);
statValue += skillValue;
givesStats.push(new GivesStat("Skills", skillValue));
const harp = Object.keys(playerData["quests"]["harp_quest"]);
let harpGives = 0;
if(harp){
const temp = harp.filter((f) => f.includes("perfect"));
const count = temp.length;
if(count <= 3) harpGives = count;
else if(count <= 6) harpGives = (count - 3) * 2 + 3;
else if(count <= 9) harpGives = (count - 6) * 3 + 9;
else if(count <= 11) harpGives = (count - 8) * 4 + 18;
else if(count === 12) harpGives = (count - 9) * 4 + 19;
else if(count === 13) harpGives = (count - 11) * 4 + 20;
}
if(harpGives > 0){
  givesStats.push(new GivesStat("Harp Completion", harpGives));
}
  const playerStats: PlayerStats = new PlayerStats("Intelligence", Math.floor(statValue), givesStats);
  return playerStats;
}

const calculateStrength = (
  playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any,
  skillData: any
): PlayerStats => {
  const stats = getStatFromItems(playerData, armorData, equipData, petStats, accsData, "Strength");
  let statValue = (stats[0] as number);
  const givesStats = stats[1] as GivesStat[];
  const blazeSlayerGives = getSlayerStrength(playerData);
  if(blazeSlayerGives > 0){
    statValue += blazeSlayerGives;
    givesStats.push(new GivesStat("Slayers", blazeSlayerGives));
  }
  const strengthUpgrade = playerData["player_data"]["perks"]["permanent_strength"]
  if (strengthUpgrade) {
    statValue += strengthUpgrade;
    givesStats.push(new GivesStat("Perks", strengthUpgrade));
  }
  let speedPotionLevel = 0;
  const speedPot = (playerData["player_data"]["active_effects"] as []).find((f) => f["effect"] === "strength");
  if(speedPot){
    speedPotionLevel = speedPot["level"];
  }
  if(speedPotionLevel != 0){
    const potionAdd = PotionToStrength[speedPotionLevel - 1];
    statValue += potionAdd;
    givesStats.push(new GivesStat("Potion", potionAdd));
  }
  const levelUnformatted = playerData["leveling"][
    "experience"
  ] as number;
  const sblevel = Math.floor(levelUnformatted / 100);
  const valueStr = Math.floor(sblevel / 5);
  statValue += valueStr;
  givesStats.push(new GivesStat("SB Level", valueStr));
const strengthSkill = getSkillStrength(playerData, skillData);
statValue += strengthSkill;
givesStats.push(new GivesStat("Skills", strengthSkill));
  const playerStats: PlayerStats = new PlayerStats("Strength", Math.floor(statValue), givesStats);
  return playerStats;
}

const PotionToSpeed: number[] = [
5, 10, 15, 20,25,30,35,40
];
const PotionToStrength: number[] = [
  5,	12.5,	20,	30,	40,	50,	60,	75
  ];

  const PotionToCritChance: number[] = [
    10,	15, 20, 25
    ];
    const PotionToCritDmg: number[] = [
      10, 20, 30,40
      ];
      const PotionToMagicFind: number[] = [
        10,25,50,75
        ];
        const PotionToPetLuck: number[] = [
          5,10,15,20
          ];
          const PotionToTrueDef: number[] = [
            5,10,15,20
            ];

const calculateSpeed = (
  playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any,
  skillData: any,
  petName: any
): PlayerStats => {
  const stats = getStatFromItems(playerData, armorData, equipData, petStats, accsData, "Speed");
  let statValue = (stats[0] as number);
  const givesStats = stats[1] as GivesStat[];
  statValue += 100;
  givesStats.push(new GivesStat("Base Value", 100));
  const speedUpgrade = playerData["player_data"]["perks"]["permanent_speed"]
  if (speedUpgrade) {
    statValue += speedUpgrade;
    givesStats.push(new GivesStat("Perks", speedUpgrade));
  }
  const slayerStats = getSlayerSpeed(playerData);
  statValue += slayerStats as number;



  givesStats.push(new GivesStat("Slayers", slayerStats));
  let youngDragonCount = 0;
  let hasRacing = false;
  let hasBlackCat = false;
  let hasRancher = false;
  let RancherCap = 400;
  let hasSnail = false;
  let hasWarden = false;
  let speedPotionLevel = 0;

  const speedPot = (playerData["player_data"]["active_effects"] as []).find((f) => f["effect"] === "speed");

  if(speedPot){
    speedPotionLevel = speedPot["level"];
  }
  if(speedPotionLevel != 0){
    const speedAdd = PotionToSpeed[speedPotionLevel - 1];
    statValue += speedAdd;
    givesStats.push(new GivesStat("Potion", speedAdd));
  }

  if (armorData) {
    (armorData as []).forEach((armor) => {
      if ((armor["tag"]["display"]["Name"] as string).includes("Young Dragon")) youngDragonCount++;
      if ((armor["tag"]["display"]["Name"] as string).includes("Racing")) hasRacing = true;
      if ((armor["tag"]["display"]["Name"] as string).includes("Rancher")) {
        hasRancher = true;
        const line = (armor["tag"]["display"]["Lore"] as string[]).find((f) => f.includes("Current Speed Cap:"));
        console.log(line);
        if (line) {
          const parsedNumber = line.substring(line.lastIndexOf("§") + 2, line.length);
          RancherCap = parseInt(parsedNumber);
          console.log(RancherCap);
        }
      }
      if ((armor["tag"]["display"]["Name"] as string).includes("Warden")) hasWarden = true;
    })
  }
  if (petName.includes("BLACK_CAT")) hasBlackCat = true;
  if (petName.includes("SNAIL")) hasSnail = true;


  if (hasWarden) {
    statValue = statValue / 2;
    givesStats.push(new GivesStat("Warden Helmet", "Speed is half the normal one!"));
  }
  if (hasSnail) {
    statValue = 100;
    givesStats.push(new GivesStat("Snail", "Max speed is 100!"));
  }
  if (statValue > 400) {
    if (hasBlackCat) {
      if (statValue < 500) {
        givesStats.push(new GivesStat("Black Cat", "Max speed is 500!"));
      }
      else {
        statValue = 500;
        givesStats.push(new GivesStat("Black Cat", "Max speed is 500!"));
      }
    }
    if (hasRacing) {
      if (statValue < 500) {
        givesStats.push(new GivesStat("Racing Helmet", "Max speed is 500!"));
      }
      else {
        statValue = 500;
        givesStats.push(new GivesStat("Racing Helmet", "Max speed is 500!"));
      }
    }
    if (hasRancher) {
      if (statValue < RancherCap) {
        givesStats.push(new GivesStat("Rancher Boots", "Max speed is " + RancherCap.toString() + "!"));
      }
      else {
        statValue = RancherCap;
        givesStats.push(new GivesStat("Rancher Boots", "Max speed is " + RancherCap.toString() + "!"));
      }
    }
    if (youngDragonCount === 4) {
      if (statValue < 500) {
        givesStats.push(new GivesStat("Young Dragon Armor", "Max speed is 500!"));
      }
      else {
        statValue = 500;
        givesStats.push(new GivesStat("Young Dragon Armor", "Max speed is 500!"));
      }
    }

  }
  const playerStats: PlayerStats = new PlayerStats("Speed", Math.floor(statValue), givesStats);
  return playerStats;
}



const calculateDefense = (
  playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any,
  skillData: any
): PlayerStats => {
  const stats = getStatFromItems(playerData, armorData, equipData, petStats, accsData, "Defense");
  let statValue = (stats[0] as number);
  const givesStats = stats[1] as GivesStat[];
  const defenseUpgrade = playerData["player_data"]["perks"]["permanent_defense"]
  if (defenseUpgrade) {
    statValue += defenseUpgrade * 2;
    givesStats.push(new GivesStat("Perks", defenseUpgrade * 2));
  }
  const skillStats = getSkillDefense(playerData, skillData);
  statValue += skillStats;
  givesStats.push(new GivesStat("Skills", skillStats));
  const playerStats: PlayerStats = new PlayerStats("Defense", statValue, givesStats);
  return playerStats;
}
const getStatFromItems = (playerData: any,
  armorData: any,
  equipData: any,
  petStats: any,
  accsData: any,
  stat: string
) => {
  let statValue = 0;
  let givesStats: GivesStat[] = [];
  let armorGives = 0;
  (armorData as []).forEach((armor) => {
    const line = (armor["tag"]["display"]["Lore"] as []).find((item) => (item as string).includes(stat + ": "));
    if (line) {
      const parsedValue = getHealth(line);
      if (parsedValue > 0) {
        statValue += parsedValue;
        armorGives += parsedValue;

      }
    }
  });
  if (armorGives > 0)
    givesStats.push(new GivesStat("Armor", armorGives));
  let equipGives = 0;
  (equipData as []).forEach((equip) => {
    const line = (equip["tag"]["display"]["Lore"] as []).find((item) => (item as string).includes(stat + ": "));
    if (line) {
      const parsedValue = getHealth(line);
      if (parsedValue > 0) {
        statValue += parsedValue;
        equipGives += parsedValue;
      }
    }
  });
  if (equipGives > 0)
    givesStats.push(new GivesStat("Equipment", equipGives));
  if (petStats) {
    const petstat = (petStats as IStringIndex)[stat.toLowerCase()];
    if (petstat != null) {
      statValue += petstat;
      givesStats.push(new GivesStat("Pet", petstat));
    }
  }
  let accessoriesValue = 0;
  (accsData as []).forEach((equip) => {
    if ((equip["tag"]["display"]["Name"] as string).includes("New Year Cake Bag")) {
      if (stat === "Health") {
        const line = (equip["tag"]["display"]["Lore"] as []).find((item) => (item as string).includes("Current Bonus:"));
        if (line) {
          const parsedValue = getHealth(line);
          if (parsedValue > 0) {
            statValue += parsedValue;
            accessoriesValue += parsedValue;

          }
        }
      }
    }
    else {
      const line = (equip["tag"]["display"]["Lore"] as []).find((item) => (item as string).includes(stat + ": "));
      if (line) {
        if (stat === "Speed" && (line as string).includes("Fishing")) return;
        const parsedValue = getHealth(line);
        if (parsedValue > 0) {
          statValue += parsedValue;
          accessoriesValue += parsedValue;
        }
      }
    }
  });
  if (accessoriesValue > 0)
    givesStats.push(new GivesStat("Accessories", accessoriesValue));
  let powerHealth = playerData["accessory_bag_storage"]["tuning"]["slot_0"][stat.toLowerCase()];
  if (powerHealth > 0) {
    if(stat === "Intelligence") powerHealth *= 2;
    if(stat === "Crit Chance") powerHealth *= 0.2;
    if(stat === "Health") powerHealth *= 5;
    if(stat === "Speed") powerHealth *= 1.5;
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

  const stats = getStatFromItems(playerData, armorData, equipData, petStats, accsData, "Health");
  let healthValue = (stats[0] as number);
  const givesStats = stats[1] as GivesStat[];
  healthValue += 100;
  givesStats.push(new GivesStat("Base Value", 100));

  const bestiaryClaimed = parseInt(playerData["bestiary"]["milestone"]["last_claimed_milestone"]);
  if (bestiaryClaimed)
    if (bestiaryClaimed > 0) {
      healthValue += bestiaryClaimed;
      givesStats.push(new GivesStat("Bestiary Milestones", bestiaryClaimed));
    }

  const skillStats = getSkillHealth(playerData, skillData);
  healthValue += skillStats;
  givesStats.push(new GivesStat("Skills", skillStats));

  const healthUpgradeLvl = playerData["player_data"]["perks"]["permanent_health"]
  if (healthUpgradeLvl) {
    healthValue += healthUpgradeLvl * 2;
    givesStats.push(new GivesStat("Perks", healthUpgradeLvl * 2));
  }
  const slayerStats = getSlayerHealth(playerData);
  healthValue += slayerStats as number;
  givesStats.push(new GivesStat("Slayers", slayerStats));

  const reaperpeppers = playerData["player_data"]["reaper_peppers_eaten"];
  if (reaperpeppers) {
    healthValue += reaperpeppers;
    givesStats.push(new GivesStat("Reaper Peppers", reaperpeppers));
  }

  const levelUnformatted = playerData["leveling"][
    "experience"
  ] as number;
  const sblevel = Math.floor(levelUnformatted / 100);
  healthValue += sblevel * 5;
  givesStats.push(new GivesStat("SB Level", sblevel * 5));


  let playerStats: PlayerStats = new PlayerStats("Health", healthValue, givesStats);
  return playerStats;
}

function getHealth(line: string): number {
  const regex = /\s*\+(\d+(\.\d+)?)\s*/;
  const match = (line as string).match(regex);
  if (match) {
    const value = match.toString();
    const parsedValue = parseFloat(value);
    return parsedValue;
  }
  else {
    return 0;
  }
}

function getSkillDefense(playerData: any, skillData: any) {
  const lvl = GetSkillLvl(playerData, "MINING", skillData);
  let stat = 0;
  if (lvl >= 14) {
    stat += 14;
    stat += (lvl - 14) * 2
  }
  else stat += lvl;
  return stat;
}

function getSkillInt(playerData: any, skillData: any){
  const lvlalch = GetSkillLvl(playerData, "ALCHEMY", skillData);
  const lvlench = GetSkillLvl(playerData, "ENCHANTING", skillData);
  const lvlarr = [lvlalch, lvlench];
  let stat = 0;
  lvlarr.forEach((lvl) => {
  if (lvl >= 14) {
    stat += 14;
    stat += (lvl - 14) * 2
  }
  else stat += lvl;
  });
  return stat;
}

function getSkillStrength(playerData: any, skillData: any) {
  const lvl = GetSkillLvl(playerData, "FORAGING", skillData);
  let stat = 0;
  if (lvl >= 14) {
    stat += 14;
    stat += (lvl - 14) * 2
  }
  else stat += lvl;
  return stat;
}

function getSkillHealth(playerData: any, skillData: any) {
  const farmingLvl = GetSkillLvl(playerData, "FARMING", skillData);
  const fishingLvl = GetSkillLvl(playerData, "FISHING", skillData);
  const carpentry = GetSkillLvl(playerData, "CARPENTRY", skillData);
  const lvls = [farmingLvl, fishingLvl];
  let health = 0;
  if (carpentry === 50) health += 49
  else health += carpentry
  lvls.forEach((lvl) => {
    if (lvl >= 14) {
      health += 14 * 2;
      if (lvl >= 19) {
        health += 5 * 3;
        if (lvl >= 25) {
          health += 6 * 4;
          health += (lvl - 25) * 5;
        }
        else health += (lvl - 19) * 4;
      }
      else health += (lvl - 14) * 3;
    }
    else health += lvl * 2;
  });
  return health;
}

function getSlayerSpeed(playerData: any) {
  let statValue = 0;
  const regex = /[^\d]/g;
  const wolfArray = Object.keys(playerData["slayer"]["slayer_bosses"]["wolf"]["claimed_levels"]);
  const wolfLvl = wolfArray.length > 1 ? parseInt(wolfArray[wolfArray.length - 1].replace(regex, "")) : 0;
  switch (wolfLvl) {
    case 1:
      statValue += 1;
      break;
    case 2:
      statValue += 1;
      break;
    case 3:
      statValue += 2;
      break;
    case 4:
      statValue += 2;
      break;
    case 5:
      statValue += 2;
      break;
    case 6:
      statValue += 2;
      break;
    case 7:
      statValue += 2;
      break;
    case 8:
      statValue += 3;
      break;
    case 9:
      statValue += 3;
      break;
  }
  return statValue;
}

function getSlayerCritDmg(playerData: any) {
  let statValue = 0;
  const regex = /[^\d]/g;
  const wolfArray = Object.keys(playerData["slayer"]["slayer_bosses"]["wolf"]["claimed_levels"]);
  const wolfLvl = wolfArray.length > 1 ? parseInt(wolfArray[wolfArray.length - 1].replace(regex, "")) : 0;
  switch (wolfLvl) {
    case 5:
      statValue += 1;
      break;
    case 6:
      statValue += 1;
      break;
    case 7:
      statValue += 3;
      break;
    case 8:
      statValue += 3;
      break;
    case 9:
      statValue += 3;
      break;
  }
  const spiderArray = Object.keys(playerData["slayer"]["slayer_bosses"]["spider"]["claimed_levels"]);
  const spiderSlayerLvl = spiderArray.length > 1 ? parseInt(spiderArray[spiderArray.length - 1].replace(regex, "")) : 0;
  switch (spiderSlayerLvl) {
    case 1:
      statValue += 1;
      break;
    case 2:
      statValue += 2;
      break;
    case 3:
      statValue += 3;
      break;
    case 4:
      statValue += 4;
      break;
    case 5:
      statValue += 6;
      break;
    case 6:
      statValue += 8;
      break;
    case 7:
      statValue += 8;
      break;
    case 8:
      statValue += 11;
      break;
    case 9:
      statValue += 14;
      break;
  }
  return statValue;
}

function getSlayerStrength(playerData: any){
  const regex = /[^\d]/g;
  let statValue = 0;
  const blazeArray = Object.keys(playerData["slayer"]["slayer_bosses"]["blaze"]["claimed_levels"]);
  const blazeSlayerLvl = blazeArray.length > 1 ? parseInt(blazeArray[blazeArray.length - 1].replace(regex, "")) : 0;
 if(blazeSlayerLvl >= 2) statValue++;
 if(blazeSlayerLvl >= 6) statValue += 2;
  return statValue;
}

function getSlayerTrueDef(playerData: any){
  const regex = /[^\d]/g;
  let statValue = 0;
  const blazeArray = Object.keys(playerData["slayer"]["slayer_bosses"]["blaze"]["claimed_levels"]);
  const blazeSlayerLvl = blazeArray.length > 1 ? parseInt(blazeArray[blazeArray.length - 1].replace(regex, "")) : 0;
 if(blazeSlayerLvl >= 4) statValue++;
 if(blazeSlayerLvl >= 8) statValue += 2;
  return statValue;
}
function getSlayerHealth(playerData: any) {
  const regex = /[^\d]/g;
  let healthValue = 0;
  const blazeArray = Object.keys(playerData["slayer"]["slayer_bosses"]["blaze"]["claimed_levels"]);
  const blazeSlayerLvl = blazeArray.length > 1 ? parseInt(blazeArray[blazeArray.length - 1].replace(regex, "")) : 0;
  switch (blazeSlayerLvl) {
    case 1:
      healthValue += 3;
      break;
    case 2:
      healthValue += 3;
      break;
    case 3:
      healthValue += 7;
      break;
    case 4:
      healthValue += 7;
      break;
    case 5:
      healthValue += 12;
      break;
    case 6:
      healthValue += 12;
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
  const enderLvl = enderArray.length > 1 ? parseInt(enderArray[enderArray.length - 1].replace(regex, "")) : 0;
  switch (enderLvl) {
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
  const wolfLvl = wolfArray.length > 1 ? parseInt(wolfArray[wolfArray.length - 1].replace(regex, "")) : 0;
  switch (wolfLvl) {
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
  const zombieLvl = zombieArray.length > 1 ? parseInt(zombieArray[zombieArray.length - 1].replace(regex, "")) : 0;
  switch (zombieLvl) {
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