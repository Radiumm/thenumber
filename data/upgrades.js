var UPGRADESPURCHASED = [""];
var UPGRADES = [
   {
        name: "10-digit Calculator",
        description: "2 extra digits. Why you would need it? Who knows?",
        costs: [
            {name: 'money', value: 200}
        ],
        button: `<button class="buildingButtons">Number 2 Pencils</button>`,
        tooltip: 'Calculator Counting: +100%',//What the bonuses are.
        requirement: () => RESOURCES[0].count >= 100,
        result : function() {
            BUILDINGS[returnIndex(BUILDINGS, 'calculatorBuilding')].numberProdBase *= 2;
        },
        id: 'number2PencilsUpg', //Id used to fetch stuff
        index: 1 //Index to determine what is deleted when you buy the upgrade. Based ONLY upon what order the table is sorted by.
    },

];
