import { Tooltip } from "@nextui-org/tooltip";
import Image from "next/image";
import { FormattedMCLine } from "./FormattedLine";

export const TrophyFishDisplay = ({
  trophyData,
  trophyValues,
}: {
  trophyData: any;
  trophyValues: any;
}) => {
  const currentValues: any[] = [];
  Object.entries(trophyValues).forEach(([key, value]) => {
    if (
      key.includes(
        (trophyData["display_name"] as string)
          .replaceAll(" ", "_")
          .toLowerCase()
      )
    ) {
      currentValues.push([key, value]);
    }
  });
  return (
    <Tooltip
      content={
        <div style={{ maxWidth: "300px" }}>
          <FormattedMCLine
            linexd={trophyData["description"]}
            isHeader={false}
            count={0}
          ></FormattedMCLine>
        </div>
      }
      delay={0}
      closeDelay={0}
      motionProps={{
        variants: {
          exit: {
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            },
          },
          enter: {
            opacity: 1,
            transition: {
              duration: 0.1,
              ease: "easeOut",
            },
          },
        },
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "48px max-content",
          alignItems: "center",
          padding: "8px",
          borderRadius: "8px",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            top: "50%",
            left: "50%",
          }}
        >
          <Image
            width={128}
            height={128}
            alt={trophyData["display_name"]}
            src={`https://sky.shiiyu.moe/head/${trophyData["textures"]["diamond"]}`}
          />
        </div>
        <div
          style={{
            display: "block",
          }}
        >
          <div
            style={{
              marginBottom: "2px",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {trophyData["display_name"]}
            </span>
            {currentValues.length > 0 ? (
              <span
                style={{
                  fontWeight: "700",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {"  x" + currentValues[0][1]}
              </span>
            ) : (
              <span
                style={{
                  fontWeight: "700",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {"  x" + 0}
              </span>
            )}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, auto 1fr)",
              gap: "0px 4px",
              height: "44px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#a85c03",
                height: "12px",
                width: "12px",
                borderRadius: "50%",
                display: "block",
              }}
            ></div>
            <span style={{ height: "22px" }}>
              {currentValues.length >= 2 ? currentValues[1][1] : "0"}
            </span>
            <div
              style={{
                marginLeft: "10px",
                display: "block",
                backgroundColor: "#b4b4b5",
                height: "12px",
                width: "12px",
                borderRadius: "50%",
              }}
            />
            <span style={{ height: "22px" }}>
              {currentValues.length >= 3 ? currentValues[2][1] : "0"}
            </span>

            <div
              style={{
                backgroundColor: "#feb801",
                height: "12px",
                width: "12px",
                borderRadius: "50%",
                display: "block",
              }}
            ></div>
            <span style={{ height: "22px" }}>
              {currentValues.length >= 4 ? currentValues[3][1] : "0"}
            </span>
            <div
              style={{
                backgroundColor: "#68ecff",
                height: "12px",
                width: "12px",
                borderRadius: "50%",
                marginLeft: "10px",
                display: "block",
              }}
            ></div>
            <span style={{ height: "22px" }}>
              {currentValues.length >= 5 ? currentValues[4][1] : "0"}
            </span>
          </div>
        </div>
      </div>
    </Tooltip>
  );
};
