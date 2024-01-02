export function GetCollectionLevel(currentCollected:any, maxLevel: number, collectionData: any[]){
if(currentCollected == undefined || currentCollected == null) return "0";
var level = maxLevel;
collectionData.forEach((value, index) => {
    if(value["amountRequired"] > currentCollected) {
        if(index === 0) level = 0;
        else {level = collectionData[index - 1]["tier"]; return;};
    }
})
return level;
}

export function GetPercentToNextCollection(currentCollected:any, maxLevel: number, collectionData: any[]){
    if(currentCollected == undefined || currentCollected == null) return "0";
    var level = maxLevel;
    collectionData.forEach((value, index) => {
        if(value["amountRequired"] > currentCollected) {
            if(index === 0) level = 0;
            else {level = collectionData[index - 1]["tier"]; return;};
        }
    })
    if(level === maxLevel) return "Max level reached!";
    return (currentCollected / collectionData[level]["amountRequired"] * 100).toFixed(1) + "%" + " to tier " + (level + 1);
}