const button = document.getElementById("button");
const input = document.getElementById("input");
const output = document.getElementById("output");

const furnMap = new Map();

const compare = (a,b) => {
    if (a.name < b.name)
       return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

const getTextListFromInput = (jsonInput) => {
    // Inside furnitures here : 
    furnMap.clear();
    let furnitureList = jsonInput.map(furniture => { return { name: furniture.name /**, color: furniture.properties.color */ } });
    furnitureList = furnitureList.sort(compare).map(furniture => furniture.name)
    const furnSet = new Set(furnitureList);
    furnSet.forEach(furn => {
        furnMap.set(furn, furnitureList.filter(furniture => furn === furniture).length);
    });
};

const process = () => {
    output.value = "";
    try{
        const jsonInput = JSON.parse(input.value);
        getTextListFromInput(jsonInput.interiorFurniture);
        output.value = '===============================\nINTERIOR FURNITURE LIST :\n===============================\n\n';
        furnMap.forEach((value, key) => {
            output.value = output.value + `[] - ${key} x ${value}\n`;
        });

        getTextListFromInput(jsonInput.interiorFixture);
        output.value = output.value + '\n===============================\nINTERIOR FIXTURE LIST :\n===============================\n\n';
        furnMap.forEach((value, key) => {
            output.value = output.value + `[] - ${key} x ${value}\n`;
        });

        getTextListFromInput(jsonInput.exteriorFurniture);
        output.value = output.value + '\n===============================\nEXTERIOR FURNITURE LIST :\n===============================\n\n';
        furnMap.forEach((value, key) => {
            output.value = output.value + `[] - ${key} x ${value}\n`;
        });

        getTextListFromInput(jsonInput.exteriorFixture);
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
