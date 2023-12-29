import vanilla from "skyblock-assets/matchers/vanilla.json";
import furfsky_reborn from "skyblock-assets/matchers/furfsky_reborn.json";
import furfsky from "skyblock-assets/matchers/furfsky.json";
import packshq from 'skyblock-assets/matchers/packshq.json';
import hypixel from 'skyblock-assets/matchers/hypixel+.json';
import world from 'skyblock-assets/matchers/worlds_and_beyond.json';
import rnbw from 'skyblock-assets/matchers/rnbw.json';
import ectoplasm from 'skyblock-assets/matchers/ectoplasm.json';
import * as skyblockAssets from 'skyblock-assets';
import { IStringIndex } from "@/components/PetsDisplay";

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

const itemMappings = {
  "Raw Fish": "349",
  "Raw Salmon": "349:1",
  "Pufferfish": "349:3",
  "Clownfish": "349:2",
  "Lily Pad": "111",
  "Acacia Wood": "162",
  "Dark Oak Wood": "162:1",
  "Birch Wood": "17:2",
  "Slimeball": "341",
  "Raw Chicken": "minecraft:chicken",
  "Seeds": "295",
  "Mushroom": "39",
  "Raw Rabbit": "minecraft:rabbit",
  "Raw Porkchop": "minecraft:porkchop",
  "Sulphur": "minecraft:glowstone_dust",
  "Nether Quartz": "minecraft:quartz",
  "Hard Stone": "minecraft:stone",
  "Mithril": "minecraft:prismarine_shard",
  "Wilted Berberis": "32",
  "Agaricus Cap": "https://mc-heads.net/head/4ce0a230acd6436abc86f13be72e9ba94537ee54f0325bb862577a1e062f37",
  "Half-Eaten Carrot": "391",
  "Hemovibe": "73",
  "Caducous Stem": "175:4",
  "Magmafish": "https://mc-heads.net/head/f56b5955b295522c9689481960c01a992ca1c7754cf4ee313c8dd0c356d335f",
  "Living Metal Heart": "https://mc-heads.net/head/f0278ee53a53b7733c7b8452fcf794dfbfbc3b032e750a6993573b5bd0299135",
  "Chili Pepper": "https://mc-heads.net/head/f859c8df1109c08a756275f1d2887c2748049fe33877769a7b415d56eda469d8",
  "Gemstone": "https://mc-heads.net/head/926a248fbbc06cf06e2c920eca1cac8a2c96164d3260494bed142d553026cc6"
};

export function getItemPathFromCollection(id: string, itemName: string) {
  let idReal = "minecraft:" + itemName.replaceAll(" ", "_");
  const idRealGot = (itemMappings as IStringIndex)[itemName];
  if (idRealGot && idRealGot.startsWith("https://")) return idRealGot;

  const itemTextureUrl = skyblockAssets.getTextureDir({
    id: idRealGot ? idRealGot : idReal.toLowerCase(),
    nbt: {
      ExtraAttributes: {
        id: `${idReal}`,
      },
    },
    packs: [
      furfsky_reborn,
      furfsky,
      rnbw,
      ectoplasm,
      world,
      packshq,
      hypixel,
      vanilla,
    ],
  });
  const realurl =
    "/packs/" +
    itemTextureUrl.substring(
      itemTextureUrl.indexOf("textures") + 9,
      itemTextureUrl.length
    );
  return realurl;
}

export function getItemPathFromName(name: string){
  let path:string = "";
    let itemlower = name.toLowerCase();
    path += itemlower + "/" + itemlower + ".png";
      return path;
  
}