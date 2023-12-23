import { SLAYER_XP } from "@/constants/leveling";
import { Progress } from "@nextui-org/progress";
import Image from "next/image";

export const SoloSlayerDisplay = ({
  slayerData,
  type,
}: {
  slayerData: any;
  type: string;
}) => {
  let imagsrc = "";
  let xp;
  if (type === "REVENANT HORROR") {
    imagsrc =
      "https://sky.shiiyu.moe/head/1fc0184473fe882d2895ce7cbc8197bd40ff70bf10d3745de97b6c2a9c5fc78f";
    xp = SLAYER_XP.zombie;
  } else if (type === "TARANTULA BROODFATHER") {
    imagsrc =
      "https://sky.shiiyu.moe/head/9d7e3b19ac4f3dee9c5677c135333b9d35a7f568b63d1ef4ada4b068b5a25";
    xp = SLAYER_XP.spider;
  } else if (type === "SVEN PACKMASTER") {
    imagsrc =
      "https://sky.shiiyu.moe/head/f83a2aa9d3734b919ac24c9659e5e0f86ecafbf64d4788cfa433bbec189e8";
    xp = SLAYER_XP.wolf;
  } else if (type === "VOIDGLOOM SERAPH") {
    xp = SLAYER_XP.enderman;
    imagsrc =
      "https://sky.shiiyu.moe/head/1b09a3752510e914b0bdc9096b392bb359f7a8e8a9566a02e7f66faff8d6f89e";
  } else if (type === "RIFTSTALKER BLOODFIEND") {
    xp = SLAYER_XP.vampire;
    imagsrc =
      "https://sky.shiiyu.moe/head/5aa29ea961757dc3c90bfabf302c5abe9d308fb4a7d3864e5788ad2cc9160aa2";
  } else if (type === "INFERNO DEMONLORD") {
    xp = SLAYER_XP.blaze;
    imagsrc =
      "https://sky.shiiyu.moe/head/b20657e24b56e1b2f8fc219da1de788c0c24f36388b1a409d0cd2d8dba44aa3b";
  }

  const level = Object.values(slayerData["claimed_levels"]).length;
  let xptolevel: any = 0;
  if (level === 9) xptolevel = 0;
  else xptolevel = (xp as any)[level + 1];
  let kills0: number = 0;
  let kills1: number = 0;
  let kills2: number = 0;
  let kills3: number = 0;
  let kills4: number = 0;
  if (slayerData["boss_kills_tier_0"]) {
    kills0 = +slayerData["boss_kills_tier_0"];
  }
  if (slayerData["boss_kills_tier_1"]) {
    kills1 = +slayerData["boss_kills_tier_1"];
  }
  if (slayerData["boss_kills_tier_2"]) {
    kills2 = +slayerData["boss_kills_tier_2"];
  }
  if (slayerData["boss_kills_tier_3"]) {
    kills3 = +slayerData["boss_kills_tier_3"];
  }
  if (slayerData["boss_kills_tier_4"]) {
    kills4 = +slayerData["boss_kills_tier_4"];
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        position: "relative",
        minWidth: "min(440px,100vw)",
        padding: "80px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          textAlign: "center",
          borderBottom: "4px solid green",
          fontWeight: "bold",
          display: "block",
          paddingBottom: "4px",
          paddingTop: "8px",
        }}
      >
        <Image
          src={imagsrc}
          height={32}
          width={32}
          alt={"rev"}
          style={{
            verticalAlign: "middle",
            display: "inline-block",
          }}
        />
        <span
          style={{
            fontSize: "18px",
          }}
        >
          {" " + type}
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 64px)",
          marginBottom: "1rem",
          minWidth: "280px",
          textAlign: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <div style={{ display: "block" }}>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            TIER 1
          </div>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {kills0}
          </div>
        </div>
        <div style={{ display: "block" }}>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            TIER 2
          </div>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {kills1}
          </div>
        </div>
        <div style={{ display: "block" }}>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            TIER 3
          </div>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {kills2}
          </div>
        </div>
        <div style={{ display: "block" }}>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            TIER 4
          </div>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {kills3}
          </div>
        </div>
        <div style={{ display: "block" }}>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            TIER 5
          </div>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {kills4}
          </div>
        </div>
        <div style={{ display: "block" }}>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            TOTAL
          </div>
          <div
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {kills0 + kills1 + kills2 + kills3 + kills4}
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          justifyContent: "center",
          color: "rgba(255, 255, 255, 0.7)",
          fontWeight: "bold",
          fontSize: "20px",
          marginBottom: "-50px",
        }}
      >
        Slayer Level {level}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          width: "100%",
        }}
      >
        <Progress
          color="success"
          isStriped
          size="md"
          value={slayerData["xp"]}
          maxValue={xptolevel}
          minValue={0}
        ></Progress>
      </div>
    </div>
  );
};
