var UPGRADES = [
    /* WHEN ADDING UPGRADES, UPDATE:
     * 1) The name of the upgrade.
     * 2) The name of the upgrade WITHIN THE HTML.
     * 3) The description of the upgrade, both in the object AND html.
     * 4) The costs of the upgrade if applicable.
     * 5) The requirements of the upgrade if applicable.
     * 6) The results of the upgrade if applicable.
     * 7) The ID's. Use CTRL + D to highlight and edit multiple things of the same name at once.
     * 8) MAKE A NEW CSS TAG FOR THE TOOLTIP.
     * 9) Go back and edit the original costs in the HTML (because unlike buildings, they won't update to the correct values if you click on them).
     */
    
    
    
    
    /* ALL CLICKING-RELATED UPGRADES */

    /* ALL MONEY-RATIO REDUCTION UPGRADES */
    {
        name: "Number 2 Pencils",
        desc: "These standard pencils will show on any test scanning software, in case you need to take multiple choice questions about counting. Which you definitely should.",
        moneyCost: 400,
        scienceCost: null,
        popularityCost: null,
        requirement: () => RESOURCES[0].count >= 70,
        result : function() {
            player.moneyRatio -= 0.01;
        },
        id: 'number2PencilsUpg', //Id used to fetch stuff
        html: `<button id="number2PencilsUpgButton" class="upgradeButtons">Number 2 Pencils </button>     
        <div class='tooltip' id='number2PencilsUpgTooltip'> 
            <span>These standard pencils will show on any test scanning software, in case you need to take multiple choice questions about counting. Which you definitely should. <br /> </span>
            <span class='tooltipMoneyColor'> <span class='boldedNumbers' id='number2PencilsUpgMoneyCostDisp'> 30,000 </span> dollars<br /> </span>
            <span>----------------------------------------------------------------</span>
                <div>Money Cost Ratio: -0.01 </div>
                
        </div>` ,
        index: 1 //Index to determine what is deleted when you buy the upgrade. Based ONLY upon what order the table is sorted by.
     },


     {
        name: "Energy Drinks",
        desc: "The pinnacle of caffinated beverages, these drinks will squeeze a few more hours per day out of you.",
        moneyCost: 3000,
        scienceCost: null,
        popularityCost: null,
        requirement: () => RESOURCES[0].count >= 70,
        result : function() {
            player.moneyRatio -= 0.02;
            BUILDINGS[returnIndex(BUILDINGS, 'bumBuilding')].numberProdBase *= 1.33;
            
        },
        id: 'energyDrinksUpg', //Id used to fetch stuff
        html: `<button id="energyDrinksUpgButton" class="upgradeButtons">EnergyDrinks </button>     
        <div class='tooltip' id='energyDrinksUpgTooltip'> 
            <span>The pinnacle of caffinated beverages, these drinks will squeeze a few more hours per day out of you.<br /> </span>
            <span class='tooltipMoneyColor'> <span class='boldedNumbers' id='energyDrinksUpgMoneyCostDisp'> 30,000 </span> dollars<br /> </span>
            <span>----------------------------------------------------------------</span>
                <div>Money Cost Ratio: -0.02 </div>
                <div>Bum Counting Bonus: +33% </div>
                
        </div>` ,
        index: 1 //Index to determine what is deleted when you buy the upgrade. Based ONLY upon what order the table is sorted by.
     },

     {
        name: "Radiant Matter",
        desc: "Your bums are physically glowing.",
        moneyCost: 5250000,
        scienceCost: 50000,
        energyCost: 100,
        popularityCost: null,
        requirement: () => BUILDINGS[returnIndex(BUILDINGS, 'bumBuilding')].count >= 50, //Gamma Projection Tech
        result : function() {
            player.moneyRatio -= 0.03;
            BUILDINGS[returnIndex(BUILDINGS, 'bumBuilding')].scienceProdBase *= 16;
        },
        id: 'radiantMatterUpg', //Id used to fetch stuff
        html: `<button id="radiantMatterUpgButton" class="upgradeButtons">Radiant Matter</button>     
        <div class='tooltip' id='radiantMatterUpgTooltip'> 
            <span>Your bums are physically glowing.<br /> </span>
            <span class='tooltipMoneyColor'> <span class='boldedNumbers' id='radiantMatterUpgMoneyCostDisp'>  </span> dollars<br /> </span>
            <span class='tooltipScienceColor'> <span class='boldedNumbers' id='radiantMatterScienceCostDisp'></span> science<br /> </span> 
            <span class='tooltipEnergyColor'> <span class='boldedNumbers' id='radiantMatterEnergyCostDisp'></span> energy<br /> </span>   
            <span>----------------------------------------------------------------</span>
                <div>Money Cost Ratio: -0.03 </div>
                <span>Bum Counting Bonus: +1600%</span>
                <span>Bum Dark Matter Production: +0.002</span>
                
        </div>` ,
        index: 1 //Index to determine what is deleted when you buy the upgrade. Based ONLY upon what order the table is sorted by.
     },

     {
        name: "Extra College Credit",
        desc: "Your grads have qualified for extra credits which will reduce the money they have to spend.",
        moneyCost: 17000,
        scienceCost: 3,
        popularityCost: null,
        requirement: () => BUILDINGS[returnIndex(BUILDINGS, 'gradBuilding')].count >= 3,
        result : function() {
            player.moneyRatio -= 0.02;
            BUILDINGS[returnIndex(BUILDINGS, 'gradBuilding')].scienceProdBase *= 1.33;
            
        },
        id: 'extraCollegeCreditUpg', //Id used to fetch stuff
        html: `<button id="extraCollegeCreditUpgButton" class="upgradeButtons">Extra College Credit</button>     
        <div class='tooltip' id='extraCollegeCreditUpgTooltip'> 
            <span>The new system will allow you to run more complex counting programs and play better games while you wait for your (pointless) task. <br /> </span>
            <span class='tooltipMoneyColor'> <span class='boldedNumbers' id='extraCollegeCreditUpgMoneyCostDisp'> 17,000 </span> dollars<br /> </span>
            <span class='tooltipScienceColor'> <span class='boldedNumbers' id='extraCollegeCreditUpgMoneyCostDisp'> 3 </span> science<br /> </span>   
            <span>----------------------------------------------------------------</span>
                <div>Money Cost Ratio: -0.02 </div>
                <span>Grad Student Science Production Bonus: +33%</span>
                
        </div>` ,
        index: 1 //Index to determine what is deleted when you buy the upgrade. Based ONLY upon what order the table is sorted by.
     },

     {
        name: "Updated Operating System",
        desc: "The new system will allow you to run more complex counting programs and play better games while you wait for your (pointless) task.",
        moneyCost: 30000,
        scienceCost: 40,
        popularityCost: null,
        requirement: () => BUILDINGS[returnIndex(BUILDINGS, 'computerBuilding')].count >= 3,
        result : function() {
            player.moneyRatio -= 0.03;
            BUILDINGS[returnIndex(BUILDINGS, 'computerBuilding')].scienceProdBase *= 1.33;
        },
        id: 'updatedOperatingSystemUpg', //Id used to fetch stuff
        html: `<button id="updatedOperatingSystemUpgButton" class="upgradeButtons">Updated Operating System</button>     
        <div class='tooltip' id='updatedOperatingSystemUpgTooltip'> 
            <span>The new system will allow you to run more complex counting programs and play better games while you wait for your (pointless) task. <br /> </span>
            <span class='tooltipMoneyColor'> <span class='boldedNumbers' id='updatedOperatingSystemUpgMoneyCostDisp'> 30,000 </span> dollars<br /> </span>
            <span class='tooltipScienceColor'> <span class='boldedNumbers' id='updatedOperatingSystemUpgMoneyCostDisp'> 40 </span> science<br /> </span>   
            <span>----------------------------------------------------------------</span>
                <div>Money Cost Ratio: -0.03 </div>
                <span>Computer Science Production Bonus: +33%</span>
                
        </div>` ,
        index: 1 //Index to determine what is deleted when you buy the upgrade. Based ONLY upon what order the table is sorted by.
     },

    {
        name: "Telling a Friend",
        desc: "It all has to start somewhere... \n Money moneyCost ratio reduction: -0.1% \n Popularity: 0.003/sec",
        moneyCost: 30000,
        scienceCost: null,
        popularityCost: null,
        requirement: () => RESOURCES[2].count >= 40,
        result : function() {
            RESOURCES[3].upgProd += 0.004;
            player.moneyRatio -= 0.01;
        },
        id: 'tellingAFriendUpg', //Id used to fetch stuff
        html: `<button id="tellingAFriendUpgButton" class="upgradeButtons">Telling A Friend </button>     
        <div class='tooltip' id='tellingAFriendUpgTooltip'> 
            <span>You have to get the word out somehow! Bore your friend with your (currently) useless number. <br /> </span>
            <span class='tooltipMoneyColor'> <span class='boldedNumbers' id='tellingAFriendUpgMoneyCostDisp'> 30,000 </span> dollars<br /> </span>
            <span>----------------------------------------------------------------</span>
                <div>Money Cost Ratio: -0.1% (multiplicative)</div>
                <div class ='tooltipPopularityColor'>Popularity: 0.003/sec</div>
        </div>` ,
        index: 1 //Index to determine what is deleted when you buy the upgrade. Based ONLY upon what order the table is sorted by.
     },

     {
        name: "Dilithium Photoelectron Absorbers",
        desc: "Are these real things?",
        moneyCost: 1.25e+7,
        scienceCost: 200000,
        popularityCost: null,
        energyCost: 5000,
        requirement: () => RESOURCES[0].count >= 70,
        result : function() {
            player.moneyRatio -= 0.06;
            RESOURCES[5].upgProd += 0.001;
            RESOURCES[4].upgProd += 0.25;
        },
        id: 'dilithiumPhotoelectronAbsorbersUpg', //Id used to fetch stuff
        html: `<button id="dilithiumPhotoelectronAbsorbersUpgButton" class="upgradeButtons">Dilithium Photoelectron Absorbers </button>     
        <div class='tooltip' id='dilithiumPhotoelectronAbsorbersUpgTooltip'> 
            <span>Are these real things? <br /> </span>
            <span class='tooltipMoneyColor'> <span class='boldedNumbers' id='dilithiumPhotoelectronAbsorbersUpgMoneyCostDisp'> 30,000 </span> dollars<br /> </span>
            <span class='tooltipScienceColor'> <span class='boldedNumbers' id='dilithiumPhotoelectronAbsorbersUpgScienceCostDisp'> 200,000 </span> science<br /> </span>
            <span>----------------------------------------------------------------</span>
                <div>Money Cost Ratio: -0.06 </div>
                <div>Energy Production: +0.25/sec </div>
                <div>Dark Matter Production: +0.001/sec </div>
                
        </div>` ,
        index: 1 //Index to determine what is deleted when you buy the upgrade. Based ONLY upon what order the table is sorted by.
     },


    /* ALL BUM-RELATED UPGRADES */

    {
        name: "New Clothes", //Descriptive stuff. Won't do anything but tooltip.
        desc: "Give your bums a new look and some more motivation! \n Bum production bonus: 100%",
        moneyCost: 1000, // Costs. Supports multiple, if no cost put 'null' instead OR IT WILL NOT WORK.
        scienceCost: 10,
        popularityCost: null,
        requirement: () => RESOURCES[1].count >= 400,
        result: function() {
            BUILDINGS[0].numberProdBase *= 2;
        },
        id: 'newClothes',
        html: `<button id="newClothesButton" class="upgradeButtons" onClick="upgrade(UPGRADES[returnIndex(UPGRADES, 'newClothes')])">New Clothes </button>     
        <div class='tooltip' id='newClothesTooltip'> 
            <span>Give your bums a new look and some motivation! <br /> </span>
            <span class='tooltipMoneyColor'> <span class='boldedNumbers' id='newClothesMoneyCostDisp'> 1000 </span> dollars<br /> </span>
            <span class='tooltipScienceColor'><span class='boldedNumbers' id='newClothesScienceCostDisp'> 10 </span> science<br /> </span>
            <span>----------------------------------------------------------------</span>
              <span>Bum production bonus: +100%</span>
        </div>  ` ,
        index: 0
     },

    /* ALL GRAD STUDENT-RELATED UPGRADES */
    {
        name: "Masters Degree",
        desc: "Get your grads up to speed.",
        moneyCost: 10000,
        scienceCost: 100,
        popularityCost: 20,
        requirement: () => RESOURCES[2].count >= 100,
        result: function() {
            BUILDINGS[returnIndex(BUILDINGS, gradBuilding)].numberProdBase *= 2;
            BUILDINGS[returnIndex(BUILDINGS, gradBuilding)].scienceProdBase += 0.007;
        },
        id: 'mastersDegreeUpg',
        html: `<button id="mastersDegreeUpgButton" class="upgradeButtons">Masters Degree </button>     
        <div class='tooltip' id='mastersDegreeUpgTooltip'> 
        <span>Get your grad students into shape! And off a diet of ramen. <br /> </span>
        <span class='tooltipMoneyColor'> <span class='boldedNumbers' id='mastersDegreeUpgMoneyCostDisp'> 10,000 </span> dollars<br /> </span>
        <span class='tooltipScienceColor'> <span class='boldedNumbers' id='mastersDegreeUpgScienceCostDisp'> 100 </span> science<br /> </span>
        <span class='tooltipPopularityColor'> <span class='boldedNumbers' id='mastersDegreeUpgPopularityCostDisp'> 20 </span> popularity<br /> </span>
        <span>----------------------------------------------------------------</span>
            <div>Grad Student Counting: +100%</div>
            <div>Grad Student Science Production: 0.004/sec</div>
        </div>`,
        index: 2
     }
    /* ALL MATHEMATICIAN-RELATED UPGRADES */

    /* ALL COMPUTER-RELATED UPGRADES */


];
