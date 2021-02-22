import {registerSettings} from "./settings.js";
Hooks.once('init', function() {
    console.log("RudeTweaks | Registering settings");
    registerSettings();
    if (game.settings.get("RudeTweaks", "HideAttackRollResult"))
        document.head.insertAdjacentHTML("beforeend", `<style>.whisper {display: none;}</style>`);
});

let lastCombat;
const combats = [];
Hooks.on("updateCombat", (combat) => {
    if (combat.round !== 1 || combats.includes(combat) || !game.settings.get('RudeTweaks','FixCombatInitiative')) return;
    setTimeout(() => {
        let thisCombat = combat.data.combatants.some(combatant => combatant.initiative === null);
        if (thisCombat) {
                console.log("RudeTweaks | Triggering combat turn reset.");
                combat.update({turn: 0});
        }
        if (lastCombat && !thisCombat) {
            console.log("RudeTweaks | Triggering combat turn reset.");
            combat.update({turn: 0});
            combats.push(combat);
        }
        lastCombat = thisCombat;
    }, 100);
});

Hooks.on("createChatMessage", (message) => {
    if (!game.settings.get("RudeTweaks", "HideAttackRollResult")) return;
    let whisper = message.data.whisper.length > 0;
    let attackroll = message.data.flags["midi-qol"] && message.data.flags["midi-qol"].waitForDiceSoNice !== undefined;
    if (game.user.isGM || (whisper && !attackroll))
        document.querySelector(`[data-message-id="${message.data._id}"]`).style = "display: inherit";
});