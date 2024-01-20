import Image from "next/image";

export const FishingMobDisplay = ({
  mobInfo,
  mobValue,
}: {
  mobInfo: any;
  mobValue: any;
}) => {
  console.log(mobInfo);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
        position: "relative",
        maxWidth: "200px",
        padding: "40px",
        overflow: "hidden",
        maxHeight: "180px",
        minHeight: "180px",
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
        <span
          style={{
            fontSize: "16px",
          }}
        >
          {mobInfo["name"]}
        </span>
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "15px",
          verticalAlign: "middle",
          display: "flex",
        }}
      >
        <Image
          src={
            "/sea_creatures/" +
            (mobInfo["name"] as string).toLowerCase().replaceAll(" ", "_") +
            ".webp"
          }
          height={50}
          width={50}
          alt={mobInfo["name"]}
          style={{
            minHeight: "50px",
            minWidth: "55px",
            maxHeight: "120px",
            maxWidth: "55px",
          }}
        />
        <p style={{ fontWeight: "700", marginLeft: "5px" }}>
          Killed: {" " + mobValue}
        </p>
      </div>
    </div>
  );
};
