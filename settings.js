export const registerSettings = function() {
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