/* Shorthand for getElementById or getElementsByClassName */
var getId = function (id) {return document.getElementById(id);};
var getClass = function (c) {return document.getElementsByClassName(c);};

function returnIndex (array, targetID) {
    var index = array.findIndex(function(x) {
        return x.id == targetID;
    });
    return index;
}

/* Objects of the game */
var player = {
    moneyRatio: 3, //Multiplier of money as a function of number.
    globalMultiplier: 1.000 //Total multiplier, multiplies ALL production.
}; //Handles player-based actions.
var RESOURCES = [ //Handles RESOURCES of all kinds.
    {     
    count: 100000000,
    totalAmount: 10000000000000,
    upgProd: 0,
    id: 'number'
    },    
    {
    count: 10000000000, // Raw count, unrounded until numFormat().
    totalAmount: 0,
    upgProd: 29999, //Amount gained from upgrades per TICK.
    id: 'money'
    },
    {
    count: 25000000,
    totalAmount: 2500000,
    upgProd: 0,
    id: 'science'
    },
    {
    count: 0,
    totalAmount: 0,
    upgProd: 0, //Amount produced from upgrades.
    id: 'popularity'
    },
    {
    count: 50000,
    totalAmount: 0,
    upgProd: 0.005, //Amount produced from upgrades.
    id: 'energy'
    },
    {
    count: 0,
    totalAmount: 0,
    upgProd: 0, //Amount produced from upgrades.
    id: 'darkMatter'
    }
];

var BUILDINGS = [
    {   displayName: "Bum",           // Displayed name (used for HTML)
        id: 'bumBuilding',          // id (used when calling a certain building)
        altId: 'buyBum',            // Alt ID (used in some button calls)  
        requirement: () => (RESOURCES[0].totalAmount >= 10),            // Requirement to show button.
        function: () => buyBum(),
        moneyCost: 100,             // Cost in dollars
        numberProdBase: (1/7),      //Production base. For decimals, USE FRACTIONS INSTEAD! It helps keep numbers cleaner.
        scienceProdBase: 0,               //Science production. Only for certain buildings; if it's not there, set to ZERO. Don't delete it.
        count: 0,                           // Amount of the building.
        html: `<div>
                    <button id="buyBumButton" class="buildingButtons" onClick="buyBum()">Hire a Bum (<span id='bumCountDisp'>0</span>)</button>      
                    <div class='tooltip' id='buyBumTooltip'> A bum. Tallies with his fingers on the side of a building. <br />
                    <span class='tooltipMoneyColor'><span class='boldedNumbers' id='bumMoneyCostDisp'>100</span> dollars. </span>
                    <br />
                    <div>----------------------------------------------------------------</div>
                    <span>Counting per second: </span><span id='bumNumberProdBase'></span>
    
                    </div>
                </div>`                
    },
    
    {   displayName: "Grad Student",
        id: 'gradBuilding',
        altId: 'buyGrad',
        requirement: () => (RESOURCES[0].totalAmount >= 30),
        buyFunction: () => buyGradStudent(), 
        moneyCost: 2000,
        numberProdBase: (8/7),
        scienceProdBase: 0,
        count: 0,
        html: `<div>
        <button id="buyGradButton" class="buildingButtons ">Hire a Grad Student (<span id='gradCountDisp'>0</span>)</button>      
        <div class='tooltip' id='buyGradTooltip'> This grad student will begrudgingly count for you because they need the money. Requires fast food to function at maximum efficiency. <br />
        <span class='tooltipMoneyColor'><span class='boldedNumbers' id='gradMoneyCostDisp'> 2,000 </span> dollars.</span>
        <br />
        <div>----------------------------------------------------------------</div>
        <span>Counting per second: </span><span id='gradNumberProdBase'></span>
        <span class='gradScienceProdBase'>Science Production: <span id='gradScienceProdBase'> </span> </span>
        </div>`
    },
    
    {   displayName: "Mathematician",
        id: 'mathematicianBuilding',
        altId: 'buyMathematician',
        requirement: () => (RESOURCES[0].totalAmount >= 500), 
        buyFunction: () => buyMathematician(),
        moneyCost: 20000,
        numberProdBase: (30/7), //number production base
        scienceProdBase: (0.01/7), //Science production base
        count: 0,
        html: `<div>
        <button id="buyMathematicianButton" class="buildingButtons ">Hire a Mathematician (<span id='mathematicianCountDisp'>0</span>)</button>      
        <div class='tooltip' id='buyMathematicianTooltip'> Someone qualified to actually do the job. Makes some science as well as counts faster. <br />
        <span class='tooltipMoneyColor'><span class='boldedNumbers' id='mathematicianMoneyCostDisp'> 20,000 </span> dollars.</span>
        <br />
        <div>----------------------------------------------------------------</div>
        <span>Counting per second: </span><span id='mathematicianNumberProdBase'></span> <br />
        <span>Science Production: </span><span id='mathematicianScienceProdBase'></span>
        </div>`
    },
    
    {   displayName: "Paper Boy",
        id: 'paperBoyBuilding',
        altId: 'buyPaperBoy',
        requirement: () => (RESOURCES[0].totalAmount >= 500), 
        buyFunction: () => buyPaperBoy(),
        moneyCost: 32500,
        scienceCost: 25,
        numberProdBase: null, 
        scienceProdBase: null, 
        popularityProdBase: (0.003/7),
        count: 0,
        html: `<div>
        <button id="buyPaperBoyButton" class="buildingButtons ">Hire a Paperboy (<span id='paperBoyCountDisp'>0</span>)</button>      
        <div class='tooltip' id='buyPaperBoyTooltip'> They'll help you get the word out about your number. Produces popularity, albeit painfully slowly. <br />
        <span class='tooltipMoneyColor'><span class='boldedNumbers' id='paperBoyMoneyCostDisp'> 20,000 </span> dollars<br /></span>
        <span class='tooltipScienceColor'><span class='boldedNumbers' id='paperBoyScienceCostDisp'> 25 </span> science</span>
        <br />
        <div>----------------------------------------------------------------</div>
        <span>Popularity Production: </span><span id='paperBoyPopularityProdBase'> 0.003</span>
        </div>`
    },
    
    {   displayName: "Computer",
        id: 'computerBuilding',
        altId: 'buyComputer',
        requirement: () => (RESOURCES[0].totalAmount >= 10000 && RESOURCES[2].totalAmount >= 100),
        buyFunction: () => buyComputer(),
        moneyCost: 90000,
        numberProdBase: (280/7), 
        scienceProdBase: (0.03/7), //Science production base
        count: 0,
        html: `<div>
        <button id="buyComputerButton" class="buildingButtons ">Build a Computer (<span id='computerCountDisp'>0</span>)</button>      
        <div class='tooltip' id='buyComputerTooltip'> A simple 1998 Dell desktop. Not very reliable, but better than dealing with arrogant humans. Grants +1 to clicking. <br />
        <span class='tooltipMoneyColor'><span class='boldedNumbers' id='computerMoneyCostDisp'> 90,000 </span> dollars</span>
        <br />
        <div>----------------------------------------------------------------</div>
        <span>Counting per second: </span><span id='computerNumberProdBase'></span> <br />
        <span>Science Production: </span><span id='computerScienceProdBase'></span>
        </div>`
    },
    
    {   displayName: "Industrial Calculator",
        id: 'industrialCalculatorBuilding',
        altId: 'buyIndustrialCalculator',
        requirement: () => (RESOURCES[0].totalAmount >= 500000 && RESOURCES[2].totalAmount >= 2000),
        buyFunction: () => buyIndustrialCalculator(),
        moneyCost: 225000,
        scienceCost: 180,
        numberProdBase: (1100/7), 
        scienceProdBase: (0.33/7), //Science production base
        count: 0,
        html: `<div>
                    <button id="buyIndustrialCalculatorButton" class="buildingButtons">Build an Industrial Calculator (<span id='industrialCalculatorCountDisp'>0</span>)</button>      
                    <div class='tooltip' id='buyIndustrialCalculatorTooltip'> A room-filling supercomputer with the ability to count faster than any human.  <br />
                    <span class='tooltipMoneyColor'><span class='boldedNumbers' id='industrialCalculatorMoneyCostDisp'> 225,000 </span> dollars<br /></span>
                    <span class='tooltipScienceColor'><span class='boldedNumbers' id='industrialCalculatorScienceCostDisp'> 180 </span> science</span>
                    <br />
                    <div>----------------------------------------------------------------</div>
                    <span>Counting per second: </span><span id='industrialCalculatorNumberProdBase'></span> <br />
                    <span>Science Production: </span><span id='industrialCalculatorScienceProdBase'></span> <br />
                 </div>`
    },
    
    {   displayName: "Accelerator",
        id: 'acceleratorBuilding',
        altId: 'buyAccelerator',
        requirement: () => (RESOURCES[0].totalAmount >= 2e+7 && RESOURCES[2].totalAmount >= 50000),
        buyFunction: () => buyAccelerator(),
        moneyCost: 1900000,
        scienceCost: 500,
        numberProdBase: (4000/7), //(70/7)
        scienceProdBase: (1.4/7), //Science production base
        energyProdBase: (0.001/7),
        count: 0,
        html: `<div>
        <button id="buyAcceleratorButton" class="buildingButtons" class="buildingButtons">Build an Accelerator (<span id='acceleratorCountDisp'>0</span>)</button>      
        <div class='tooltip' id='buyAcceleratorTooltip'> Nobody is exactly sure how speeding particles can count, but they can. Gives a nice chunk of science, but costs science as well. <br />
        <span class='tooltipMoneyColor'><span class='boldedNumbers' id='acceleratorMoneyCostDisp'> 90,000 </span> dollars</span> <br />
         <span class='tooltipScienceColor'><span class='boldedNumbers' id='acceleratorScienceCostDisp'> 50 </span> science</span> <br />
        <br />
        <div>----------------------------------------------------------------</div>
        <span>Counting per second: </span><span id='acceleratorNumberProdBase'></span> <br />
        <span>Science Production: </span><span id='acceleratorScienceProdBase'></span> <br />
        <span>Energy Production: </span><span id='acceleratorEnergyProdBase'>0.001</span>
        </div>`
    },
    {   displayName: "Light Manipulator",
        id: 'lightManipulatorBuilding',
        altId: 'buyLightManipulator',
        requirement: () => (RESOURCES[0].totalAmount >= 6.25e+8 && RESOURCES[4].totalAmount >= 100),
        buyFunction: () => buyLightManipulator(),
        moneyCost: 7000000,
        scienceCost: 20000,
        scienceProdBase: (12/7), //Science production base
        energyProdBase: -(0.5/7),
        //Increase global mplr by 3% each.
        count: 0,
        html: `<div>
        <button id="buyLightManipulatorButton" class="buildingButtons" class="buildingButtons">Build a Light Manipulator (<span id='lightManipulatorCountDisp'>0</span>)</button>      
        <div class='tooltip' id='buyLightManipulatorTooltip'>Physically change light at your will! Gives immense power, increasing global multiplier by 3% each. Costs a massive amount of energy to run, however.<br />
        <span class='tooltipMoneyColor'><span class='boldedNumbers' id='lightManipulatorMoneyCostDisp'> 90,000 </span> dollars</span> <br />
         <span class='tooltipScienceColor'><span class='boldedNumbers' id='lightManipulatorScienceCostDisp'> 50 </span> science</span> <br />
        <br />
        <div>----------------------------------------------------------------</div>
        <span>Global Production: </span><span id='lightManipulatorGlobalMultiplierAmount'>+3%</span> <br />
        <span>Science Production: </span><span id='lightManipulatorScienceProdBase'>12 </span> <br />
        <span>Energy Consumption: </span><span id='lightManipulatorEnergyConsBase'>0.5</span>
        </div>`
    }];


var UPGRADESPURCHASED = [""];

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
    RESOURCES[0].totalAmount += count;
    getId('numberDisp').innerHTML = numFormat(Math.floor(RESOURCES[0].count));
    

}


 var numCurrencies = 0; //Counter to verify that all currencies are accounted for. Compared to "satisfied' later on.
 var satisfied = 0;
 function upgrade (upgradeItem, iter) {
    iter = iter || 0;
    if (iter == 0) {
        numCurrencies = satisfied = 0;
    }
   
    var resourceTypes = ['money', 'science', 'popularity', 'energy', 'darkMatter']; // UPDATE THIS to match the number of resource types.
     //Checks null value of each resource type for the upgrade.      
            
            if (!(upgradeItem[resourceTypes[iter].concat("Cost")] == null)) { // If the cost value not null
               
                numCurrencies++; 
                
                let num = RESOURCES[returnIndex(RESOURCES, resourceTypes[iter])]['count'];                
                if (num >= upgradeItem[resourceTypes[iter].concat('Cost')]) {
                   satisfied++;//If count > cost, add +1 to satsified.
                  
                }
            }
           
            if (iter < (resourceTypes.length - 1)) { // If not at max index, repeat for next index.
                
                upgrade (upgradeItem, iter+1);
                
                return null;
            } else if (numCurrencies == satisfied) { 
              
                //If you have RESOURCES for ALL non-null costs, then proceed with upgrade.
                iter = 0;
                for (let iter of resourceTypes) {
                   
                    RESOURCES[returnIndex(RESOURCES, iter)]['count'] -= upgradeItem[iter.concat("Cost")]; // Take away currency.
                }
                
                upgradeItem.result(); //Calls function to grant upgrade bonuses.
                getId(upgradeItem.id.concat("Button")).style.visibility = 'hidden';
                
            }
    } 
var TECHPURCHASED = [];
    function upgTech (techItem, iter) {
        iter = iter || 0;
        if (iter == 0) {
            numCurrencies = satisfied = 0;
        }
       
        var resourceTypes = ['money', 'science', 'popularity', 'energy', 'darkMatter']; // UPDATE THIS to match the number of resource types.
         //Checks null value of each resource type for the tech.      
                
                if (!(techItem[resourceTypes[iter].concat("Cost")] == null)) { // If the cost value not null
                    numCurrencies++;                    
                    let num = RESOURCES[returnIndex(RESOURCES, resourceTypes[iter])]['count'];                
                    if (num >= techItem[resourceTypes[iter].concat('Cost')]) {
                       satisfied++;//If count > cost, add +1 to satsified.                    
                    }
                }
               
                if (iter < (resourceTypes.length - 1)) { // If not at max index, repeat for next index.  
                    upgTech(techItem, iter+1);                    
                    return null;
                } else if (numCurrencies == satisfied) {                
                    //If you have RESOURCES for ALL non-null costs, then proceed with tech.
                    iter = 0;
                    for (let iter of resourceTypes) {                       
                        RESOURCES[returnIndex(RESOURCES, iter)]['count'] -= techItem[iter.concat("Cost")]; // Take away currency.
                    }
                    TECHPURCHASED.push(techItem.id);
                }
            }

/* Building Buy Functions */
function buyBum () {
    var bumObj = BUILDINGS[returnIndex(BUILDINGS, 'bumBuilding')]; //Used to clarify other areas, in that bumObj is equal to the value.
    if (RESOURCES[1].count >= bumObj.moneyCost) {
        RESOURCES[1].count -= Math.floor(bumObj.moneyCost); // Takes resource(s) if you have enough, then adds one building and increases moneyCost.
        
        bumObj.count++;
        bumObj.moneyCost *= 1.15;
        
    }
    //ID updaters
    getId('numberDisp').innerHTML = numFormat(Math.floor(RESOURCES[0].count));
    getId('moneyDisp').innerHTML = numFormat(Math.floor(RESOURCES[1].count));
    getId('bumCountDisp').innerText = numFormat(bumObj.count);
    getId('bumMoneyCostDisp').innerHTML = numFormat(Math.round(bumObj.moneyCost));
    getId('bumNumberProdBase').innerText = numFormat(Math.round(bumObj.numberProdBase * 700) / 100);
}

function buyGradStudent () {
    var gradObj = BUILDINGS[returnIndex(BUILDINGS, 'gradBuilding')];
    if (RESOURCES[1].count >= gradObj.moneyCost) {
        
        RESOURCES[1].count -= Math.floor(gradObj.moneyCost);

        gradObj.moneyCost *= 1.15;
        gradObj.count++;
    }
    getId('numberDisp').innerHTML = numFormat(Math.floor(RESOURCES[0].count));
    getId('moneyDisp').innerHTML = numFormat(Math.floor(RESOURCES[1].count));
    getId('gradCountDisp').innerText = numFormat(gradObj.count);
    
    getId('gradMoneyCostDisp').innerHTML = numFormat(Math.round(gradObj.moneyCost));
    getId('gradNumberProdBase').innerText = numFormat(Math.round(gradObj.numberProdBase * 700) / 100);
}

function buyMathematician() {
    var mathematicianObj = BUILDINGS[returnIndex(BUILDINGS, 'mathematicianBuilding')];
    if (RESOURCES[1].count >= mathematicianObj.moneyCost) {
        RESOURCES[1].count -= Math.floor(mathematicianObj.moneyCost);

        mathematicianObj.moneyCost *= 1.15;
        mathematicianObj.count++;
    }
    getId('numberDisp').innerHTML = numFormat(Math.floor(RESOURCES[0].count));
    getId('moneyDisp').innerHTML = numFormat(Math.floor(RESOURCES[1].count));
    getId('scienceDisp').innerHTML = numFormat(Math.round(RESOURCES[2].count * 100) / 100);
    getId('mathematicianCountDisp').innerText = numFormat(mathematicianObj.count);
    
    getId('mathematicianMoneyCostDisp').innerHTML = numFormat(Math.round(mathematicianObj.moneyCost));
    getId('mathematicianNumberProdBase').innerText = numFormat(Math.round(mathematicianObj.numberProdBase * 700) / 100);
    getId('mathematicianScienceProdBase').innerText = numFormat(Math.round(mathematicianObj.scienceProdBase * 700) / 100);
}

function buyComputer() {
    var computerObj = BUILDINGS[returnIndex(BUILDINGS, 'computerBuilding')];
    if (RESOURCES[1].count >= computerObj.moneyCost) {
        RESOURCES[1].count -= Math.floor(computerObj.moneyCost);

        computerObj.moneyCost *= 1.15;
        computerObj.count++;
    }
    getId('numberDisp').innerHTML = numFormat(Math.floor(RESOURCES[0].count));
    getId('moneyDisp').innerHTML = numFormat(Math.floor(RESOURCES[1].count));
    getId('scienceDisp').innerHTML = numFormat(Math.round(RESOURCES[2].count * 100) / 100);
    getId('computerCountDisp').innerText = numFormat(computerObj.count);
    getId('computerMoneyCostDisp').innerHTML = numFormat(Math.round(computerObj.moneyCost));
    getId('computerNumberProdBase').innerText = numFormat(Math.round(computerObj.numberProdBase * 700) / 100);
    getId('computerScienceProdBase').innerText = numFormat(Math.round(computerObj.scienceProdBase * 700) / 100);
}

function buyPaperBoy() {
    var paperBoyObj = BUILDINGS[returnIndex(BUILDINGS, 'paperBoyBuilding')];
    if (RESOURCES[1].count >= paperBoyObj.moneyCost &&
        RESOURCES[2].count >= paperBoyObj.scienceCost) {
        RESOURCES[1].count -= Math.floor(paperBoyObj.moneyCost);
        RESOURCES[2].count -= Math.floor(paperBoyObj.scienceCost);

        paperBoyObj.moneyCost *= 1.15;
        paperBoyObj.scienceCost *= 1.155;
        paperBoyObj.count++;
    }
    getId('numberDisp').innerHTML = numFormat(Math.floor(RESOURCES[0].count));
    getId('moneyDisp').innerHTML = numFormat(Math.floor(RESOURCES[1].count));
    getId('scienceDisp').innerHTML = numFormat(Math.round(RESOURCES[2].count * 100) / 100);
    getId('paperBoyCountDisp').innerText = numFormat(paperBoyObj.count);
    getId('paperBoyMoneyCostDisp').innerHTML = numFormat(Math.round(paperBoyObj.moneyCost));
    getId('paperBoyScienceCostDisp').innerHTML = numFormat(Math.round(paperBoyObj.scienceCost));
    getId('paperBoyPopularityProdBase').innerText = numFormat(Math.round(paperBoyObj.popularityProdBase * 7000) / 1000);
    
}

function buyIndustrialCalculator() {
    var industrialCalculatorObj = BUILDINGS[returnIndex(BUILDINGS, 'industrialCalculatorBuilding')];
    if (RESOURCES[1].count >= industrialCalculatorObj.moneyCost &&
        RESOURCES[2].count >= industrialCalculatorObj.scienceCost) {

        RESOURCES[1].count -= Math.floor(industrialCalculatorObj.moneyCost);
        RESOURCES[2].count -= Math.floor(industrialCalculatorObj.scienceCost);

        industrialCalculatorObj.moneyCost *= 1.15;
        industrialCalculatorObj.scienceCost *= 1.155;
        industrialCalculatorObj.count++;
    }
    getId('numberDisp').innerHTML = numFormat(Math.floor(RESOURCES[0].count));
    getId('moneyDisp').innerHTML = numFormat(Math.floor(RESOURCES[1].count));
    getId('scienceDisp').innerHTML = numFormat(Math.round(RESOURCES[2].count * 100) / 100);
    getId('industrialCalculatorCountDisp').innerText = numFormat(industrialCalculatorObj.count);
    getId('industrialCalculatorMoneyCostDisp').innerHTML = numFormat(Math.round(industrialCalculatorObj.moneyCost));
    getId('industrialCalculatorScienceCostDisp').innerHTML = numFormat(Math.round(industrialCalculatorObj.scienceCost));
    getId('industrialCalculatorNumberProdBase').innerText = numFormat(Math.round(industrialCalculatorObj.numberProdBase * 700) / 100);
    getId('industrialCalculatorScienceProdBase').innerText = numFormat(Math.round(industrialCalculatorObj.scienceProdBase * 700) / 100);
    
}

function buyAccelerator() {
    var acceleratorObj = BUILDINGS[returnIndex(BUILDINGS, 'acceleratorBuilding')];
    if (RESOURCES[1].count >= acceleratorObj.moneyCost &&
        RESOURCES[2].count >= acceleratorObj.scienceCost) {
        
        RESOURCES[1].count -= Math.floor(acceleratorObj.moneyCost);
        RESOURCES[2].count -= Math.floor(acceleratorObj.scienceCost);
        
        acceleratorObj.moneyCost *= 1.15;
        acceleratorObj.scienceCost *= 1.155;
        acceleratorObj.count++;
    }
    getId('numberDisp').innerHTML = numFormat(Math.floor(RESOURCES[0].count));
    getId('moneyDisp').innerHTML = numFormat(Math.floor(RESOURCES[1].count));
    getId('scienceDisp').innerHTML = numFormat(Math.round(RESOURCES[2].count * 100) / 100);
    getId('acceleratorCountDisp').innerText = numFormat(acceleratorObj.count);
    getId('acceleratorMoneyCostDisp').innerHTML = numFormat(Math.round(acceleratorObj.moneyCost));
    getId('acceleratorScienceCostDisp').innerHTML = numFormat(Math.round(acceleratorObj.scienceCost));
    getId('acceleratorNumberProdBase').innerText = numFormat(Math.round(acceleratorObj.numberProdBase * 700) / 100);
    getId('acceleratorScienceProdBase').innerText = numFormat(Math.round(acceleratorObj.scienceProdBase * 700) / 100);
    getId('acceleratorEnergyProdBase').innerText = numFormat(Math.round(acceleratorObj.energyProdBase * 7000) / 1000);
}

function buyLightManipulator() {
    var lightManipulatorObj = BUILDINGS[returnIndex(BUILDINGS, 'lightManipulatorBuilding')];
    if (RESOURCES[1].count >= lightManipulatorObj.moneyCost &&
        RESOURCES[2].count >= lightManipulatorObj.scienceCost) {
        
        RESOURCES[1].count -= Math.floor(lightManipulatorObj.moneyCost);
        RESOURCES[2].count -= Math.floor(lightManipulatorObj.scienceCost);
        
        lightManipulatorObj.moneyCost *= 1.15;
        lightManipulatorObj.scienceCost *= 1.155;
        lightManipulatorObj.count++;
        player.globalMultiplier += 0.03;


    }
    getId('numberDisp').innerHTML = numFormat(Math.floor(RESOURCES[0].count));
    getId('moneyDisp').innerHTML = numFormat(Math.floor(RESOURCES[1].count));
    getId('scienceDisp').innerHTML = numFormat(Math.round(RESOURCES[2].count * 100) / 100);
    getId('lightManipulatorCountDisp').innerText = numFormat(lightManipulatorObj.count);
    getId('lightManipulatorMoneyCostDisp').innerHTML = numFormat(Math.round(lightManipulatorObj.moneyCost));
    getId('lightManipulatorScienceCostDisp').innerHTML = numFormat(Math.round(lightManipulatorObj.scienceCost));
    getId('lightManipulatorScienceProdBase').innerText = numFormat(Math.round(lightManipulatorObj.scienceProdBase * 700) / 100);
    getId('lightManipulatorEnergyProdBase').innerText = numFormat(Math.round(lightManipulatorObj.energyProdBase * 7000) / 1000);
}


var BUILDINGSSHOWN = [];
var trBuffer = 1;
function checkVisibilityOnBuildings () {
     //Buffers so every 2 td's there's a new tr.
    var numRows = 0; //Number of rows in the table
    for (let index of BUILDINGS) { //Note that index is THE OBJECT, so when you call it, you only call index, not BUILDINGS[index].
        
        if (index.requirement() && !(BUILDINGSSHOWN.includes(index.id))) {
            
            BUILDINGSSHOWN.push(index.id);
            var table = getId('buildingsTable');
            if (trBuffer == 1) {
                
                numRows++;
                trBuffer = 0;    
                table.appendChild(tr = document.createElement("tr"));
                tr.appendChild(td = document.createElement("td"));
                td.innerHTML = index.html;
                td.style.visibility = 'visible';
                tr.id = 'buildingTableRow'.concat(numRows.toString);

                td.children[0].addEventListener('click', index.buyFunction);
                
            } else {
                
                trBuffer++;
                var rows = table.getElementsByTagName('tr');
                table.rows[rows.length - 1].appendChild(td = document.createElement("td"));
                td.style.visibility = 'visible';
                td.innerHTML = index.html;
                
                td.children[0].addEventListener('click', index.buyFunction);
                
            }
        
    
            
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

function checkVisiblityOnUpgrades() {
    for (let iter of UPGRADES) {
        var currentUpgrade = iter;
        console.log(BUILDINGS[returnIndex(BUILDINGS, 'computerBuilding')].count);
        if (iter.requirement() && UPGRADESPURCHASED.includes(iter.id) == false) {
        
            /* Null Checks before updating html */
            console.log(iter.id);
            UPGRADESPURCHASED.push(iter.id);
            var table = getId('upgradeTable');    
            table.appendChild(tr = document.createElement("tr"));
            tr.appendChild(td = document.createElement("td"));
            td.innerHTML = iter.html;
                 
            td.children[0].addEventListener('click', () => {
            upgrade(UPGRADES[returnIndex(UPGRADES,iter.id)]);
            });

            if ((getId(currentUpgrade.id.concat("ScienceCostDisp")) != null))
                getId(currentUpgrade.id.concat("ScienceCostDisp")).innerHTML = numFormat(currentUpgrade["scienceCost"]);
            if (getId(currentUpgrade.id.concat("MoneyCostDisp")) != null)
                getId(currentUpgrade.id.concat("MoneyCostDisp")).innerHTML = numFormat(currentUpgrade["moneyCost"]);
            if (getId(currentUpgrade.id.concat("PopularityCostDisp")) != null)
                getId(currentUpgrade.id.concat("PopularityCostDisp")).innerHTML = numFormat(currentUpgrade["popularityCost"]);

        }
    }

}

function checkVisiblityOnTechnology() {
    for (let iter of TECHNOLOGY) {
        var currentUpgrade = iter;
        console.log(BUILDINGS[returnIndex(BUILDINGS, 'computerBuilding')].count);
        if (iter.requirement() && UPGRADESPURCHASED.includes(iter.id) == false) {
        
            /* Null Checks before updating html */
            
            UPGRADESPURCHASED.push(iter.id);
            var table = getId('upgradeTable');    
            table.appendChild(tr = document.createElement("tr"));
            tr.appendChild(td = document.createElement("td"));
            td.innerHTML = iter.html;
                 
            td.children[0].addEventListener('click', () => {
            upgTech(TECHNOLOGY[returnIndex(UPGRADES,iter.id)]);
            });

            if ((getId(currentUpgrade.id.concat("ScienceCostDisp")) != null))
                getId(currentUpgrade.id.concat("ScienceCostDisp")).innerHTML = numFormat(currentUpgrade["scienceCost"]);
            if (getId(currentUpgrade.id.concat("MoneyCostDisp")) != null)
                getId(currentUpgrade.id.concat("MoneyCostDisp")).innerHTML = numFormat(currentUpgrade["moneyCost"]);
            if (getId(currentUpgrade.id.concat("PopularityCostDisp")) != null)
                getId(currentUpgrade.id.concat("PopularityCostDisp")).innerHTML = numFormat(currentUpgrade["popularityCost"]);

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
var lightManipulatorIsDisabled = false;
function lightManipulatorEnergyCheck() {
    let boolean = (RESOURCES[4].count <= (0.5 * BUILDINGS[returnIndex(BUILDINGS, 'lightManipulatorBuilding')].count));
    if (boolean) {
            lightManipulatorIsDisabled = true;
            player.globalMultiplier -= (0.03 * (RESOURCES[4].count <= (0.5 * BUILDINGS[returnIndex(BUILDINGS, 'lightManipulatorBuilding')].count)));
            getId('buyLightManipulatorButton').style.backgroundColor = '#f1f1f1';
    } else if (lightManipulatorIsDisabled) {
        lightManipulatorIsDisabled = false;
            player.globalMultiplier += (0.03 * (RESOURCES[4].count <= (0.5 * BUILDINGS[returnIndex(BUILDINGS, 'lightManipulatorBuilding')].count)));
            getId('buyLightManipulatorButton').style.backgroundColor = '#ffffff';
    }
}


var fcn = setInterval(update, (1000/7), getElementsToUpdate()); // 1 second divided by 7 ticks per second (143ms)
var buffer = 0; //This will buffer the count of times the checkVisibilityOnUpgrades() and checkVisibilityOnUpgrades() functions are called as to not overuse RESOURCES.


function update(elem) {
    buffer++;
    if (buffer == 35) {
    checkVisibilityOnBuildings();
    checkVisiblityOnUpgrades();
    checkVisibilityOnResources();
 
    buffer = 0;
    } // Every 5 seconds (35 ticks) visibility will be checked and updated.

        for (let indexer of BUILDINGS) { //Makes scienceProdBase not null.
            indexer.numberProdBase = indexer.numberProdBase || 0;
        }    
  
        RESOURCES[0].count += 
                    BUILDINGS.reduce( (sum, item) => sum + (item.numberProdBase * item.count), 0 ) * player.globalMultiplier;
        RESOURCES[0].totalAmount += 
                    BUILDINGS.reduce( (sum, item) => sum + (item.numberProdBase * item.count), 0 ) * player.globalMultiplier;            
       
        for (let indexer of BUILDINGS) { //Makes scienceProdBase not null.
            indexer.scienceProdBase = indexer.scienceProdBase || 0;
        }

        RESOURCES[2].count+=  
                    BUILDINGS.reduce( (sum, item) => sum + (item.scienceProdBase * item.count), 0 ) * player.globalMultiplier;
        RESOURCES[2].totalAmount += 
                    BUILDINGS.reduce( (sum, item) => sum + (item.scienceProdBase * item.count), 0 ) * player.globalMultiplier;                    
        
        
        for (let indexer of BUILDINGS) { //Makes popularityProdBase not null.
            indexer.popularityProdBase = indexer.popularityProdBase || 0;
        }
        
        RESOURCES[3].count+=           
                    BUILDINGS.reduce( (sum, item) => sum + (item.popularityProdBase * item.count), 0 ) * player.globalMultiplier;
        RESOURCES[3].totalAmount += 
                    BUILDINGS.reduce( (sum, item) => sum + (item.popularityProdBase * item.count), 0 ) * player.globalMultiplier;

        for (let indexer of BUILDINGS) { //Makes energyProdBase not null.
            indexer.energyProdBase = indexer.energyProdBase || 0;
        }
        
        RESOURCES[4].count+=           
                    BUILDINGS.reduce( (sum, item) => sum + (item.energyProdBase * item.count), 0 ) * player.globalMultiplier;
        RESOURCES[4].totalAmount += 
                    BUILDINGS.reduce( (sum, item) => sum + (item.energyProdBase * item.count), 0 ) * player.globalMultiplier;

        for (let indexer of BUILDINGS) { //Makes darkMatterProdBase not null.
            indexer.darkMatterProdBase = indexer.darkMatterProdBase || 0;
        }
        
        RESOURCES[5].count+=           
                    BUILDINGS.reduce( (sum, item) => sum + (item.darkMatterProdBase * item.count), 0 ) * player.globalMultiplier;
        RESOURCES[5].totalAmount, RESOURCES[5].totalAmount +=           
                    BUILDINGS.reduce( (sum, item) => sum + (item.darkMatterProdBase * item.count), 0 ) * player.globalMultiplier;

        //Display vars for html so that rounding errors don't happen.
        var numDisp = Math.floor(RESOURCES[0].count);
        var moneyDisp = Math.floor(RESOURCES[1].count * 100) / 100;
        var sciDisp = Math.floor(RESOURCES[2].count * 100) / 100;
        var popDisp = Math.floor(RESOURCES[3].count * 100) / 100;
        var energyDisp = Math.floor(RESOURCES[4].count * 100) / 100;
        var darkMatterDisp = Math.floor(RESOURCES[5].count * 100) / 100;
        

        var moneyTotalPerTick =  player.globalMultiplier * Math.pow(RESOURCES[0].count, (1/(player.moneyRatio))) / 7; //Cash flow per 143ms (7n for total / sec ish)       
        var scienceTotalPerTick = BUILDINGS.reduce( (sum, item) => sum + (item.scienceProdBase * item.count), 0 ) * player.globalMultiplier;
        var popularityTotalPerTick = BUILDINGS.reduce( (sum, item) => sum + (item.popularityProdBase * item.count), 0 ) * player.globalMultiplier;
        var energyTotalPerTick = BUILDINGS.reduce( (sum, item) => sum + (item.energyProdBase * item.count), 0 ) * player.globalMultiplier;
        var darkMatterTotalPerTick = BUILDINGS.reduce( (sum, item) => sum + (item.darkMatterProdBase * item.count), 0 ) * player.globalMultiplier;

        RESOURCES[1].count += moneyTotalPerTick;

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
 
