export function GetSkillLvl(
  playerData:any,
  value:string,
  skillData:any,
){
  let experience;
  try {
    experience = playerData["player_data"]["experience"];
  } catch {
    experience = null;
  }
  let level = 0;
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
      level = skillIndex + 1;
    }
    else {
      level = skillIndex;
    }
    if (value === "FARMING") {
      let realMaxLvl =
        50 +
        (playerData["jacobs_contest"]["perks"]["farming_level_cap"] as number);
      if (skillIndex + 1 > realMaxLvl) {
        level = realMaxLvl;
      }
      
    } else if (value === "TAMING") {
      let realMaxLvl = 50 + 10;
      if (skillIndex + 1 > realMaxLvl) {
        level = realMaxLvl;
      }
    }
  }
  return level;
}


export function GetSkillLevel(playerData : any, skillDataxd: any){
    let experience;
    try {
      experience = playerData["player_data"]["experience"];
    } catch {
      experience = null;
    }
    if(experience != null) {
        let totalLevels = 0;
        let times = 0;
        Object.entries(experience).forEach(([key, value]) => {
            if(key === "SKILL_RUNECRAFTING" || key === "SKILL_SOCIAL" || key === "SKILL_CARPENTRY") return;
        times++;
        const skillExp = value;
    //  console.log(key);
    //  console.log(value);
        const keyforskill = key.substring(key.indexOf("_") + 1, key.length);
        const levels = Object.values(skillDataxd["skills"][`${keyforskill}`]["levels"]);
        let skillIndex = 0;
        if (skillExp === null || skillExp === undefined) {
          skillIndex = 0;
        } else {
          skillIndex = levels.findIndex(
            (level) => (level as any)["totalExpRequired"] >= skillExp
          ) as any;
        }
    
        if (skillIndex < 0) {
          skillIndex = levels.length;
        }
    //  console.log(skillIndex);
        totalLevels += skillIndex;
        });
        const averageskill = (totalLevels / times).toFixed(2);
        return averageskill;
      };
      return 0;
  };