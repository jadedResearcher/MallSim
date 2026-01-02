let game;
window.addEventListener('error', (message, file, line, column, errorObj) => {
    console.log(message)
    const all = document.querySelectorAll(".story-beat");
    let target = Object.values(all).at(-1);
    if (!target) {
        target = document.querySelector("body");
    }
    const error_ele = createElementWithClassAndParent("p", target, "sub-story-beat");
    error_ele.innerHTML = Zalgo.generate("ERROR: NOTHING COULD BE SAVED");

    const error_ele2 = createElementWithClassAndParent("p", target, "sub-story-beat");
    error_ele2.innerHTML = message

    const error_ele3 = createElementWithClassAndParent("p", target, "sub-story-beat");
    error_ele3.innerHTML = file;

    const error_ele4 = createElementWithClassAndParent("p", target, "sub-story-beat");
    error_ele4.innerHTML = line;

    const error_ele5 = createElementWithClassAndParent("p", target, "sub-story-beat");
    error_ele5.innerHTML = column;


    const error_ele6 = createElementWithClassAndParent("p", target, "sub-story-beat");
    error_ele6.innerHTML = errorObj;

});
window.onload = () => {

    initThemes();
    grabEyes();
    grabCodeComments();
    load();
    debug();



}
//https://www.tumblr.com/verbosebabbler/801492874529259520/guides-alternate-zampaniosim-classpects?source=share

const debug = () => {
    balanceStatsDebug();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const seed = urlParams.get('seed') ? stringtoseed(urlParams.get('seed')) : 13;
    //if there is an id it turns into a global var this is wild i only learned this recently
    const debug = createElementWithClassAndParent("div", container, "debug");
    const rand = new SeededRandom(seed);
    game = new Game(rand, false);
    game.start(debug);

}

//checking if the themes have too much, say, arm and not enough mind in total
//don't want to make all the players himbos , you know?
const balanceStatsDebug = () => {
    let mind = 0;
    let eye = 0;
    let tongue = 0;
    let arm = 0;
    let leg = 0;
    let count = 0;
    for (let theme of Object.values(all_themes)) {
        count++;
        if (theme.stats) {
            eye += theme.stats[EYES_METAL_STAT]
            tongue += theme.stats[TONGUE_METAL_STAT]
            arm += theme.stats[ARMS_METAL_STAT]
            leg += theme.stats[LEGS_METAL_STAT]
            mind += theme.stats[MIND_METAL_STAT]

        } else {
            console.error("JR NOTE: theme did not have stats: ", theme)
        }

    }

    mind = mind / count;
    eye = eye / count;
    tongue = tongue / count;
    arm = arm / count;
    leg = leg / count;


}


/*
one of the Unmarked (so fresh they don't even have a title) made this incredible thing and gave me permission to host it (with credit)
http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/DefinitelyNotNewAudioLogs/podcast_by_ellienamored.mp3

*/


/*
https://www.tumblr.com/jadedresearcher/787355043208839168?source=share

my original notes sparked from this in June, 2025

wooden mannequins dive into the mall looking for loot

well they dont start that way

the further they go the more mannequin they become, and the game only begins when they do

looters can encounter mall blorbos, or even wanda herself as rare events

WOULD YOU SURVIVE ZAMPANIO is the tag line

pick your classpect and interests and have fun exploring the mall 

the stores you find are based on the parties classpect and interests

relationship engine, the whole works

mannequization is god tiering




*/