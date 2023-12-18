export function GetIconPath(itemData: any){
  if(itemData["tag"] === null || itemData["tag"] === undefined) return "/question_mark.png";
    const item = itemData["tag"]["ExtraAttributes"]["id"] as string;
    if (itemData["tag"]["SkullOwner"]) {
        var decoded = JSON.parse(
          atob(
            itemData["tag"]["SkullOwner"]["Properties"]["textures"][0][
              "Value"
            ]
          )
        );
        const url = decoded["textures"]["SKIN"]["url"] as string;
        let path = url.substring(url.lastIndexOf("/") + 1, url.length);
        path = "https://mc-heads.net/head/" + path + ".png";
        return path;
      }
    let path:string = "/";
    let itemlower = item.toLowerCase();
    if(itemlower.includes("infini_vacuum")){
      itemlower = "infinivacuum";
    }
    if(itemlower.includes("potion")){
      itemlower = "water_bottle";
    }
    if(itemlower.includes("starred"))
      itemlower = itemlower.substring(itemlower.indexOf("_") + 1, itemlower.length);
      if(itemlower.includes("archaeologist_compass"))
      itemlower = "compass";
    if(itemlower.includes("boots") || itemlower.includes("leggings") || itemlower.includes("chestplate") || itemlower.includes("helmet")){
        let armorName = itemlower.substring(0,itemlower.indexOf("_"));
        if(itemlower.includes("dragon")){
            armorName += "_dragon";
        }
        
        let piece = "";
        if(itemlower.includes("dragon")){
         piece = itemlower.substring(itemlower.lastIndexOf("_"), itemlower.length);
        }
        else if(itemlower.includes("perfect")){
          piece = itemlower.substring(itemlower.lastIndexOf("_"), itemlower.length) + itemlower.substring(itemlower.indexOf("_"),itemlower.lastIndexOf("_"));
        }
        else{
        piece = itemlower.substring(itemlower.indexOf("_"), itemlower.length);
        }
        if(itemlower.includes("hunter")){
          path += "hunter_armor/icons/" + itemlower.substring(0, itemlower.indexOf("_")) + "/" + armorName + piece + ".png";
        }
        else{
        path += armorName + "_armor/icons/" + armorName + piece + ".png";
        }
        return path;
    }
    else{
      if(itemlower.includes("hoe_wheat")){
        path += "farming_tools" + "/" + itemlower + ".png";
      }
      else{
      path += itemlower + "/" + itemlower + ".png";
      }
      console.log(path);
      return path;
    }
}

export function getItemPathFromName(name: string){
  let path:string = "";
    let itemlower = name.toLowerCase();
    path += itemlower + "/" + itemlower + ".png";
    console.log(path);
      return path;
  
}