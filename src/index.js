const button = document.getElementById("button");
const input = document.getElementById("input");
const output = document.getElementById("output");

const furnMap = new Map();
const colorMap = new Map();

const compareName = (a,b) => {
    if (a.name < b.name)
       return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

const compareColor = (a,b) => {
if (a.color < b.color)
    return -1;
if (a.color > b.color)
    return 1;
return 0;
}

const getTextListFromInput = (jsonInput, canHaveColor) => {
    // Inside furnitures here : 
    furnMap.clear();
    colorMap.clear();
    let furnitureList = jsonInput.map(furniture => { return { name: furniture.name, color: canHaveColor ? furniture.properties.color : null } });
    const furnitureListPerName = furnitureList.sort(compareName).map(furniture => furniture.name)
    const furnSetPerName = new Set(furnitureListPerName);
    furnSetPerName.forEach(furn => {
        furnMap.set(furn, furnitureList.filter(furniture => furn === furniture).length);
    });

    furnitureList = furnitureList.sort(compareColor).map(furniture => furniture.color)
    const furnitureListPerColor = furnitureList.filter(color => !!color);
    const furnSetPerColor = new Set(furnitureListPerColor);
    furnSetPerColor.forEach(color => {
        colorMap.set(color, furnitureList.filter(furnColor => color === furnColor).length);
    });
};

const process = () => {
    output.value = "";
    try{
        const jsonInput = JSON.parse(input.value);
        getTextListFromInput(jsonInput.interiorFurniture, true);
        output.value = '===============================\nINTERIOR FURNITURE LIST :\n===============================\n\n';
        furnMap.forEach((value, key) => {
            output.value = output.value + `[] - ${key} x ${value}\n`;
        });
        
        output.value = output.value + '\n===============================\nINTERIOR DYE LIST :\n===============================\n\n';
        colorMap.forEach((value, key) => {
            console.log(key.substring(0,6));
            output.value = output.value + `[] - ${colors[key.substring(0,6)] ? colors[key.substring(0,6)] : `Color not found, hex value : ${key.substring(0,6)}`} x ${value}\n`;
        });
        

        getTextListFromInput(jsonInput.interiorFixture, false);
        output.value = output.value + '\n===============================\nINTERIOR FIXTURE LIST :\n===============================\n\n';
        furnMap.forEach((value, key) => {
            output.value = output.value + `[] - ${key} x ${value}\n`;
        });

        getTextListFromInput(jsonInput.exteriorFurniture, true);
        output.value = output.value + '\n===============================\nEXTERIOR FURNITURE LIST :\n===============================\n\n';
        furnMap.forEach((value, key) => {
            output.value = output.value + `[] - ${key} x ${value}\n`;
        });

        output.value = output.value + '\n===============================\nEXTERIOR DYE LIST :\n===============================\n\n';
        colorMap.forEach((value, key) => {
            console.log(key.substring(0,6));
            output.value = output.value + `[] - ${colors[key.substring(0,6)] ? colors[key.substring(0,6)] : `Color not found, hex value : ${key.substring(0,6)}`} x ${value}\n`;
        });

        getTextListFromInput(jsonInput.exteriorFixture, false);
        output.value = output.value + '\n===============================\nEXTERIOR FIXTURE LIST :\n===============================\n\n';
        furnMap.forEach((value, key) => {
            output.value = output.value + `[] - ${key} x ${value}\n`;
        });
    } catch(error) {
        alert('Json input incorrect, make sure that your input is in JSON format');
        console.error(error);
        return 1;
    }
};

button.addEventListener('click', process);
