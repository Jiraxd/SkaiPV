export class UserDisplay {
  label: string;
  desc: string;
  pfp: string;

  constructor(label: string, desc: string, pfp: string) {
    this.label = label;
    this.desc = desc;
    this.pfp = pfp;
  }
}

export const frontPageItems = [
  new UserDisplay(
    "j1r4",
    "Developer of this page",
    "https://s.namemc.com/2d/skin/face.png?id=5418a6360609b407&scale=4"
  ),
];
