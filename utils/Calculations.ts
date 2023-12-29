export function GetCollectionLevel(currentCollected:any, maxLevel: number, collectionData: any[]){
if(currentCollected == undefined || currentCollected == null) return "0";
var level = maxLevel;
collectionData.forEach((value, index) => {
    if(value["amountRequired"] > currentCollected) {
        if(index === 0) level = 0;
        else level = collectionData[index - 1]["tier"];
    }
})
return level;
}