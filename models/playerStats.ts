import { GivesStat } from "./givesStat";

export class PlayerStats {
    stat: string;
    value: number;
    gives: Array<GivesStat>;
  
    constructor(stat: string, value: number, gives: Array<GivesStat>) {
      this.stat = stat;
      this.value = value;
      this.gives = gives;
    }
  }