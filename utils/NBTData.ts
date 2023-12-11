import nbt from "prismarine-nbt";
import pako from "pako";

export async function ConvertNBTToJson(text: string) {
    const buffer = Buffer.from(text, 'base64');
    const parseNbt = require('util').promisify(nbt.parse);
    let data = await parseNbt(buffer);
    data = nbt.simplify(data);
    const newdata = [];
    for (let i = 0; i < data.i.length; i++) {
      newdata.push(data.i[i]);
    }
    return newdata;
  }