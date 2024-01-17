import { ConvertNBTToJson } from "@/utils/NBTData";
import { useEffect, useState } from "react";
import { RenderItemData } from "./renderItemData";
import { PET_STATS } from "@/constants/pet-stats";
import { IStringIndex } from "./PetsDisplay";
import { getColorForStat } from "./StatsForItem";
import { FormatNumber } from "@/utils/formatNumber";
import { getPetLevel } from "@/utils/PetUtils";
import { PET_DATA } from "@/constants/pets";
import Image from "next/image";
import { GetColorFromRarity } from "@/utils/ColorStuff";
import { FormattedMCLine } from "./FormattedLine";
import { InventoryContainer } from "./InventoryContainer";
import { EnderContainer } from "./enderContainer";

export const RiftDisplay = ({ profileData }: { profileData: any }) => {
  const [armor, setArmor] = useState<any>(null);
  const [equipment, setEquipment] = useState<any>(null);
  const [montezuma, setMontezuma] = useState<any>(null);
  const [inventory, setInventory] = useState<any>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedSection, setSelected] = useState<number>(0);
  const [navbarHoveredIndex, setNavbarHoveredIndex] = useState<number>(-1);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const riftData = profileData["rift"];
  useEffect(() => {
    if (riftData["inventory"] == null || riftData["inventory"] == undefined) {
      setArmor("null");
      setEquipment("null");
      return;
    }
    if (
      riftData["inventory"]["inv_armor"] == null ||
      riftData["inventory"]["equipment_contents"] == null
    ) {
      setArmor("novisit");
      setEquipment("novisit");
      return;
    }
    const armorDataEncoded = riftData["inventory"]["inv_armor"]["data"];
    const equipmentDataEncoded =
      riftData["inventory"]["equipment_contents"]["data"];
    const inventoryEncoded = riftData["inventory"]["inv_contents"]["data"];
    const fetchData = async () => {
      if (armorDataEncoded) {
        const armorValue = await ConvertNBTToJson(armorDataEncoded);
        const armorreversed = armorValue.reverse();
        let armorek: any[] = armorreversed.filter((x) => x["tag"] != null);
        setArmor(armorek);
      }
      if (equipmentDataEncoded) {
        const equipment = await ConvertNBTToJson(equipmentDataEncoded);
        const equipmentreversed = equipment.reverse();
        let equip: any[] = equipmentreversed.filter((x) => x["tag"] != null);
        setEquipment(equip);
      }
      if (inventoryEncoded) {
        const inv = await ConvertNBTToJson(inventoryEncoded);
        setInventory(inv);
      }
      if (
        riftData["dead_cats"] != null &&
        riftData["dead_cats"]["unlocked_pet"] !== false
      ) {
        if (riftData["dead_cats"]["montezuma"] != null) {
          const pet = new (PET_STATS as IStringIndex)[
            riftData["dead_cats"]["montezuma"]["type"]
          ](
            riftData["dead_cats"]["montezuma"]["tier"],
            getPetLevel(
              riftData["dead_cats"]["montezuma"]["exp"],
              riftData["dead_cats"]["montezuma"]["tier"],
              100
            ),
            null,
            profileData
          );
          const petstats = pet?.stats;
          let statsLore = [];
          let realLore = [];
          let lore: string[] = [];
          if (pet) {
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

              let progressXd = Math.floor(
                (pet.level.xpCurrent / pet.level.xpMaxLevel) * 100
              );
              if (isNaN(progress)) {
                progressXd = 0;
              }

              lore.push(
                "",
                `§7Total XP: §e${FormatNumber(
                  pet.level.xpCurrent
                )} §6/ §e${FormatNumber(
                  pet.level.xpMaxLevel
                )} §6(${progressXd.toLocaleString()}%)`
              );
            } else {
              lore.push("§bMAX LEVEL");
            }
            const head = (PET_DATA as IStringIndex)[
              riftData["dead_cats"]["montezuma"]["type"]
            ]["head"];
            const activePet = riftData["dead_cats"]["montezuma"];
            setMontezuma({ pet, lore, head, activePet });
          }
        } else {
          setMontezuma("nullxd");
        }
      } else {
        setMontezuma("nullxd");
      }
    };
    fetchData();
  }, []);
  if (armor === "novisit")
    return <div>{"Player hasn't visited the rift yet!"}</div>;
  if (equipment === "novisit")
    return <div>{"Player hasn't visited the rift yet!"}</div>;
  if (armor == null) return <div>Loading...</div>;
  if (equipment == null) return <div>Loading...</div>;
  if (inventory == null) return <div>Loading...</div>;
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          marginBottom: "140px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              borderBottom: "2px solid #ffffff25",
            }}
          >
            Armor
          </p>
          {armor === "null" ? (
            <div>Player has API disabled!</div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                textAlign: "left",
                maxWidth: "75px",
                maxHeight: "75px",
              }}
            >
              <RenderItemData mcItemArray={armor}></RenderItemData>
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            textAlign: "center",
            marginLeft: "4px",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              borderBottom: "2px solid #ffffff25",
              textAlign: "center",
            }}
          >
            Equipment
          </p>
          {equipment === "null" ? (
            <div>Player has API disabled!</div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginLeft: "8.5px",
                textAlign: "left",
                maxWidth: "75px",
                maxHeight: "75px",
              }}
            >
              <RenderItemData mcItemArray={equipment}></RenderItemData>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            textAlign: "center",
            marginLeft: "4px",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              borderBottom: "2px solid #ffffff25",
              textAlign: "center",
            }}
          >
            Rift Information
          </p>
          <div>
            <p
              style={{
                color: "purple",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {"Motes: "}{" "}
              <span
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "lighter",
                }}
              >
                {profileData["currencies"]["motes_purse"]}
              </span>
            </p>
            <p
              style={{
                color: "purple",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {"Enigma Souls: "}{" "}
              <span
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "lighter",
                }}
              >
                {(riftData["enigma"]["found_souls"] as []).length + "/42"}
              </span>
            </p>
            <p
              style={{
                color: "purple",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {"Timecharms: "}{" "}
              <span
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "lighter",
                }}
              >
                {(riftData["gallery"]["secured_trophies"] as []).length + "/7"}
              </span>
            </p>
            <p
              style={{
                color: "purple",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {"Eyes killed: "}{" "}
              <span
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "lighter",
                }}
              >
                {(riftData["wither_cage"]["killed_eyes"] as []).length + "/6"}
              </span>
            </p>
          </div>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              borderBottom: "2px solid #ffffff25",
              textAlign: "center",
            }}
          >
            Montezuma
          </p>
          {montezuma === "nullxd" ? (
            <div>Player has API disabled!</div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "75px",
                maxHeight: "75px",
                marginLeft: "37.5px",
              }}
            >
              {riftData["dead_cats"] == null ? (
                <div>Player has API disabled!</div>
              ) : montezuma == null ? (
                <div>Montezuma is not unlocked!</div>
              ) : (
                <div
                  className="group relative cursor-pointer"
                  style={{
                    backgroundColor: GetColorFromRarity(
                      montezuma["activePet"]["tier"]
                    ),
                    textAlign: "left",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setHovered(false)}
                >
                  <Image
                    src={`https://mc-heads.net${montezuma["head"]}`}
                    alt={"montezuma"}
                    width={45}
                    height={45}
                  />
                  {hovered && (
                    <div
                      className="fixed rounded"
                      style={{
                        zIndex: "1500",
                        borderRadius: "8px",
                        minWidth: "287px",
                        backgroundColor: "#0f0f0f",
                        maxWidth: "300px",
                        flexWrap: "wrap",
                        left: `${mousePosition.x}px`,
                        transform: "translateX(-105%) translateY(-75%)",
                        top: `${mousePosition.y}px`,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: GetColorFromRarity(
                            montezuma["activePet"]["tier"]
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
                            {`[LVL ${montezuma["pet"]["level"]["level"]}] ` +
                              "Montezuma"}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        {Object.values(montezuma["lore"]).map(
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
              )}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "inline-block",
          backgroundColor: "rgba(20,20,20, 0.3)",
          padding: "20px",
          borderRadius: "10px",
          width: "880px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            paddingBottom: "8px",
            borderBottom: "4px solid #0bca51",
          }}
        >
          <button
            onClick={() => setSelected(0)}
            onMouseEnter={() => setNavbarHoveredIndex(0)}
            onMouseLeave={() => setNavbarHoveredIndex(-1)}
            style={{
              borderTop:
                selectedSection === 0
                  ? "2px solid #0bca51"
                  : "2px solid transparent",
              display: "flex",
              alignItems: "center",
              padding: "4px",
              cursor: "pointer",
              transition: "border-top 0.3s ease-in-out",
              ...(navbarHoveredIndex === 0 && {
                borderTop: "2px solid #0bca51",
              }),
            }}
          >
            <Image
              src={`/zajebanyicony/chest.png`}
              alt={"inv"}
              width={32}
              height={32}
            />
            <div style={{ marginLeft: "8px" }}>{"INV"}</div>
          </button>
          <button
            onClick={() => setSelected(1)}
            onMouseEnter={() => setNavbarHoveredIndex(1)}
            onMouseLeave={() => setNavbarHoveredIndex(-1)}
            style={{
              borderTop:
                selectedSection === 1
                  ? "2px solid #0bca51"
                  : "2px solid transparent",
              display: "flex",
              alignItems: "center",
              padding: "4px",
              cursor: "pointer",
              transition: "border-top 0.3s ease-in-out",
              ...(navbarHoveredIndex === 1 && {
                borderTop: "2px solid #0bca51",
              }),
            }}
          >
            <Image
              src={`/zajebanyicony/ender.png`}
              alt={"ender"}
              width={32}
              height={32}
            />
            <div style={{ marginLeft: "8px" }}>{"ENDER"}</div>
          </button>
        </div>
        {selectedSection === 0 && (
          <div
            className="opacity-0"
            onLoad={(e) => (e.currentTarget.className = "opacity-100")}
            style={{
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <InventoryContainer inventoryxd={inventory} />
          </div>
        )}
        {selectedSection === 1 && (
          <div
            className="opacity-0"
            onLoad={(e) => (e.currentTarget.className = "opacity-100")}
            style={{
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <EnderContainer
              enderData={riftData["inventory"]["ender_chest_contents"]["data"]}
            />
          </div>
        )}
      </div>
    </div>
  );
};
