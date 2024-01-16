import { PET_STATS } from "@/constants/pet-stats";
import { PET_DATA, PET_ITEMS } from "@/constants/pets";
import {
  GetBGColorItem,
  GetColorFromRarity,
  RARITY_COLORS,
} from "@/utils/ColorStuff";
import { getPetLevel } from "@/utils/PetUtils";
import { FormatNumber } from "@/utils/formatNumber";
import { GetIconPath } from "@/utils/getIconPath";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isFunctionDeclaration } from "typescript";
import { FormattedMCLine } from "./FormattedLine";
import { Spacer } from "@nextui-org/spacer";
import { getColorForStat } from "./StatsForItem";

export interface IStringIndex {
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
    if (petData.length < 1) {
      setPetList([]);
      return;
    }
    const petList: any[] = [];
    petData.forEach((item) => {
      let lore: string[] = [];
      let petItemLore: string[] = [];
      const activePet = item;
      const pet = new (PET_STATS as IStringIndex)[activePet["type"]](
        activePet["tier"],
        getPetLevel(activePet["exp"], activePet["tier"], 100),
        null,
        profileData
      );
      const petstats = pet?.stats;
      let statsLore = [];
      let realLore = [];
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
              `§6Held Item: ${
                RARITY_COLORS.find(
                  (f) => f.rarity === petitem.tier.toLowerCase()
                )?.color
              }${petitem.name}`
            );
            petItemLore.push(petitem.description);
          }
        }
        statsLore = pet.lore(petstats);
        for (const line of statsLore) {
          const real = (line as string).replace(
            /§[a-zA-Z0-9]/,
            "§" +
              getColorForStat(
                line.substring(line.indexOf("§") + 2, line.indexOf(":"))
              )
          );
          realLore.push(real);
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

          let progressxd = Math.floor(
            (pet.level.xpCurrent / pet.level.xpMaxLevel) * 100
          );
          if (isNaN(progress)) {
            progressxd = 0;
          }

          lore.push(
            "",
            `§7Total XP: §e${FormatNumber(
              pet.level.xpCurrent
            )} §6/ §e${FormatNumber(
              pet.level.xpMaxLevel
            )} §6(${progressxd.toLocaleString()}%)`
          );
        } else {
          lore.push("§bMAX LEVEL");
        }

        if (activePet["candyUsed"] > 0) {
          lore.push(`§7Candy Used: §e${activePet["candyUsed"] || 0} §6/ §e10`);
        }
      }
      const head = (PET_DATA as IStringIndex)[activePet["type"]]["head"];
      petList.push({ activePet, pet, lore, head, realLore });
    });
    setPetList(petList);
  }, []);
  if (petlistFinished == null) return <></>;
  if (petlistFinished.length < 1) return <div>Player has no pets!</div>;
  const uniquePets: string[] = [];
  let petscore: number = 0;
  petlistFinished.forEach((p) => {
    if (!uniquePets.includes(p["activePet"]["type"])) uniquePets.push(p);
  });
  uniquePets.forEach((p: any) => {
    if (p["pet"]["level"]["level"] === 100) petscore++;
    if (p["activePet"]["tier"] === "COMMON") petscore++;
    else if (p["activePet"]["tier"] === "UNCOMMON") petscore = petscore + 2;
    else if (p["activePet"]["tier"] === "RARE") petscore = petscore + 3;
    else if (p["activePet"]["tier"] === "EPIC") petscore = petscore + 4;
    else if (p["activePet"]["tier"] === "LEGENDARY") petscore = petscore + 5;
    else if (p["activePet"]["tier"] === "MYTHIC") petscore = petscore + 6;
  });
  let bonusmf = 0;
  if (petscore >= 10 && petscore < 25) bonusmf = 1;
  else if (petscore >= 25 && petscore < 50) bonusmf = 2;
  else if (petscore >= 50 && petscore < 75) bonusmf = 3;
  else if (petscore >= 50 && petscore < 100) bonusmf = 4;
  else if (petscore >= 75 && petscore < 130) bonusmf = 5;
  else if (petscore >= 100 && petscore < 175) bonusmf = 6;
  else if (petscore >= 130 && petscore < 225) bonusmf = 7;
  else if (petscore >= 175 && petscore < 275) bonusmf = 8;
  else if (petscore >= 225 && petscore < 325) bonusmf = 9;
  else if (petscore >= 325) bonusmf = 10;
  const activePetxd = petlistFinished.find(
    (p) => p["activePet"]["active"] === true
  );
  let activePet: any = null;
  let loreActive: any = null;
  if (activePetxd) {
    activePet = activePetxd["activePet"];

    loreActive = activePetxd["lore"];
  }

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
          Unique Pets:{" "}
          <span style={{ color: "white" }}>
            {uniquePets.length + "/" + Object.values(PET_DATA).length}
          </span>
        </p>
        <p>
          Pet Score:{" "}
          <span style={{ color: "white" }}>
            {petscore + " " + `(+${bonusmf}`}
            <span style={{ color: "#33aec3" }}>{" Magic Find "}</span>
            {")"}
          </span>
        </p>
      </div>
      <Spacer y={6}></Spacer>
      <div>
        {activePet ? (
          <div>
            <p style={{ fontWeight: "bold", fontSize: "26px" }}>Active Pet</p>
            <Spacer y={4}></Spacer>
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
                  src={`https://mc-heads.net${activePetxd["head"]}`}
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
                padding: "13px",
                paddingTop: "1px",
                fontWeight: "bold",
              }}
            >
              {"LVL " + activePetxd["pet"]["level"]["level"]}
            </p>
            <Spacer y={4}></Spacer>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              Bonus:{" "}
              {Object.values(activePetxd["realLore"]).map((value, index) => (
                <span key={index}>
                  <FormattedMCLine
                    linexd={value}
                    isHeader={false}
                    count={1}
                  ></FormattedMCLine>
                  {index < activePetxd["realLore"].length - 1 ? " // " : ""}
                </span>
              ))}
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
      <Spacer y={12}></Spacer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          flexWrap: "wrap",
          width: "85%",
        }}
      >
        {Object.values(
          petlistFinished.filter((f) => f["activePet"]["active"] != true)
        ).map((data: any, index) => (
          <div
            className="group relative cursor-pointer"
            style={{
              backgroundColor: GetColorFromRarity(data["activePet"]["tier"]),
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
            onMouseEnter={(e) => handleMouseEnter(index, e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            key={index}
          >
            <Image
              src={`https://mc-heads.net${data["head"]}`}
              alt={index.toString()}
              width={45}
              height={45}
            />
            {hoveredIndex === index && (
              <div
                className="fixed top-0 left-0 rounded"
                style={{
                  left: `${mousePosition.x}px`,
                  transform: "translateX(-105%) translateY(-75%)",
                  top: `${mousePosition.y}px`,
                  zIndex: "1500",
                  borderRadius: "8px",
                  backgroundColor: "#0f0f0f",
                  maxWidth: "300px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    backgroundColor: GetColorFromRarity(
                      data["activePet"]["tier"]
                    ),
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
                      {`[LVL ${data["pet"]["level"]["level"]}] ` +
                        data["activePet"]["type"]}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  {Object.values(data["lore"]).map(
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
        ))}
      </div>
    </div>
  );
};
