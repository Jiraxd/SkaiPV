import { GetIconPath, getItemPathFromName } from "@/utils/getIconPath";
import Image from "next/image";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { FormatNumber } from "@/utils/formatNumber";
import { GetCollectionLevel } from "@/utils/Calculations";

export const CollectionsDisplay = ({
  profileData,
  collectionsInfo,
}: {
  profileData: any;
  collectionsInfo: any;
}) => {
  console.log(collectionsInfo);
  console.log(profileData);
  if (
    collectionsInfo["collections"] == null ||
    collectionsInfo["collections"] == undefined
  )
    return <div>Player has API disabled!</div>;
  return (
    <div
      style={{
        flexDirection: "column",
        display: "flex",
      }}
    >
      {Object.values(collectionsInfo["collections"]).map((value: any) => (
        <div key={value["name"]}>
          <h1
            style={{
              borderBottom: "1px solid green",
              display: "inline-block",
              paddingBottom: "2px",
              maxWidth: "110px",
              fontSize: "24px",
            }}
          >
            {value["name"]}
          </h1>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              flexWrap: "wrap",
              maxWidth: "800px",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            {Object.entries(value["items"]).map(
              ([itemName, valueItem]: [string, any]) => (
                <Tooltip
                  showArrow={true}
                  content={
                    (profileData["collection"][itemName]
                      ? FormatNumber(profileData["collection"][itemName])
                      : 0) + " collected"
                  }
                >
                  <div key={itemName} style={{ display: "inline-block" }}>
                    <Image
                      src={getItemPathFromName(itemName, valueItem["name"])}
                      width={32}
                      height={32}
                      alt={valueItem["name"]}
                      style={{
                        verticalAlign: "middle",
                        display: "inline-block",
                      }}
                    ></Image>
                    <span
                      style={{
                        fontSize: "12px",
                        color:
                          GetCollectionLevel(
                            profileData["collection"][itemName],
                            valueItem["maxTiers"],
                            valueItem["tiers"]
                          ) === valueItem["maxTiers"]
                            ? "#FFA500"
                            : "#ffffff",
                      }}
                    >
                      {" " +
                        valueItem["name"] +
                        " " +
                        GetCollectionLevel(
                          profileData["collection"][itemName],
                          valueItem["maxTiers"],
                          valueItem["tiers"]
                        )}
                    </span>
                  </div>
                </Tooltip>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
