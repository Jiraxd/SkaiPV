import { ConvertNBTToJson } from "@/utils/NBTData";
import { useEffect, useState } from "react";
import { RenderItemData } from "./renderItemData";

export const RiftDisplay = ({ profileData }: { profileData: any }) => {
  const [armor, setArmor] = useState<any>(null);
  const [equipment, setEquipment] = useState<any>(null);
  console.log(profileData);
  // Equipment, armor,pet, Motes,timecharmy, enigma souly, burgery, nějaký staty
  // Inventář + tlačítko na view ebedny

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
    const fetchData = async () => {
      const armorValue = await ConvertNBTToJson(armorDataEncoded);
      const armorreversed = armorValue.reverse();
      let armorek: any[] = armorreversed.filter((x) => x["tag"] != null);
      const equipment = await ConvertNBTToJson(equipmentDataEncoded);
      const equipmentreversed = equipment.reverse();
      let equip: any[] = equipmentreversed.filter((x) => x["tag"] != null);
      setArmor(armorek);
      setEquipment(equip);
    };
    fetchData();
  }, []);
  if (armor === "novisit")
    return <div>Player hasn't visited the rift yet!</div>;
  if (equipment === "novisit")
    return <div>Player hasn't visited the rift yet!</div>;
  if (armor == null) return <div>Loading...</div>;
  if (equipment == null) return <div>Loading...</div>;
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
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
            <>
              <RenderItemData mcItemArray={armor}></RenderItemData>
            </>
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
                textAlign: "center",
                marginLeft: "8.5px",
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
        </div>
      </div>
    </div>
  );
};
