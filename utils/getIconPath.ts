import vanilla from "skyblock-assets/matchers/vanilla.json";
import furfsky_reborn from "skyblock-assets/matchers/furfsky_reborn.json";
import furfsky from "skyblock-assets/matchers/furfsky.json";
import packshq from 'skyblock-assets/matchers/packshq.json';
import hypixel from 'skyblock-assets/matchers/hypixel+.json';
import world from 'skyblock-assets/matchers/worlds_and_beyond.json';
import rnbw from 'skyblock-assets/matchers/rnbw.json';
import ectoplasm from 'skyblock-assets/matchers/ectoplasm.json';
import * as skyblockAssets from 'skyblock-assets';

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
      if(item.toLowerCase().includes("compass")){
        return "/compass/compass.png";
      }
      const regex = /§[a-zA-Z0-9]/g;  
      if(item.toLowerCase().includes("glacial_scythe")) return "/glacial_scythe/glacial_scythe.png";
      const Itemname = itemData["tag"]["display"]["Name"].replace(regex, '').replaceAll("✪", "").replaceAll("⚚", "");
      const itemTextureUrl = skyblockAssets.getTextureDir({
        id: `${itemData["id"]}`,
        nbt: {
            ExtraAttributes: {
                id: `${item}`
            },
            display: {
              Name: `${Itemname}`
          }
        },
        packs: [ furfsky_reborn ,furfsky,rnbw, ectoplasm,world,packshq,hypixel, vanilla ],
    })
    const realurl = "/packs/" + itemTextureUrl.substring(itemTextureUrl.indexOf("textures") + 9, itemTextureUrl.length);
    return realurl;
}

export function getItemPathFromName(name: string){
  let path:string = "";
    let itemlower = name.toLowerCase();
    path += itemlower + "/" + itemlower + ".png";
    //console.log(path);
      return path;
  
}