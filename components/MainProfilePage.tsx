"use client";
import { title } from "@/components/primitives";
import { useState, useEffect } from "react";
import { UserDisplay } from "@/models/userDisplay";
import { useRouter } from "next/navigation";
import { SkillsDisplay } from "@/components/skillsDisplay";
import { Divider } from "@nextui-org/divider";
import { StatsDisplay } from "@/components/statsDisplay";
import { DataNavbar } from "@/components/DataNavbar";
import { ArmorDisplay } from "@/components/Armor";
import { Spacer } from "@nextui-org/spacer";
import { WardrobeDisplay } from "./wardrobe";
import { WeaponsDisplay } from "./weaponsDisplay";
import { AccDisplay } from "./accDisplay";

// MIN RES JE 1321X1080, POTOM TO CHCE PŘEDĚLAT
export const MainProfilePage = ({
  params,
}: {
  params: { profile: string[] };
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [data, setData] = useState(null);
  const [skillData, setSkill] = useState(null);
  const [uuid, setuuid] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const search = params.profile[1];
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const responsexd = await fetch(`/api/uuidAPI?id=${search}`).then((res) =>
        res.json()
      );
      setuuid(responsexd["data"]["id"]);
      const id = responsexd["data"]["id"];
      const skillData = await fetch(
        `https://api.hypixel.net/v2/resources/skyblock/skills`,
        { cache: "force-cache" }
      ).then((res) => res.json());
      setSkill(skillData);
      const data = await fetch(`/api/profileAPI?id=${id}`);
      const json = data.json();
      return json;
    };
    fetchData().then((valuexd) => {
      setData(valuexd["valuetoreturn"]);
      setLoading(false);
    });
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (data === null || data["profiles"] === null) return <p>No profile data</p>;
  const strg = localStorage.getItem("lastVisited");
  let banking = null;
  const arrayx: UserDisplay[] = JSON.parse(strg as string);
  let currentProfile: any;
  let profileName = "error";
  if (params.profile.length > 2) {
    profileName = params.profile[2];
    let tempProfile = Object.values(data["profiles"]).find(
      (profile) => (profile as any)["cute_name"] === profileName
    ) as any;
    try {
      banking = tempProfile["banking"];
    } catch (err) {
      banking = null;
    }
    currentProfile = tempProfile["members"][`${uuid}`];
    if (currentProfile == null) {
      let tempProfile = Object.values(data["profiles"]).find(
        (profile) => (profile as any)["selected"] === true
      ) as any;
      try {
        banking = tempProfile["banking"];
      } catch (err) {
        banking = null;
      }
      currentProfile = tempProfile["members"][`${uuid}`];
      profileName = tempProfile["cute_name"];
    }
  } else {
    let tempProfile = Object.values(data["profiles"]).find(
      (profile) => (profile as any)["selected"] === true
    ) as any;
    try {
      banking = tempProfile["banking"];
    } catch (err) {
      banking = null;
    }
    currentProfile = tempProfile["members"][`${uuid}`];
    profileName = tempProfile["cute_name"];
  }
  const linkFullBodyRender = `https://crafatar.com/renders/body/${uuid}?size=511&scale=9`;
  const newProfile = new UserDisplay(
    `${search}`,
    `Skyblock level: ${
      ((currentProfile as any)["leveling"]["experience"] as number) / 100
    }`,
    `https://crafatar.com/avatars/${uuid}?default=MHF_Steve&overlay`
  );

  if (arrayx === null || arrayx.length === 0) {
    localStorage.setItem("lastVisited", JSON.stringify([newProfile]));
  } else {
    let profile = arrayx.find((f) => f.label == newProfile.label);
    if (profile == null) {
      arrayx.push(newProfile);

      if (arrayx.length > 4) {
        arrayx.shift();
      }

      localStorage.setItem("lastVisited", JSON.stringify(arrayx));
    } else {
      arrayx[arrayx.indexOf(profile)].desc = `Skyblock level: ${
        ((currentProfile as any)["leveling"]["experience"] as number) / 100
      }`;
      localStorage.setItem("lastVisited", JSON.stringify(arrayx));
    }
  }

  return (
    <>
      <div
        className="absolute top-10 right-0 w-3/4 mx-auto h-auto p-4"
        style={{
          backgroundColor: "rgba(20, 20, 20, 0.8)",
          borderRadius: "15px",
          zIndex: "10",
        }}
      >
        <br />
        <br />
        <div className="">
          <h1 className={title()}>Currently viewing </h1>
          <h1 className={title()} style={{ color: "yellow" }}>
            {search}&apos;s
          </h1>
          <h1 className={title()}>
            {" "}
            profile on{" "}
            <span
              style={{
                color: "purple",
                position: "relative",
                display: "inline-block",
                verticalAlign: "middle",
                height: "54px",
              }}
              onMouseEnter={() => setIsMenuVisible(true)}
              onMouseLeave={() => setIsMenuVisible(false)}
            >
              {profileName}

              <div
                style={{
                  display: "flex",
                  transition: "opacity 0.3s ease",
                  opacity: `${isMenuVisible ? 100 : 0}`,
                }}
              >
                <ul
                  style={{
                    backgroundColor: "rgba(20, 20, 20, 1)",
                    borderRadius: "17px",
                    color: "white",
                    fontSize: "90%",
                    display: "block",
                    minWidth: "260px",
                    top: "100%",
                    paddingInlineStart: "15px",
                    padding: 20,
                    lineHeight: "70px",
                  }}
                >
                  {Object.values(data["profiles"]).map((profile, index) => {
                    if ((profile as any)["cute_name"] !== profileName) {
                      return (
                        <li
                          key={index}
                          className="cursor-pointer hover:text-grey-200"
                        >
                          <button
                            onClick={() => {
                              router.replace(
                                `/dataDisplay/${params.profile[1]}/${
                                  (profile as any)["cute_name"]
                                }`
                              );
                            }}
                          >
                            {(profile as any)["cute_name"]}
                          </button>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </span>
          </h1>
          <br />
          <br />
          <div>
            <SkillsDisplay playerData={currentProfile} skillData={skillData} />
            <StatsDisplay
              playerData={currentProfile}
              banking={banking}
              uuid={uuid}
              skillData={skillData}
            />
          </div>
          <br />
          <br />
          <Divider id="armor" className="padding-8"></Divider>
          <br />
        </div>
        <div
          style={{
            zIndex: 100,
            position: "sticky",
            top: "calc(52px + env(safe-area-inset-top, 0))",
            paddingBottom: "6px",
            paddingTop: "6px",
            whiteSpace: "nowrap",
          }}
        >
          <DataNavbar></DataNavbar>
        </div>
        <br />
        <Divider className="padding-8"></Divider>
        <br />
        <br />
        <h1
          className={title()}
          style={{
            borderBottom: "4px solid green",
            display: "inline-block",
            paddingBottom: "8px",
          }}
        >
          ARMOR
        </h1>
        <Spacer y={4} />
        <div>
          <ArmorDisplay
            pData={currentProfile}
            isEquipment={false}
          ></ArmorDisplay>
        </div>
        <Spacer y={8} />
        <h1
          className={title()}
          style={{
            borderBottom: "2px solid green",
            display: "inline-block",
            paddingBottom: "6px",
            fontSize: "32px",
          }}
        >
          EQUIPMENT
        </h1>
        <Spacer y={4} />
        <div id="equipment">
          <ArmorDisplay
            pData={currentProfile}
            isEquipment={true}
          ></ArmorDisplay>
        </div>
        <Spacer y={8} />
        <h1
          className={title()}
          style={{
            borderBottom: "2px solid green",
            display: "inline-block",
            paddingBottom: "6px",
            fontSize: "32px",
          }}
        >
          WARDROBE
        </h1>
        <Spacer y={4} />
        <div id="wardrobe">
          <WardrobeDisplay playerData={currentProfile} />
        </div>
        <h1
          className={title()}
          style={{
            borderBottom: "4px solid green",
            display: "inline-block",
            paddingBottom: "8px",
          }}
        >
          WEAPONS
        </h1>
        <Spacer y={4} />
        <div id="weapons">
          <WeaponsDisplay playerData={currentProfile} />
        </div>
        <Spacer y={10} />
        <h1
          className={title()}
          style={{
            borderBottom: "4px solid green",
            display: "inline-block",
            paddingBottom: "8px",
          }}
        >
          ACCESSORY BAG
        </h1>
        <Spacer y={4} />
        <div id="accessories">
          <AccDisplay playerData={currentProfile}></AccDisplay>
        </div>
        <Spacer y={10} />
        <h1
          className={title()}
          style={{
            borderBottom: "4px solid green",
            display: "inline-block",
            paddingBottom: "8px",
          }}
        >
          INVENTORY
        </h1>
        <Spacer y={96} />
        <Spacer y={96} />
        <Spacer y={96} />
      </div>
      <div
        style={{
          top: "35%",
          position: "absolute",
          width: "30%",
          left: "8%",
        }}
      >
        <img
          src={linkFullBodyRender}
          alt="Image 1"
          style={{ position: "fixed" }}
        />
      </div>
    </>
  );
};
