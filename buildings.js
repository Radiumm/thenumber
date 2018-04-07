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
