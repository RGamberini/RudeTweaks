import {registerSettings} from "./settings.js";
Hooks.once('init', function() {
    console.log("RudeTweaks | Registering settings");
    registerSettings();
    if (game.settings.get("RudeTweaks", "HideAttackRollResult"))
        document.head.insertAdjacentHTML("beforeend", `<style>.whisper {display: none;}</style>`);
});

// Hooks.once('ready', () => {
//     let choices = {};
//     Array.from(game.settings.settings.values())
//         .filter(setting => setting.scope === "client")
//         .forEach(option => choices[option.key] = option.name);
//     game.settings.register("RudeTweaks", "ConfigureDefaults", {
//         name: "Configure Client Side Defaults",
//         hint: "dick hands",
//         scope: "world",      // This specifies a world-level setting
//         config: true,        // This specifies that the setting appears in the configuration view
//         type: String,
//         choices: choices,
//         onChange: value => { // A callback function which triggers when the setting is changed
//           console.log(value)
//         }
//       });
// });

Hooks.once('ready', () => {
    if (!game.settings.get("RudeTweaks", "SensibleDefaults") || game.user.isGM) return;
    game.settings.set("token-action-hud", "showHudTitle", false);
    game.settings.set("token-action-hud", "alwaysShowAdditionalCategories", false);
    game.settings.set("easy-target", "release", "standard");
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
    setTimeout(() => {
        let whisper = message.data.whisper.length > 0;
        let attackroll = message.data.flags["midi-qol"] && message.data.flags["midi-qol"].waitForDiceSoNice !== undefined;
        if (game.user.isGM || (whisper && !attackroll)) {
            document.querySelector(`[data-message-id="${message.data._id}"]`).style = "display: inherit";
            ui.chat.scrollBottom(); 
        }
    }, 100);
});
