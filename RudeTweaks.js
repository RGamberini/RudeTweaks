import {registerSettings} from "settings.js";
Hooks.once('init', function(){
    registerSettings();
});

let lastCombatants;
const combats = [];
Hooks.on("updateCombat", (combat) => {
    if (combat.round !== 1 || !game.settings.get("RudeTweaks", "FixCombatInitiative")) return;
    let combatants = combat.data.combatants;
    /** IF: This ISN'T the first combat update
     * AND the some of combatants last update were missing initiative 
     * AND NONE of the combatants this update are missing initiative 
     * AND We've never reset initiative for this combat before
     * THEN that means that this was the update where all initiatives are IN. Reset the turn tracker to 0**/
    if (lastCombatants && 
        lastCombatants.some(combatant => combatant.initiative === null) &&
        !combatants.some(combatant => combatant.initiative === null) &&
        !combats.includes(combat)) {
            console.log("RudeTweaks: Triggering combat turn reset.");
            combat.update({turn: 0});
            combats.push(combat);
    }
    lastCombatants = combatants;
});