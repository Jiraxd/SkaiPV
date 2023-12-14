export function GetBGColorItem(itemData: any): string{
    if(itemData["tag"] === null || itemData["tag"] === undefined) return "gray";
    const array = (itemData["tag"]["display"]["Lore"] as Array<string>);
    const lastLine = array[array.length - 1];
    const color = lastLine.substring(0, 2);
    const mccolor = colors.find(f=> f.color === color);
    if(mccolor) return mccolor.hex;
    else return "#929292";
}
export function GetColorFromMCColor(line:string){
    const color = line.substring(0, 2);
    const mccolor = colors.find(f=> f.color === color);
    if(mccolor) return mccolor.hex;
    else return "#929292";
}

export function GetColorFromRarity(line:string){
    if(line == undefined) return "#929292";
const clr = RARITY_COLORS.find(c=> c.rarity === line.toLowerCase());
if(clr){
    const mccolor = colors.find(f=> f.color === clr.color);
    if(mccolor) return mccolor.hex;
    else return "#929292";
}
else return "#929292";

}

type MCColor = {
    color: string;
    hex: string;
};

export const RARITY_COLORS = [
    { rarity: "common", color: "§f" },
    { rarity: "uncommon", color: "§a" },
    { rarity: "rare", color: "§9" },
    { rarity: "epic", color: "§5" },
    { rarity: "legendary", color: "§6" },
    { rarity: "mythic", color: "§d" },
    { rarity: "divine", color: "§b" },
    { rarity: "supreme", color: "§4" },
    { rarity: "special", color: "§c" },
    { rarity: "very_special", color: "§c" },
    { rarity: "admin", color: "§4" },
];

const colors: MCColor[] = [
    { color: "§0", hex: "#000000" },
    { color: "§1", hex: "#0b277a" },
    { color: "§2", hex: "#00aa00" },
    { color: "§3", hex: "#038d8d" },
    { color: "§4", hex: "#920909" },
    { color: "§5", hex: "#a305a3" },
    { color: "§6", hex: "#d88f07" },
    { color: "§7", hex: "#636363" },
    { color: "§8", hex: "#2f2f2f" },
    { color: "§9", hex: "#4444f3" },
    { color: "§a", hex: "#40bb40" },
    { color: "§b", hex: "#33aec3" },
    { color: "§c", hex: "#c43c3c" },
    { color: "§d", hex: "#e668c6" },
    { color: "§e", hex: "#efc721" },
    { color: "§f", hex: "#929292" },
];
