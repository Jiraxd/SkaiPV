import { Progress } from "@nextui-org/progress";
import Image from "next/image";
import { SoloSlayerDisplay } from "./slayerSoloDisplay";

export const SlayersDisplay = ({ profileData }: { profileData: any }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        flexWrap: "wrap",
        maxWidth: "1440px",
      }}
    >
      <SoloSlayerDisplay
        slayerData={profileData["slayer"]["slayer_bosses"]["zombie"]}
        type={"REVENANT HORROR"}
      ></SoloSlayerDisplay>
      <SoloSlayerDisplay
        slayerData={profileData["slayer"]["slayer_bosses"]["spider"]}
        type={"TARANTULA BROODFATHER"}
      ></SoloSlayerDisplay>
      <SoloSlayerDisplay
        slayerData={profileData["slayer"]["slayer_bosses"]["wolf"]}
        type={"SVEN PACKMASTER"}
      ></SoloSlayerDisplay>
      <SoloSlayerDisplay
        slayerData={profileData["slayer"]["slayer_bosses"]["enderman"]}
        type={"VOIDGLOOM SERAPH"}
      ></SoloSlayerDisplay>
      <SoloSlayerDisplay
        slayerData={profileData["slayer"]["slayer_bosses"]["blaze"]}
        type={"INFERNO DEMONLORD"}
      ></SoloSlayerDisplay>
      <SoloSlayerDisplay
        slayerData={profileData["slayer"]["slayer_bosses"]["vampire"]}
        type={"RIFTSTALKER BLOODFIEND"}
      ></SoloSlayerDisplay>
    </div>
  );
};
