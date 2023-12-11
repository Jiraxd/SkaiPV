export function GetBGColorItem(itemData: any): string{
    if(itemData["tag"] === null || itemData["tag"] === undefined) return "gray";
    const array = (itemData["tag"]["display"]["Lore"] as Array<string>);
    const lastLine = array[array.length - 1];
    const color = lastLine.substring(0, 2);
    const mccolor = colors.find(f=> f.color == color);
    if(mccolor) return mccolor.hex;
    else return "#ffffff";
}
export function GetColorFromMCColor(line:string){
    const color = line.substring(0, 2);
    const mccolor = colors.find(f=> f.color == color);
    if(mccolor) return mccolor.hex;
    else return "#ffffff";
}

type MCColor = {
    color: string;
    hex: string;
};

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
