window.onload = () => {
    initThemes();
    debug();



}

const debug = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const seed = urlParams.get('seed') ? parseInt(urlParams.get('seed')) : 13;
    //if there is an id it turns into a global var this is wild i only learned this recently
    const debug = createElementWithClassAndParent("div", container, "debug");
    const rand = new SeededRandom(seed);
    const game = new Game(rand);
    game.start(debug);
    console.log("JR NOTE: debug entities", game.players);

}


/*
one of the Unmarked (so fresh they don't even have a title) made this incredible thing and gave me permission to host it (with credit)
http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/DefinitelyNotNewAudioLogs/podcast_by_ellienamored.mp3

*/