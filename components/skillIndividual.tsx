import { Progress } from "@nextui-org/progress";
import { Tooltip } from "@nextui-org/tooltip";
import Image from "next/image";
export const SoloSkill = ({
  playerData,
  value,
  skillData,
}: {
  playerData: any;
  value: string;
  skillData: any;
}) => {
  let experience;
  try {
    experience = playerData["player_data"]["experience"];
  } catch {
    experience = null;
  }
  let levelText = "API Disabled";
  let maxValue = 100;
  let valueskill = 0;
  let usePrimary = false;
  if (experience != null) {
    const skillExp = experience[`SKILL_${value}`] as number;
    const levels = Object.values(skillData["skills"][`${value}`]["levels"]);
    let skillIndex = 0;
    if (skillExp === null || skillExp === undefined) {
      skillIndex = 0;
    } else {
      skillIndex = levels.findIndex(
        (level) => (level as any)["totalExpRequired"] >= skillExp
      ) as any;
    }

    if (skillIndex < 0) {
      skillIndex = levels.length - 1;
      levelText = `Level ${skillIndex + 1}`;
      maxValue = (levels as any)[skillIndex]["totalExpRequired"];
      valueskill = skillExp;
      usePrimary = true;
    } else {
      levelText = `Level ${skillIndex}`;
      maxValue = (levels as any)[skillIndex]["totalExpRequired"];
      valueskill = skillExp;
    }
    if (value === "FARMING") {
      let realMaxLvl =
        50 +
        (playerData["jacobs_contest"]["perks"]["farming_level_cap"] as number);
      if (skillIndex + 1 > realMaxLvl) {
        levelText = `Level ${realMaxLvl} - Farming level cap reached`;
        maxValue = (levels as any)[realMaxLvl - 1]["totalExpRequired"];
        usePrimary = false;
      }
    } else if (value === "TAMING") {
      levelText = `Level ${skillIndex} - Taming level can vary, API doesn't support skill lvl cap upgrades`;
      // TODO: Až hypixel API přidá taming cap, dodělat
      let realMaxLvl = 50 + 10;
      if (skillIndex + 1 > realMaxLvl) {
        levelText = `Level ${realMaxLvl} - Taming level cap reached`;
        maxValue = (levels as any)[realMaxLvl - 1]["totalExpRequired"];
        usePrimary = false;
      }
    }
  }
  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        zIndex: "-1",
        width: "full",
      }}
    >
      <div
        style={{
          backgroundColor: `${usePrimary ? "#F5A524" : "#0bca51"}`,
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          transform: "translateY(50%) translateX(12%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={`/zajebanyicony/${value.toLowerCase()}.png`}
          priority={true}
          alt="Level"
          width={28}
          height={28}
        />
      </div>
      <Tooltip content={valueskill + "/" + maxValue + " exp"}>
        <div>
      <Progress
        label={
          <div style={{ transform: "translateY(25%) translateX(7px)" }}>
            {levelText}
          </div>
        }
        maxValue={maxValue}
        minValue={0}
        value={valueskill}
        color={usePrimary ? "warning" : "success"}
        style={{ zIndex: "-1" }}
      ></Progress>
      </div>
      </Tooltip>
    </div>
  );
};
