export const registerSettings = function() {
    console.log("REGISTERING SETTINGS IN 'settings.js'");
    //initialize all settings
    game.settings.register('RudeTweaks','FixCombatInitiative', {
        name: "RudeTweaks.FixCombatInitiative",
        hint: "RudeTweaks.FixCombatInitiative_Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });
};  