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

    game.settings.register('RudeTweaks','DisablePause', {
        name: "RudeTweaks.DisablePause",
        hint: "RudeTweaks.DisablePause_Hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
};  