let PRODUCTION = [
    {name: 'number', type: 'resource', value: 0},
    {name: 'money', type: 'resource', value: 0},
    {name: 'science', type: 'resource', value: 0},
    {name: 'energy', type: 'resource', value: 0},
    {name: 'popularity', type: 'resource', value: 0},
    {name: 'darkMatter', type: 'resource', value: 0},
];
var getId = function (id) {return document.getElementById(id);};
var getClass = function (c) {return document.getElementsByClassName(c);};
var BUILDINGS = [
    {   name: "Calculator",           // Displayed name (used for HTML)
        id: 'calculatorBuilding',          // id (used when calling a certain building)
        description: 'Something to (supposedly) help you count.',
        altId: 'buyCalculator',            // Alt ID (used in some button calls)  
        requirement: () => (RESOURCES[0].totalCount >= 10), // Requirement to show button.
        costs: [
            {name: "money", value: 100},
        ],
        production: [
            {name: 'number', type: 'resource', value: (1/7)}
        ],
        costRatio: 1.15,        // Cost in dollars
        numberProdBase: (1/7),      //Production base. For decimals, USE FRACTIONS INSTEAD! It helps keep numbers cleaner.
                     //Science production. Only for certain buildings; if it's not there, set to ZERO. Don't delete it.
        count: 0,  
        button: `<button id="buyCalculatorButton" class="buildingButtons">Buy a Calculator (<span id='calculatorBuildingCountDisp'>0</span>)</button>` // Amount of the building.
              
    },
    {   name: "House",           // Displayed name (used for HTML)
        id: 'houseBuilding',          // id (used when calling a certain building)
        description: 'Where were you counting before, the street?',
        altId: 'buyHouse',            // Alt ID (used in some button calls)  
        requirement: () => (RESOURCES[0].totalCount >= 600), // Requirement to show button.
        costs: [
            {name: "money", value: 1100},
        ],
        production: [
            {name: 'number', type: 'resource', value: (4/7)}
        ],
        costRatio: 1.15,        // Cost in dollars
        numberProdBase: (4/7),      //Production base. For decimals, USE FRACTIONS INSTEAD! It helps keep numbers cleaner.
                     //Science production. Only for certain buildings; if it's not there, set to ZERO. Don't delete it.
        count: 0,  
        button: `<button class="buildingButtons">Buy a House (<span id='houseBuildingCountDisp'>0</span>)</button>` // Amount of the building.
              
    },
    {   name: "Bookshelf",           // Displayed name (used for HTML)
        id: 'bookshelfBuilding',          // id (used when calling a certain building)
        description: 'Place your books nicely upon this shelf and maybe you will eventually pick them up and learn.',
        altId: 'buyBookshelf',            // Alt ID (used in some button calls)  
        requirement: () => (RESOURCES[0].totalCount >= 2000), // Requirement to show button.
        costs: [
            {name: "money", value: 7000},
        ],
        costRatio: 1.15,        // Cost in dollars
        production: [
            {name: 'number', type: 'resource', value: (4/7)},
            {name: 'science', type: 'resource', value: (0.03/7)}
        ],           
        count: 0,  
        button: `<button class="buildingButtons">Buy a Bookshelf (<span id='bookshelfBuildingCountDisp'>0</span>)</button>` // Amount of the building.
              
    },
    
    


    


];
