"use client";

import nbt from "prismarine-nbt";
import { ConvertNBTToJson } from "@/utils/NBTData";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GetIconPath } from "@/utils/getIconPath";
import { GetBGColorItem, GetColorFromMCColor } from "@/utils/ColorStuff";
import { Spacer } from "@nextui-org/spacer";
import { FormattedMCLine } from "./FormattedLine";
import { ShowStats } from "./StatsForItem";
import { RenderItemData } from "./renderItemData";
export const ArmorDisplay = ({
  pData,
  isEquipment,
}: {
  pData: any;
  isEquipment: boolean;
}) => {
  const [armor, setArmor] = useState<any>(null);

  useEffect(() => {
    if (pData["inventory"] === null || pData["inventory"] === undefined) {
      setArmor("null");
      return;
    }
    let armorDataEncoded = "";
    if (isEquipment) {
      armorDataEncoded = pData["inventory"]["equipment_contents"]["data"];
    } else {
      armorDataEncoded = pData["inventory"]["inv_armor"]["data"];
    }
    const fetchData = async () => {
      const armorValue = await ConvertNBTToJson(armorDataEncoded);
      const armorreversed = armorValue.reverse();
      let armorek: any[] = armorreversed.filter((x) => x["tag"] != null);
      setArmor(armorek);
    };
    fetchData();
  }, []);

  if (armor === null) return <div>Loading...</div>;
  if (armor === "null") return <div>Player has API disabled!</div>;
  if ((armor as []).length === 0)
    return isEquipment ? (
      <div>Player has no equipment!</div>
    ) : (
      <div>Player has no armor!</div>
    );
  /**
   * Renders the player's armor as a grid of item icons.
   * Shows a tooltip with name, lore, and stats on hover.
   * Handles mouse enter/move/leave events to control tooltip position.
   */
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        <RenderItemData mcItemArray={armor} />
      </div>
      <Spacer y={8} />
      <p>
        <span
          style={{
            color: "GrayText",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Bonus stats: <ShowStats pData={armor} />
        </span>
      </p>
    </>
  );
};
