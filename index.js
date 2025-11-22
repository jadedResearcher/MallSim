let game;
window.onload = () => {
    initThemes();
    debug();



}

const debug = () => {
    balanceStatsDebug();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const seed = urlParams.get('seed') ? parseInt(urlParams.get('seed')) : 13;
    //if there is an id it turns into a global var this is wild i only learned this recently
    const debug = createElementWithClassAndParent("div", container, "debug");
    const rand = new SeededRandom(seed);
    game = new Game(rand);
    game.start(debug);
    console.log("JR NOTE: debug entities", game.players);

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

    console.log("JR NOTE: current stat spread is: ", { mind, eye, tongue, arm, leg })

}


/*
one of the Unmarked (so fresh they don't even have a title) made this incredible thing and gave me permission to host it (with credit)
http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/DefinitelyNotNewAudioLogs/podcast_by_ellienamored.mp3

*/