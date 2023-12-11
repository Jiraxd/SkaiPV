import React from "react";
import { Progress } from "@nextui-org/progress";
import Image from "next/image";
import { SoloSkill } from "./skillIndividual";

export const SkillsDisplay = ({
  playerData,
  skillData,
}: {
  playerData: any;
  skillData: any;
}) => {
  const levelUnformatted = (playerData as any)["leveling"][
    "experience"
  ] as number;
  const level = Math.floor(levelUnformatted / 100);
  const experience = levelUnformatted % 100;
  return (
    <div>
      <div
        style={{
          width: "full",
          justifyContent: "center",
          display: "flex",
          zIndex: "-1",
        }}
      >
        <div
          style={{
            backgroundColor: "#0bca51",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            transform: "translateY(50%) translateX(12%)",
          }}
        >
          <Image src="/earth.png" alt="Level" width={36} height={36} />
        </div>
        <Progress
          label={
            <div style={{ transform: "translateY(25%) translateX(12%)" }}>
              {`Level: ${level}`}
            </div>
          }
          maxValue={100}
          minValue={0}
          value={experience}
          color="success"
          style={{ zIndex: "-1" }}
        ></Progress>
      </div>
      <br></br>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
        }}
      >
        <SoloSkill
          playerData={playerData}
          value={"TAMING"}
          skillData={skillData}
        />
        <SoloSkill
          playerData={playerData}
          value={"FARMING"}
          skillData={skillData}
        />
        <SoloSkill
          playerData={playerData}
          value={"MINING"}
          skillData={skillData}
        />
        <SoloSkill
          playerData={playerData}
          value={"COMBAT"}
          skillData={skillData}
        />
        <SoloSkill
          playerData={playerData}
          value={"FORAGING"}
          skillData={skillData}
        />
        <SoloSkill
          playerData={playerData}
          value={"FISHING"}
          skillData={skillData}
        />
        <SoloSkill
          playerData={playerData}
          value={"ENCHANTING"}
          skillData={skillData}
        />
        <SoloSkill
          playerData={playerData}
          value={"ALCHEMY"}
          skillData={skillData}
        />
        <SoloSkill
          playerData={playerData}
          value={"CARPENTRY"}
          skillData={skillData}
        />
        <SoloSkill
          playerData={playerData}
          value={"RUNECRAFTING"}
          skillData={skillData}
        />
        <SoloSkill
          playerData={playerData}
          value={"SOCIAL"}
          skillData={skillData}
        />
      </div>
    </div>
  );
};
