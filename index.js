/*
i should have a tutorial on how to make personal backups of your favorite sins
in case linode goes the way of angelfire
or i get hit by a bus or something
*/

/*
i meant sims
before
not sins
people can figure out how to backup their sins on their own time
i don't need to provide tutorials for that
*/

/*
if you ever feel like making a personal backup of any of my sims/games/pages


what you do is look at the index.html file (or bathroom.html file, whatever) as text (might have to be on desktop to do this)

it'll have a list of things it pulls in like <script> tags or

  <link rel="stylesheet" href="index.css">


  you wanna save that html file and all the <script> tag files it pulls in, 

  like this index.js file

  if it says something like 

    <script src="index.js"></script>

    that means the index.js file should be in the same folder as the index.html or whatever file

    if it instead says something like 

      <script src="scripts/third_party/json_crush.js"></script>

      that means you want to put the "json_crush.js" file into a folder called "third_party" which itself is in a folder called "scripts"

      i make kinda complicated stuff

      images will be harder to save

      if you're on pc, you can open up the network tab and run a simulation (or otherwise make the page do whatever it does)
      and see what images/music/whatever it pulls in

      same rules as scripts, 

      though i tend to make my images and music a maze?

      so instead of "everything a web page uses is a subfolder of that web page
      
      it might be just on a completely different page entirely
      
      i like using the bathroomsim for storage a lot, for reasons
      for example

      http://farragofiction.com/CatalystsBathroomSim/audio_utils/weird_sounds/weird_video/get_ahead.mp4

      before that it was TwoGayJokes
      http://farragofiction.com/TwoGayJokes/Stories/L-U-000-print.pdf

      if its files from places like that its much harder

      you'd need to go into the code and look for anywhere its looking for a file like that and replace it with wherever you're actually putting it

      bluh

      the rot takes all in the end

      so maybe this isn't feasible

      maybe i made my stuff just... impossible to fully back up

      ah well

      thats why i make 'lets plays' occasionally, right?
      "

*/


let game;
window.addEventListener('error', (message, file, line, column, errorObj) => {
    console.log(message)
    if (game) {
        game.event_list.push("ERROR")
    }
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
//its funny this started as debug and now its just... the only way to render the game, whoops
const debug = () => {
    //balanceStatsDebug();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const seed = urlParams.get('seed') ? stringtoseed(urlParams.get('seed')) : 13;
    const custom = urlParams.get('custom')
    //if there is an id it turns into a global var this is wild i only learned this recently
    const debug = createElementWithClassAndParent("div", container, "debug");
    const rand = new SeededRandom(seed);
    game = new Game(rand, false);

    if (custom) {
        try {
            const json_text = JSONCrush.uncrush((custom));
            console.info("JR NOTE: ", { custom, json_text })
            game.importPlayersFromJSON(json_text);
            game.custom = true;
        } catch (e) {
            console.log("JR NOTE: Error caught, here's some data", { custom })
            alert("Something went wrong importing players. Are you suuuuuure you didn't mess up wasting them?")
            console.error(e)
        }

    }




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