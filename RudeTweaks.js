import {registerSettings} from "settings.js";
Hooks.once('init', function() {
    console.log("REGISTERING SETTINGS IN 'RudeTweaks.js'");
    registerSettings();
});

let lastCombat;
const combats = [];
Hooks.on("updateCombat", (combat) => {
    if (combat.round !== 1 || combats.includes(combat)) return;
    let thisCombat = combat.data.combatants.some(combatant => combatant.initiative === null);
    if (thisCombat) {
            console.log("RudeTweaks: Triggering combat turn reset.");
            combat.update({turn: 0});
    }
    if (lastCombat && !thisCombat) {
        console.log("RudeTweaks: Triggering combat turn reset.");
        combat.update({turn: 0});
        combats.push(combat);
    }
    lastCombat = thisCombat;
});