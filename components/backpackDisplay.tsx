import { GetBGColorItem } from "@/utils/ColorStuff";
import { GetIconPath } from "@/utils/getIconPath";
import { FormattedMCLine } from "./FormattedLine";
import Image from "next/image";
import { useState } from "react";
import { RenderItemData } from "./renderItemData";

export const BackpackDisplay = ({ backpackData }: { backpackData: any }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        width: "900px",
        flexWrap: "wrap",
        marginTop: "20px",
      }}
    >
      <RenderItemData
        mcItemArray={backpackData}
      ></RenderItemData>
      {(backpackData as []).filter((data: any) => data["tag"] != null).length <
        1 && <p>This is not a bug! Backpack is empty!</p>}
    </div>
  );
};
