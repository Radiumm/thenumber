"use strict";
var CRAFTINGMATERIALSUNLOCKED = [];
var CRAFTINGMATERIALS = [
  
];
var TECHNOLOGY = [
    {
    name: "Crafting", //Descriptive stuff. Won't do anything but tooltip.
    description: "Unlocks a wide variety of new things to make and do. ",
    requirement: () => RESOURCES[2].totalCount >= 100,
    result: function() {
        CRAFTINGMATERIALSUNLOCKED.push("journal", "ore");
        TECHNOLOGYPURCHASED.push('craftingTech');

        let journalCosts = [ //Journal Costs
            {name: 'science', value: 100},
        ];
        unlockMaterial('journal', journalCosts); //Unlock the material to craft.
        
        let oreCosts = [ //Journal Costs
            {name: 'science', value: 100},
        ];
        unlockMaterial('ore', oreCosts); //Unlock the material to craft.       
    
    },
    costs: [
        {name: "money", value: 100}
    ],                 
    button: `<button class="buildingButtons">Crafting</button>` // Amount of the building.
              
    },
    
]

function materialTooltip (material) {
    
    
    let tooltip = "";
    for (const cost of material.costs) {
        tooltip += cost.value + " " + cost.name + "\n";
    }
    return tooltip;
}

function craftItem (material) {
    
    let insufficient = false;
    for (let cost of material.costs) {
        let value = numFormat(Math.ceil(cost.value));
        let n = 0;
        if (RESOURCES[returnIndex(RESOURCES, cost.name)] == undefined) {
            n = CRAFTINGMATERIALS[returnIndex(CRAFTINGMATERIALS, cost.name)].count;        
            if (n >= cost.value) {
                continue;   
            } else {   
                insufficient = true;
            } 
        } else {
            n = RESOURCES[returnIndex(RESOURCES, cost.name)].count;          
            if (n >= cost.value) {
                continue;   
            } else {   
                insufficient = true;
            } 
        }
        
    }
    if (!(insufficient)) {
        for (let cost of material.costs) { 
            let temp = cost.value; // Removes the currency from your inventory.
            if (RESOURCES[returnIndex(RESOURCES, cost.name)] == undefined) {
                CRAFTINGMATERIALS[returnIndex(CRAFTINGMATERIALS, cost.name)].count -= temp;
                getId(cost.name.toLowerCase() + "Disp").innerHTML = numFormat(CRAFTINGMATERIALS[returnIndex(CRAFTINGMATERIALS, cost.name)].count);
                
            } else {
                RESOURCES[returnIndex(RESOURCES, cost.name)].count -= temp;
                getId(cost.name.toLowerCase() + "Disp").innerHTML = numFormat(RESOURCES[returnIndex(RESOURCES, cost.name)].count);
                
            }
        }
        UPGRADESPURCHASED.push(material.id);
        material.count += 1;
        material.totalCount += 1;
        
        getId(material.id + "Disp").innerText = material.count;
    }
} 

function unlockMaterial (id, cost, index) { //Id: string of mat name. Cost: array of costs. index: index of inserter.
   
    index = index || getId('materialTable').rows.length - 1;
    
    const table = getId('materialTable');    
    const tr = document.createElement("tr")  //Create elements and append
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")
    const td3 = document.createElement("td")
    const tooltip = document.createElement("div");
    const button = document.createElement("button");
    CRAFTINGMATERIALS.push({ id: id, count: 0, totalCount: 0, prodBase: 0, costs: cost});
    tooltip.innerText = materialTooltip(CRAFTINGMATERIALS[CRAFTINGMATERIALS.length - 1]);
    var index = CRAFTINGMATERIALS.map(function(el) {
        return el.id;
      }).indexOf(id);
    button.addEventListener('click', () => {
        craftItem(CRAFTINGMATERIALS[index]); //Adds craft event listener
        });
    /*if (getId("materialTable").rows.length != 0) 
        $('#materialTable').eq(index-1).after(tr); */
    $('#materialTable tr').eq(index-1).after(tr);
    tr.appendChild(td1); 
    tr.appendChild(td2);
    tr.appendChild(button);
    tr.appendChild(tooltip);
    tooltip.setAttribute("id", id + "Tooltip");
    tooltip.setAttribute('class', 'tooltip');
    td1.innerText = id.substring(0,1).toUpperCase() + id.substring(1); //Makes the id 1st letter capital.
    td2.setAttribute('id', id + "Disp");
    td2.innerText = CRAFTINGMATERIALS[CRAFTINGMATERIALS.length - 1].count;
    button.innerText = "Craft Once";
    var id = "#" + id + "Button";
    $(button).hover(function(){  
        $(tooltip).css("visibility", "visible");
        }, function(){
        $(tooltip).css("visiblity", "hidden");
        tooltip.style.visibility = 'hidden';
    });
    button.style.width = '100px';

    
}


