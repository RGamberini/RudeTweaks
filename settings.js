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

    game.settings.register('RudeTweaks','HideAttackRollResult', {
        name: "RudeTweaks.HideAttackRollResult",
        hint: "RudeTweaks.HideAttackRollResult_Hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register('RudeTweaks','SensibleDefaults', {
        name: "RudeTweaks.SensibleDefaults",
        hint: "RudeTweaks.SensibleDefaults_Hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
};