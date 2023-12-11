import { GivesStat } from "@/models/givesStat";
import { PlayerStats } from "@/models/playerStats";

export function CalculateStats(playerData: any){
    let array: PlayerStats[] = [
        new PlayerStats("Health", 0, []),
        new PlayerStats("Defense", 0, []),
        new PlayerStats("Speed", 0, []),
        new PlayerStats("Strength", 0, []),
        new PlayerStats("Intelligence", 0, []),
        new PlayerStats("Crit Chance", 0, []),
        new PlayerStats("Crit Damage", 0, []),
        new PlayerStats("Magic Find", 0, []),
        new PlayerStats("Pet Luck", 0, []),
        new PlayerStats("True Defense", 0, []),
        new PlayerStats("SC Chance", 0, []),
        new PlayerStats("Mining Fortune", 0, []),
        new PlayerStats("Farming Fortune", 0, []),
        new PlayerStats("Foraging Fortune", 0, []),
    ];
    return array;
}