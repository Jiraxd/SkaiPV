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