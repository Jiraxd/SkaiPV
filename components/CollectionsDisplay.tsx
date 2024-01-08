import {
  GetIconPath,
  getItemPathFromCollection,
  getItemPathFromName,
} from "@/utils/getIconPath";
import Image from "next/image";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { FormatNumber } from "@/utils/formatNumber";
import {
  GetCollectionLevel,
  GetPercentToNextCollection,
} from "@/utils/Calculations";
import { IStringIndex } from "./PetsDisplay";

/**
 * Renders a display of the player's Hypixel SkyBlock collections.
 *
 * Maps over the collections data and renders each collection with its name,
 * items, and collected counts. Uses utility functions to get icon paths,
 * format numbers, calculate collection levels, and style elements.
 */
export const CollectionsDisplay = ({
  profileData,
  collectionsInfo,
  allmembersCollections,
}: {
  profileData: any;
  collectionsInfo: any;
  allmembersCollections: any;
}) => {
  if (
    collectionsInfo["collections"] == null ||
    collectionsInfo["collections"] == undefined
  )
    return <div>Player has API disabled!</div>;
  const collectionsByName: IStringIndex = {};
  if (
    profileData["collection"] == undefined ||
    profileData["collection"] == undefined
  )
    return <div>Player has collection data disabled!</div>;
  Object.entries(profileData["collection"]).forEach(([key, value]) => {
    if (!collectionsByName[key]) {
      collectionsByName[key] = value;
    }

    collectionsByName[key] += value;
  });
  if (allmembersCollections) {
    allmembersCollections.forEach((value: any) => {
      if (value[1]["collection"] != undefined) {
        Object.entries(value[1]["collection"]).forEach(([key, value]) => {
          if (!collectionsByName[key]) {
            collectionsByName[key] = value;
          }
          collectionsByName[key] += value;
        });
      }
    });
  }
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
              maxWidth: "1200px",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            {Object.entries(value["items"]).map(
              ([itemName, valueItem]: [string, any]) => (
                <Tooltip
                  key={itemName}
                  showArrow={true}
                  content={
                    <div
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {(collectionsByName[itemName]
                        ? FormatNumber(collectionsByName[itemName])
                        : 0) + " collected"}
                      <br></br>
                      {GetPercentToNextCollection(
                        collectionsByName[itemName],
                        valueItem["maxTiers"],
                        valueItem["tiers"]
                      )}
                    </div>
                  }
                >
                  <div style={{ display: "inline-block" }}>
                    <Image
                      src={getItemPathFromCollection(
                        itemName,
                        valueItem["name"]
                      )}
                      width={32}
                      height={32}
                      alt={valueItem["name"]}
                      style={{
                        verticalAlign: "middle",
                        display: "inline-block",
                      }}
                      unoptimized
                    ></Image>
                    <span
                      style={{
                        fontSize: "12px",
                        color:
                          GetCollectionLevel(
                            collectionsByName[itemName],
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
                          collectionsByName[itemName],
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
