import { PET_STATS } from "@/constants/pet-stats";
import { PET_ITEMS } from "@/constants/pets";
import {
  GetBGColorItem,
  GetColorFromRarity,
  RARITY_COLORS,
} from "@/utils/ColorStuff";
import { createPetInstance, getPetLevel } from "@/utils/PetUtils";
import { FormatNumber } from "@/utils/formatNumber";
import { GetIconPath } from "@/utils/getIconPath";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isFunctionDeclaration } from "typescript";
import { FormattedMCLine } from "./FormattedLine";

interface IStringIndex {
  [key: string]: any;
}

export const PetsDisplay = ({
  petData,
  profileData,
}: {
  petData: any[];
  profileData: any;
}) => {
  const [petlistFinished, setPetList] = useState<any[] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setHoveredIndex(index);
    updateMousePosition(event);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    updateMousePosition(event);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const updateMousePosition = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    const petList: any[] = [];
    petData.forEach((item) => {
      let lore: string[] = [];
      let petItemLore: string[] = [];
      const activePet = item;
      const pet = createPetInstance(activePet, profileData);
      const petstats = pet?.stats;
      if (pet) {
        if (activePet["heldItem"]) {
          const petitem = PET_ITEMS.find(
            (item) => item.id === activePet["heldItem"]
          );

          if (petitem) {
            for (const stat in petitem.stats) {
              (petstats as IStringIndex)[stat] ??= 0;

              (petstats as IStringIndex)[stat] += (
                petitem.stats as IStringIndex
              )[stat];
            }

            for (const stat in petitem.statsPerLevel) {
              (petstats as IStringIndex)[stat] ??= 0;

              (petstats as IStringIndex)[stat] +=
                (petitem.statsPerLevel as IStringIndex)[stat] * pet.level.level;
            }

            for (const stat in petitem.multStats) {
              (petstats as IStringIndex)[stat] ??= 0;
              (petstats as IStringIndex)[stat] *= (
                petitem.multStats as IStringIndex
              )[stat];
            }

            if (petitem.multAllStats) {
              for (const stat in petstats) {
                (petstats as IStringIndex)[stat] *= petitem.multAllStats;
              }
            }
            petItemLore.push(
              "",
              `§6Held Item: §${
                RARITY_COLORS.find(
                  (f) => f.rarity === petitem.tier.toLowerCase()
                )?.color
              }${petitem.name}`
            );
            petItemLore.push(petitem.description);
          }
        }
        const stats = pet.lore(petstats);
        for (const line of stats) {
          lore.push(line);
        }

        const abilities = pet.abilities;
        for (const ability of abilities) {
          lore.push(" ", ability.name);

          for (const description of ability.desc) {
            lore.push(description);
          }
        }

        if (petItemLore.length > 0) {
          petItemLore.forEach((item) => lore.push(item));
        }

        lore.push(" ");

        if (pet.level.level < 100) {
          lore.push(
            `§7Progress to Level ${pet.level.level + 1}: §e${(
              pet.level.progress * 100
            ).toFixed(1)}%`
          );

          const progress = Math.ceil(pet.level.progress * 20);
          const numerator = pet.level.xpCurrent.toLocaleString();
          const denominator = FormatNumber(pet.level.xpForNext);

          lore.push(
            `§2${"-".repeat(progress)}§f${"-".repeat(
              20 - progress
            )} §e${numerator} §6/ §e${denominator}`
          );
        } else {
          lore.push("§bMAX LEVEL");
        }

        let progress = Math.floor(
          (pet.level.xpCurrent / pet.level.xpMaxLevel) * 100
        );
        if (isNaN(progress)) {
          progress = 0;
        }

        lore.push(
          "",
          `§7Total XP: §e${FormatNumber(
            pet.level.xpCurrent
          )} §6/ §e${FormatNumber(
            pet.level.xpMaxLevel
          )} §6(${progress.toLocaleString()}%)`
        );

        if (activePet["candyUsed"] > 0) {
          lore.push(`§7Candy Used: §e${activePet["candyUsed"] || 0} §6/ §e10`);
        }
      }
      petList.push({ activePet, pet, lore });
    });
    setPetList(petList);
  }, []);
  if (petlistFinished == null) return <></>;
  console.log(petlistFinished);
  const activePetxd = petlistFinished.find(
    (p) => p["activePet"]["active"] === true
  );
  const activePet = activePetxd["activePet"];
  const loreActive = activePetxd["lore"];
  return (
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          color: "rgba(255,255,255,0.7)",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        <p>
          Unique Pets: <span style={{ color: "white" }}>0/0</span>
        </p>
      </div>
      <br />
      <div>
        {activePet ? (
          <div>
            <p>Active Pet</p>
            <div style={{ display: "flex" }}>
              <div
                className="group relative cursor-pointer"
                style={{
                  display: "flex",
                  backgroundColor: GetColorFromRarity(activePet["tier"]),
                  padding: "15px",
                  borderRadius: "8px",
                }}
                onMouseEnter={(e) => handleMouseEnter(-2, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src={`${GetIconPath(activePet)}`}
                  alt={activePet}
                  width={45}
                  height={45}
                />
              </div>
              <p style={{ marginLeft: "20px", fontWeight: "bold" }}>
                <span style={{ color: GetColorFromRarity(activePet["tier"]) }}>
                  {activePet["tier"] + " "}
                </span>
                <span>{activePet["type"]}</span>
              </p>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Bonus:{" "}
            </p>
            {hoveredIndex === -2 && (
              <div
                className="fixed top-0 left-0 rounded"
                style={{
                  left: `${mousePosition.x}px`,
                  transform: "translateX(-105%) translateY(-75%)",
                  top: `${mousePosition.y}px`,
                  zIndex: "1500",
                  borderRadius: "8px",
                  backgroundColor: "#0f0f0f",
                  flexWrap: "wrap",
                  maxWidth: "300px",
                }}
              >
                <div
                  style={{
                    backgroundColor: GetColorFromRarity(activePet["tier"]),
                    padding: "15px",
                    width: "100%",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      color: "#000000",
                      fontSize: "20px",
                    }}
                  >
                    <span>
                      {" "}
                      {`[LVL ${activePetxd["pet"]["level"]["level"]}] ` +
                        activePet["type"]}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  {Object.values(loreActive).map(
                    (value: any, index: number) => (
                      <>
                        <FormattedMCLine
                          count={1}
                          linexd={value}
                          isHeader={false}
                        />
                        <br />
                      </>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>Player has no active pet!</div>
        )}
      </div>
    </div>
  );
};
