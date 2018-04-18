/* Shorthand for getElementById or getElementsByClassName */
var getId = function (id) {return document.getElementById(id);};
var getClass = function (c) {return document.getElementsByClassName(c);};
//.
function returnIndex (array, targetID) {
    var index = array.findIndex(function(x) {
        const y = x.id || x.name;
        return y == targetID;
    });
    return index;
}

/* Objects of the game */
var player = {
    moneyRatio: Number(2.67 - Number(UPGRADESPURCHASED.includes('benefits') ? 0.002 * BUILDINGS.returnIndex(BUILDINGS, 'gradBuilding'):0)),
    globalMultiplier: 1.000 //Total multiplier, multiplies ALL production.
}; //Handles player-based actions.
var RESOURCES = [ //Handles RESOURCES of all kinds.
    {     
    count: 0,
    totalCount: 0,
    upgProd: 0,
    id: 'number'
    },    
    {
    count: 0, // Raw count, unrounded until numFormat().
    totalCount: 0,
    upgProd: 0, //Amount gained from upgrades per TICK.
    id: 'money'
    },
    {
    count: 0,
    totalCount: 0,
    upgProd: 0,
    id: 'science'
    },
    {
    count: 0,
    totalCount: 0,
    upgProd: 0, //Amount produced from upgrades.
    id: 'popularity'
    },
    {
    count: 0,
    totalCount: 0,
    upgProd: 0, //Amount produced from upgrades.
    id: 'energy'
    },
    {
    count: 0,
    totalCount: 0,
    upgProd: 0, //Amount produced from upgrades.
    id: 'darkMatter'
    }
];





function nullCheck (val) {
    return (val == null || val == 'undefined');
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


var getId = function (id) {return document.getElementById(id);};
var getClass = function (c) {return document.getElementsByClassName(c);};
/* Makes stuff hidden or visible. Call ""Id for one ID, call ""Class for a class of elements. */
function makeHiddenId (id) {
    getId(id).style.visibility = 'hidden';
}
function makeVisibleId (id) {
    getId(id).style.visibility = 'visible';
}

function makeHiddenClass (className) {
    getClass(className).style.visibility = 'hidden';
}
function makeVisibleClass (className) {
    getClass(className).style.visibility = 'visible';
}
/* Formats numbers all nice. */
function numFormat(x, shortIgnore) {
    
    shortIgnore = shortIgnore || false;

    var xString = x.toString();
    var indexDot = xString.indexOf('.');
    if (x < 0.1 && x.toString().indexOf(".") > -1 && xString.substring(indexDot, x.length).length > -1)  { //If num has a decimal 3 digits long then indicate that there's a small count.
        if (shortIgnore) {
            return "0.00(...)";
        } else {
            return xString.substring(0, xString.length);
        }

    }
    if (x > 0.01 && x < 1) {
       
        return xString.substring(0, (indexDot-1) + 5);
    }
    if (Number(x) >= 1000 && Number(x) < Math.pow(10,9)) { // Remove decimals if num is in the thousands/millions
        x = Math.floor(x).toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }
    if (Number(x) <= Math.pow(10,9) - 1) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    } else {
        x = Math.floor(x * 100) / 100;
        var z = Number(x).toExponential().toString();

        //z looks something like "1.234567890e+100"
        var num = z.substring(0, z.indexOf("e"));

        //num should look like "1.234567890"
        var num2 = z.substring(z.indexOf("e"), z.length);
        //num2 should look like "e+100"
        return num.substring(0, 4).concat(num2);
        //return the combination of "1.234" and "e+100"

    

    }
}

function numberClick(count) {
    RESOURCES[0].count += count;
    RESOURCES[0].totalCount += count;
    getId('numberDisp').innerHTML = numFormat(Math.floor(RESOURCES[0].count));
    

}

var resourceTypes = ['money', 'science', 'popularity', 'energy', 'darkMatter']; // UPDATE THIS to match the number of resource types.
 var numCurrencies = 0; //Counter to verify that all currencies are accounted for. Compared to "satisfied' later on.
 var satisfied = 0;
 function upgrade (upgrade) {
    let insufficient = false;
    for (let cost of upgrade.costs){
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
        for (let cost of upgrade.costs) { 
            let temp = cost.value; // Removes the currency from your inventory.
            if (RESOURCES[returnIndex(RESOURCES, cost.name)] == undefined) {
                CRAFTINGMATERIALS[returnIndex(CRAFTINGMATERIALS, cost.name)].count -= temp;
                getId(cost.name.toLowerCase() + "Disp").innerHTML = numFormat(CRAFTINGMATERIALS[returnIndex(CRAFTINGMATERIALS, cost.name)].count);
               
            } else {
                RESOURCES[returnIndex(RESOURCES, cost.name)].count -= temp;
                getId(cost.name.toLowerCase() + "Disp").innerHTML = numFormat(RESOURCES[returnIndex(RESOURCES, cost.name)].count);
               
            }
        }
        UPGRADESPURCHASED.push(upgrade.id);
        upgrade.result();
        getId(upgrade.id + "Tooltip").style.visibility = 'hidden';
        getId(upgrade.id + "Button").style.visibility = 'hidden';
        getId('upgradeTable').deleteRow($(upgrade.id + "Button").index('upgradeTable'));
        updateProductionArray();
    }

}

 

var TECHPURCHASED = [];
function upgradeTech (technology) {
    let insufficient = false;
    for (let cost of technology.costs){
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
        for (let cost of technology.costs) { 
            let temp = cost.value; // Removes the currency from your inventory.
            if (RESOURCES[returnIndex(RESOURCES, cost.name)] == undefined) {
                CRAFTINGMATERIALS[returnIndex(CRAFTINGMATERIALS, cost.name)].count -= temp;
                getId(cost.name.toLowerCase() + "Disp").innerHTML = numFormat(CRAFTINGMATERIALS[returnIndex(CRAFTINGMATERIALS, cost.name)].count);
               
            } else {
                RESOURCES[returnIndex(RESOURCES, cost.name)].count -= temp;
                getId(cost.name.toLowerCase() + "Disp").innerHTML = numFormat(RESOURCES[returnIndex(RESOURCES, cost.name)].count);
               
            }
        }
        UPGRADESPURCHASED.push(technology.id);
        technology.result();
        getId(technology.id + "Button").style.visibility = 'hidden';
        getId('technologyTable').deleteRow($(technology.id + "Button").index('technologyTable'));
        updateProductionArray();
    }
} 

function createTooltip (object, type, annex) { // Make a tooltip
    annex = annex || "";
    let array = object.costs;
    var tooltip = "";
        tooltip += object.name + "\n";
        tooltip += object.description.toString() + "\n";
        tooltip += divider + "\n";
    
        for (const cost of object.costs) {
            let value = numFormat(Math.ceil(cost.value));
            if (cost.name == 'money') {
                tooltip += numFormat(Math.ceil(cost.value)) + " dollars \n";
            } else {
                tooltip += numFormat(Math.ceil(cost.value)) + " " + cost.name + "\n";
            }
        }
        if (type == 'building') {
            for (let x = 0; x < object.production.length - 1; x++) {
                const capitalName = object.production[x].name.substring(0,1).toUpperCase() + object.production[x].name.substring(1);
                tooltip += capitalName + " Production: " + numFormat(Math.round(object.production[x].value * 700)/100);
            }
        }
        tooltip += divider + "\n";
        if (type == "building") {
            
        } else if (type == 'upgrade') {
            tooltip += object.tooltip + "\n";
        }
        tooltip += annex;   
        return tooltip;
      
}



function buyBuilding (building) {
    let insufficient = false;
    for (let cost of building.costs){
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
        building.count++;
        getId(building.id + "CountDisp").innerText = numFormat(building.count);
        
        for (let cost of building.costs) { 
            let temp = cost.value;
            if (RESOURCES[returnIndex(RESOURCES, cost.name)] == undefined) {
                CRAFTINGMATERIALS[returnIndex(CRAFTINGMATERIALS, cost.name)].count -= temp;
                getId(cost.name.toLowerCase() + "Disp").innerHTML = numFormat(CRAFTINGMATERIALS[returnIndex(CRAFTINGMATERIALS, cost.name)].count);
                temp *= building.costRatio; //Increases cost of items
            } else {
                RESOURCES[returnIndex(RESOURCES, cost.name)].count -= temp;
                getId(cost.name.toLowerCase() + "Disp").innerHTML = numFormat(RESOURCES[returnIndex(RESOURCES, cost.name)].count);
                temp *= building.costRatio;
            }
        }
       
            for (let cost of building.costs) {
                var temp = cost.name.substring(0,1).toUpperCase() + cost.name.substring(1); //Capitalizes the first letter.
                cost.value *= building.costRatio;
                getId(building.id + "Tooltip").innerText = createTooltip(building, 'building');
                
            }
        updateProductionArray();
    }
}
const divider = '----------------------------------------------------------------';
var BUILDINGSSHOWN = [];
var trBuffer = 1;
function checkVisibilityOnBuildings () {
     //Buffers so every 2 td's there's a new tr.
    var numRows = 0; //Number of rows in the table
    for (let index of BUILDINGS) { //Note that index is THE OBJECT, so when you call it, you only call index, not BUILDINGS[index].
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let button = document.createElement("td");
        let tooltip = document.createElement("div");
        let table = getId('buildingsTable');
        if (index.requirement() && !(BUILDINGSSHOWN.includes(index.id))) {
         
            BUILDINGSSHOWN.push(index.id);
            

            if (trBuffer == 1) {   
                table.appendChild(tr);
                tr.appendChild(td);
                numRows++;
                trBuffer = 0;    
            } else {  
                trbuffer++;
                let rows = getId('buildingsTable').getElementsByTagName("tr");
                table.rows[rows.length - 1].appendChild(td);
            }
            
            td.appendChild(button);
            td.appendChild(tooltip);
            tooltip.innerHTML = index.tooltip;
            tooltip.setAttribute('class', 'tooltip');
            tooltip.setAttribute('id', index.id + "Tooltip");
            button.setAttribute('id', index.id + "Button");
            button.innerHTML = index.button;
            //button.setAttribute('id', index.id + "Button");
            tooltip.setAttribute('id', index.id + "Tooltip");
            tooltip.innerText = createTooltip(index, 'building', "");    
            $(button).hover(function(){  
                $(tooltip).css("visibility", "visible");
                }, function(){
                $(tooltip).css("visiblity", "hidden");
                tooltip.style.visibility = 'hidden';
            });

            button.addEventListener("click", function() { buyBuilding(index) } ); 
        }
    }  
}
function objectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};



var numBuildings = objectLength(BUILDINGS);
var numUpgrades = objectLength(UPGRADES);

for (var i = 0; i < UPGRADES.length; i++)
    UPGRADES[i].trId = UPGRADES[i].id.concat("TableRow");



function checkVisiblityOnUpgrades() { 
    let tr = document.createElement("tr"); //Create elements
    let td = document.createElement("td");
    let button = document.createElement("td");
    let tooltip = document.createElement("div");
    let table = getId('upgradeTable');

    for (let iter of UPGRADES) {
        if ((iter.isVisible) == null) { //Add isVisible
            iter.isVisible = false;
        }
        
        var currentUpgrade = iter;
        if (iter.requirement() && UPGRADESPURCHASED.includes(iter.id) == false && iter.isVisible == false) { //If not visible and requirement met
            
            iter.isVisible = true;
            /* Null Checks before updating html */
           
            table.appendChild(tr);          
            tr.appendChild(td);
            td.appendChild(button);
            td.appendChild(tooltip);
            button.innerHTML = iter.button;
            button.setAttribute('id', iter.id + "Button");
            tooltip.innerText = createTooltip(iter, 'upgrade');
            tooltip.setAttribute('class', 'tooltip');
            tooltip.setAttribute('id', iter.id + "Tooltip");
            let id = "#" + iter.id + "Button";
            $(button).hover(function(){  
                $(tooltip).css("visibility", "visible");
                }, function(){
                $(tooltip).css("visiblity", "hidden");
                tooltip.style.visibility = 'hidden';
            });  
            td.addEventListener('click', () => { upgrade(iter);} );
        }
        
    }

}
var TECHNOLOGYPURCHASED = [];
function checkVisiblityOnTechnology() {
    let tr = document.createElement("tr"); //Create elements
    let td = document.createElement("td");
    let button = document.createElement("td");
    let tooltip = document.createElement("div");
    let table = getId('technologyTable');

    for (let iter of TECHNOLOGY) {
        if ((iter.isVisible) == null) { //Add isVisible
            iter.isVisible = false;
        }
        
        var currentUpgrade = iter;
        if (iter.requirement() && TECHNOLOGYPURCHASED.includes(iter.id) == false && iter.isVisible == false) { //If not visible and requirement met
            
            iter.isVisible = true;
            /* Null Checks before updating html */
           
            table.appendChild(tr);          
            tr.appendChild(td);
            td.appendChild(button);
            td.appendChild(tooltip);
            button.innerHTML = iter.button;
            button.setAttribute('id', iter.id + "Button");
            tooltip.innerText = createTooltip(iter, 'upgrade');
            tooltip.setAttribute('class', 'tooltip');
            tooltip.setAttribute('id', iter.id + "Tooltip");
            let id = "#" + iter.id + "Button";
            $(button).hover(function(){  
                $(tooltip).css("visibility", "visible");
                }, function(){
                $(tooltip).css("visiblity", "hidden");
                tooltip.style.visibility = 'hidden';
            });  
            td.addEventListener('click', () => { upgradeTech(iter);} );
        }
        
    }
}

function checkVisibilityOnResources() {
    
    for (let i of RESOURCES) {
        
        if (i.count > 0 && i.id != 'number') {
        
        getId(i.id.concat('TextDisp')).style.visibility = 'visible';
        getId(i.id.concat('Name')).style.visibility = 'visible';
        getId(i.id.concat('Disp')).style.visibility = 'visible';
        getId(i.id.concat('Disp')).innerHTML = 0;
        getId(i.id.concat('ProductionTotalDisp')).style.visibility = 'visible';
        getId(i.id.concat('ProductionTotalDisp')).innerHTML = 0;
        }
    }
}

var updateElements = null;

function getElementsToUpdate() {
  return {
    moneyProductionTotalDisp: getId('moneyProductionTotalDisp'),
    moneyDisp: getId('moneyDisp'),
    numberDisp: getId('numberDisp'),
    scienceDisp: getId('scienceDisp'),
    scienceProductionTotalDisp: getId('scienceProductionTotalDisp'),
    popularityDisp: getId('popularityDisp'),
    popularityProductionTotalDisp: getId('popularityProductionTotalDisp'),
    energyDisp: getId('energyDisp'),
    energyProductionTotalDisp: getId('energyProductionTotalDisp'),
    darkMatterDisp: getId('darkMatterDisp'),
    darkMatterProductionTotalDisp: getId('darkMatterProductionTotalDisp')
    // and so on...
  }
}

/* Initialization */
UPGRADESPURCHASED = [];
getElementsToUpdate();


var buffer = 0; //This will buffer the count of times the checkVisibilityOnUpgrades() and checkVisibilityOnUpgrades() functions are called as to not overuse RESOURCES.

function updateProductionArray () {
    for (let prodArr of BUILDINGS) {
        for (let prod of prodArr.production) {
        if (prodArr.count > 0) {
        if (!(PRODUCTION.filter(e => e.name === prod.name).length > 0)) {
            PRODUCTION.push(prod);
        } else {
            const index = PRODUCTION.findIndex(function(x) {
                return x.name == prod.name;
            });
            PRODUCTION[index].value += prod.value; //Increase array value by production value * number of buildings.
            }
        }
        }
    }
}

let start = "";
let numTicksOffline = 1;
let offlineTickComplete = false;
function onBlur() {
    start = Date.now();
    offlineTickComplete = false;
};
function onFocus(){
    const msOffline = Date.now() - start;
    numTicksOffline = Math.ceil(msOffline / 360);
    addCurrency(numTicksOffline);
    numTicksOffline = 1;
	
};

if (/*@cc_on!@*/false) { // check for Internet Explorer
	document.onfocusin = onFocus;
	document.onfocusout = onBlur;
} else {
	window.onfocus = onFocus;
	window.onblur = onBlur;
}

function addCurrency(numTicksOffline) {
    for (let prod of PRODUCTION) {
        if (prod.type == 'material') {
            CRAFTINGMATERIALS[returnIndex(CRAFTINGMATERIALS, prod.name)].count += prod.value * numTicksOffline; //Adds amount * offline (if applicable).
            getId(prod.name + "Disp").innerText = CRAFTINGMATERIALS[returnIndex(CRAFTINGMATERIALS, prod.name)].count; //Updates ID
        }
        RESOURCES[returnIndex(RESOURCES, prod.name)].count += prod.value  * numTicksOffline;
            getId(prod.name + "Disp").innerText = RESOURCES[returnIndex(RESOURCES, prod.name)].count;
    }
   
}
var fcn = setInterval(update, (1000/7), getElementsToUpdate()); // 1 second divided by 7 ticks per second (143ms)

function update(elem) {

    buffer++;
    if (buffer == 35) {
    checkVisibilityOnBuildings();
    checkVisiblityOnUpgrades();
    checkVisibilityOnResources();
    checkVisiblityOnTechnology()
    buffer = 0;
    } // Every 5 seconds (35 ticks) visibility will be checked and updated.
     
    addCurrency(1);
      //Display vars for html so that rounding errors don't happen.
        var numDisp = Math.floor(RESOURCES[0].count);
        var moneyDisp = Math.floor(RESOURCES[1].count * 100) / 100;
        var sciDisp = Math.floor(RESOURCES[2].count * 100) / 100;
        var popDisp = Math.floor(RESOURCES[3].count * 100) / 100;
        var energyDisp = Math.floor(RESOURCES[4].count * 100) / 100;
        var darkMatterDisp = Math.floor(RESOURCES[5].count * 100) / 100;
        

        
        var moneyTotalPerTick =  player.globalMultiplier * Math.pow(RESOURCES[0].count, (1/(player.moneyRatio))) / 7; //Cash flow per 143ms (7n for total / sec ish)   
        RESOURCES[1].count += moneyTotalPerTick; //Increases money    
        var scienceTotalPerTick = PRODUCTION[returnIndex(PRODUCTION, 'science')].value || 0; //Set production values from array, or zero if not defined.
        var popularityTotalPerTick = PRODUCTION[returnIndex(PRODUCTION, 'popularity')].value || 0;
        var energyTotalPerTick = PRODUCTION[returnIndex(PRODUCTION, 'energy')].value || 0;
        var darkMatterTotalPerTick = PRODUCTION[returnIndex(PRODUCTION, 'darkMatter')].value || 0; 
        
        //Element updating
        elem.numberDisp.textContent = numFormat(numDisp);
        elem.moneyDisp.textContent = numFormat(moneyDisp);
        elem.scienceDisp.textContent = numFormat(sciDisp);
        
        elem.popularityDisp.textContent = numFormat(popDisp);
        elem.energyDisp.textContent = numFormat(energyDisp);
        elem.darkMatterDisp.textContent = numFormat(darkMatterDisp);
        elem.moneyProductionTotalDisp.textContent = numFormat(Math.round(moneyTotalPerTick * 700) / 100);
        elem.scienceProductionTotalDisp.textContent = numFormat(Math.round(scienceTotalPerTick * 7000) / 1000);
        elem.popularityProductionTotalDisp.textContent = numFormat(Math.round(popularityTotalPerTick * 7000) / 1000);
        elem.energyProductionTotalDisp.textContent = numFormat(Math.round(energyTotalPerTick * 7000) / 1000);
        elem.darkMatterProductionTotalDisp.textContent = numFormat(Math.round(darkMatterTotalPerTick * 7000) / 1000);

        
    }
